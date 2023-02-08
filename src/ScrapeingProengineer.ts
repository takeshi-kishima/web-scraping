import puppeteer from "puppeteer";

export const scrapeingProengineer = async () => {
  const browser = await puppeteer.launch();

  const url =
    "https://suumo.jp/jj/chintai/ichiran/FR301FC001/?ar=090&bs=040&ta=40&sc=40135&sc=40137&cb=0.0&ct=9999999&et=9999999&cn=9999999&mb=0&mt=9999999&shkr1=03&shkr2=03&shkr3=03&shkr4=03&fw2=&srch_navi=1/";
  const target =
    ".js-cassette_link > td:nth-of-type(4) > ul > li > span > span";

  const page = await browser.newPage();

  await Promise.all([
    page.waitForNavigation(), //← この辺重要っぽい
    page.goto(url, { waitUntil: "domcontentloaded" }),
    page.waitForSelector(target), //← この辺重要っぽい
    // ↑ https://stackoverflow.com/questions/55877263/puppeteer-execution-context-was-destroyed-most-likely-because-of-a-navigation
    // この記事見た
  ]);

  // 取得
  const links = await page.$$eval(
    target, 
    links => links.map(link => link.innerText)
  );

  // 一覧で出力しブラウザを閉じる
  links.forEach(item =>console.log(item));
  browser.close();
};
