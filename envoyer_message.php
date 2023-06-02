<?php

session_start();

// Connexion à la base de données
$servername = "localhost"; // Adresse du serveur MySQL
$username = "root"; // Nom d'utilisateur MySQL
$password = ""; // Mot de passe MySQL
$dbname = "projet_piscine"; // Nom de la base de données

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id_messagerie = $_POST['id_messagerie'];

    $sql = "SELECT COUNT(*) AS total_messages FROM message;";
    $result = $conn->query($sql);
    $id_message = $result->fetch_assoc()['total_messages'] + 1;
    $envoyeur_mail = $_SESSION['email'];
    $texte = $_POST['message_text'];
    if (isset ($_FILES['message_file'])) {
        $image = $_FILES['message_file'];
        if ($image['error'] === UPLOAD_ERR_OK)
        {
            $tempFilePath = $image['tmp_name'];
            $fileName_image= $id_message . '.png';
            $uploadDir = 'image_message/';
            $upload = $uploadDir . $fileName_image;
            if (move_uploaded_file($tempFilePath, $upload)) {
                echo 'L\'image a été sauvegardée avec succès.';
            } else {
                echo 'Une erreur s\'est produite lors de la sauvegarde de l\'image.';
            }
            $sql = "INSERT INTO message (id_message, envoyeur_mail, texte, image, id_messagerie) VALUES ('$id_message', '$envoyeur_mail', '$texte', '$upload', '$id_messagerie');";
            $result = $conn->query($sql);
            if ($result) {
                echo "Message envoyé";
            }
            else {
                echo "Erreur";
            }
        }
        else{
            echo "Erreur upload image";

        }
        
    }
    else{
        $image = "/";
        $sql = "INSERT INTO message (id_message, envoyeur_mail, texte, image, id_messagerie) VALUES ('$id_message', '$envoyeur_mail', '$texte', '$image', '$id_messagerie');";
        echo $sql;
        $result = $conn->query($sql);
        if ($result) {
            echo "Message envoyé";
        }
        else {
            echo "Erreur";
        }
    }
}
else
{
    echo "Erreur";
}


?>