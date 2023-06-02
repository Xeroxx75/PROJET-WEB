<?php
// Récupérer l'adresse id de levenement duquel on veut récupérer les commentaires
$idEvenement = $_GET['id_evenement'];

// Connexion à la base de données
$serveur = "localhost";
$utilisateur = "root";
$mdp = "";
$bdd = "projet_piscine";

$conn = new mysqli($serveur, $utilisateur, $mdp, $bdd);

// Vérifier la connexion
if ($conn->connect_error) {
  die('Erreur de connexion à la base de données : ' . $conn->connect_error);
}


// Requête SQL pour récupérer les commentaires et les informations des auteurs
$sql = "SELECT commentaire.texte, profil.nom, profil.prenom
        FROM commentaire
        INNER JOIN profil ON commentaire.auteur_mail = profil.mail
        WHERE commentaire.id_post = $idEvenement";

$result = $conn->query($sql);

// Vérifier si des résultats ont été trouvés
if ($result->num_rows > 0) {
    // Créer un tableau pour stocker les commentaires
    $commentaires = array();

    // Parcourir les résultats et ajouter les commentaires au tableau
    while ($row = $result->fetch_assoc()) {
        $commentaire = $row["texte"];
        $auteurNom = $row["nom"];
        $auteurPrenom = $row["prenom"];

        // Ajouter le commentaire au tableau
        $commentaires[] = array(
            "texte" => $commentaire,
            "nom" => $auteurNom,
            "prenom" => $auteurPrenom
        );
    }

    // Convertir le tableau en JSON et le renvoyer en réponse
    header('Content-Type: application/json');
    echo json_encode($commentaires);
} else {
    echo 'error';
}

// Fermer la connexion à la base de données
$conn->close();
?>