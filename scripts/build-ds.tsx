/**
 * GERADOR DOS PREVIEWS DO DESIGN SYSTEM
 *
 * Lê `src/design-system/catalog.tsx` — a mesma fonte da vitrine em /design-system —
 * e escreve um HTML autocontido por entrada em `ds-preview/`.
 *
 * Autocontido é requisito, não preferência: cada arquivo é aberto isolado pelo
 * Claude Design, sem servidor, sem bundler e sem rede. Todo o CSS vai inline.
 *
 * A primeira linha de cada arquivo carrega `<!-- @dsCard group="…" -->`, que é
 * o que o painel Design System usa para montar o índice de cards.
 *
 * Rode com: pnpm ds:build
 */
import { readdirSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { catalog } from '../src/design-system/catalog'
import '../src/styles/global'
// Síncrono de propósito: no app este módulo é assíncrono, mas aqui o CSS dos
// chunks precisa estar no bundle para poder ser embutido no HTML.
import '../src/styles/fonts-hanzi'

const here = dirname(fileURLToPath(import.meta.url))
const outDir = join(here, '..', 'ds-preview')

/** O CSS emitido por ESTE build — mesma origem do markup, hashes coerentes. */
function readBundledCss(): string {
  const assetsDir = join(here, 'assets')
  const files = readdirSync(assetsDir).filter((f) => f.endsWith('.css'))
  if (files.length === 0) {
    throw new Error(
      'Nenhum CSS emitido. Confirme `build.ssrEmitAssets: true` no vite.config.ts.',
    )
  }
  return files.map((f) => readFileSync(join(assetsDir, f), 'utf8')).join('\n')
}


/* -------------------------------------------------------------------------
 * Embutir fontes
 *
 * Os previews são abertos sem servidor, então `url(/assets/x.woff2)` não
 * resolve. A saída ingênua seria embutir tudo — mas só o Noto Sans SC são 101
 * chunks por peso, mais de 6 MB.
 *
 * Em vez disso: descobrimos quais codepoints o catálogo realmente usa, casamos
 * contra o `unicode-range` de cada @font-face e embutimos só os chunks que
 * cobrem algum deles. O resto do bloco é descartado inteiro.
 * ---------------------------------------------------------------------- */

/** Expande "U+4e00-9fff", "U+131" e "U+4??" para um teste de pertinência. */
function rangeMatches(spec: string, codepoints: Set<number>): boolean {
  for (const raw of spec.split(',')) {
    const token = raw.trim().replace(/^u\+/i, '')
    if (token.includes('?')) {
      const lo = parseInt(token.replace(/\?/g, '0'), 16)
      const hi = parseInt(token.replace(/\?/g, 'f'), 16)
      for (const cp of codepoints) if (cp >= lo && cp <= hi) return true
    } else if (token.includes('-')) {
      const [a, b] = token.split('-')
      const lo = parseInt(a, 16)
      const hi = parseInt(b, 16)
      for (const cp of codepoints) if (cp >= lo && cp <= hi) return true
    } else {
      if (codepoints.has(parseInt(token, 16))) return true
    }
  }
  return false
}

function inlineFonts(
  css: string,
  latin: Set<number>,
  hanzi: Set<number>,
): { css: string; kept: number; dropped: number } {
  const assetsDir = join(here, 'assets')
  let kept = 0
  let dropped = 0

  const out = css.replace(/@font-face\s*\{[^}]*\}/g, (block) => {
    // O Noto também traz cobertura latina, que aqui é desperdício: quem desenha
    // latim é o Inter. Casar o Noto só contra CJK derruba ~170 kB por preview.
    const isCjkFace = /font-family\s*:\s*'?Noto Sans SC/i.test(block)
    const codepoints = isCjkFace ? hanzi : latin

    const range = /unicode-range\s*:\s*([^;}]+)/i.exec(block)
    if (range && !rangeMatches(range[1], codepoints)) {
      dropped++
      return ''
    }

    const woff2 = /url\(([^)]*?\.woff2)\)/i.exec(block)
    if (!woff2) {
      dropped++
      return ''
    }

    const file = join(assetsDir, basename(woff2[1]))
    if (!existsSync(file)) {
      dropped++
      return ''
    }

    const data = readFileSync(file).toString('base64')
    kept++
    // Fica só o woff2 embutido: o .woff de fallback não resolveria mesmo.
    return block.replace(
      /src\s*:\s*[^;}]+/i,
      `src:url(data:font/woff2;base64,${data}) format("woff2")`,
    )
  })

  return { css: out, kept, dropped }
}


