<?php
require __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);
try {
    $mail->SMTPDebug = 3; // Nível 3 mostra o diálogo SMTP completo
    $mail->Debugoutput = 'html';
    
    $mail->isSMTP();
    $mail->Host       = 'smtp.hostinger.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'support@mail.chinesonline.com.br';
    
    // Pega a senha do .env da mesma forma que o contact.php
    $password = '';
    $envPath = __DIR__ . '/../../.env';
    if (file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            if (strpos($line, '=') !== false) {
                list($key, $val) = explode('=', $line, 2);
                if (trim($key) === 'CHINESONLINE_MAIL_PASSWORD') {
                    $password = trim($val, " \t\n\r\0\x0B\"'");
                    break;
                }
            }
        }
    }
    
    $mail->Password   = $password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    $mail->setFrom('support@mail.chinesonline.com.br', 'Teste Agent');
    $mail->addAddress('support@mail.chinesonline.com.br');
    
    $mail->Subject = 'Teste Interno SMTP - Debug';
    $mail->Body    = 'Este é um teste interno para validar o log SMTP.';
    
    echo "Iniciando envio...\n";
    $mail->send();
    echo "\nEnviado com sucesso!\n";
} catch (\Exception $e) {
    echo "\nErro no envio: {$e->getMessage()}\n";
}
