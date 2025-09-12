import puppeteer from "puppeteer";
import fs from "fs";

import { links } from "./config/links.js";

const BUTTON_SELECTOR_INITIALS = [
  "._aswp._aswr._asws._aswu._asw_._asx2",
  "._aswp._aswr._aswu._asw_._asx2",
];

const BUTTON_SELECTOR_FINALS = [
  "._aswp._aswr._asws._aswv._asw_._asx2",
  "._aswp._aswr._aswv._asw_._asx2",
];

let startIndex = process.argv[2] ? parseInt(process.argv[2], 10) : 0;
let maxFollows = process.argv[3] ? parseInt(process.argv[3], 10) : 75;

if (isNaN(startIndex) || startIndex < 0 || startIndex >= links.length) {
  console.error(
    `❌ Índice inicial inválido! Digite um valor entre 0 e ${links.length - 1}.`
  );
  process.exit(1);
}

if (isNaN(maxFollows) || maxFollows <= 0) {
  console.error(`❌ Limite inválido! Digite um número maior que 0.`);
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function randomDelay() {
  const delay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
  console.log(`⏳ Esperando ${delay / 1000}s antes do próximo follow...`);
  await sleep(delay);
}

async function processLink(browser, url, index) {
  console.log(`➡️ [${index}] Acessando: ${url}`);
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  console.log("🔎 Procurando botão inicial...");
  const button = await Promise.race(
    BUTTON_SELECTOR_INITIALS.map((selector) =>
      page.waitForSelector(selector, { visible: true }).then(() => selector)
    )
  );

  console.log("🔘 Clicando no botão...");
  await page.click(button);

  console.log("⏳ Aguardando a troca de classe...");
  await Promise.race(
    BUTTON_SELECTOR_FINALS.map((selector) =>
      page.waitForSelector(selector, { visible: true })
    )
  );

  console.log(`✅ Botão concluiu no link [${index}]! Fechando a aba...`);
  await page.close();

  await randomDelay();
}

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    userDataDir: "userDataDir",
  });

  let count = 0;
  let lastIndex = startIndex;

  try {
    for (let i = startIndex; i < links.length; i++) {
      if (count >= maxFollows) {
        console.log(
          `🚦 Limite de ${maxFollows} follows atingido nesta execução.`
        );
        lastIndex = i - 1;
        break;
      }
      await processLink(browser, links[i], i);
      lastIndex = i;
      count++;
    }

    console.log("🎉 Execução concluída!");

    const logData = {
      startedAt: startIndex,
      executed: count,
      lastIndex: lastIndex,
      nextStart: lastIndex + 1,
      totalLinks: links.length,
      status: "success",
      date: new Date().toISOString(),
    };

    fs.writeFileSync("src/logs/process.json", JSON.stringify(logData, null, 2));
    console.log("📝 Log salvo em process.json:", logData);
  } catch (err) {
    console.error("❌ Erro durante a execução:", err.message);

    const logData = {
      startedAt: startIndex,
      executed: count,
      lastIndex: lastIndex,
      nextStart: lastIndex + 1,
      totalLinks: links.length,
      status: "error",
      error: err.message,
      date: new Date().toISOString(),
    };

    fs.writeFileSync("src/logs/process.json", JSON.stringify(logData, null, 2));
    console.log("📝 Log de erro salvo em process.json:", logData);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
