const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is Online!'));
app.listen(process.env.PORT || 3000);

function createBot() {
    console.log("🔄 جاري الاقتحام المباشر...");
    
    const client = bedrock.createClient({
        host: "dynamic-8.magmanode.com", // الآيبي مباشرة
        port: 25753,                     // البورت مباشرة
        username: "Kareem_Bot",          // اسم جديد بدون مسافات
        offline: true,
        skipPing: true
        // لاحظ: لا يوجد سطر اصدار نهائياً هنا
    });

    client.on('spawn', () => {
        console.log("✅ أخيراً! البوت دخل السيرفر.");
    });

    client.on('error', (err) => {
        console.log("❌ محاولة أخرى... " + err.message);
    });

    client.on('close', () => {
        setTimeout(createBot, 5000);
    });
}

createBot();
