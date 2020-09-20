const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');

const allWords = [];

async function app() {
  // TODO: get all 4884 pages
  const pageText = await getPage(1);
  const pageWords = parseText(pageText);

  // TODO: concat arrays for all pages into one
  // TODO: remove words with 1 and 2 letters
}

async function getPage(page = 1) {
  const url = `https://fran.si/iskanje?page=${page}&FilteredDictionaryIds=133&View=1&Query=*`;
  const response = await fetch(url).catch(e => console.log('fetch error', e));
  const text = await response.text();

  return text;
}

function parseText(text) {
  const wordsArray = [];

  const $ = cheerio.load(text, { decodeEntities: false });
  $('.entry-content').each((i, el) => {
    const word = $(el).children('.font_xlarge').children('a').html();
    $(el).find('.entry-citation').remove();

    // TODO: parse content
    const wordObj = { id: i, word, content: $(el).html().replace(/\s\s+/g, '') };
    console.log(wordObj);
  });

  // TODO: save to array and return
}

function saveToJSON() {
  // TODO: normalize data
  // TODO: save data to a json file
}

app();
