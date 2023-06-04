<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Vérification de la présence de l'e-mail dans la colonne "abonnes"
$response = array(); // Tableau pour la réponse JSON

if (isset($_POST['email'])) {
    $email = $conn->real_escape_string($_POST['email']);
    $sql = "SELECT COUNT(*) AS count FROM amis WHERE abonne LIKE '%$email%'";
    $result = $conn->query($sql);
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response['count'] = $row['count'];
    } else {
        $response['count'] = 0;
    }
} else {
    $response['count'] = 0;
}

// Envoi de la réponse au format JSON
header('Content-Type: application/json');
echo json_encode($response);

// Fermeture de la connexion à la base de données
$conn->close();
?>