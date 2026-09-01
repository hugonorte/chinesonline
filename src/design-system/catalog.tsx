import type { ReactNode } from 'react'

import loginShot from '../assets/screenshots/login.webp'
import quizShot from '../assets/screenshots/quiz.webp'
import { Accordion } from '../components/Accordion/Accordion'
import { Badge } from '../components/Badge/Badge'
import { Button } from '../components/Button/Button'
import { Card } from '../components/Card/Card'
import { Field } from '../components/Field/Field'
import { Hanzi } from '../components/Hanzi/Hanzi'
import { Footer } from '../components/Footer/Footer'
import { GameModeCard, GameModeGrid } from '../components/GameModeCard/GameModeCard'
import { Header } from '../components/Header/Header'
import { Heading } from '../components/Heading/Heading'
import { Logo } from '../components/Logo/Logo'
import { LogoBrand } from '../components/LogoBrand/LogoBrand'
import { PhoneFrame } from '../components/PhoneFrame/PhoneFrame'
import { PlanCard, PlanGrid } from '../components/PlanCard/PlanCard'
import { Section } from '../components/Section/Section'
import { Step, Steps } from '../components/Steps/Steps'
import { StoreBadge, StoreSoon } from '../components/StoreBadge/StoreBadge'
import { Text } from '../components/Text/Text'

import { ColorRamp, Grid, Row, ShapeTile, SpaceRow, Stack, Swatch, VariantCell } from './specimens'

/**
 * O CATÁLOGO — fonte única de verdade da vitrine.
 *
 * Cada entrada é consumida por dois destinos:
 *   1. `DesignSystemPage` — renderiza com React no dev server (loop diário)
 *   2. o gerador do passo 3 — renderiza a MESMA entrada para HTML estático,
 *      com o CSS compilado inline, e sincroniza como card no Claude Design
 *
 * `group` vira o `group="…"` do marcador @dsCard; `id` vira o nome do arquivo.
 * Descrever uma variante aqui é o que a faz existir nos dois lugares ao mesmo
 * tempo — nunca adicione um exemplo direto na página.
 */
export type CatalogEntry = {
  id: string
  name: string
  group: string
  subtitle?: string
  viewport?: { width: number; height?: number }
  render: () => ReactNode
}

/** Placeholder — trocar pela ficha real assim que o app for publicado. */
/** Proporção real dos screenshots do app — mais alto que 9:16. */
const APP_RATIO = '608 / 1212'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=br.com.chinesonline'

const rampSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const spaceSteps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32]
const textSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']

