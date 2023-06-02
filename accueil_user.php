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
    $email_utilisateur = $_SESSION['email'];; // Adresse e-mail de l'utilisateur actuel
}

//Evenements du reseau

// Requête SQL pour récupérer les événements avec toutes les images et l'auteur
$sql = "SELECT e.nom_evenement, e.description, e.auteur_mail, GROUP_CONCAT(e.image SEPARATOR '|') AS images
        FROM evenement e
        WHERE e.auteur_mail = '$email_utilisateur' OR e.auteur_mail IN (
            SELECT a.abonnement
            FROM amis a
            WHERE a.abonne = '$email_utilisateur'
        )
        GROUP BY e.nom_evenement, e.description, e.auteur_mail
        ORDER BY e.date_evenement ASC";

$result = $conn->query($sql);

$evenements = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $imagePath = 'photo_evenement/';
        $images = $row['images'];

        $eventImages = array(); // Créer un tableau vide par défaut

        if ($images !== null) { // Vérifier si les images ne sont pas null
            $imageArray = explode('|', $images);

            // Parcourir toutes les images de l'événement
            foreach ($imageArray as $image) {
                if (!empty($image)) { // Vérifier si l'image n'est pas vide
                    $eventImages[] = $imagePath . $image;
                }
            }
        }

        if (count($eventImages) === 0) { // Vérifier si le tableau d'images est vide
            $eventImages[] = null; // Ajouter une valeur null dans le tableau
        }

        $evenement = array(
            'nom_evenement' => $row['nom_evenement'],
            'description' => $row['description'],
            'auteur_mail' => $row['auteur_mail'],
            'images' => $eventImages
        );
        $evenements[] = $evenement;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($evenements);




//Fin evenements du reseau

?>
