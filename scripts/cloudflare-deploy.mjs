/**
 * Cloudflare Workers Builds entrypoint.
 * Dashboard deploy command: npm run deploy:cloudflare
 *
 * Wrangler runs `npm run build` once via wrangler.toml [build] — do not call build here
 * or CI runs ffmpeg/sharp twice and can OOM or time out with almost no logs.
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')

function log(message) {
  console.log(`[deploy] ${message}`)
}

function run(command, args) {
  log(`$ ${command} ${args.join(' ')}`)
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  })
  if (result.status !== 0) {
    log(`Command failed with exit code ${result.status ?? 1}`)
    process.exit(result.status ?? 1)
  }
}

log('Starting Cloudflare deploy pipeline')

if (!existsSync(join(root, 'node_modules', 'wrangler'))) {
  log('Installing dependencies (npm ci)')
  run('npm', ['ci'])
}

const wranglerBin = join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js')
if (existsSync(wranglerBin)) {
  log('Uploading Worker + ./dist (wrangler.toml [build] runs npm run build)')
  run(process.execPath, [wranglerBin, 'deploy'])
} else {
  log('Uploading via npx wrangler deploy')
  run('npx', ['wrangler', 'deploy'])
}

log('Deploy finished successfully')
