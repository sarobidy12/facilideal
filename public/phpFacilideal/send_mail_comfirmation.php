<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
 
// Load Composer's autoloader
require 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    //  $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'mail.facilodeal.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'test@facilodeal.com';                     // SMTP username
    $mail->Password   = '%G@I;i,g5Af2';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above


    $prenom = htmlspecialchars("dsadsdsad");    
    $mail_address = htmlspecialchars("sarobidyalliance@outlook.com"); 
    $password=htmlspecialchars("dsdss"); 
    
    //Recipients
    $mail->setFrom( $mail_address, 'Code de comfirmation d\'inscription');
    $mail->addAddress( $mail_address, $prenom);     // Add a recipient
    //  $mail->addAddress('ellen@example.com');               // Name is optional
    $mail->addReplyTo('test@facilodeal.com', 'Code de comfirmation');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');
    
    $mail->From = 'test@facilodeal.com';
    $mail->Sender = 'test@facilodeal.com';

    // Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Facilideal';
    $mail->Body= '<h1 style="text-align:center;margin:0;width:100%;height:10vh;background-color: rgb(2, 109, 242);line-height: 9.5vh;color:white;font-family: calibri;">Facilideal</h1><br /><br />Bonjour '.$prenom.',<br /><br />Merci pour votre inscription Veuillez utiliser le code suivant pour terminer la vérification :<br/> <br/> <b> '.$password.'</b> ';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->CharSet = 'UTF-8';
        $mail->send();
        
            echo json_encode('send-mail-comfirm');
    
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}