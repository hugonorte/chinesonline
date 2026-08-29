/**
 * Os 101 chunks do Noto Sans SC por peso geram ~200 blocos @font-face — mais de
 * 200 kB de CSS. Carregar isso no caminho crítico atrasa o primeiro render de
 * uma página que, em geral, tem meia dúzia de caracteres chineses.
 *
 * Por isso este módulo é importado de forma assíncrona por `global.ts`: o hanzi
 * aparece na fonte de sistema e troca quando o Noto chega (`font-display: swap`).
 * O gerador de previews importa este mesmo módulo de forma síncrona — lá o CSS
 * precisa estar presente no bundle para ser embutido no HTML.
 */
import '@fontsource/noto-sans-sc/400.css'
import '@fontsource/noto-sans-sc/500.css'
