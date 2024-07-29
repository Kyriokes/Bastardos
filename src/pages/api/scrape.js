import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';

export default async function handler(req, res) {
  try {
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto('https://www.battlemetrics.com/servers/dayz/24163199', {
      waitUntil: 'networkidle2', // Ensures the page is fully loaded
    });

    await page.waitForSelector('.dl-horizontal', { timeout: 60000 }); // Increase timeout to 60 seconds

    const info = await page.evaluate(() => {
      const items = document.getElementsByTagName('dd');
      return Array.from(items).map(item => item.textContent.trim());
    });

    await browser.close();
    
    res.status(200).json({ info });
  } catch (error) {
    console.error('Scraping failed', error);
    res.status(500).json({ error: 'Failed to scrape data', details: error.message });
  }
}
