<?php
// Récupérer l'adresse e-mail du paramètre GET
$email = $_GET['email'];

// Connexion à la base de données
$serveur = "localhost";
$utilisateur = "root";
$mdp = "";
$bdd = "projet_piscine";

$conn = new mysqli($serveur, $utilisateur, $mdp, $bdd);

// Vérifier la connexion
if ($conn->connect_error) {
  die('Erreur de connexion à la base de données : ' . $conn->connect_error);
}

// Échapper les données pour éviter les injections SQL (optionnel, mais recommandé)
$email = $conn->real_escape_string($email);

// Exécuter la requête SQL pour récupérer les données du profil
$sql = "SELECT * FROM profil WHERE mail = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $row = $result->fetch_assoc();

  // Convertir les résultats en JSON et les renvoyer en réponse
  header('Content-Type: application/json');
  echo json_encode($row);
} else {
  echo 'Aucun profil trouvé pour l\'adresse e-mail : ' . $email;
}

// Fermer la connexion à la base de données
$conn->close();
?>
