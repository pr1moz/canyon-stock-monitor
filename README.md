# Canyon bike stock monitor
With the current bike shortage, finding a bike in stock is nearly impossible. This script will monitor the Canyon's website and notify you when a bike is back in stock by sending you a Telegram message.

**Parameters to adjust:**
* `bikeURLs` - Array of URLs to monitor. Useful to monitor multiple variations if you don't care about the color.
* `bikeSize` - The size of the frame you want to monitor.
* `telegramToken` - You'll need to create a [Telegram bot](https://core.telegram.org/bots#6-botfather) and use the token given.
* `chatID` - ID of the chat you want the bot to post to. The easiest way to find this ID - create a group with your bot and add @raw_data_bot to it.
* `interval` - if you want to change the check interval.

**Running the script**

You'll need Node v18 or above. Run `npm install` to install dependencies, then `npm start` to run the script.

---

The monitor is pretty simple, it just checks if a `Notify me` button is present for the desired size. If it is, the bike is not in stock. If the button is not present it will send you a notification.

The script will also send you a message every 12h, just to check in that the script is still running.
