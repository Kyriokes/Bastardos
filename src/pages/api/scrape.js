import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto('https://www.battlemetrics.com/servers/dayz/24163199');

    // Increase the timeout to 60 seconds
    await page.waitForSelector('.dl-horizontal');

    // Evaluate the page to get the data from <dd> elements
    const info = await page.evaluate(() => {
      const items = document.getElementsByTagName('dd');
      // Convert HTMLCollection to an array and map the text content of each <dd> element
      return Array.from(items).map(item => item.textContent.trim());
    });

    // console.log(info);
    await browser.close();
    
    res.status(200).json({ info });
  } catch (error) {
    console.error('Scraping failed', error);
    res.status(500).json({ error: 'Failed to scrape data', details: error.message });
  }
}
