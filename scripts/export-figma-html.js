/* Export every rendered GymFlow screen to standalone, script-free HTML snapshots. */
const fs = require('fs');
const path = require('path');
const http = require('http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'figma-html');
const css = ['css/styles.css', 'css/components.css', 'css/screens.css']
  .map(file => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n\n');

const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const target = path.resolve(root, pathname === '/' ? 'index.html' : `.${pathname}`);
  if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) { res.writeHead(404); return res.end('Not found'); }
  res.setHeader('Content-Type', mime[path.extname(target)] || 'application/octet-stream');
  fs.createReadStream(target).pipe(res);
});

const roleOf = screen => screen === 'login' ? 'common' : ['admin','receptionist','cashier','pt','equipment','member'].find(role => screen.startsWith(`${role}-`)) || 'common';
const titleOf = name => name.replace(/-/g, ' ').replace(/\b\w/g, x => x.toUpperCase());
const slug = value => value.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');

const variants = [
  { screen:'admin-package-form', suffix:'add', params:{} },
  { screen:'admin-package-form', suffix:'edit-g02', params:{id:'G02'} },
  { screen:'equipment-form', suffix:'add', params:{} },
  { screen:'equipment-form', suffix:'edit-tb001', params:{id:'TB001'} },
  ...[1,2,3,4,5].map(step => ({ screen:'cashier-create-payment', suffix:`step-${step}`, params:{}, after:`GF.cashierPayment.step=${step};if(${step}>=4)GF.cashierPayment.method='vnpay';GF.renderCashierPayment()` })),
  ...[1,2,3,4].map(step => ({ screen:'receptionist-membership-form', suffix:`step-${step}`, params:{}, before:`GF.receptionReg={step:${step},member:'MV001',packageId:'G02',card:'qr'}`, after:`GF.receptionReg.step=${step};GF.renderReceptionRegistration()` })),
  ...['general','hours','notifications','payments','security'].map(tab => ({ screen:'admin-settings', suffix:tab, params:{tab} })),
  { screen:'member-home', suffix:'qr-modal', params:{}, after:'GF.openMemberQR()', keepModal:true },
  { screen:'member-home', suffix:'notifications', params:{}, after:'GF.showNotifications()', keepModal:true }
];

async function cleanAndSerialize(page, keepModal, keepAuth) {
  await page.evaluate(({ css, keepModal, keepAuth }) => {
    document.querySelectorAll('script').forEach(x => x.remove());
    document.querySelectorAll('link[rel="stylesheet"][href^="css/"]').forEach(x => x.remove());
    const style = document.createElement('style');
    style.setAttribute('data-gymflow-bundled-css', 'true');
    style.textContent = css;
    document.head.append(style);
    if (!keepAuth) document.getElementById('auth-screen')?.remove();
    document.getElementById('toast-root')?.remove();
    if (!keepModal) {
      document.getElementById('modal-root')?.remove();
      document.getElementById('modal-backdrop')?.remove();
    }
    document.querySelectorAll('[onclick]').forEach(x => x.removeAttribute('onclick'));
    document.documentElement.setAttribute('data-figma-export', 'true');
  }, { css, keepModal, keepAuth });
  return page.content();
}

async function main() {
  fs.rmSync(output, { recursive:true, force:true });
  fs.mkdirSync(output, { recursive:true });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const browser = await chromium.launch({ headless:true, executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage({ viewport:{ width:1440, height:1024 } });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil:'networkidle' });
  const screens = await page.evaluate(() => Object.keys(GF.screens));
  const baseItems = screens.filter(screen => screen !== 'login').map(screen => ({ screen, suffix:'', params:{} }));
  const items = [{ screen:'login', suffix:'', params:{}, role:'common' }, ...baseItems, ...variants];
  const catalog = [];

  for (const item of items) {
    const role = item.role || roleOf(item.screen);
    await page.goto(`http://127.0.0.1:${port}/`, { waitUntil:'domcontentloaded' });
    await page.waitForFunction(() => window.GF && window.GF.screens);
    if (item.screen === 'login') {
      await page.evaluate(() => { GF.logout(); GF.screens.login(); });
    } else {
      await page.evaluate(({ role, screen, params, before }) => {
        GF.login(role);
        if (before) Function(before)();
        GF.navigate(screen, params || {});
      }, { role, screen:item.screen, params:item.params, before:item.before || '' });
      if (item.after) await page.evaluate(code => Function(code)(), item.after);
    }
    await page.waitForTimeout(80);
    const html = await cleanAndSerialize(page, !!item.keepModal, item.screen === 'login');
    const folder = path.join(output, role);
    fs.mkdirSync(folder, { recursive:true });
    const baseName = `${item.screen}${item.suffix ? `-${item.suffix}` : ''}`;
    const fileName = `${slug(baseName)}.html`;
    fs.writeFileSync(path.join(folder, fileName), html, 'utf8');
    catalog.push({ role, name:titleOf(baseName), href:`${role}/${fileName}` });
  }

  const groups = [...new Set(catalog.map(x => x.role))];
  const index = `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>GymFlow – Figma HTML Export</title><style>body{font-family:Inter,Arial,sans-serif;margin:0;padding:40px;background:#f1f5f9;color:#0f172a}h1{margin:0 0 8px}p{color:#64748b}.group{margin-top:32px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}.item{display:block;padding:16px;background:white;border:1px solid #e2e8f0;border-radius:10px;color:#2563eb;text-decoration:none;font-weight:600}.item:hover{border-color:#2563eb;box-shadow:0 6px 18px #2563eb18}</style></head><body><h1>GymFlow – HTML tĩnh dành cho Figma</h1><p>${catalog.length} file độc lập · Kích thước thiết kế 1440 × 1024</p>${groups.map(role => `<section class="group"><h2>${role.toUpperCase()}</h2><div class="grid">${catalog.filter(x => x.role===role).map(x => `<a class="item" href="${x.href}">${x.name}</a>`).join('')}</div></section>`).join('')}</body></html>`;
  fs.writeFileSync(path.join(output, 'index.html'), index, 'utf8');
  fs.writeFileSync(path.join(output, 'README.txt'), `GYMFLOW – HTML TĨNH DÀNH CHO FIGMA\n\n1. Mở index.html để xem danh sách toàn bộ màn hình.\n2. Mỗi file HTML là một snapshot độc lập, không chứa JavaScript.\n3. CSS GymFlow đã được nhúng trực tiếp vào từng file.\n4. Có thể kéo file vào html.to.design/html.io hoặc mở file rồi capture.\n5. Font Inter và Bootstrap Icons được tải qua CDN, vì vậy nên giữ kết nối Internet khi import.\n6. Chạy scripts\\export-figma-html.ps1 từ thư mục dự án để tái xuất sau khi giao diện thay đổi.\n`, 'utf8');
  await browser.close();
  server.close();
  console.log(`Exported ${catalog.length} standalone HTML files to ${output}`);
}

main().catch(error => { console.error(error); server.close(); process.exit(1); });
