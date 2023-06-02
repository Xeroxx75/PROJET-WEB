<?php
// Connexion à la base de données (à ajuster selon vos paramètres)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}
session_start();
$mail = $_SESSION['email'];
// Récupération des données du formulaire
$title = $_POST['title'];
$description = $_POST['description'];
$date = $_POST['date'];

// Requête SQL pour insérer les données dans la table "evenement"
$sql = "INSERT INTO evenement (nom_evenement, description, date_evenement, auteur_mail) VALUES ('$title', '$description', '$date', '$mail')";
if ($conn->query($sql) === TRUE) {
    echo "Événement ajouté avec succès !";
} else {
    echo "Erreur : " . $sql . "<br>" . $conn->error;
}

// Fermeture de la connexion à la base de données
$conn->close();
?>
