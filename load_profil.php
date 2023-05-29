<?php

session_start();

// Configuration de la connexion à la base de données
$servername = "localhost";
$username = "root"; // Remplacez par votre nom d'utilisateur MySQL
$password = ""; // Remplacez par votre mot de passe MySQL
$dbname = "projet_piscine";

// Établissement de la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification des erreurs de connexion
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Récupérer les données du formulaire de connexion
    $email = $_SESSION['email'];

    // Requête pour vérifier les informations d'identification de l'utilisateur
    $sql = "SELECT * FROM profil WHERE mail = '$email'";
    $result = $conn->query($sql);

    echo json_encode($result->fetch_assoc());
}

$conn->close();
?>
