const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot is Online!'));
app.listen(process.env.PORT || 3000);

function createBot() {
    console.log("🔄 جاري الاتصال المباشر بالسيرفر...");
    
    try {
        const client = bedrock.createClient({
            host: "dynamic-8.magmanode.com",
            port: 25753,
            username: "Kareem_AFK",
            offline: true,
            skipPing: true
            // ملاحظة: لا يوجد أي إشارة للإصدار هنا، سيتم تخطيه إجبارياً
        });

        client.on('spawn', () => {
            console.log("✅ مبروك! البوت دخل السيرفر أخيراً.");
        });

        client.on('error', (err) => {
            console.log("⚠️ تنبيه: " + err.message);
        });

        client.on('close', () => {
            setTimeout(createBot, 5000);
        });
    } catch (e) {
        console.log("❌ فشل الاتصال، سأحاول مجدداً...");
        setTimeout(createBot, 5000);
    }
}

createBot();
