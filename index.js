const express = require('express');
const app = express();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const interval = 30000; // 5 min
const bikeURLs = [
  'https://www.canyon.com/en-si/road-bikes/endurance-bikes/endurace/al/endurace-7/2733.html?dwvar_2733_pv_rahmenfarbe=BK%2FBU',
  'https://www.canyon.com/en-si/road-bikes/endurance-bikes/endurace/al/endurace-7/2733.html?dwvar_2733_pv_rahmenfarbe=BK%2FBK',
];
const bikeSize = 'L';

const telegramURL = 'https://api.telegram.org/bot';
const telegramToken = 'XXXXXXXXX';
const chatID = 'XXXXXX';

let lastUptimeCheckDate = Date.now();

app.listen(3000, () => {
  console.log('Starting monitor...\n');
  sendMessage('Monitor started');

  setInterval(() => {
    let isInStock = false;

    // Status update every 12 hours
    if (Date.now() - lastUptimeCheckDate > 43200000) {
      lastUptimeCheckDate = Date.now();
      sendMessage('Monitor is still working');
      if (!isInStock) {
        sendMessage('Bike is still not in stock :(');
      }
    }

    bikeURLs.forEach((url) => {
      fetch(url)
        .then((response) => {
          return response.text();
        })
        .then((html) => {
          const { document } = new JSDOM(html).window;
          const buyButton = document.querySelector(
            `.productConfiguration__optionListItem .productConfiguration__selectVariant[data-product-size="${bikeSize}"]`
          ).innerHTML;
          isInStock = !buyButton.includes('Notify');

          if (isInStock) {
            console.info('The bike is in stock!');
            sendMessage('The bike you want is in stock! Hurry up!');
          }
        })
        .catch((error) => {
          console.error('There seems to be an error fetching Canyon website -', error);
        });
    });
  }, interval);
});

const sendMessage = (message) => {
  fetch(`${telegramURL}${telegramToken}/sendMessage`, {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatID,
      text: message,
    }),
  });
};