export const catalog: CatalogEntry[] = [
  // ===========================================================================
  // FUNDAÇÕES
  // ===========================================================================
  {
    id: 'cores',
    name: 'Cor',
    group: 'Fundações',
    subtitle: 'Extraída dos pixels do app: vermelho, azul, petróleo',
    viewport: { width: 900 },
    render: () => (
      <Stack>
        <ColorRamp
          title="Marca — vermelho da tela de entrada (âncora no 800)"
          prefix="--color-brand"
          steps={rampSteps}
        />
        <ColorRamp
          title="Ação — azul dos botões do app (âncora no 500)"
          prefix="--color-action"
          steps={rampSteps}
        />
        <ColorRamp
          title="Petróleo — superfície da tela de jogo (âncora no 900)"
          prefix="--color-teal"
          steps={rampSteps}
        />
        <ColorRamp
          title="XP — amarelo da pontuação acumulada"
          prefix="--color-xp"
          steps={rampSteps}
        />
        <ColorRamp title="Tinta — neutros frios" prefix="--color-ink" steps={[0, ...rampSteps]} />
        <div>
          <Text size="sm" tone="heading">Semânticos</Text>
          <Grid>
            {['--color-success', '--color-warning', '--color-danger', '--color-info'].map((t) => (
              <Swatch key={t} token={t} />
            ))}
          </Grid>
        </div>
        <div>
          <Text size="sm" tone="heading">Papéis — a camada que os componentes consomem</Text>
          <Grid>
            {[
              '--surface-page',
              '--surface-subtle',
              '--surface-brand',
              '--surface-game',
              '--surface-inverse',
              '--fg-heading',
              '--fg-body',
              '--fg-muted',
              '--border-subtle',
              '--action-primary',
            ].map((t) => (
              <Swatch key={t} token={t} />
            ))}
          </Grid>
        </div>
      </Stack>
    ),
  },
  {
    id: 'tipografia',
    name: 'Escala tipográfica',
    group: 'Fundações',
    subtitle: 'xs → 6xl, pesos e entrelinhas',
    viewport: { width: 900 },
    render: () => (
      <Stack>
        {textSizes.map((size) => (
          <Row key={size}>
            <span style={{ minWidth: '5rem' }}>
              <Text size="sm" tone="muted">--text-{size}</Text>
            </span>
            <span style={{ fontSize: `var(--text-${size})`, color: 'var(--fg-heading)' }}>
              Aprenda mandarim
            </span>
          </Row>
        ))}
      </Stack>
    ),
  },
  {
    id: 'escrita-chinesa',
    name: 'Escrita chinesa',
    group: 'Fundações',
    subtitle: 'Hanzi, pinyin, ruby e cor por tom',
    viewport: { width: 900 },
    render: () => (
      <Stack>
        <div>
          <Text size="sm" tone="heading">Caractere em destaque, com pinyin anotado</Text>
          <Row>
            <Hanzi size="display" pinyin="xué">学</Hanzi>
            <Hanzi size="display" pinyin="zhōng" tone={1}>中</Hanzi>
          </Row>
        </div>

        <div>
          <Text size="sm" tone="heading">Os cinco tons</Text>
          <Row>
            {([1, 2, 3, 4, 5] as const).map((tone) => (
              <VariantCell key={tone} label={`tone={${tone}}`}>
                <Hanzi size="lg" tone={tone} pinyin={['mā', 'má', 'mǎ', 'mà', 'ma'][tone - 1]}>
                  妈
                </Hanzi>
              </VariantCell>
            ))}
          </Row>
        </div>

        <div>
          <Text size="sm" tone="heading">Hanzi dentro de texto corrido em português</Text>
          <Text measure>
            O caractere <Hanzi pinyin="hǎo">好</Hanzi> aparece em{' '}
            <Hanzi>你好</Hanzi> e também em <Hanzi>好吃</Hanzi> — a entrelinha maior
            do bloco chinês evita que o pinyin encoste na linha de cima.
          </Text>
        </div>
      </Stack>
    ),
  },
  {
    id: 'espacamento',
    name: 'Espaçamento',
    group: 'Fundações',
    subtitle: 'Escala de base 4px',
    viewport: { width: 700 },
    render: () => (
      <Stack>
        {spaceSteps.map((step) => (
          <SpaceRow key={step} token={`--space-${step}`} />
        ))}
      </Stack>
    ),
  },
  {
    id: 'forma',
    name: 'Raio e sombra',
    group: 'Fundações',
    viewport: { width: 700 },
    render: () => (
      <Stack>
        <div>
          <Text size="sm" tone="heading">Raio</Text>
          <Grid>
            {['--radius-sm', '--radius-md', '--radius-lg', '--radius-xl', '--radius-full'].map((t) => (
              <ShapeTile key={t} token={t} kind="radius" />
            ))}
          </Grid>
        </div>
        <div>
          <Text size="sm" tone="heading">Sombra</Text>
          <Grid>
            {['--shadow-sm', '--shadow-md', '--shadow-lg'].map((t) => (
              <ShapeTile key={t} token={t} kind="shadow" />
            ))}
          </Grid>
        </div>
      </Stack>
    ),
  },

  // ===========================================================================
  // COMPONENTES
  // ===========================================================================
  {
    id: 'button',
    name: 'Botões',
    group: 'Ações',
    subtitle: 'Primary / secondary / ghost, 3 tamanhos',
    viewport: { width: 800 },
    render: () => (
      <Stack>
        <div>
          <Text size="sm" tone="heading">Variantes</Text>
          <Row>
            <Button variant="primary">Começar agora</Button>
            <Button variant="secondary">Ver as aulas</Button>
            <Button variant="ghost">Saiba mais</Button>
          </Row>
        </div>
        <div>
          <Text size="sm" tone="heading">Tamanhos</Text>
          <Row>
            <Button size="sm">Pequeno</Button>
            <Button size="md">Médio</Button>
            <Button size="lg">Grande</Button>
          </Row>
        </div>
        <div>
          <Text size="sm" tone="heading">Estados</Text>
          <Row>
            <Button disabled>Desabilitado</Button>
            <Button href="#" variant="secondary">Como link (&lt;a&gt;)</Button>
          </Row>
        </div>
      </Stack>
    ),
  },
  {
    id: 'card',
    name: 'Cards',
    group: 'Superfícies',
    subtitle: 'Estático e interativo, 3 paddings',
    viewport: { width: 900 },
    render: () => (
      <Stack>
        <Grid>
          <Card>
            <Heading level={3} size="sm">Nível HSK 1</Heading>
            <Text size="sm" tone="muted">150 caracteres essenciais</Text>
          </Card>
          <Card interactive as="a" href="#">
            <Heading level={3} size="sm">Card clicável</Heading>
            <Text size="sm" tone="muted">Passe o mouse para ver a elevação</Text>
          </Card>
        </Grid>
        <Card padding="lg">
          <Row>
            <Hanzi size="display" pinyin="kè" tone={4}>课</Hanzi>
            <div>
              <Heading level={3} size="md">Aula demonstrativa</Heading>
              <Text tone="muted">Composição de Card + Hanzi</Text>
            </div>
          </Row>
        </Card>
      </Stack>
    ),
  },
  {
    id: 'field',
    name: 'Campos de formulário',
    group: 'Formulários',
    subtitle: 'Com hint, com erro e desabilitado',
    viewport: { width: 560 },
    render: () => (
      <Stack>
        <Field label="Seu nome" placeholder="Como podemos te chamar?" />
        <Field label="E-mail" type="email" hint="Usamos só para enviar o material da aula." placeholder="voce@exemplo.com" />
        <Field label="E-mail" type="email" defaultValue="email-invalido" error="Digite um e-mail válido." />
        <Field label="Turma" value="HSK 1 — noturno" disabled readOnly />
      </Stack>
    ),
  },
  {
    id: 'badge',
    name: 'Badges',
    group: 'Sinalização',
    subtitle: 'Neutro, Lite, Premium e Em breve',
    viewport: { width: 640 },
    render: () => (
      <Row>
        <Badge>Novo</Badge>
        <Badge tone="free">Grátis</Badge>
        <Badge tone="premium">Premium</Badge>
        <Badge tone="soon">iOS em breve</Badge>
      </Row>
    ),
  },
  {
    id: 'steps',
    name: 'Passos',
    group: 'Conteúdo',
    subtitle: 'O loop do quiz em três passos',
    viewport: { width: 900 },
    render: () => (
      <Steps>
        <Step number={1} title="Veja o ideograma">
          O app mostra um caractere no flashcard e você tem alguns segundos para
          reconhecê-lo.
        </Step>
        <Step number={2} title="Digite a resposta">
          Você escreve a resposta e envia. Não há alternativa múltipla — ou você
          reconhece o caractere, ou não reconhece.
        </Step>
        <Step number={3} title="Acumule XP e suba de nível">
          Cada acerto soma XP e pontuação. O nível cresce junto e mede quanto
          você já domina de verdade.
        </Step>
      </Steps>
    ),
  },
  {
    id: 'accordion',
    name: 'Acordeão',
    group: 'Conteúdo',
    subtitle: 'FAQ sobre <details>, abre sem JavaScript',
    viewport: { width: 760 },
    render: () => (
      <Accordion
        name="faq-demo"
        items={[
          {
            id: 'gratis',
            question: 'A versão Lite é gratuita mesmo?',
            answer: 'É. A Lite tem um modo de jogo completo, com XP e níveis, sem limite de partidas.',
          },
          {
            id: 'premium',
            question: 'O que muda na versão Premium?',
            answer: 'A Premium libera mais de 10 modos de jogo diferentes, com pagamento único.',
          },
          {
            id: 'ios',
            question: 'Vai ter versão para iPhone?',
            answer: 'Está no plano, mas ainda sem data. Deixe seu e-mail e avisamos quando sair.',
          },
        ]}
      />
    ),
  },
  {
    id: 'header',
    name: 'Header',
    group: 'Navegação',
    subtitle: 'Escuro por padrão, com o wordmark em branco',
    viewport: { width: 1100, height: 220 },
    render: () => (
      <Header
        brand={<LogoBrand />}
        action={<Button size="sm">Download</Button>}
      />
    ),
  },
  {
    id: 'logo',
    name: 'Logo',
    group: 'Marca',
    subtitle: 'Wordmark em curvas, herda a cor do contexto',
    viewport: { width: 900 },
    render: () => (
      <Stack>
        <div>
          <Text size="sm" tone="heading">
            O SVG usa currentColor — a cor vem do contêiner, não do arquivo
          </Text>
          <Row>
            <span style={{ color: 'var(--color-ink-900)' }}>
              <Logo />
            </span>
            <span style={{ color: 'var(--action-primary)' }}>
              <Logo />
            </span>
          </Row>
        </div>
        <Section tone="inverse" spacing="tight" containerSize="content">
          <Text size="sm" tone="muted">Sobre fundo escuro — o uso do header</Text>
          <div style={{ marginBlockStart: 'var(--space-4)' }}>
            <Logo />
          </div>
        </Section>
      </Stack>
    ),
  },
  {
    id: 'footer',
    name: 'Footer',
    group: 'Navegação',
    subtitle: 'Com os links legais exigidos pela Play Store',
    viewport: { width: 1100 },
    render: () => (
      <Footer />
    ),
  },
  {
    id: 'store-badge',
    name: 'Badge da loja',
    group: 'Ações',
    subtitle: 'Asset oficial do Google Play e o slot do iOS',
    viewport: { width: 820 },
    render: () => (
      <Stack>
        <div>
          <Text size="sm" tone="heading">Tamanhos — arte de 40, 48 e 56 px</Text>
          <Row>
            <StoreBadge size="sm" href={PLAY_STORE_URL} />
            <StoreBadge size="md" href={PLAY_STORE_URL} />
            <StoreBadge size="lg" href={PLAY_STORE_URL} />
          </Row>
        </div>
        <div>
          <Text size="sm" tone="heading">
            iOS ainda não publicado — sem o badge da Apple, de propósito
          </Text>
          <Row>
            <StoreSoon>Versão para iPhone em breve</StoreSoon>
          </Row>
        </div>
      </Stack>
    ),
  },
  {
    id: 'phone-frame',
    name: 'Moldura de celular',
    group: 'App',
    subtitle: 'Proporção reservada, com screenshot e sem',
    viewport: { width: 1000 },
    render: () => (
      <Stack>
        <div>
          <Text size="sm" tone="heading">
            Telas reais do app — proporção 608:1212, mais alta que 9:16
          </Text>
          <Row>
            <PhoneFrame
              size="md"
              src={loginShot}
              alt="Tela de entrada do ChinesOnline, com o mascote em arte de papel recortado"
              ratio={APP_RATIO}
            />
            <PhoneFrame
              size="md"
              src={quizShot}
              alt="Tela de jogo do ChinesOnline, com o caractere 八 e campo de resposta"
              ratio={APP_RATIO}
            />
          </Row>
        </div>
        <div>
          <Text size="sm" tone="heading">
            Sem screenshot, o slot se declara como slot — três tamanhos
          </Text>
          <Row>
            <PhoneFrame size="sm" />
            <PhoneFrame size="md" />
          </Row>
        </div>
      </Stack>
    ),
  },
  {
    id: 'game-modes',
    name: 'Modos de jogo',
    group: 'App',
    subtitle: 'Tela real no primeiro; os modos Premium são exemplo',
    viewport: { width: 1000 },
    render: () => (
      <GameModeGrid>
        <GameModeCard
          title="Adivinhe o ideograma"
          screenshot={quizShot}
          screenshotAlt="Tela do app mostrando o caractere 八 e um campo para digitar a resposta"
          ratio={APP_RATIO}
        >
          O modo da versão Lite. O caractere aparece no flashcard e você digita a
          resposta — sem alternativas para chutar.
        </GameModeCard>
        <GameModeCard title="Modo Premium (exemplo)" premium>
          Placeholder de layout. Os mais de 10 modos da versão Premium ainda não
          foram descritos.
        </GameModeCard>
        <GameModeCard title="Modo Premium (exemplo)" premium>
          Placeholder de layout. Trocar por conteúdo real antes de gerar as
          seções da landing.
        </GameModeCard>
      </GameModeGrid>
    ),
  },
  {
    id: 'planos',
    name: 'Lite × Premium',
    group: 'Preço',
    subtitle: 'Dois cards, pagamento único',
    viewport: { width: 900 },
    render: () => (
      <PlanGrid>
        <PlanCard
          name="Lite"
          badge={<Badge tone="free">Grátis</Badge>}
          price="Grátis"
          note="para sempre, sem cadastro"
          features={[
            'Um modo de jogo completo',
            'Sistema de pontos e progressão',
            'Sem limite de partidas',
          ]}
          action={<Button fullWidth href={PLAY_STORE_URL}>Baixar na Play Store</Button>}
        />
        <PlanCard
          featured
          name="Premium"
          badge={<Badge tone="premium">Premium</Badge>}
          price="US$ 19,00"
          note="pagamento único — sem assinatura, sem renovação"
          features={[
            'Mais de 10 modos de jogo',
            'Tudo que a versão Lite tem',
            'Novos modos incluídos sem custo extra',
          ]}
          action={<Button fullWidth href={PLAY_STORE_URL}>Comprar na Play Store</Button>}
        />
      </PlanGrid>
    ),
  },
]

export const groups = [...new Set(catalog.map((entry) => entry.group))]
