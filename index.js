const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is Live'));
app.listen(process.env.PORT || 3000);

const client = bedrock.createClient({
    host: "dynamic-8.magmanode.com",
    port: 25753,
    username: "Dura_Bot",
    offline: true
});

client.on('spawn', () => console.log("✅ دخل البوت!"));
client.on('error', (err) => console.log("❌ خطأ: " + err.message));
