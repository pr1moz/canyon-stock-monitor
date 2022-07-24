const express = require('express');
const app = express();

const bikeURL =
  'https://www.canyon.com/en-si/road-bikes/endurance-bikes/endurace/al/endurace-7/2733.html?dwvar_2733_pv_rahmenfarbe=BK%2FBU';

app.listen(3000, () => {
  console.log('Server running.');

  fetch(bikeURL)
    .then((response) => {
      return response.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const page = parser.parseFromString(html, 'text/html');

      console.log(page);
    })
    .catch((error) => {
      console.error('There seems to be an error fetching Canyon website -', error);
    });
});
