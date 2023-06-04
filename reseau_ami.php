<?php
session_start();

// Connexion à la base de données
$serveur = "localhost";
$utilisateur = "root";
$motDePasse = "";
$baseDeDonnees = "projet_piscine";

$connexion = new mysqli($serveur, $utilisateur, $motDePasse, $baseDeDonnees);

if ($connexion->connect_error) {
    die("Échec de la connexion à la base de données : " . $connexion->connect_error);
}

// Vérifiez si l'utilisateur est connecté et que l'e-mail est stocké dans la session
if (isset($_SESSION['email'])) {
    // Récupérez l'e-mail de l'utilisateur de la session actuelle
    $utilisateur_session = $_SESSION['email'];
}

// Requête SQL pour récupérer les données du membre
$sql = "SELECT p.nom, p.prenom, p.photo_profil, p.mail, p.description
    FROM profil p
    INNER JOIN amis a1 ON p.mail = a1.abonnement
    LEFT JOIN amis a2 ON p.mail = a2.abonnement AND a2.abonne = '$utilisateur_session'
    WHERE a2.abonne IS NULL
    AND a1.abonne IN (
        SELECT abonnement
        FROM amis
    WHERE abonne = '$utilisateur_session'
    )";

$result = $connexion->query($sql);

if ($result->num_rows > 0) {
    // Parcourir les résultats et stocker les données dans un tableau
    $amis = array();
    while ($row = $result->fetch_assoc()) {
        $ami = array(
            'nom' => $row['nom'],
            'prenom' => $row['prenom'],
            'photo_profil' => $row['photo_profil'],
            'mail' => $row['mail'],
            'description' => $row['description']
        );
        $amis[] = $ami;
    }
    
    // Créer un tableau contenant les amis
    $response = array('amis' => $amis);
    $jsonResponse = json_encode($response);
    
    // Envoyer la réponse JSON
    header('Content-Type: application/json');
    echo $jsonResponse;
} else {
    //echo "Aucun membre trouvé.";
}

$connexion->close();
?>
