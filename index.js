const chalk = require('chalk');
const cheerio = require('cheerio')
const http = require('superagent');
let china = "国内访问IP: "
let notGfwOversea = "访问没有被封的国外网站的IP: "
let overseaIP = "访问海外网站的IP: "

!async function () {
  let repeatCount = 3
  const itv = setInterval(() => {
    if (repeatCount >= 15) { repeatCount = 3; };
    console.log('\x1B[2J\x1B[3J\x1B[H')
    console.log(chalk.greenBright(`正在查询中${'.'.repeat(repeatCount++)}`));
  }, 200)
  china += await getChinaIp();
  notGfwOversea += await getNotGfwIp();
  overseaIP += await getOverseaIp();
  clearInterval(itv)
  console.log('\x1B[2J\x1B[3J\x1B[H')
  console.log(`${chalk.dim('查询结果:')} 
  ${chalk.redBright(china)}
  ${chalk.cyanBright(notGfwOversea)}
  ${chalk.greenBright(overseaIP)}`)
}()

async function getChinaIp() {
  const { status, text } = await http('http://ip111.cn')
  if (status === 200) {
    const $ = cheerio.load(text)
    return $('.card-body').eq(0).find('p:first-child').text().trim();
  }
  return "暂时未查到"
}

async function getNotGfwIp() {
  const { status, text } = await http('http://45.32.164.128/ip.php')
  if (status === 200) {
    const $ = cheerio.load(text)
    return $('body').text().trim();
  }
  return "暂时未查到"
}

async function getOverseaIp() {
  const { status, text } = await http('http://sspanel.net/ip.php')
  if (status === 200) {
    const $ = cheerio.load(text)
    return $('body').text().trim();
  }
  return "暂时未查到"
}