<?php

// Démarrez la session
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("Erreur de connexion à la base de données : " . mysqli_connect_error());
}

// Insertion d'une nouvelle ligne dans la table evenement
$sql = "INSERT INTO evenement (nom_evenement, date_evenement, description, image, auteur_mail)
        VALUES ('Nouvel événement', '2023-06-03', 'Description de l\'événement', 'image.jpg', 'example@mail.com')";
if (mysqli_query($conn, $sql)) {
    // Récupérer l'ID de l'insertion
    $id_evenement = mysqli_insert_id($conn);
    //echo "ID de l'insertion : " . $id_evenement . "<br>";

    // Supprimer la ligne insérée
    $deleteSql = "DELETE FROM evenement WHERE id_evenement = $id_evenement";
    if (mysqli_query($conn, $deleteSql)) {
        //echo "Ligne supprimée avec succès.";
    } else {
        echo "Erreur lors de la suppression : " . mysqli_error($conn);
    }
} else {
    echo "Erreur lors de l'insertion : " . mysqli_error($conn);
}

echo $id_evenement;

// Fermer la connexion à la base de données
mysqli_close($conn);
?>

