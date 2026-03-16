import json
import os
import datetime
import base64
import uuid
import psycopg2
import psycopg2.extras
import boto3

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def get_s3():
    return boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

def upload_image(base64_data):
    if not base64_data:
        return None
    if "," in base64_data:
        base64_data = base64_data.split(",", 1)[1]
    data = base64.b64decode(base64_data)
    filename = f"news/{uuid.uuid4().hex}.jpg"
    s3 = get_s3()
    s3.put_object(Bucket="files", Key=filename, Body=data, ContentType="image/jpeg")
    return f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{filename}"

def row_to_dict(r):
    return {
        "id": r["id"],
        "title": r["title"],
        "content": r["content"],
        "date": r["date"],
        "publish_at": r["publish_at"].isoformat() if r["publish_at"] else None,
        "image_url": r["image_url"],
    }

def handler(event: dict, context) -> dict:
    """API для управления новостями с фото и запланированной публикацией"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    news_id = params.get("id")
    is_admin = params.get("admin") == "1"

    conn = get_conn()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    try:
        if method == "GET":
            if news_id:
                cur.execute("SELECT id, title, content, date::text, publish_at, image_url FROM news WHERE id = %s", (int(news_id),))
                row = cur.fetchone()
                if not row:
                    return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}
                if not is_admin and row["publish_at"] and row["publish_at"] > datetime.datetime.utcnow():
                    return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}
                data = row_to_dict(row)
            else:
                if is_admin:
                    cur.execute("SELECT id, title, content, date::text, publish_at, image_url FROM news ORDER BY COALESCE(publish_at, NOW()) DESC, id DESC")
                else:
                    cur.execute("SELECT id, title, content, date::text, publish_at, image_url FROM news WHERE publish_at IS NULL OR publish_at <= NOW() ORDER BY COALESCE(publish_at, created_at) DESC, id DESC")
                data = [row_to_dict(r) for r in cur.fetchall()]
            return {"statusCode": 200, "headers": cors, "body": json.dumps(data, ensure_ascii=False)}

        if method == "POST":
            body = json.loads(event.get("body") or "{}")
            date_val = body.get("date") or datetime.date.today().isoformat()
            publish_at_val = body.get("publish_at") or None
            image_url = upload_image(body.get("image"))
            cur.execute(
                "INSERT INTO news (title, content, date, publish_at, image_url) VALUES (%s, %s, %s, %s, %s) RETURNING id, title, content, date::text, publish_at, image_url",
                (body["title"], body["content"], date_val, publish_at_val, image_url)
            )
            conn.commit()
            data = row_to_dict(cur.fetchone())
            return {"statusCode": 201, "headers": cors, "body": json.dumps(data, ensure_ascii=False)}

        if method == "PUT":
            body = json.loads(event.get("body") or "{}")
            date_val = body.get("date") or datetime.date.today().isoformat()
            publish_at_val = body.get("publish_at") or None
            image_url = upload_image(body.get("image"))
            if image_url:
                cur.execute(
                    "UPDATE news SET title=%s, content=%s, date=%s, publish_at=%s, image_url=%s WHERE id=%s RETURNING id, title, content, date::text, publish_at, image_url",
                    (body["title"], body["content"], date_val, publish_at_val, image_url, body["id"])
                )
            else:
                cur.execute(
                    "UPDATE news SET title=%s, content=%s, date=%s, publish_at=%s WHERE id=%s RETURNING id, title, content, date::text, publish_at, image_url",
                    (body["title"], body["content"], date_val, publish_at_val, body["id"])
                )
            conn.commit()
            row = cur.fetchone()
            if not row:
                return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}
            data = row_to_dict(row)
            return {"statusCode": 200, "headers": cors, "body": json.dumps(data, ensure_ascii=False)}

        if method == "DELETE":
            cur.execute("DELETE FROM news WHERE id = %s", (int(news_id),))
            conn.commit()
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    finally:
        cur.close()
        conn.close()