/**
 * Mesma lógica das fontes, aplicada a imagem: `src="/assets/x.png"` não resolve
 * num arquivo aberto sem servidor. Aqui o volume é pequeno (um badge), então
 * embute tudo que o markup referenciar.
 */
const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
}

function inlineImages(html: string): { html: string; inlined: number } {
  const assetsDir = join(here, 'assets')
  let inlined = 0

  const out = html.replace(/src="(\/assets\/[^"]+)"/g, (whole, url: string) => {
    const ext = url.slice(url.lastIndexOf('.')).toLowerCase()
    const mime = MIME[ext]
    if (!mime) return whole

    const file = join(assetsDir, basename(url))
    if (!existsSync(file)) return whole

    inlined++
    return `src="data:${mime};base64,${readFileSync(file).toString('base64')}"`
  })

  return { html: out, inlined }
}

/** Envolve o preview sem competir com ele: só respiro e fundo do tema. */
const previewChrome = `
  html { background: var(--surface-page); }
  body { margin: 0; padding: 2.5rem; }
  .ds-preview { max-width: 100%; }
`

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function page(opts: { group: string; title: string; css: string; body: string }): string {
  // A linha do @dsCard vem antes do doctype porque é onde o indexador a procura.
  return `<!-- @dsCard group="${escapeAttr(opts.group)}" -->
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeAttr(opts.title)}</title>
<style>${opts.css}</style>
<style>${previewChrome}</style>
</head>
<body>
<div class="ds-preview">${opts.body}</div>
</body>
</html>
`
}

// 1) Renderiza tudo primeiro — precisamos do texto completo para saber quais
//    chunks de fonte o catálogo exige.
let imagesInlined = 0
const rendered = catalog.map((entry) => {
  const raw = renderToStaticMarkup(entry.render() as ReactElement)
  const { html, inlined } = inlineImages(raw)
  imagesInlined += inlined
  return { entry, body: html }
})

const latinCodepoints = new Set<number>()
const hanziCodepoints = new Set<number>()
for (const { body } of rendered) {
  // Só o texto visível. Contar o HTML bruto arrastaria nomes de tag, classes e
  // valores de atributo, o que faz casar chunk de fonte que a página não mostra.
  const visible = body.replace(/<[^>]*>/g, ' ')
  for (const ch of visible) {
    const cp = ch.codePointAt(0) as number
    latinCodepoints.add(cp)
    // U+2E80 é onde começam os radicais CJK — daí para cima é território do Noto.
    if (cp >= 0x2e80) hanziCodepoints.add(cp)
  }
}

// 2) Embute só o necessário.
const bundled = readBundledCss()
const { css, kept, dropped } = inlineFonts(bundled, latinCodepoints, hanziCodepoints)

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const written: Array<{ path: string; bytes: number; group: string }> = []

// 3) Escreve os previews.
for (const { entry, body } of rendered) {
  const html = page({
    group: entry.group,
    title: `${entry.name} — chinesonline design system`,
    css,
    body,
  })

  const relPath = `${entry.id}.html`
  writeFileSync(join(outDir, relPath), html, 'utf8')
  written.push({ path: relPath, bytes: html.length, group: entry.group })
}

const kb = (n: number) => `${(n / 1024).toFixed(1)} kB`
for (const f of written) {
  console.log(`  ${f.path.padEnd(24)} ${kb(f.bytes).padStart(9)}  [${f.group}]`)
}
console.log(`\n${written.length} previews + index em ds-preview/`)
console.log(`\nCSS inline por arquivo: ${kb(css.length)}`)
console.log(`Fontes: ${kept} @font-face embutidos, ${dropped} descartados por unicode-range`)
console.log(`Codepoints: ${latinCodepoints.size} no total, ${hanziCodepoints.size} deles CJK`)
console.log(`Imagens embutidas: ${imagesInlined}`)
