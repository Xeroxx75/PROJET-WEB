<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}


//Carrousel


$sql = "SELECT nom_evenement, description, image FROM evenement ORDER BY date_evenement ASC LIMIT 1";
$result = $conn->query($sql);

$event = array();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $event['nom_evenement'] = $row['nom_evenement'];
    $event['description'] = $row['description'];

    // Vérifier si la colonne 'image' est null
    if ($row['image'] !== null) {
        // Récupérer les images de la colonne 'image'
        $images = explode("|", $row['image']);

        // Chemin du dossier des images
        $imageFolder = "photo_evenement/";

        // Chemins complets des images
        $event['images'] = array_map(function($image) use ($imageFolder) {
            return $imageFolder . $image;
        }, $images);
    } else {
        $event['images'] = null; // Aucune image disponible, assigner null
    }
}

$conn->close();

// Retourner l'événement le plus proche en tant que réponse JSON
header('Content-Type: application/json');
echo json_encode($event);


//Fin carrousel

?>
