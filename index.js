const bedrock = require('bedrock-protocol');
const settings = require('./settings.json');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is Online!'));
app.listen(process.env.PORT || 3000);

function createBot() {
    console.log("🔄 جاري الاتصال... سأقوم بتخطي فحص الإصدار يدوياً");
    
    const client = bedrock.createClient({
        host: settings.server.ip,
        port: settings.server.port,
        username: settings["bot-account"].username,
        offline: true,
        // تم حذف سطر الإصدار نهائياً لإيقاف الخطأ الأحمر
        skipPing: true
    });

    client.on('spawn', () => {
        console.log("✅ أخيراً! البوت دخل السيرفر بنجاح.");
    });

    client.on('error', (err) => {
        console.log("❌ خطأ في الاتصال: " + err.message);
    });

    client.on('close', () => {
        setTimeout(createBot, 5000);
    });
}

createBot();
