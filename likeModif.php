<?php

session_start();

// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

// Créer une connexion à la base de données
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier si la connexion a échoué
if ($conn->connect_error) {
    die("La connexion a échoué : " . $conn->connect_error);
}



// Récupérer les valeurs de est_aime et id_post du dictionnaire
$est_aime = $_POST['est_aime'];
$id_post = $_POST['id_post'];


// Vérifier si l'utilisateur est connecté
if (isset($_SESSION['email'])) {
    $email_utilisateur = $_SESSION['email'];

    // Vérifier si l'utilisateur a aimé le post
    if ($est_aime == "true") {
        // Ajouter l'entrée à la table "aimer"
        $sql_ajouter = "INSERT INTO aimer (auteur_mail, id_post) VALUES ('$email_utilisateur', '$id_post')";
        $conn->query($sql_ajouter);
    } else {
        // Supprimer l'entrée de l'utilisateur et du post de la table "aimer"
        $sql_supprimer = "DELETE FROM aimer WHERE auteur_mail = '$email_utilisateur' AND id_post = '$id_post'";
        $conn->query($sql_supprimer);
    }
}

// Récupérer le nombre de lignes dans la table "aimer" pour l'id_post donné
$sql_nombre_lignes = "SELECT COUNT(id_post) AS count FROM aimer WHERE id_post = '$id_post'";
$result_nombre_lignes = $conn->query($sql_nombre_lignes);

if ($result_nombre_lignes->num_rows > 0) {
    $row = $result_nombre_lignes->fetch_assoc();
    $nombre_lignes = $row['count'];
} else {
    $nombre_lignes = 0;
}

// Fermer la connexion à la base de données
$conn->close();

// Créer un tableau associatif pour les données à renvoyer en JSON
$response = array(
    'nombre_likes' => $nombre_lignes,
    'est_aime' => $est_aime
);

// Renvoyer la réponse en tant que JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
