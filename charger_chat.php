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
    $i = 0;
    $id_messagerie = $_POST['id_messagerie'];

    $sql = "SELECT video_string FROM video where id_messagerie = '$id_messagerie';";

    $result = $conn->query($sql);
    if ($result)
    {
        $row = $result->fetch_assoc();
        $tab[$i] = $row;
    }
    else {
        $tab[$i] = "error";
    }

    $sql = "SELECT * FROM message WHERE id_messagerie = '$id_messagerie' ORDER BY id_message ASC;";
    $result = $conn->query($sql);
    //echo $sql;
    if ($result->num_rows != 0)
    {
        $i++;
        $tab[$i] = $_SESSION['email'];
        $i++;
        for ($i; $i < $result->num_rows+2; $i++) {
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
// Autres traitements nécessaires avant cette partie
else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_GET['id_messagerie']) && isset($_GET['id_call']))
    {
        $id_call = $_GET['id_call'];
        $id_messagerie = $_GET['id_messagerie'];
        $sql = "DELETE FROM video WHERE id_messagerie = '$id_messagerie';";
        $result = $conn->query($sql);
    
        $sql ="INSERT INTO video (video_string, id_messagerie) VALUES ('$id_call', '$id_messagerie');";
        $result = $conn->query($sql);
        if ($result == TRUE) {
            echo "success";
        }
        else {
            echo "error";
        }
    }
    else if (isset($_GET['id_messagerie'])){
        $id_messagerie = $_GET['id_messagerie'];
        $sql = "DELETE FROM video WHERE id_messagerie = '$id_messagerie';";
        $result = $conn->query($sql);
    }

}


?>