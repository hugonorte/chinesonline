<?php
// ATENÇÃO: Habilitando exibição de erros temporariamente para debug!
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Permitir acesso do frontend (CORS se necessário, embora no mesmo domínio não seja estritamente exigido)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Tratar requisição OPTIONS (Preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Bloquear qualquer método que não seja POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit();
}

// Obter os dados do corpo (JSON)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validar os dados obrigatórios
if (
    empty($data['name']) || 
    empty($data['email']) || 
    empty($data['subject']) || 
    empty($data['message'])
) {
    http_response_code(400);
    echo json_encode(["error" => "All fields are required."]);
    exit();
}

$name = htmlspecialchars(strip_tags(trim($data['name'])));
$email = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(strip_tags(trim($data['subject'])));
$messageText = htmlspecialchars(strip_tags(trim($data['message'])));

// Validar formato do email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email format."]);
    exit();
}

// Carregar o autoloader do Composer (Para o PHPMailer)
// Você precisará instalar o PHPMailer no servidor executando `composer require phpmailer/phpmailer`
// Ou incluir os arquivos manualmente se não usar o Composer.
require __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Melhor prática: Ler a senha de um arquivo .env que NÃO vai para o Git
// No servidor da Hostinger, você vai criar o arquivo .env na mesma pasta (ou preferencialmente, 
// na raiz acima da public_html por segurança) e o PHP fará a leitura.
$password = '';

// 1. Tenta pegar da variável de ambiente real (se configurada via painel da Hostinger)
if (getenv('CHINESONLINE_MAIL_PASSWORD')) {
    $password = getenv('CHINESONLINE_MAIL_PASSWORD');
} 
// 2. Fallback: Lê diretamente do arquivo .env usando funções nativas do PHP
else {
    // Caminho do .env: Ajuste este caminho dependendo de onde colocar o arquivo no servidor
    // Ex: __DIR__ . '/../../.env' para colocar na raiz do projeto (fora do public_html)
    $envPath = __DIR__ . '/../../.env'; 
    if (file_exists($envPath)) {
        // Em hospedagens, parse_ini_file pode dar erro se a senha contiver caracteres especiais como ~ ou |
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue; // Ignora comentários
            if (strpos($line, '=') !== false) {
                list($key, $val) = explode('=', $line, 2);
                $key = trim($key);
                $val = trim($val, " \t\n\r\0\x0B\"'"); // Remove aspas e espaços
                
                if ($key === 'CHINESONLINE_MAIL_PASSWORD') {
                    $password = $val;
                    break;
                }
            }
        }
    }
}
if (empty($password)) {
    http_response_code(500);
    echo json_encode(["error" => "Email configuration missing."]);
    exit();
}
$mail = new PHPMailer(true);

try {
    // Configurações do Servidor SMTP (Hostinger)
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com'; // Servidor SMTP da Hostinger
    $mail->SMTPAuth   = true;
    $mail->Username   = 'support@mail.chinesonline.com.br'; // Seu e-mail de envio e autenticação
    $mail->Password   = $password; // Sua senha (recomendado usar dotenv no backend)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Criptografia SSL
    $mail->Port       = 465; // Porta TCP para SSL

    // Remetente e Destinatário
    $mail->setFrom('support@mail.chinesonline.com.br', 'Site Principal ChinesOnline');
    $mail->addAddress('support@mail.chinesonline.com.br'); // Para quem vai o e-mail (você mesmo ou o suporte)
    $mail->addReplyTo($email, $name); // Se você clicar em 'Responder', vai para o e-mail do cliente

    // Conteúdo
    $mail->isHTML(true);
    $mail->Subject = "Novo Contato do Site: " . $subject;
    
    // Corpo do E-mail
    $mail->Body = "
        <h2>Novo Formulário de Contato Recebido</h2>
        <p><strong>Nome:</strong> {$name}</p>
        <p><strong>E-mail:</strong> {$email}</p>
        <p><strong>Assunto:</strong> {$subject}</p>
        <br>
        <p><strong>Mensagem:</strong></p>
        <p>" . nl2br($messageText) . "</p>
    ";
    $mail->AltBody = "Nome: {$name}\nE-mail: {$email}\nAssunto: {$subject}\nMensagem:\n{$messageText}";

    // Enviar
    $mail->send();
    
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Message sent!"]);
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(["error" => "Message could not be sent. Mailer Error: {$e->getMessage()}"]);
}
