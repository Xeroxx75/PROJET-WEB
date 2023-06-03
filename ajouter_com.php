<?php

// Démarrez la session
session_start();

// Récupérer les valeurs envoyées depuis le JavaScript
$idEvenement = $_POST['id_evenement'];
$commentaireText = $_POST['commentaire'];
$auteurMail = $_SESSION['email'];


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Préparer la requête SQL pour insérer le commentaire dans la table "commentaire"
$sql = "INSERT INTO commentaire (id_post, texte, auteur_mail) VALUES ('$idEvenement', '$commentaireText', '$auteurMail')";

if ($conn->query($sql) === TRUE) {
    // Le commentaire a été ajouté avec succès
    echo "Le commentaire a été ajouté";
} else {
    // Une erreur s'est produite lors de l'ajout du commentaire
    echo "Erreur lors de l'ajout du commentaire : " . $conn->error;
}

$conn->close();
?>
