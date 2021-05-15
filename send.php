<?php

// Форма в модалке

$modalName = $_POST['modalName'];
$modalMail = $_POST['modalMail'];
$modalTelegram = $_POST['modalTelegram'];
$modalWhatsApp = $_POST['modalWhatsApp'];
$modalMsg = $_POST['modalMsg'];

// Load Composer's autoloader
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer\PHPMailer\PHPMailer();

if ($_POST['modalName']) {
    try {
    //Server settings
    $mail->SMTPDebug = 0; 
    $mail->CharSet = 'UTF-8';                     // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'borbritvahp@gmail.com';                     // SMTP username
    $mail->Password   = '4815162342elisaveta';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('borbritvahp@gmail.com');
    $mail->addAddress('e.kuptsov88@gmail.com');     // Add a recipient

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Новая заявка с сайта';
    $mail->Body    = "Имя пользователя: ${modalName}. <br>
                      Его почта: ${modalMail}. <br>
                      Его telegram: ${modalTelegram}. <br>
                      Его whatsApp: ${modalWhatsApp}. <br>
                      Его сообщение: ${modalMsg}";

    if ($mail->send()) {
        echo "ok";
    } else {
        echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
    }
    

} catch (Exception $e) {
    echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
}
}

    // Форма в блоке go

$goName = $_POST['goName'];
$goMail = $_POST['goMail'];
$goTelegram = $_POST['goTelegram'];
$goWhatsApp = $_POST['goWhatsApp'];
$goMessage = $_POST['goMessage'];

// Instantiation and passing `true` enables exceptions
$mail1 = new PHPMailer\PHPMailer\PHPMailer();

if ($_POST['goName']) {
    try {
    //Server settings
    $mail1->SMTPDebug = 0; 
    $mail1->CharSet = 'UTF-8';                     // Enable verbose debug output
    $mail1->isSMTP();                                            // Send using SMTP
    $mail1->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail1->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail1->Username   = 'borbritvahp@gmail.com';                     // SMTP username
    $mail1->Password   = '4815162342elisaveta';                               // SMTP password
    $mail1->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail1->Port       = 465;                                    // TCP port to connect to

    //Recipients
    $mail1->setFrom('borbritvahp@gmail.com');
    $mail1->addAddress('e.kuptsov88@gmail.com');     // Add a recipient

    // Content
    $mail1->isHTML(true);                                  // Set email format to HTML
    $mail1->Subject = 'Новая заявка с сайта';
    $mail1->Body    = "Имя пользователя: ${goName}. <br>
                       Его почта: ${goMail}. <br>
                       Его telegram: ${goTelegram}. <br>
                       Его whatsApp: ${goWhatsApp}. <br>
                       Его сообщение: ${goMessage}";

    if ($mail1->send()) {
        echo "ok";
    } else {
        echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail1->ErrorInfo}";
    }
    

} catch (Exception $e) {
    echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail1->ErrorInfo}";
}
}