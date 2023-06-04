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
$emailDesabonnement = $_POST['email'];

// Requête de suppression
$sql = "DELETE FROM amis WHERE abonne = '$emailSession' AND abonnement = '$emailDesabonnement'";

if ($conn->query($sql) === TRUE) {
  // Succès de la suppression
  echo "Désabonnement effectué avec succès";
} else {
  // Erreur lors de la suppression
  echo "Erreur lors du désabonnement : " . $conn->error;
}

// Fermer la connexion à la base de données
$conn->close();
?>
