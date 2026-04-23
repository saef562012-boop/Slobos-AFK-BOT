const bedrock = require('bedrock-protocol');
const settings = require('./settings.json');
const express = require('express');
const app = express();

// تشغيل سيرفر ويب بسيط لابقاء البوت حياً (خاصة لـ Render/Replit)
app.get('/', (req, res) => res.send('Bot is Running!'));
app.listen(process.env.PORT || 3000);

function createBot() {
    const client = bedrock.createClient({
        host: settings.server.ip,
        port: settings.server.port,
        username: settings["bot-account"].username,
        offline: true,
        version: settings.server.version
    });

    client.on('spawn', () => {
        console.log("✅ البوت دخل سيرفر البيدروك بنجاح!");
        
        // إرسال رسائل تلقائية إذا كانت مفعلة
        if (settings.utils["chat-messages"].enabled) {
            setInterval(() => {
                const msgs = settings.utils["chat-messages"].messages;
                const msg = msgs[Math.floor(Math.random() * msgs.length)];
                client.queue('text', {
                    type: 'chat', needs_translation: false, source_name: '', xuid: '', platform_chat_id: '',
                    message: msg
                });
            }, settings.utils["chat-messages"]["repeat-delay"] || 30000);
        }
    });

    client.on('error', (err) => console.log("❌ خطأ: " + err.message));
    
    client.on('close', () => {
        console.log("🔄 انقطع الاتصال، جاري إعادة المحاولة بعد 10 ثوانٍ...");
        setTimeout(createBot, 10000);
    });
}

createBot();
