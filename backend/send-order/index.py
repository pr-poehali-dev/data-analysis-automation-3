import json
import os
import urllib.request
import urllib.parse
import smtplib
import socket
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(name, phone, city, comment):
    """Отправка заявки на почту через Gmail SMTP"""
    gmail_password = os.environ.get("GMAIL_APP_PASSWORD")
    if not gmail_password:
        return False

    sender = "Yaltataran@gmail.com"
    receiver = "Yaltataran@gmail.com"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Заявка на эвакуатор от {name}"
    msg["From"] = sender
    msg["To"] = receiver

    html = f"""
    <div style="font-family:Arial,sans-serif;max-width:500px;padding:20px;border:1px solid #e0e0e0;border-radius:12px;">
        <h2 style="color:#333;margin-bottom:16px;">Новая заявка на эвакуатор</h2>
        <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#888;width:120px;">Имя:</td><td style="padding:8px 0;font-weight:bold;">{name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Телефон:</td><td style="padding:8px 0;font-weight:bold;"><a href="tel:{phone}">{phone}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888;">Город:</td><td style="padding:8px 0;">{city if city else 'не указан'}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Комментарий:</td><td style="padding:8px 0;">{comment if comment else 'нет'}</td></tr>
        </table>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    socket.setdefaulttimeout(10)
    server = smtplib.SMTP("smtp.gmail.com", 587, timeout=10)
    server.ehlo()
    server.starttls()
    server.login(sender, gmail_password)
    server.sendmail(sender, receiver, msg.as_string())
    server.quit()
    return True


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта эвакуатора в Telegram и на почту."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    raw_body = event.get('body', '{}')
    if isinstance(raw_body, str):
        body = json.loads(raw_body)
    else:
        body = raw_body if raw_body else {}

    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    city = body.get('city', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID', '-1002146850254')
    print(f"TELEGRAM: token={'YES' if bot_token else 'NO'}, chat_id={chat_id}")

    if bot_token:
        message_thread_id = 6224

        text = (
            f"🚗 *Новая заявка на эвакуатор*\n\n"
            f"👤 *Имя:* {name}\n"
            f"📞 *Телефон:* {phone}\n"
            f"📍 *Город:* {city if city else 'не указан'}\n"
            f"💬 *Комментарий:* {comment if comment else 'нет'}"
        )

        tg_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        data = urllib.parse.urlencode({
            'chat_id': chat_id,
            'text': text,
            'parse_mode': 'Markdown',
            'message_thread_id': message_thread_id
        }).encode()

        try:
            req = urllib.request.Request(tg_url, data=data, method='POST')
            resp = urllib.request.urlopen(req)
            print(f"TELEGRAM: sent OK, status={resp.status}")
        except Exception as e:
            print(f"TELEGRAM ERROR: {e}")

    try:
        send_email(name, phone, city, comment)
        print("EMAIL: sent OK")
    except Exception as e:
        print(f"EMAIL ERROR: {e}")

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }