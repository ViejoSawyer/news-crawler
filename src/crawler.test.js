import crawler from './crawler';

describe('Testing crawler', () => {
  test('Get exactly 30 results', async () => {
    const news = await crawler.news.list('https://news.ycombinator.com');
    expect(news.length).toBe(30);
  });
});
