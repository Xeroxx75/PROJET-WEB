<?php
// Récupérez les valeurs mises à jour depuis la requête POST ou GET

$updatedTitre = $_POST['titre'];
$updatedDatePublication = $_POST['date_publication'];
$updatedLieu = $_POST['lieu'];
$updatedDateEmbauche = $_POST['date_embauche'];
$updatedDuree = $_POST['duree'];
$updatedContrat = $_POST['contrat'];
$updatedDescription = $_POST['description'];
$updatedRemuneration = $_POST['remuneration'];
$mail = $_POST['mail'];
$profis_postulants = '';
// Effectuez la connexion à votre base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifiez la connexion
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

$updatedDescription = str_replace("'", "''", $updatedDescription);
// Préparez et exécutez la requête SQL UPDATE pour mettre à jour les données
$sql = "INSERT INTO emplois (titre, date_publication, date_embauche, duree, contrat, description, remuneration, lieu, auteur_offre_mail, profils_postulants) 
        VALUES ('$updatedTitre', '$updatedDatePublication', '$updatedDateEmbauche', '$updatedDuree', '$updatedContrat', '$updatedDescription', $updatedRemuneration, '$updatedLieu', '$mail','$profis_postulants')";


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
