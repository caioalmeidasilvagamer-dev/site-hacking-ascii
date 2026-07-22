import { PNG } from "pngjs";
import fs from "fs";
import path from "path";

const WIDTH = 1200;
const HEIGHT = 630;

const png = new PNG({ width: WIDTH, height: HEIGHT });

// Fill with black
for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    const idx = (WIDTH * y + x) << 2;
    png.data[idx] = 0;     // R
    png.data[idx + 1] = 0; // G
    png.data[idx + 2] = 0; // B
    png.data[idx + 3] = 255; // A
  }
}

// Draw subtle code rain vertical lines (green streaks)
const streaks = [];
for (let i = 0; i < 40; i++) {
  streaks.push({
    x: Math.floor(Math.random() * WIDTH),
    startY: Math.floor(Math.random() * HEIGHT * 0.3),
    length: 40 + Math.floor(Math.random() * 120),
    alpha: 15 + Math.floor(Math.random() * 25),
  });
}

for (const s of streaks) {
  for (let dy = 0; dy < s.length; dy++) {
    const y = s.startY + dy;
    if (y >= HEIGHT) break;
    const idx = (WIDTH * y + s.x) << 2;
    const fade = 1 - dy / s.length;
    png.data[idx] = 0;
    png.data[idx + 1] = Math.floor(255 * fade * (s.alpha / 40));
    png.data[idx + 2] = Math.floor(65 * fade * (s.alpha / 40));
    png.data[idx + 3] = 255;
  }
}

