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

// Vérifiez si l'utilisateur est connecté et que l'e-mail est stocké dans la session
if (isset($_SESSION['email'])) {
    // Récupérez l'e-mail de l'utilisateur de la session actuelle
    $email_utilisateur = $_SESSION['email']; // Adresse e-mail de l'utilisateur actuel
}

// Evenements du reseau

// Requête SQL pour récupérer les événements des amis de l'utilisateur, triés par ordre décroissant de date
$sql = "SELECT e.nom_evenement, e.description, e.auteur_mail, GROUP_CONCAT(e.image SEPARATOR '|') AS images
        FROM evenement e
        WHERE (e.auteur_mail IN (
            SELECT abonnement
            FROM amis
            WHERE abonne = '$email_utilisateur' 
            AND abonnement IN (SELECT abonne FROM amis WHERE abonnement = 'exemple@mail.com')
        ))
        GROUP BY e.nom_evenement, e.description, e.auteur_mail
        ORDER BY e.date_evenement DESC
        LIMIT 1";

$result = $conn->query($sql);

$evenement = null;

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    $imagePath = 'photo_evenement/';
    $images = $row['images'];

    $eventImages = array();

    if ($images !== null) {
        $imageArray = explode('|', $images);

        foreach ($imageArray as $image) {
            if (!empty($image)) {
                $eventImages[] = $imagePath . $image;
            }
        }
    }

    if (count($eventImages) === 0) {
        $eventImages[] = null;
    }

    $evenement = array(
        'nom_evenement' => $row['nom_evenement'],
        'description' => $row['description'],
        'auteur_mail' => $row['auteur_mail'],
        'images' => $eventImages
    );
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($evenement);

// Fin evenements du reseau

?>
