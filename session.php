<?php

session_start();
$_SESSION['mail'] = "exemple2@mail.com";
$mail = $_SESSION['mail'];
echo $mail;




?>
