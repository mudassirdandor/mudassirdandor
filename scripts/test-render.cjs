const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const testHtml = path.join(__dirname, 'test.html');
const testPng = path.join(__dirname, 'test.png');

fs.writeFileSync(testHtml, `<!DOCTYPE html>
<html>
<body style="margin:0; background:transparent;">
  <span style="font-family: monospace; font-size: 13px; color: #69756D;">mudassirdandor.vercel.app</span>
</body>
</html>`);

execSync(`"${chromePath}" --headless --screenshot="${testPng}" --default-background-color=00000000 "${testHtml}"`);

console.log('Rendered test.png, exists:', fs.existsSync(testPng), 'size:', fs.statSync(testPng).size);
