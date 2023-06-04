<?php
// Démarrez la session
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

// Créer une connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
  die("Connexion échouée : " . $conn->connect_error);
}


$emailSession = $_SESSION['email']; // Remplacez 'email' par la clé appropriée dans votre session

// Récupérer l'e-mail à partir des données POST
$emailAbonnement = $_POST['email'];

// Requête d'insertion
$sql = "INSERT INTO amis (abonne, abonnement) VALUES ('$emailSession', '$emailAbonnement')";

if ($conn->query($sql) === TRUE) {
  // Succès de l'insertion
  echo "Abonnement ajouté avec succès";
} else {
  // Erreur lors de l'insertion
  echo "Erreur lors de l'ajout de l'abonnement : " . $conn->error;
}

// Fermer la connexion à la base de données
$conn->close();
?>
