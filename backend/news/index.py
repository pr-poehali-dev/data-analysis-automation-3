import json
import os
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

def handler(event: dict, context) -> dict:
    """API для управления новостями: GET список/одна, POST создать, PUT обновить, DELETE удалить"""
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

    conn = get_conn()

    try:
        if method == "GET":
            if news_id:
                rows = conn.run("SELECT id, title, content, date::text FROM news WHERE id = :id", id=int(news_id))
                if not rows:
                    return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}
                r = rows[0]
                data = {"id": r[0], "title": r[1], "content": r[2], "date": r[3]}
            else:
                rows = conn.run("SELECT id, title, content, date::text FROM news ORDER BY date DESC, id DESC")
                data = [{"id": r[0], "title": r[1], "content": r[2], "date": r[3]} for r in rows]
            return {"statusCode": 200, "headers": cors, "body": json.dumps(data, ensure_ascii=False)}

        if method == "POST":
            body = json.loads(event.get("body") or "{}")
            date_val = body.get("date") or None
            if date_val:
                rows = conn.run(
                    "INSERT INTO news (title, content, date) VALUES (:title, :content, :date) RETURNING id, title, content, date::text",
                    title=body["title"], content=body["content"], date=date_val
                )
            else:
                rows = conn.run(
                    "INSERT INTO news (title, content) VALUES (:title, :content) RETURNING id, title, content, date::text",
                    title=body["title"], content=body["content"]
                )
            r = rows[0]
            data = {"id": r[0], "title": r[1], "content": r[2], "date": r[3]}
            return {"statusCode": 201, "headers": cors, "body": json.dumps(data, ensure_ascii=False)}

        if method == "PUT":
            body = json.loads(event.get("body") or "{}")
            rows = conn.run(
                "UPDATE news SET title=:title, content=:content, date=:date WHERE id=:id RETURNING id, title, content, date::text",
                title=body["title"], content=body["content"], date=body.get("date"), id=body["id"]
            )
            if not rows:
                return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "Not found"})}
            r = rows[0]
            data = {"id": r[0], "title": r[1], "content": r[2], "date": r[3]}
            return {"statusCode": 200, "headers": cors, "body": json.dumps(data, ensure_ascii=False)}

        if method == "DELETE":
            conn.run("DELETE FROM news WHERE id=:id", id=int(news_id))
            return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

        return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}

    finally:
        conn.close()