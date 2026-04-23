const bedrock = require('bedrock-protocol');
const settings = require('./settings.json');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is Alive!'));
app.listen(process.env.PORT || 3000);

function createBot() {
    console.log("🔄 جاري محاولة الدخول بدون فحص الإصدار...");
    
    const client = bedrock.createClient({
        host: settings.server.ip,
        port: settings.server.port,
        username: settings["bot-account"].username,
        offline: true
        // لاحظ: لم نضع سطر الإصدار هنا نهائياً لنتجنب الخطأ الأحمر
    });

    client.on('spawn', () => {
        console.log("✅ أخيراً! البوت دخل السيرفر.");
    });

    client.on('error', (err) => {
        console.log("❌ محاولة أخرى... السبب: " + err.message);
    });

    client.on('close', () => {
        setTimeout(createBot, 5000);
    });
}

createBot();
