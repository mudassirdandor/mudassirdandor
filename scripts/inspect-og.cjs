const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ogPath = path.join(__dirname, '../public/images/og-portfolio.png');
const buf = fs.readFileSync(ogPath);

let pos = 8;
const idatChunks = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
  pos += 12 + len;
}

const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const width = 1200;
const height = 630;
const stride = 1 + width * 3;
const rgb = Buffer.alloc(width * height * 3);

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

for (let y = 0; y < height; y++) {
  const filterType = raw[y * stride];
  const rowStart = y * stride + 1;
  const outRowStart = y * width * 3;

  for (let x = 0; x < width * 3; x++) {
    const rawByte = raw[rowStart + x];
    const a = x >= 3 ? rgb[outRowStart + x - 3] : 0;
    const b = y > 0 ? rgb[(y - 1) * width * 3 + x] : 0;
    const c = (x >= 3 && y > 0) ? rgb[(y - 1) * width * 3 + x - 3] : 0;

    let val = 0;
    if (filterType === 0) val = rawByte;
    else if (filterType === 1) val = (rawByte + a) & 0xff;
    else if (filterType === 2) val = (rawByte + b) & 0xff;
    else if (filterType === 3) val = (rawByte + Math.floor((a + b) / 2)) & 0xff;
    else if (filterType === 4) val = (rawByte + paethPredictor(a, b, c)) & 0xff;
    rgb[outRowStart + x] = val;
  }
}

// Print ASCII art of the text region (y=74 to 90, x=910 to 1130)
console.log('Text representation:');
for (let y = 75; y <= 89; y++) {
  let line = `${y.toString().padStart(3, ' ')}: `;
  for (let x = 910; x <= 1130; x++) {
    const idx = (y * width + x) * 3;
    const r = rgb[idx], g = rgb[idx+1], b = rgb[idx+2];
    // check distance from bg #f5f7f4
    const dist = Math.abs(r - 245) + Math.abs(g - 247) + Math.abs(b - 244);
    if (dist > 60) {
      line += '#';
    } else if (dist > 25) {
      line += '.';
    } else {
      line += ' ';
    }
  }
  console.log(line);
}
