<?php

session_start();
$_SESSION['mail'] = "exemple@mail.com";
$mail = $_SESSION['mail'];
echo $mail;




?>
