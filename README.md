# Discord.js example bot

This bot built for learning Discord.js

## How to create Discord bot?

1. Open [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** button.
3. Fill your Discord bot name there and tick checkbox to agree Developer TOS.
4. Click **Create** and finish the Captcha.
5. Copy the **Application ID**. We'll call this as Client ID.
6. Go to **Bot** menu on left bar, scroll down and click **Reset Token**, then confirm.
7. Copy the token. **Store the token safely, make sure no one knows it except you or someone you trust.**
8. Open [Discord Permissions Calculator](https://discordapi.com/permissions.html#183296). Fill your Client ID there and open the link for inviting your bot on your server.

## How to set up this project?

1. Copy the **.env.example** into **.env** and fill all credentials there.
2. Run `node deploy-commands.js` to register slash commands.
3. Run `node index.js` to run the bot.
