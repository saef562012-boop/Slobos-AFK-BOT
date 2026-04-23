const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is Working!'));
app.listen(process.env.PORT || 3000);

console.log("🔄 محاولة اقتحام السيرفر...");

function startBot() {
    const client = bedrock.createClient({
        host: "dynamic-8.magmanode.com",
        port: 25753,
        username: "Dura_AFK", // اسم جديد ومميز
        offline: true,
        version: "1.20.80" // سنستخدم هذا الإصدار كقناع للدخول
    });

    client.on('spawn', () => {
        console.log("✅ أخيراً! البوت دخل السيرفر بنجاح.");
    });

    client.on('error', (err) => {
        console.log("⚠️ محاولة اتصال جديدة...");
    });

    client.on('close', () => {
        setTimeout(startBot, 5000);
    });
}

startBot();
