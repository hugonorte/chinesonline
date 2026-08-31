import { Header } from '../components/Header/Header'
import { LegalHero } from '../components/LegalHero/LegalHero'
import { Footer } from '../components/Footer/Footer'
import { LogoBrand } from '../components/LogoBrand/LogoBrand'
import { StoreBadge } from '../components/StoreBadge/StoreBadge'
import { Container } from '../components/Container/Container'
import styles from './Legal.module.scss'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=br.com.chinesonline'

export function Terms() {
  return (
    <>
      <Header
        brand={<LogoBrand />}
        links={[
          { label: 'Home', href: '/' },
          { label: 'Features', href: '/#features' },
          { label: 'FAQ', href: '/#faq' },
          { label: 'Contato', href: '/contact' },
          { label: 'Termos', href: '/terms' },
          { label: 'Privacidade', href: '/privacy' },
        ]}
        action={<StoreBadge href={PLAY_STORE_URL} size="sm" />}
      />

      <LegalHero
        id="termos-de-uso"
        title="Termos de Uso"
        lastUpdated="30 de agosto de 2026"
      />

      <main className={styles.legalContent}>
        <Container>
          <article className={styles.article}>
            {/* Introdução */}
            <section className={styles.section}>
              <h2>1. Introdução e Aceitação dos Termos</h2>
              <p>
                Bem-vindo ao ChinesOnline. Estes Termos de Uso ("Termos") regem o acesso e uso do aplicativo ChinesOnline
                ("Aplicativo"), disponível no Google Play Store e Apple App Store. Ao acessar ou usar o Aplicativo, você concorda em estar
                vinculado por estes Termos. Se você não concorda com qualquer parte destes Termos, você não deve usar o
                Aplicativo.
              </p>
              <p>
                <strong>Importante:</strong> Você reconhece que estes Termos são celebrados apenas entre você e a ChinesOnline, e não com a Apple Inc. ("Apple") ou Google LLC ("Google"). A ChinesOnline, e não a Apple ou o Google, é a única responsável pelo Aplicativo e seu conteúdo. A Apple e o Google não têm nenhuma obrigação de fornecer serviços de manutenção ou suporte relacionados ao Aplicativo.
              </p>
            </section>

            {/* Definições */}
            <section className={styles.section}>
              <h2>2. Definições</h2>
              <dl className={styles.definitions}>
                <dt>"Aplicativo"</dt>
                <dd>Refere-se ao software ChinesOnline disponível para dispositivos iOS e Android.</dd>

                <dt>"Usuário" ou "Você"</dt>
                <dd>Qualquer pessoa que acessa ou usa o Aplicativo.</dd>

                <dt>"Conteúdo"</dt>
                <dd>
                  Inclui caracteres chineses, pronuncia nativa, explicações gramaticais e qualquer outro material
                  educacional fornecido através do Aplicativo.
                </dd>
              </dl>
            </section>

            {/* Elegibilidade */}
            <section className={styles.section}>
              <h2>3. Conformidade Legal e Elegibilidade</h2>
              <p>
                Você deve ter pelo menos 13 anos de idade para usar o Aplicativo. Ao utilizar o Aplicativo, você declara e garante que (i) não está localizado em um país sujeito a embargo do governo dos Estados Unidos, ou que tenha sido designado pelo governo dos EUA como um país que "apoia o terrorismo"; e (ii) você não está listado em nenhuma lista de partes proibidas ou restritas do governo dos EUA.
              </p>
            </section>

            {/* Licença de Uso */}
            <section className={styles.section}>
              <h2>4. Licença de Uso e Escopo</h2>
              <p>
                A licença concedida a você para o Aplicativo é uma licença limitada, intransferível e não exclusiva para usar o Aplicativo em dispositivos da marca Apple ou Android que você possua ou controle, e conforme permitido pelas Regras de Uso estabelecidas nos Termos de Serviço da Apple App Store ou Google Play Store.
              </p>
              <ul className={styles.list}>
                <li>Reproduzir, modificar ou distribuir o Aplicativo ou seu Conteúdo</li>
                <li>Usar o Aplicativo para fins comerciais ou públicos</li>
                <li>Tentar descobrir a senha de outras contas de usuário</li>
                <li>Usar ferramentas automatizadas para extrair dados do Aplicativo</li>
                <li>Acessar ou procurar o Aplicativo por meios não autorizados</li>
              </ul>
            </section>

            {/* Contas de Usuário */}
            <section className={styles.section}>
              <h2>5. Contas de Usuário</h2>
              <p>
                Para acessar certos recursos, você precisará criar uma conta. Você é responsável por
                manter a confidencialidade de suas credenciais de login e por todas as atividades que ocorrem sob sua
                conta. Você concorda em notificar-nos imediatamente sobre qualquer uso não autorizado.
              </p>
              <p>
                <strong>Suspensão ou Encerramento:</strong> Reservamo-nos o direito de suspender ou encerrar sua conta a qualquer momento, sem aviso prévio, caso seja detectada violação destes Termos de Uso, comportamento fraudulento ou uso indevido da plataforma.
              </p>
            </section>

            {/* Pagamentos e Assinaturas */}
            <section className={styles.section}>
              <h2>6. Pagamentos e Versão Premium</h2>
              <p>
                O Aplicativo Premium está disponível mediante o pagamento de uma taxa única efetuada diretamente na Apple App Store ou Google Play Store. Não há cobrança de assinaturas recorrentes para este serviço. Todas as transações financeiras e faturamentos são processados exclusivamente pela loja de aplicativos correspondente e estão sujeitos aos Termos de Serviço e Políticas de Privacidade destas lojas.
              </p>
            </section>

            {/* Conteúdo do Usuário */}
            <section className={styles.section}>
              <h2>7. Conteúdo do Usuário</h2>
              <p>
                Qualquer conteúdo que você enviar, postar ou exibir através do Aplicativo ("Conteúdo do Usuário")
                permanece sua propriedade. Ao fornecer Conteúdo do Usuário, você nos concede uma licença
                mundial, royalty-free para usar, modificar e exibir esse conteúdo estritamente para o funcionamento do
                Aplicativo.
              </p>
            </section>

            {/* Propriedade Intelectual */}
            <section className={styles.section}>
              <h2>8. Propriedade Intelectual e Reivindicações</h2>
              <p>
                O Aplicativo, incluindo todo o Conteúdo (exceto Conteúdo do Usuário), é propriedade da ChinesOnline e protegido por leis de propriedade intelectual. Em caso de qualquer reclamação de terceiros de que o Aplicativo ou a sua posse e uso deste Aplicativo infringem os direitos de propriedade intelectual daquele terceiro, a ChinesOnline, e não a Apple ou o Google, será a única responsável pela investigação, defesa, liquidação e quitação de qualquer reivindicação de violação de propriedade intelectual.
              </p>
            </section>

            {/* Isenção de Garantias */}
            <section className={styles.section}>
              <h2>9. Isenção de Garantias</h2>
              <p>
                O APLICATIVO É FORNECIDO "COMO ESTÁ" SEM GARANTIAS DE QUALQUER TIPO. A CHINESONLINE ISENTA-SE DE TODAS AS GARANTIAS IMPLÍCITAS. Na extensão máxima permitida pela lei aplicável, a Apple e o Google não terão nenhuma obrigação de garantia de qualquer tipo com relação ao Aplicativo.
              </p>
            </section>

            {/* Limitação de Responsabilidade e Reivindicações */}
            <section className={styles.section}>
              <h2>10. Reivindicações de Produtos e Limitação de Responsabilidade</h2>
              <p>
                Você e a ChinesOnline reconhecem que a ChinesOnline, e não a Apple ou o Google, é responsável por lidar com quaisquer de suas reclamações ou de terceiros relacionadas ao Aplicativo, incluindo: (i) reclamações de responsabilidade do produto; (ii) qualquer reclamação de que o Aplicativo não está em conformidade com qualquer requisito legal ou regulamentar aplicável; e (iii) reclamações decorrentes de proteção ao consumidor ou legislação semelhante.
              </p>
            </section>

            {/* Indenização */}
            <section className={styles.section}>
              <h2>11. Terceiros Beneficiários</h2>
              <p>
                Você e a ChinesOnline reconhecem e concordam que a Apple e o Google, e as subsidiárias destas, são terceiros beneficiários destes Termos de Uso e, mediante a sua aceitação destes Termos, a Apple e o Google terão o direito de fazer cumprir estes Termos de Uso contra você como um terceiro beneficiário dos mesmos.
              </p>
            </section>

            {/* Modificações aos Termos */}
            <section className={styles.section}>
              <h2>12. Modificações aos Termos</h2>
              <p>
                Podemos modificar estes Termos a qualquer momento. Alterações significativas serão comunicadas através
                do Aplicativo ou por email. Seu uso continuado do Aplicativo após tais notificações constitui
                consentimento às modificações.
              </p>
            </section>

            {/* Lei Aplicável */}
            <section className={styles.section}>
              <h2>13. Lei Aplicável</h2>
              <p>
                Estes Termos são regidos pelas leis da República Federativa do Brasil, sem considerar seus conflitos
                de princípios legais.
              </p>
            </section>

            {/* Contato */}
            <section className={styles.section}>
              <h2>14. Entre em Contato Conosco</h2>
              <p>
                Se você tiver dúvidas, reclamações ou reivindicações com relação ao Aplicativo, entre em contato conosco em:{' '}
                <a href="mailto:support@chinesonline.com.br" className={styles.link}>
                  support@chinesonline.com.br
                </a>
              </p>
            </section>
          </article>
        </Container>
      </main>

      <Footer />
    </>
  )
}
