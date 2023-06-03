<?php
// Connexion à la base de données
session_start();
$serveur = "localhost";
$utilisateur = "root";
$mdp = "";
$bdd = "projet_piscine";

$connexion = new mysqli($serveur, $utilisateur, $mdp, $bdd);

// Vérification de la connexion
if ($connexion->connect_error) {
    die("Erreur de connexion à la base de données : " . $connexion->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $dateDebut = $_POST['Date_debut'];
    $dateFin = $_POST['Date_fin'];
    $description = $_POST['Description'];
    $lieu = $_POST['lieu'];
    $mail = $_SESSION['email'];
    echo $mail;

     $projet = "SELECT projets FROM `profil` WHERE mail = '$mail'"; 
     $projet =mysqli_query($connexion, $projet);
     if ($projet) {
        $row = mysqli_fetch_assoc($projet);
        $projet = $row['projets'];
        $projet = str_replace("$lieu|$dateDebut|$dateFin|$description|", "", $projet);

        echo $projet;
    }


    if ($projet == "") {
        $projet = "/";
    }

    $sql = "UPDATE `profil` SET `projets` = '$projet'";

     echo $sql;

    if ($connexion->query($sql) === TRUE) {
        // Succès de l'insertion dans la base de données
        echo "Formation ajoutée avec succès";
    } else {
        // Échec de l'insertion dans la base de données
        echo "Erreur lors de l'ajout de la formation : " . $connexion->error;
    }
}

// Fermeture de la connexion à la base de données
$connexion->close();
?>