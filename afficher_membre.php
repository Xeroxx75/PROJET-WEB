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

    // Requête pour vérifier les informations d'identification de l'utilisateur
    $sql = "SELECT mail, photo_profil FROM profil";
    $result = $conn->query($sql);
    for ($i = 0; $i < $result->num_rows; $i++) {
        // on ajoute chaque ligne de la table dans un tableau
        $row = $result->fetch_assoc();
        $tab[$i] = $row;
    }
    echo json_encode($tab);
}



$conn->close();
?>
