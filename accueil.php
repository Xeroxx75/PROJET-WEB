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

// Obtenir la date du début de la semaine actuelle (lundi)
$firstDayOfWeek = date('Y-m-d', strtotime('monday this week'));

// Obtenir la date de la fin de la semaine actuelle (dimanche)
$lastDayOfWeek = date('Y-m-d', strtotime('sunday this week'));

$sql = "SELECT nom_evenement, description, image FROM evenement WHERE date_evenement >= '$firstDayOfWeek' AND date_evenement <= '$lastDayOfWeek' ORDER BY date_evenement ASC LIMIT 1";$result = $conn->query($sql);

$event = array();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $event['nom_evenement'] = $row['nom_evenement'];
    $event['description'] = $row['description'];

    // Récupérer les images de la colonne 'image'
    $images = explode("|", $row['image']);

    // Chemin du dossier des images
    $imageFolder = "photo_evenement/";

    // Chemins complets des images
    $event['images'] = array_map(function($image) use ($imageFolder) {
        return $imageFolder . $image;
    }, $images);
}

$conn->close();

// Retourner l'événement le plus proche en tant que réponse JSON
header('Content-Type: application/json');
echo json_encode($event);

//Fin carrousel

?>
