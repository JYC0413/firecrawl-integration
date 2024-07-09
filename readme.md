# How to run Firecrawl convert web to Markdown

## 1. Clone the project and install dependencies

```bash
git clone https://github.com/JYC0413/firecrawl-integration.git
cd firecrawl-integration
npm install
```

## 2. Modify environment variables to add your FireCrawl key
You can get this key from [FireCrawl API keys page](https://www.firecrawl.dev/app/api-keys).

```bash
vi .env
FIRECRAWL_KEY=your firecrawl key
```

## 3. Run crawlWebToMd.js

```bash
node crawlWebToMd.js
```
![img.png](public/crawlAllWeb.png)
Follow the prompts to enter the URL you want to convert and the quantity limit.

![img_1.png](public/scrapeSingleWeb.png)
If you provide a URL that does not end with /, we will assume that you only want to convert this page to Markdown

![img.png](public/noLimit.png)
_Note:_ `If you want to crawl the entire website, your usage may be consumed quickly or may not be sufficient. I recommend setting a very small value, such as 10, if you just want to try out this feature and do not have an actual need.`

After that, you will get the result.