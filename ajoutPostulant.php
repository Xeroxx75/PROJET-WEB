<?php
// Récupérer les données envoyées depuis la requête AJAX
$id_emploi = $_POST['id'];
$mail = $_POST['mail'];

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué: " . $conn->connect_error);
}

// Préparer et exécuter la requête SQL pour mettre à jour le champ profils_postulants
$sql = "UPDATE emplois
SET profils_postulants = CONCAT(profils_postulants, '\n','$mail')
WHERE id_emplois = '$id_emploi'
  AND NOT EXISTS (
    SELECT 1
    FROM (
      SELECT 1
      FROM emplois
      WHERE id_emplois = '$id_emploi'
        AND profils_postulants LIKE CONCAT('%', '$mail', '%')
    ) AS temp
  );
";

if ($conn->query($sql) === TRUE) {
    // Les données ont été mises à jour avec succès
    $response = array('success' => true, 'message' => 'Les données de l\'offre d\'emploi ont été mises à jour avec succès.');
} else {
    // Erreur lors de la mise à jour des données
    $response = array('success' => false, 'message' => 'Erreur lors de la mise à jour des données de l\'offre d\'emploi : ' . $conn->error);
}

$conn->close();

// Renvoyer la réponse JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
