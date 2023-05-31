<?php

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
    $mail = $_POST['mail'];

    $sql = "DELETE FROM profil WHERE mail = '$mail'";
    $result = $conn->query($sql);
    if ($result) {
        echo "Le membre a été supprimé avec succès.";
    } else {
        echo "Une erreur s'est produite lors de la suppression du membre.";
    }

    $nom_photo = 'photo_profil/' . $mail . '_photo_profil'. '.png';
    $image_fond = 'image_fond/' . $mail . '_image_fond' . '.png';


    if (file_exists($nom_photo)) {
        if (unlink($nom_photo)) {
            echo 'L\'image a été supprimée avec succès.';
        } 
        else {
            echo 'Une erreur s\'est produite lors de la suppression de l\'image.';
        }
    } 
    else {
        echo 'L\'image n\'existe pas.';
    }
    if (file_exists($image_fond)) {
        if (unlink($image_fond)) {
            echo 'L\'image a été supprimée avec succès.';
        } 
        else {
            echo 'Une erreur s\'est produite lors de la suppression de l\'image.';
        }
    } 
    else {
        echo 'L\'image n\'existe pas.';
    }
}

?>

