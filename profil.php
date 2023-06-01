<?php
// Connexion à la base de données
$serveur = "localhost";
$utilisateur = "root";
$mdp = "";
$bdd = "projet_piscine";

$connexion = new mysqli($serveur, $utilisateur, $mdp, $bdd);

// Vérification de la connexion
if ($connexion->connect_error) {
    die("Erreur de connexion à la base de données : " . $connexion->connect_error);
}

// Requête pour récupérer les emplois
$requete = "SELECT * FROM profil";
$resultat = $connexion->query($requete);

// Conversion des résultats en un tableau associatif
$profils = array();
if ($resultat->num_rows > 0) {
    while ($row = $resultat->fetch_assoc()) {
        $profils[] = $row;
    }
}

// Fermeture de la connexion à la base de données
$connexion->close();

// Conversion du tableau PHP en chaîne JSON
$jsonProfils = json_encode($profils);


// Envoi des données au fichier JavaScript
echo $jsonProfils;




?>
