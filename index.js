const bedrock = require('bedrock-protocol');
const settings = require('./settings.json');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is Online!'));
app.listen(process.env.PORT || 3000);

function createBot() {
    console.log("🔄 جاري محاولة الاتصال...");
    const client = bedrock.createClient({
        host: settings.server.ip,
        port: settings.server.port,
        username: settings["bot-account"].username,
        offline: true,
        // حذفنا سطر الإصدار هنا ليقوم البوت باختياره تلقائياً
    });

    client.on('spawn', () => {
        console.log("✅ أخيراً! البوت دخل السيرفر بنجاح.");
    });

    client.on('error', (err) => {
        console.log("❌ حدث خطأ: " + err.message);
        // إذا فشل بسبب الإصدار، سيحاول مرة أخرى تلقائياً
    });

    client.on('close', () => {
        setTimeout(createBot, 5000);
    });
}

createBot();
