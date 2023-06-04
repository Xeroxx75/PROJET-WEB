<?php
// Démarrez la session
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

// Requête pour récupérer le dernier emploi
$query = "SELECT * FROM emplois ORDER BY id_emplois DESC LIMIT 1";
$result = mysqli_query($conn, $query);

if ($result) {
  // Extraction des données de l'emploi
  $emploi = mysqli_fetch_assoc($result);

  // Fermeture de la requête
  mysqli_free_result($result);

  // Renvoyer les données au format JSON
  header('Content-Type: application/json');
  echo json_encode($emploi);
} else {
  // Gestion des erreurs
  echo mysqli_error($conn);
}

// Fermeture de la connexion à la base de données
mysqli_close($conn);
?>
