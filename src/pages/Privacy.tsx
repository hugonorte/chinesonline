import { Header } from '../components/Header/Header'
import { LegalHero } from '../components/LegalHero/LegalHero'
import { Footer } from '../components/Footer/Footer'
import { LogoBrand } from '../components/LogoBrand/LogoBrand'
import { StoreBadge } from '../components/StoreBadge/StoreBadge'
import { Container } from '../components/Container/Container'
import styles from './Legal.module.scss'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=br.com.chinesonline'

export function Privacy() {
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
        id="privacidade"
        title="Política de Privacidade"
        lastUpdated="30 de agosto de 2026"
      />

      <main className={styles.legalContent}>
        <Container>
          <article className={styles.article}>
            {/* Introdução */}
            <section className={styles.section}>
              <h2>1. Introdução</h2>
              <p>
                A ChinesOnline ("nós", "nos", "nosso" ou "Empresa") respeita a privacidade de seus usuários ("você" ou
                "Usuário"). Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas
                informações quando você acessa o aplicativo ChinesOnline no Google Play Store e Apple App Store.
              </p>
              <p>
                Recomendamos que você leia esta Política de Privacidade cuidadosamente. Se tiver alguma dúvida sobre
                como tratamos seus dados pessoais, entre em contato conosco.
              </p>
            </section>

            {/* Dados Coletados */}
            <section className={styles.section}>
              <h2>2. Quais Dados Coletamos</h2>
              <p>Coletamos informações pessoais e não pessoais que você nos fornece ou que coletamos automaticamente:</p>

              <h3 className={styles.subheading}>Dados Fornecidos por Você</h3>
              <ul className={styles.list}>
                <li>Informações de conta: nome, email, senha</li>
                <li>Perfil de usuário: foto de perfil, idioma preferido</li>
                <li>Informações de contato: para suporte e notificações</li>
                <li>Feedback e sugestões sobre o Aplicativo</li>
              </ul>

              <h3 className={styles.subheading}>Dados Coletados Automaticamente</h3>
              <ul className={styles.list}>
                <li>Progresso de aprendizado: caracteres estudados, pontuação, histórico de atividades</li>
                <li>Informações do dispositivo: modelo, versão do SO, identificador único</li>
                <li>Dados de uso: recursos acessados, tempo na aplicação, frequência de uso</li>
                <li>Informações de rede: endereço IP, localização aproximada (país/região)</li>
                <li>Cookies e tecnologias similares para operações essenciais do Aplicativo</li>
                <li>Identificadores de publicidade (como IDFA no iOS e Advertising ID no Android) para exibição de anúncios na versão Lite</li>
              </ul>
              
              <h3 className={styles.subheading}>Dados Sensíveis e Pagamento</h3>
              <p>
                Nós <strong>não</strong> coletamos informações biométricas, de saúde ou outros dados sensíveis.
              </p>
              <p>
                As compras do aplicativo (versão Premium) são processadas inteiramente e de forma segura pela Apple App Store e Google Play Store. Nós <strong>não</strong> coletamos, processamos ou armazenamos informações financeiras ou de cartão de crédito em nossos servidores.
              </p>
            </section>

            {/* Como Usamos */}
            <section className={styles.section}>
              <h2>3. Como Usamos Seus Dados</h2>
              <p>Usamos os dados coletados para:</p>
              <ul className={styles.list}>
                <li>Fornecer, manter e melhorar o Aplicativo e seus recursos</li>
                <li>Personalizar sua experiência de aprendizado</li>
                <li>Responder a suas consultas e solicitações de suporte</li>
                <li>Enviar notificações sobre atualizações, promoções e novos recursos</li>
                <li>Analisar padrões de uso para otimização e desenvolvimento</li>
                <li>Cumprir obrigações legais e regulamentares</li>
                <li>Prevenir fraude e atividades maliciosas</li>
                <li>Exigir conformidade com estes Termos de Uso e outras políticas</li>
              </ul>
            </section>

            {/* Compartilhamento e Analytics */}
            <section className={styles.section}>
              <h2>4. Compartilhamento de Dados, Terceiros e Anúncios</h2>
              <p>
                Podemos compartilhar dados nas seguintes circunstâncias limitadas:
              </p>
              <ul className={styles.list}>
                <li>
                  <strong>Provedores de Serviço:</strong> Compartilhamos com fornecedores estritamente necessários para operar nosso
                  serviço (ex: infraestrutura de hospedagem), sob rígidos acordos de confidencialidade.
                </li>
                <li>
                  <strong>Conformidade Legal:</strong> Podemos divulgar dados se exigido por lei, ordem judicial ou
                  solicitação governamental.
                </li>
                <li>
                  <strong>Proteção de Direitos:</strong> Divulgaremos dados para proteger nossos direitos, privacidade,
                  segurança ou propriedade.
                </li>
                <li>
                  <strong>Redes de Publicidade (Google AdMob):</strong> A versão "Lite" (gratuita) do aplicativo é suportada por anúncios fornecidos pelo Google AdMob. O AdMob coleta e processa informações como o seu endereço IP e identificadores de publicidade (IDFA/Advertising ID) para fornecer anúncios, prevenir fraudes e gerar estatísticas. Para mais informações sobre como o Google utiliza esses dados, consulte a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={styles.link}>Política de Privacidade do Google</a>.
                </li>
              </ul>
              <p>
                <strong>Rastreamento e Publicidade (App Tracking Transparency - iOS):</strong> Em dispositivos iOS, solicitaremos a sua permissão explícita (via prompt do sistema) antes de acessar o seu identificador de publicidade para fins de anúncios personalizados. Se você recusar, os anúncios ainda serão exibidos, mas poderão ser menos relevantes para os seus interesses. No Android, você pode gerenciar suas preferências de personalização de anúncios diretamente nas configurações da sua conta Google/dispositivo.
              </p>
              <p>
                Ressaltamos que não vendemos seus dados pessoais para corretores de dados (data brokers) e não utilizamos seus dados de progressão de estudo para fins de marketing ou direcionamento de anúncios.
              </p>
            </section>

            {/* Segurança */}
            <section className={styles.section}>
              <h2>5. Segurança de Dados</h2>
              <p>
                Implementamos medidas de segurança técnicas, administrativas e físicas apropriadas para proteger seus
                dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui:
              </p>
              <ul className={styles.list}>
                <li>Criptografia de dados em trânsito (HTTPS) e em repouso</li>
                <li>Autenticação segura de contas</li>
                <li>Acesso restrito a dados pessoais por funcionários autorizados</li>
              </ul>
            </section>

            {/* Exclusão de Conta */}
            <section className={styles.section}>
              <h2>6. Exclusão de Conta e Dados Pessoais</h2>
              <p>
                Você tem o direito de solicitar a exclusão permanente da sua conta e de todos os dados pessoais e de progresso associados a ela a qualquer momento. Para realizar a exclusão de sua conta:
              </p>
              <ul className={styles.list}>
                <li><strong>No Aplicativo:</strong> Acesse "Configurações" &gt; "Conta" &gt; "Excluir minha Conta" e siga as instruções na tela.</li>
                <li><strong>Via E-mail:</strong> Envie uma solicitação de exclusão para <a href="mailto:support@chinesonline.com.br" className={styles.link}>support@chinesonline.com.br</a> através do e-mail cadastrado na sua conta.</li>
              </ul>
              <p>
                Após a solicitação (seja via app ou e-mail), seus dados pessoais serão processados para exclusão em um prazo máximo de <strong>30 dias</strong> de nossos servidores de forma irreversível. Reteremos apenas dados agregados e anônimos (que não identificam você) ou informações cujo armazenamento seja estritamente exigido para cumprimento de obrigações legais, contábeis ou de segurança, conforme os prazos legais aplicáveis.
              </p>
            </section>

            {/* Direitos do Usuário */}
            <section className={styles.section}>
              <h2>7. Seus Direitos e LGPD</h2>
              <p>
                Em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD) e outras regulamentações aplicáveis, você tem os seguintes direitos sobre seus dados:
              </p>
              <ul className={styles.list}>
                <li><strong>Direito de Acesso:</strong> Solicitar uma cópia dos dados pessoais que mantemos sobre você.</li>
                <li><strong>Direito de Retificação:</strong> Solicitar a correção de dados imprecisos ou incompletos.</li>
                <li><strong>Direito ao Esquecimento:</strong> Solicitar a exclusão de seus dados pessoais (conforme detalhado na seção 6).</li>
                <li><strong>Direito de Portabilidade:</strong> Solicitar cópia de seus dados em formato estruturado.</li>
                <li><strong>Direito de Objeção e Retirada de Consentimento:</strong> Opor-se ao processamento de dados e revogar consentimentos previamente concedidos.</li>
              </ul>
              <p>
                Para exercer estes direitos, entre em contato através de{' '}
                <a href="mailto:support@chinesonline.com.br" className={styles.link}>
                  support@chinesonline.com.br
                </a>
                .
              </p>
            </section>

            {/* Menores */}
            <section className={styles.section}>
              <h2>8. Privacidade de Crianças e Menores</h2>
              <p>
                O Aplicativo não é destinado a menores de 13 anos. Nós não coletamos dados de menores de 13 anos
                conscientemente. Se você é pai/mãe ou responsável legal e descobrir que seu filho nos forneceu dados pessoais sem seu consentimento, entre em contato para tomarmos medidas imediatas para a exclusão de tais informações.
              </p>
            </section>
            
            {/* Mudanças */}
            <section className={styles.section}>
              <h2>9. Mudanças nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas,
                tecnologia ou legislação. Alterações significativas serão comunicadas através do Aplicativo ou por email.
                Seu uso continuado do Aplicativo após tais notificações constitui consentimento às mudanças.
              </p>
            </section>

            {/* Contato */}
            <section className={styles.section}>
              <h2>10. Entre em Contato Conosco</h2>
              <p>
                Se tiver dúvidas sobre esta Política de Privacidade, práticas de proteção de dados ou sobre como excluir sua conta, entre em
                contato conosco:
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@chinesonline.com.br" className={styles.link}>
                  support@chinesonline.com.br
                </a>
              </p>
              <p>
                <strong>Endereço:</strong> ChinesOnline, Brasil
              </p>
            </section>
          </article>
        </Container>
      </main>

      <Footer />
    </>
  )
}
