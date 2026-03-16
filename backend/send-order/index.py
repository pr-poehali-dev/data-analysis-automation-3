import json
import os
import urllib.request
import urllib.parse


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта эвакуатора в Telegram-чат."""

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
            'body': {'error': 'Имя и телефон обязательны'}
        }

    bot_token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = '-1002146850254'
    message_thread_id = 6224

    text = (
        f"🚗 *Новая заявка на эвакуатор*\n\n"
        f"👤 *Имя:* {name}\n"
        f"📞 *Телефон:* {phone}\n"
        f"📍 *Город:* {city if city else 'не указан'}\n"
        f"💬 *Комментарий:* {comment if comment else 'нет'}"
    )

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown',
        'message_thread_id': message_thread_id
    }).encode()

    req = urllib.request.Request(url, data=data, method='POST')
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    if not result.get('ok'):
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Ошибка отправки в Telegram'}
        }

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'success': True}
    }
