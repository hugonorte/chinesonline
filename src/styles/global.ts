/**
 * Ponto de entrada ÚNICO dos estilos globais.
 *
 * Existe porque as fontes vêm de pacotes npm e o Sass não resolve specifier de
 * node_modules. Importar daqui — e nunca direto nos entry points — é o que
 * impede o app e o gerador de previews de carregarem conjuntos diferentes.
 */
import '@fontsource-variable/inter/wght.css'
import '@fontsource/lobster'

import './index.scss'

// Fora do caminho crítico — ver o comentário em fonts-hanzi.ts.
void import('./fonts-hanzi')
