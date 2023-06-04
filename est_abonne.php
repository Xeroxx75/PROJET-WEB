<?php
session_start();

// Récupérer l'e-mail de l'utilisateur de la session
$sessionEmail = $_SESSION['email']; // Assurez-vous que la session est démarrée et que 'mail' est la clé appropriée

// Récupérer l'e-mail cible depuis la requête GET
$cibleEmail = $_GET['email_cible'];

// Établir la connexion à la base de données (remplacez les valeurs appropriées)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier les erreurs de connexion
if ($conn->connect_error) {
    die("Erreur de connexion à la base de données : " . $conn->connect_error);
}

// Préparer la requête SQL pour vérifier si l'utilisateur de la session est abonné à l'e-mail cible
$sql = "SELECT COUNT(*) AS count FROM amis WHERE abonne = '$sessionEmail' AND abonnement = '$cibleEmail'";

// Exécuter la requête SQL
$result = $conn->query($sql);

// Vérifier s'il y a des résultats
if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $count = $row['count'];

    // Vérifier le nombre de résultats pour déterminer si l'utilisateur est abonné ou non
    $estAbonne = ($count > 0);
    
} else {
    // En cas d'erreur ou de pas de correspondance, l'utilisateur n'est pas abonné
    $estAbonne = false;
}

// Fermer la connexion à la base de données
$conn->close();

// Renvoyer la réponse en tant que JSON
header('Content-Type: application/json');
echo json_encode($estAbonne);
?>
