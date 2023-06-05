<?php
// Connexion à la base de données
$servername = "localhost"; // Adresse du serveur MySQL
$username = "root"; // Nom d'utilisateur MySQL
$password = ""; // Mot de passe MySQL
$dbname = "projet_piscine"; // Nom de la base de données

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES['photo_de_profil'])) {
        $photo_de_profil = $_FILES['photo_de_profil'];
    }
    if (isset($_FILES['image_fond'])) {
        $image_fond = $_FILES['image_fond'];
    }
    $mail = $_POST['mail'];
    $formations = $_POST['formations'];
    $projets = $_POST['projets'];
    $chemin_xml = $_POST['chemin_xml'];
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $description = $_POST['description'];
    $lieu_travail = $_POST['lieu_travail'];
    $parcours_scolaire = $_POST['parcours_scolaire'];
    $password = $_POST['password'];
    $role = $_POST['role'];

    if ($role == "admin") {
        $est_administrateur = 1;
        $est_auteur = 0;
    } else {
        $est_administrateur = 0;
        $est_auteur = 1;
    }

    if (($photo_de_profil['error'] === UPLOAD_ERR_OK) || ($image_fond['error'] === UPLOAD_ERR_OK)) {
        // Définir les dimensions maximales souhaitées
        $maxWidth = 400;
        $maxHeight = 400;
        $tempFilePath = $photo_de_profil['tmp_name'];
        $fileName_photo_profil = $mail . '_photo_profil' . '.png';
        $uploadDir = 'photo_profil/';

    
        if (move_uploaded_file($tempFilePath, $uploadDir . $fileName_photo_profil)) {
            echo 'La photo de profil a été sauvegardée avec succès.';
        } else {
            echo 'Une erreur s\'est produite lors de la sauvegarde de l\'image.';
        }

        $tempFilePath = $image_fond['tmp_name'];
        $fileName_image_fond = $mail . '_image_fond' . '.png';
        $uploadDir = 'image_fond/';
    
        if (move_uploaded_file($tempFilePath, $uploadDir . $fileName_image_fond)) {
            echo 'L\'image de fond a été sauvegardée avec succès.';
        } else {
            echo 'Une erreur s\'est produite lors de la sauvegarde de l\'image.';
        }
        $sql = "INSERT INTO profil (mail, formations, projets, chemin_xml, photo_profil, image_fond, nom, prenom,description, lieu_travail, parcours_scolaire, est_administrateur, est_auteur, password)
        VALUES ('$mail', '$formations', '$projets', '$chemin_xml', '$fileName_photo_profil', '$fileName_image_fond', '$nom', '$prenom', '$description', '$lieu_travail', '$parcours_scolaire', '$est_administrateur', '$est_auteur', '$password')";
    }
    else
    {
        echo 'Pas d\' image de fond ou de photo de profil donc par défaut';
        $sql = "INSERT INTO profil (mail, formations, projets, chemin_xml, photo_profil, image_fond, nom, prenom,  description, lieu_travail, parcours_scolaire, est_administrateur, est_auteur, password)
        VALUES ('$mail', '$formations', '$projets', '$chemin_xml', 'default_photo_profil.png', 'default_image_fond.png', '$nom', '$prenom',  '$description', '$lieu_travail', '$parcours_scolaire', '$est_administrateur', '$est_auteur', '$password')";
    }
    // Requête SQL pour insérer un membre dans la table profil


    if ($conn->query($sql) === TRUE) {
        echo "sucess";
    } else {
        echo "error";
    }
}

$conn->close();
?>
