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

    if (isset($_FILES['logo'])) {
        $logo = $_FILES['logo']['name'];
    }

    $dateDebut = $_POST['Date_debut'];
    $dateFin = $_POST['Date_fin'];
    $description = $_POST['Description'];
    $mail = $_SESSION['email'];
    echo $mail;

     $formation = "SELECT formations FROM `profil` WHERE mail = '$mail'"; 
     $formation =mysqli_query($connexion, $formation);
     if ($formation) {
        $row = mysqli_fetch_assoc($formation);
        $formation = $row['formations'];
        $formation = str_replace("$logo|$dateDebut|$dateFin|$description|", "", $formation);

        echo $formation;
    }

    if ($formation == "") {
        $formation = "/";
    }

    $sql = "UPDATE `profil` SET `formations` = '$formation'";

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