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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire de connexion
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Requête pour vérifier les informations d'identification de l'utilisateur
    $sql = "SELECT * FROM profil WHERE mail = '$email' AND password = '$password'";
    $result = $conn->query($sql);
    if ($result->num_rows == 1) {
        // Authentification réussie, définir la variable de session et rediriger vers la page de profil
        $_SESSION['email'] = $email;
        if ($result->fetch_assoc()['est_administrateur'] == 1) {
            $_SESSION['est_admin'] = 1;
            echo "admin";
        }
        
    } else {
        echo "false";
    }
}

$conn->close();
?>
