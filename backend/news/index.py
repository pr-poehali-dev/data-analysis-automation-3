import json
import os
import datetime
import pg8000.native
from urllib.parse import urlparse, unquote

def get_conn():
    u = urlparse(os.environ["DATABASE_URL"])
    return pg8000.native.Connection(
        user=unquote(u.username),
        password=unquote(u.password),
        host=u.hostname,
        port=u.port or 5432,
        database=u.path.lstrip("/")
    )

def row_to_dict(r):
    return {
        "id": r[0],
        "title": r[1],
        "content": r[2],
        "date": r[3],
        "publish_at": r[4].isoformat() if r[4] else None,
    }

def handler(event: dict, context) -> dict:
    """API для управления новостями с поддержкой запланированной публикации"""
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
    # admin=1 — возвращать все включая запланированные
    is_admin = params.get("admin") == "1"

    conn = get_conn()

    try:
        if method == "GET":
            if news_id:
                rows = conn.run(
                    "SELECT id, title, content, date::text, publish_at FROM news WHERE id = :id",
                    id=int(news_id)
                )
                if not rows:
                    return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}
                r = rows[0]
                # Если не админ — не показывать ещё не опубликованные
                if not is_admin and r[4] and r[4] > datetime.datetime.utcnow():
                    return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}
                data = row_to_dict(r)
            else:
                if is_admin:
                    rows = conn.run(
                        "SELECT id, title, content, date::text, publish_at FROM news ORDER BY COALESCE(publish_at, NOW()) DESC, id DESC"
                    )
                else:
                    rows = conn.run(
                        "SELECT id, title, content, date::text, publish_at FROM news WHERE publish_at IS NULL OR publish_at <= NOW() ORDER BY COALESCE(publish_at, created_at) DESC, id DESC"
                    )
                data = [row_to_dict(r) for r in rows]
            return {"statusCode": 200, "headers": cors, "body": json.dumps(data, ensure_ascii=False)}

        if method == "POST":
            body = json.loads(event.get("body") or "{}")
            date_val = body.get("date") or datetime.date.today().isoformat()
            publish_at_val = body.get("publish_at") or None
            rows = conn.run(
                "INSERT INTO news (title, content, date, publish_at) VALUES (:title, :content, :date, :publish_at) RETURNING id, title, content, date::text, publish_at",
                title=body["title"],
                content=body["content"],
                date=date_val,
                publish_at=publish_at_val,
            )
            conn.run("COMMIT")
            data = row_to_dict(rows[0])
            return {"statusCode": 201, "headers": cors, "body": json.dumps(data, ensure_ascii=False)}

        if method == "PUT":
            body = json.loads(event.get("body") or "{}")
            date_val = body.get("date") or datetime.date.today().isoformat()
            publish_at_val = body.get("publish_at") or None
            rows = conn.run(
                "UPDATE news SET title=:title, content=:content, date=:date, publish_at=:publish_at WHERE id=:id RETURNING id, title, content, date::text, publish_at",
                title=body["title"],
                content=body["content"],
                date=date_val,
                publish_at=publish_at_val,
                id=body["id"]
            )
            conn.run("COMMIT")
            if not rows:
                return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}
            data = row_to_dict(rows[0])
            return {"statusCode": 200, "headers": cors, "body": json.dumps(data, ensure_ascii=False)}

        if method == "DELETE":
            conn.run("DELETE FROM news WHERE id=:id", id=int(news_id))
            conn.run("COMMIT")
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    finally:
        conn.close()