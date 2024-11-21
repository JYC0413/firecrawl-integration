import FirecrawlApp from '@mendable/firecrawl-js';
import * as dotenv from "dotenv";
import {promises as fs} from 'fs';
import readline from 'node:readline/promises';
import {stdin as input, stdout as output} from "process";

dotenv.config();

const app = new FirecrawlApp({apiKey: process.env.FIRECRAWL_KEY});
const rl = readline.createInterface({input, output});

async function saveMarkdown(mdContent, titleList, filePath) {
    try {
        await fs.writeFile(filePath, mdContent, 'utf8');
        titleList.map(title => {
            console.log(`Markdown file——"${title}" has been saved to: ${filePath}`);
        })
    } catch (error) {
        console.error('Error saving Markdown file:', error);
    }
}

const url = await rl.question("The link to the website you want to convert to md(If you want to crawl more than a single page, end with /, like https://docs.gaianet.ai/): ");
let limit
let scrapeResult
if (url && url.endsWith("/")) {
    limit = await rl.question("Crawl limit(default value is no limit, maybe will use up a lot of your usage): ");
    scrapeResult = await app.crawlUrl(url, {
        crawlerOptions: {
            excludes: [], includes: [], limit: limit ? limit : 500
        },
    }, true, 2);
} else {
    const res = await app.scrapeUrl(url);
    scrapeResult = {0: res.data}
}

// Scrape a website:

console.log("total crawl " + Object.values(scrapeResult).length + " page")
let allMdData
let titleList = []
Object.values(scrapeResult).map(data => {
    allMdData += data.markdown
    titleList.push(data.metadata.title)
})
await saveMarkdown(allMdData, titleList, "output.md")

rl.close()