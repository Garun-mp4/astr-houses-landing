# astr-houses-landing

## Telegram-заявки на Vercel

Формы сайта отправляют заявки на endpoint `/api/lead`. Пользователь остается на сайте, а serverless function отправляет сообщение в Telegram через Bot API.

### Настройка

1. Создайте Telegram-бота через BotFather.
2. Сохраните токен бота из BotFather как `TELEGRAM_BOT_TOKEN`.
3. Получите `TELEGRAM_CHAT_ID` нужного пользователя, группы или канала.
4. В Vercel откройте `Project -> Settings -> Environment Variables`.
5. Добавьте переменные:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
6. Сделайте redeploy проекта после добавления переменных.

Токен бота и chat_id не должны храниться в `index.html`, `project/script.js`, `project/config.js` или другом frontend-коде.
