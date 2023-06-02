<?php

session_start();

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
    $id_messagerie = $_POST['id_messagerie'];
    $sql = "SELECT * FROM message WHERE id_messagerie = '$id_messagerie' ORDER BY id_message ASC;";
    $result = $conn->query($sql);
    //echo $sql;
    if ($result->num_rows != 0)
    {
        $i = 0;
        $tab[$i] = $_SESSION['email'];
        $i++;
        for ($i; $i < $result->num_rows+1; $i++) {
            // on ajoute chaque ligne de la table dans un tableau
            $row = $result->fetch_assoc();
            $tab[$i] = $row;
        }

        echo json_encode($tab);
    }
    else {
        echo "error";
    }
}
else
{
    echo "Erreur";
}



?>