<?php

session_start();

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

// Créer une connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier si la connexion a échoué
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}

// Récupérer l'id_post depuis JavaScript (assumons que sa valeur est stockée dans une variable nommée $id_post_js)
$id_post_js = $_POST['id_post'];


// Vérifier si l'email de l'utilisateur de la session est dans la table "aimer"
$email_utilisateur = $_SESSION['email']; // Remplacez par l'email de l'utilisateur de la session
$est_aime = false;

$sql_verifier_email = "SELECT COUNT(id_post) AS count FROM aimer WHERE auteur_mail = '$email_utilisateur' AND id_post = '$id_post_js'";
$result_verifier_email = $conn->query($sql_verifier_email);

if ($result_verifier_email->num_rows > 0) {
    $row = $result_verifier_email->fetch_assoc();
    $est_aime = ($row['count'] > 0);
}

// Récupérer le nombre de lignes dans la table "aimer" pour l'id_post donné
$sql_nombre_lignes = "SELECT COUNT(id_post) AS count FROM aimer WHERE id_post = '$id_post_js'";
$result_nombre_lignes = $conn->query($sql_nombre_lignes);

if ($result_nombre_lignes->num_rows > 0) {
    $row = $result_nombre_lignes->fetch_assoc();
    $nombre_lignes = $row['count'];
} else {
    $nombre_lignes = 0;
}

// Fermer la connexion à la base de données
$conn->close();

// Créer un tableau associatif pour les données à renvoyer en JSON
$response = array(
    'nombre_likes' => $nombre_lignes,
    'est_aime' => $est_aime
);

// Renvoyer la réponse en tant que JSON
header('Content-Type: application/json');
echo json_encode($response);
?>