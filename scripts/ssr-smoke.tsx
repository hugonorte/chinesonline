import type { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { catalog } from '../src/design-system/catalog'

let total = 0
for (const entry of catalog) {
  const html = renderToStaticMarkup(entry.render() as ReactElement)
  total += html.length
  console.log(`  ${entry.id.padEnd(18)} ${String(html.length).padStart(6)} bytes  [${entry.group}]`)
}
console.log(`\nOK - ${catalog.length} entradas renderizaram, ${total} bytes de HTML.`)