// Draw "THE MATRIX" title text using pixel-art block characters
function drawPixelChar(char, offsetX, offsetY, scale, r, g, b) {
  const chars = {
    T: [
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
    ],
    H: [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    E: [
      [1,1,1,1,1],
      [1,0,0,0,0],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,1,1,1,1],
    ],
    M: [
      [1,0,0,0,1],
      [1,1,0,1,1],
      [1,0,1,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    A: [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    T2: [
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
    ],
    R: [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,1,1,1,0],
      [1,0,0,1,0],
      [1,0,0,0,1],
    ],
    I: [
      [1,1,1,1,1],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [1,1,1,1,1],
    ],
    X: [
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,0,1,0,0],
      [0,1,0,1,0],
      [1,0,0,0,1],
    ],
  };

  const bitmap = chars[char];
  if (!bitmap) return;

  for (let row = 0; row < bitmap.length; row++) {
    for (let col = 0; col < bitmap[row].length; col++) {
      if (bitmap[row][col]) {
        for (let sy = 0; sy < scale; sy++) {
          for (let sx = 0; sx < scale; sx++) {
            const px = offsetX + col * scale + sx;
            const py = offsetY + row * scale + sy;
            if (px < WIDTH && py < HEIGHT) {
              const idx = (WIDTH * py + px) << 2;
              png.data[idx] = r;
              png.data[idx + 1] = g;
              png.data[idx + 2] = b;
              png.data[idx + 3] = 255;
            }
          }
        }
      }
    }
  }
}

// Draw "THE" on first line
const titleY = 180;
const pixelSize = 8;
const charWidth = 5 * pixelSize + 12; // 5 pixels wide + spacing

const theStartX = Math.floor((WIDTH - 3 * charWidth) / 2);
drawPixelChar("T", theStartX, titleY, pixelSize, 0, 255, 102);
drawPixelChar("H", theStartX + charWidth, titleY, pixelSize, 0, 255, 102);
drawPixelChar("E", theStartX + 2 * charWidth, titleY, pixelSize, 0, 255, 102);

// Draw "MATRIX" on second line
const matrixY = titleY + 5 * pixelSize + 40;
const matrixChars = ["M", "A", "T2", "R", "I", "X"];
const matrixStartX = Math.floor((WIDTH - matrixChars.length * charWidth) / 2);
matrixChars.forEach((ch, i) => {
  drawPixelChar(ch, matrixStartX + i * charWidth, matrixY, pixelSize, 0, 255, 102);
});

// Draw tagline
function drawSmallPixelText(text, startX, startY, scale, r, g, b) {
  const smallChars = {
    W: [[1,0,0,0,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,0,1,0]],
    a: [[0,0,0,0,0],[0,1,1,1,0],[1,0,0,1,1],[1,0,0,1,1],[0,1,1,1,0]],
    t: [[0,1,0,0,0],[1,1,1,1,0],[0,1,0,0,0],[0,1,0,0,0],[0,0,1,1,0]],
    h: [[1,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
    i: [[0,1,0,0,0],[0,0,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0]],
    f: [[0,0,1,1,0],[0,1,0,0,0],[1,1,1,0,0],[0,1,0,0,0],[0,1,0,0,0]],
    d: [[0,0,0,1,0],[0,1,1,1,0],[1,0,0,1,1],[1,0,0,1,1],[0,1,1,1,0]],
    e: [[0,0,0,0,0],[0,1,1,1,0],[1,1,1,1,1],[1,0,0,0,0],[0,1,1,1,0]],
    w: [[0,0,0,0,0],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,0,1],[0,1,0,1,0]],
    o: [[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
    r: [[0,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,0],[1,0,0,0,0]],
    l: [[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,0,1,1,0]],
    n: [[0,0,0,0,0],[1,0,1,1,0],[1,1,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
    y: [[0,0,0,0,0],[1,0,0,1,0],[1,0,0,1,0],[0,1,1,1,0],[0,0,0,1,0]],
    u: [[0,0,0,0,0],[1,0,0,1,1],[1,0,0,1,1],[1,0,0,1,1],[0,1,1,0,1]],
    k: [[1,0,0,0,0],[1,0,0,1,0],[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
    c: [[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,0],[1,0,0,0,0],[0,1,1,1,0]],
    s: [[0,0,0,0,0],[0,1,1,1,0],[1,1,1,0,0],[0,0,1,1,0],[1,1,1,0,0]],
    g: [[0,0,0,0,0],[0,1,1,1,0],[1,0,0,1,0],[0,1,1,1,0],[0,0,0,1,0]],
    " ": [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
    "1": [[0,0,1,0,0],[0,1,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,1,1,1,0]],
    "9": [[0,1,1,1,0],[1,0,0,1,1],[0,1,1,1,0],[0,0,0,1,0],[0,1,1,0,0]],
    "92": [[0,1,1,1,0],[1,0,0,1,1],[0,1,1,1,0],[0,0,0,1,0],[0,1,1,0,0]],
  };

  let x = startX;
  for (const ch of text.toLowerCase()) {
    const bitmap = smallChars[ch] || smallChars[" "];
    for (let row = 0; row < bitmap.length; row++) {
      for (let col = 0; col < bitmap[row].length; col++) {
        if (bitmap[row][col]) {
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              const px = x + col * scale + sx;
              const py = startY + row * scale + sy;
              if (px < WIDTH && py < HEIGHT) {
                const idx = (WIDTH * py + px) << 2;
                png.data[idx] = r;
                png.data[idx + 1] = g;
                png.data[idx + 2] = b;
                png.data[idx + 3] = 255;
              }
            }
          }
        }
      }
    }
    x += 5 * scale + 4;
  }
}

const taglineY = matrixY + 5 * pixelSize + 50;
const tagline = "what if the world you know is only code?";
const taglineWidth = tagline.length * (5 * 4 + 4);
const taglineStartX = Math.floor((WIDTH - taglineWidth) / 2);
drawSmallPixelText(tagline, taglineStartX, taglineY, 4, 185, 204, 181);

// Draw border lines (subtle green)
for (let x = 40; x < WIDTH - 40; x++) {
  // Top line
  let idx = (WIDTH * 30 + x) << 2;
  png.data[idx] = 0; png.data[idx + 1] = 255; png.data[idx + 2] = 102; png.data[idx + 3] = 40;
  // Bottom line
  idx = (WIDTH * (HEIGHT - 31) + x) << 2;
  png.data[idx] = 0; png.data[idx + 1] = 255; png.data[idx + 2] = 102; png.data[idx + 3] = 40;
}

// Draw corner brackets
function drawBracket(cx, cy, size, r, g, b) {
  for (let i = 0; i < size; i++) {
    // Horizontal
    for (let dx = 0; dx < 3; dx++) {
      let idx = (WIDTH * cy + cx + dx) << 2;
      if (cx + dx < WIDTH && cy < HEIGHT) {
        png.data[idx] = r; png.data[idx + 1] = g; png.data[idx + 2] = b; png.data[idx + 3] = 180;
      }
    }
    // Vertical
    let idx = (WIDTH * (cy + i) + cx) << 2;
    if (cx < WIDTH && cy + i < HEIGHT) {
      png.data[idx] = r; png.data[idx + 1] = g; png.data[idx + 2] = b; png.data[idx + 3] = 180;
    }
  }
}

// Top-left
drawBracket(30, 20, 15, 0, 255, 102);
// Top-right
drawBracket(WIDTH - 45, 20, 15, 0, 255, 102);
// Bottom-left
drawBracket(30, HEIGHT - 35, 15, 0, 255, 102);
// Bottom-right
drawBracket(WIDTH - 45, HEIGHT - 35, 15, 0, 255, 102);

const outPath = path.resolve("public/og-preview.png");
const buffer = PNG.sync.write(png);
fs.writeFileSync(outPath, buffer);
console.log(`OG image generated: ${outPath} (${WIDTH}x${HEIGHT})`);
