const request = require('request-promise');
const cheerio = require('cheerio');

async function getNews(uri) {
  const $ = await request({
    // uri: 'https://cors-anywhere.herokuapp.com/https://news.ycombinator.com',
    uri: uri,
    transform: (tbody) => cheerio.load(tbody),
  });
  const news = [];
  $('tr.athing').each((i, el) => {
    const elementOfNews = {
      rank: getNumber($(el).children().find('span.rank').text()),
      title: $(el).children().find('a.storylink').text(),
      url: $(el).children().find('a.storylink').attr('href'),
      points: getNumber($(el).next().children().find('span.score').text()),
      comments: getNumber($(el).next().children().find('a').last().text()),
    };
    news.push(elementOfNews);
  });
  return news;
}

function getNumber(str) {
  const number = str.replace(/[^0-9 ]/g, '').trim();
  return number.length === 0 ? 0 : parseInt(number);
}

const crawler = {
  news: {
    list(uri) {
      return getNews(uri);
    },
  },
};

export default crawler;
