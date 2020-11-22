const fetch = require('isomorphic-fetch');
const cheerio = require('cheerio');

const allWords = [];

async function app() {
  // TODO: get all 4884 pages
  const pageText = await getPage(1);
  const pageWords = parseText(pageText);
  console.log(pageWords);

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
  let wordsArray = [];

  const $ = cheerio.load(text, { decodeEntities: false });

  $('.entry-content').each((i, el) => {
    // const type = $(el).children('span[data-group=header]');
    const type = $('[data-group=header] span .font_small', $(el)).attr('title');
    const word = $(el).children('.font_xlarge').children('a').html();

    $(el).find('.entry-citation').remove();

    // console.log(word);
    // console.log(type);
    // console.log('\n###############################################\n');

    // TODO: parse content
    wordsArray = [
      ...wordsArray,
      {
        id: i,
        word,
        type,
        content: $(el).html().replace(/\s\s+/g, '')
      }
    ];
  });

  return wordsArray.filter(item => !!item.type && item.word.length > 2);
}

function saveToJSON() {
  // TODO: normalize data
  // TODO: save data to a json file
}

app();
