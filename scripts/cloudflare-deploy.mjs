/**
 * Cloudflare Workers Builds: run install + Astro build + wrangler deploy.
 * Dashboard deploy command: npm run deploy:cloudflare
 */
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..')

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  })
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

if (!existsSync(join(root, 'node_modules'))) {
  run('npm', ['ci'])
}

run('npm', ['run', 'build'])

const wranglerBin = join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js')
if (existsSync(wranglerBin)) {
  run(process.execPath, [wranglerBin, 'deploy'])
} else {
  run('npx', ['wrangler', 'deploy'])
}
