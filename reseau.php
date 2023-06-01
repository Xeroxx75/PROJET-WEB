<?php

// Démarrez la session
session_start();

// Connexion à la base de données
$serveur = "localhost";
$utilisateur = "root";
$motDePasse = "";
$baseDeDonnees = "projet_piscine";

$connexion = new mysqli($serveur, $utilisateur, $motDePasse, $baseDeDonnees);

// Vérification de la connexion
if ($connexion->connect_error) {
    die("Échec de la connexion à la base de données : " . $connexion->connect_error);
}

// Vérifiez si l'utilisateur est connecté et que l'e-mail est stocké dans la session
if (isset($_SESSION['email'])) {
    // Récupérez l'e-mail de l'utilisateur de la session actuelle
    $email = $_SESSION['email'];

    // Utilisez l'e-mail dans votre code, par exemple :
    $response = array('email' => $email);

    // Récupérez les abonnements de l'utilisateur depuis la table "amis"
    $resultat = $connexion->query("SELECT abonnement FROM amis WHERE abonne = '$email'");
    $abonnementsEmails = array();

    while ($row = $resultat->fetch_assoc()) {
        $abonnementsEmails[] = $row['abonnement'];
    }

    // Récupérez les informations des abonnements depuis la table "profil"

$donneesAbonnements = array();

foreach ($abonnementsEmails as $abonnementEmail) {
    $resultatAbonnement = $connexion->query("SELECT photo_profil, nom, prenom, description FROM profil WHERE mail = '$abonnementEmail'");
    $rowAbonnement = $resultatAbonnement->fetch_assoc();
    
    // Ajouter l'e-mail de l'abonnement à l'array $rowAbonnement
    $rowAbonnement['email'] = $abonnementEmail;

    $donneesAbonnements[] = $rowAbonnement;
}

$response['abonnements'] = $donneesAbonnements;



    // Conversion des données en format JSON
    $donnees_json = json_encode($response);

    // Retourner les données au format JSON
    echo $donnees_json;
} else {
    // L'utilisateur n'est pas connecté ou l'e-mail n'est pas disponible dans la session
    $response = array('error' => 'Utilisateur non connecté ou e-mail non disponible.');
    echo json_encode($response);
}

// Fermeture de la connexion à la base de données
$connexion->close();

?>
