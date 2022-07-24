const express = require('express');
const app = express();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const bikeURL =
  'https://www.canyon.com/en-si/road-bikes/endurance-bikes/endurace/al/endurace-7/2733.html?dwvar_2733_pv_rahmenfarbe=BK%2FBU';
const bikeSize = 'L';

app.listen(3000, () => {
  console.log('Starting monitor...\n');

  fetch(bikeURL)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      const { document } = new JSDOM(html).window;
      const buyButton = document.querySelector(
        `.productConfiguration__optionListItem .productConfiguration__selectVariant[data-product-size="${bikeSize}"]`
      ).innerHTML;
      const isInStock = !buyButton.includes('Notify');

      if (isInStock) {
        console.info('BIKE IS IN STOCK! HURRY UP!');
      } else {
        console.log('Bike is not in stock :(');
      }
    })
    .catch((error) => {
      console.error('There seems to be an error fetching Canyon website -', error);
    });
});
