<?php
// Récupérez les valeurs mises à jour depuis la requête POST ou GET




if($_POST['supprimer']==0){
    $updatedId = $_POST['id'];
    $updatedTitre = $_POST['titre'];
    $updatedDateEvenement = $_POST['date'];
    $updatedDescription = $_POST['description'];
}
else{
    $updatedId = $_POST['id'];
}

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

// Préparez et exécutez la requête SQL UPDATE pour mettre à jour les données


if($_POST['supprimer']==0){
    $updatedDescription = str_replace("'", "''", $updatedDescription);
    $updatedTitre = str_replace("'", "''", $updatedTitre);
    $sql = "UPDATE evenement SET 
                nom_evenement = '$updatedTitre',
                date_evenement = '$updatedDateEvenement',
                description = '$updatedDescription'
            WHERE id_evenement = $updatedId";
}
else{
    $sql = "DELETE FROM evenement WHERE id_evenement = $updatedId";
}

if ($conn->query($sql) === TRUE) {
    // Les données ont été mises à jour avec succès
    //$response = array('success' => true, 'message' => 'Les données ont été mises à jour avec succès.');
    $response=$_POST;
} else {
    // Erreur lors de la mise à jour des données
    $response = array('success' => false, 'message' => 'Erreur lors de la mise à jour des données: ' . $conn->error);
}

$conn->close();

// Renvoyer la réponse JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
