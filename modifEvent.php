<?php
// Connexion à la base de données (à ajuster selon vos paramètres)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}
session_start();
$mail = $_SESSION['email'];



// Requête SQL pour récupérer les événements de l'auteur spécifié
$sql = "SELECT * FROM evenement WHERE auteur_mail='$mail';";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Tableau pour stocker les événements
    $evenements = array();

    // Parcourir chaque ligne de résultat
    while ($row = $result->fetch_assoc()) {
        // Ajouter chaque événement au tableau
        $evenements[] = $row;
    }

    // Convertir le tableau en format JSON
    $json_evenements = json_encode($evenements);

    // Envoyer les données JSON au script JavaScript
    echo $json_evenements;
    
} else {
    echo "Aucun événement trouvé.";
}
// Fermeture de la connexion à la base de données
$conn->close();
?>
