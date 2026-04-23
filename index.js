const bedrock = require('bedrock-protocol');
const settings = require('./settings.json');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is Online!'));
app.listen(process.env.PORT || 3000);

function createBot() {
    console.log("🔄 جاري الاقتحام... انتظر قليلاً");
    
    const client = bedrock.createClient({
        host: settings.server.ip,
        port: settings.server.port,
        username: settings["bot-account"].username,
        offline: true,
        // هنا السر: حذفنا سطر الإصدار تماماً لكي لا يحدث تعارض
        skipPing: true 
    });

    client.on('spawn', () => {
        console.log("✅ مبروك! البوت داخل السيرفر الآن.");
    });

    client.on('error', (err) => {
        console.log("❌ محاولة أخرى... (السبب: " + err.message + ")");
    });

    client.on('close', () => {
        setTimeout(createBot, 5000);
    });
}

createBot();
