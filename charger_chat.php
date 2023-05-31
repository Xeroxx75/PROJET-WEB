<?php

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo $_SESSION['email'];
    echo $_POST['email_ami'];
}
else
{
    echo "Erreur";
}



?>