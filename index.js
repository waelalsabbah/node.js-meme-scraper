// scraper.js
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

async function scrapeMemes() {
  try {
    const response = await axios.get(
      'https://memegen-link-examples-upleveled.netlify.app/',
    );
    const $ = cheerio.load(response.data);

    // Use jQuery-like selectors to target meme elements on the page.
    $('.meme').each((index, element) => {
      const memeTitle = $(element).find('.title').text();
      const memeImage = $(element).find('img').attr('src');
      console.log(`Title: ${memeTitle}`);
      console.log(`Image URL: ${memeImage}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

scrapeMemes();
const imageUrls = [
  'https://memecomplete.com/share/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg%3Ftoken%3Dssyd6kbg2u4zwlfyygke',
  'https://memecomplete.com/share/images/xy/all_the_things!!!.jpg%3Ftoken%3Dmkgkyxhlx9jeb0uddvzt',
  'https://memecomplete.com/share/images/bs/what_a_surprise.../you_caught_me_again.jpg%3Ftoken%3D2cfiv0ec9z941qk33lpj',
  'https://memecomplete.com/share/images/cb/i_stole/the_pic--i--nic_basket.jpg%3Ftoken%3Dc2tvhvzif4e96vp88quo',
  'https://memecomplete.com/share/images/fa/forever/alone.jpg%3Ftoken%3D21ltcdh0tz941qk33lpj',
  'https://memecomplete.com/share/images/grumpycat/i_hope_that_what_does_not_kill_you/tries_again.jpg%3Ftoken%3Dcvmsyj2264e96vp88quo',
  'https://memecomplete.com/share/images/keanu.jpg%3Ftoken%3D63hyw12ga1b63sm55nrl',
  'https://memecomplete.com/share/images/sb/remembers_the_face/but_not_the_name.jpg%3Ftoken%3Dgl2e5d69m6gb8xraaswq',
  'https://memecomplete.com/share/images/jd/disregard_females/acquire_currency.jpg%3Ftoken%3Ds05ug25x7u4zwlfyygke',
  'https://memecomplete.com/share/images/iw/does_testing/in_production.jpg%3Ftoken%3D84ra3q0j62c74tn66osm',
];
const downloadDir = './downloads';
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}
async function downloadImage(url, filename) {
  try {
    const response = await axios.get(url, { responseType: 'stream' });
    const imagePath = path.join(downloadDir, filename);
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading image ${filename}:`, error);
  }
}
(async () => {
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    const paddedIndex = String(i + 1).padStart(2, '0');
    const filename = `${paddedIndex}.jpg`;
    await downloadImage(imageUrl, filename);
    console.log(`Downloaded ${filename}`);
  }
})();
