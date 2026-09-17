import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const require = createRequire(import.meta.url)
const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const ogDir = join(root, 'public', 'og')
const mediaDir = join(root, 'public', 'media')
const videoDir = join(root, 'public', 'videos')
const cheatDir = join(root, 'source-media', 'cheat')

await Promise.all([
  mkdir(ogDir, { recursive: true }),
  mkdir(mediaDir, { recursive: true }),
  mkdir(videoDir, { recursive: true }),
])

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function artwork(width, height, eyebrow, title, subtitle, footer = 'apexlegendscheats.org') {
  const titleSize = Math.round(width * 0.066)
  const subtitleSize = Math.round(width * 0.026)
  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#08060f"/>
          <stop offset="0.55" stop-color="#14101f"/>
          <stop offset="1" stop-color="#2a1548"/>
        </linearGradient>
        <radialGradient id="glow">
          <stop stop-color="#b040fb" stop-opacity=".7"/>
          <stop offset="1" stop-color="#b040fb" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="${width * 0.83}" cy="${height * 0.18}" r="${width * 0.34}" fill="url(#glow)"/>
      <circle cx="${width * 0.12}" cy="${height * 0.88}" r="${width * 0.28}" fill="url(#glow)" opacity=".35"/>
      <g transform="translate(${width * 0.075} ${height * 0.12})" fill="#c084fc">
        <path d="M60 60C60 93.1 33.1 120 0 120C0 86.9 26.9 60 60 60ZM60 60C93.1 60 120 86.9 120 120C86.9 120 60 93.1 60 60ZM0 0C33.1 0 60 26.9 60 60C26.9 60 0 33.1 0 0ZM120 0C120 33.1 93.1 60 60 60C60 26.9 86.9 0 120 0Z"/>
      </g>
      <text x="${width * 0.075}" y="${height * 0.47}" fill="#c084fc" font-size="${width * 0.022}" font-family="Arial, sans-serif" font-weight="700" letter-spacing="6">${escapeXml(eyebrow)}</text>
      <text x="${width * 0.075}" y="${height * 0.64}" fill="#ffffff" font-size="${titleSize}" font-family="Arial, sans-serif" font-weight="700">${escapeXml(title)}</text>
      <text x="${width * 0.075}" y="${height * 0.75}" fill="#c9bdd2" font-size="${subtitleSize}" font-family="Arial, sans-serif">${escapeXml(subtitle)}</text>
      <text x="${width * 0.075}" y="${height * 0.9}" fill="#9299a3" font-size="${width * 0.018}" font-family="Arial, sans-serif">${escapeXml(footer)}</text>
    </svg>
  `)
}

function cheatPath(index) {
  return join(cheatDir, `${String(index).padStart(2, '0')}.jpg`)
}

function hasCheatSources() {
  return [1, 2, 3, 4, 5, 6].every((i) => existsSync(cheatPath(i)))
}

async function fromCheat(index, width, height, outPath, format) {
  const input = cheatPath(index)
  let pipeline = sharp(input).rotate().resize(width, height, { fit: 'cover', position: 'centre' })
  if (format === 'webp') {
    pipeline = pipeline.webp({ quality: 76, effort: 4 })
  } else {
    pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true })
  }
  await pipeline.toFile(outPath)
}

async function generatePlaceholderAssets() {
  await Promise.all([
    sharp(
      artwork(
        1200,
        630,
        'WINDOWS PC · LIVE STATUS',
        'Apex Legends Cheats',
        'Player ESP · Radar · Aim Assistance',
      ),
    )
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(join(ogDir, 'apex-legends-cheats.jpg')),
    sharp(
      artwork(
        1440,
        810,
        'PRODUCT DETAILS · WINDOWS PC',
        'Apex Legends ESP & Radar',
        'Features · Compatibility · Current Status',
      ),
    )
      .webp({ quality: 88 })
      .toFile(join(mediaDir, 'apex-legends-product-hero.webp')),
    sharp(
      artwork(
        1000,
        1000,
        'Apex Legends PRODUCT',
        'ESP · Radar · Aim',
        'Check compatibility before access',
      ),
    )
      .webp({ quality: 88 })
      .toFile(join(mediaDir, 'apex-legends-product-cover.webp')),
    sharp(
      artwork(
        1200,
        675,
        'BATTLE ROYALE · WINDOWS PC',
        'Apex Legends Cheats',
        'Player intelligence · Loot · Ranked rotations',
      ),
    )
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(join(mediaDir, 'apex-legends-battle-royale.jpg')),
    sharp(
      artwork(
        1200,
        675,
        'RANKED · BATTLE ROYALE',
        'Apex Legends ESP & Radar',
        'Built for current Steam and EA app builds',
      ),
    )
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(join(mediaDir, 'apex-legends-ranked-squad.jpg')),
    sharp(
      artwork(
        1920,
        1080,
        'RESPAWN · EA · WINDOWS PC',
        'Apex Legends Cheats',
        'Awareness for battle royale and ranked play',
      ),
    )
      .jpeg({ quality: 90, chromaSubsampling: '4:4:4' })
      .toFile(join(mediaDir, 'apex-legends-soldier-hero.jpg')),
  ])
}

async function generateCheatAssets() {
  await Promise.all([
    fromCheat(1, 800, 800, join(mediaDir, 'apex-legends-product-cover.webp'), 'webp'),
    fromCheat(2, 1280, 720, join(mediaDir, 'apex-legends-product-hero.webp'), 'webp'),
    fromCheat(3, 960, 540, join(mediaDir, 'apex-legends-battle-royale.jpg'), 'jpeg'),
    fromCheat(4, 960, 540, join(mediaDir, 'apex-legends-ranked-squad.jpg'), 'jpeg'),
    fromCheat(5, 1280, 720, join(mediaDir, 'apex-legends-soldier-hero.jpg'), 'jpeg'),
    fromCheat(6, 1200, 630, join(ogDir, 'apex-legends-cheats.jpg'), 'jpeg'),
  ])
}

function resolveFfmpeg() {
  try {
    return require('ffmpeg-static')
  } catch {
    return process.env.FFMPEG_PATH || 'ffmpeg'
  }
}

function encodeHeroClip(ff, heroMp4, { start, duration, width, baseName, crfH264, crfVp9 }) {
  const vf = `scale=${width}:-2:flags=lanczos`
  const mp4Out = join(videoDir, `${baseName}.mp4`)
  const webmOut = join(videoDir, `${baseName}.webm`)

  const mp4 = spawnSync(
    ff,
    [
      '-y',
      '-ss',
      String(start),
      '-t',
      String(duration),
      '-i',
      heroMp4,
      '-an',
      '-vf',
      vf,
      '-r',
      '24',
      '-c:v',
      'libx264',
      '-crf',
      String(crfH264),
      '-preset',
      'fast',
      '-movflags',
      '+faststart',
      '-pix_fmt',
      'yuv420p',
      mp4Out,
    ],
    { stdio: 'pipe' },
  )
  if (mp4.status !== 0) return false

  spawnSync(
    ff,
    [
      '-y',
      '-ss',
      String(start),
      '-t',
      String(duration),
      '-i',
      heroMp4,
      '-an',
      '-vf',
      vf,
      '-r',
      '24',
      '-c:v',
      'libvpx-vp9',
      '-crf',
      String(crfVp9),
      '-b:v',
      '0',
      '-row-mt',
      '1',
      '-deadline',
      'good',
      '-cpu-used',
      '4',
      webmOut,
    ],
    { stdio: 'pipe' },
  )
  return true
}

function encodeHeroClips() {
  const heroMp4 = join(videoDir, 'apex-hero.mp4')
  if (!existsSync(heroMp4)) return

  const ff = resolveFfmpeg()
  encodeHeroClip(ff, heroMp4, {
    start: 1,
    duration: 6,
    width: 640,
    baseName: 'apex-card-loop',
    crfH264: 28,
    crfVp9: 36,
  })
  encodeHeroClip(ff, heroMp4, {
    start: 0,
    duration: 8,
    width: 854,
    baseName: 'apex-product-preview',
    crfH264: 28,
    crfVp9: 35,
  })
}

if (hasCheatSources()) {
  await generateCheatAssets()
  console.log('Generated optimized gameplay media from source-media/cheat')
} else {
  await generatePlaceholderAssets()
  console.log('Generated first-party SEO and product artwork (add source-media/cheat/01–06.jpg for gameplay shots)')
}

encodeHeroClips()
