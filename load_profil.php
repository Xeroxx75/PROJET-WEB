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
    $i = 0;
    $row = $result->fetch_assoc();
    $tab[$i] = $row;
    $sql = "SELECT COUNT(*) AS nombre_abonnements FROM amis WHERE abonne = '$email';";
    $result = $conn->query($sql);
    // Ajouter le résultat de la requête dans le tableau
    $row = $result->fetch_assoc();
    $i++;
    $tab[$i]['nombre_abonnements'] = $row['nombre_abonnements'];
    $sql = "SELECT COUNT(*) AS nombre_abonnes FROM amis WHERE abonnement = '$email';";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $i++;
    $tab[$i]['nombre_abonnes'] = $row['nombre_abonnes'];
    
    
    echo json_encode($tab);

}



$conn->close();
?>
