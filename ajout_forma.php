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
        $logo = $_FILES['logo'];
    }

    $dateDebut = $_POST['Date_debut'];
    $dateFin = $_POST['Date_fin'];
    $description = $_POST['Description'];
    $mail = $_SESSION['email'];

    $nanelogo = $_FILES['logo']['name'];
    echo $nanelogo;

   
    if ($logo['error'] === UPLOAD_ERR_OK) {
        // Définir les dimensions maximales souhaitées
        $uploadDir = 'logo/';
        $tempFilePath = $logo['tmp_name'];

    
        if (move_uploaded_file($tempFilePath, $uploadDir . $nanelogo)) {
            echo 'La photo de profil a été sauvegardée avec succès.';
        } else {
            echo 'Une erreur s\'est produite lors de la sauvegarde de l\'image.';
        }
    }

     $formation = "SELECT formations FROM `profil` WHERE mail = '$mail'"; 
     $formation =mysqli_query($connexion, $formation);
     if ($formation) {
        $row = mysqli_fetch_assoc($formation);
        $formation = $row['formations'];
    
        // Utilisez la variable $formation ici comme vous le souhaitez
        echo $formation;
    }
    if ($formation != "/") {
        $formation = $formation;
    }
    elseif ($formation == "/") {
        $formation = "";
    }
    if ($nanelogo === "") {
        $nanelogo = "default.png";
    }
    $sql = "UPDATE `profil` SET `formations` = CONCAT('$formation', '$nanelogo', '|', '$dateDebut', '|', '$dateFin', '|', '$description','|')";

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