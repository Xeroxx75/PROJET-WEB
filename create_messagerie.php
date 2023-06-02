<?php

session_start();

// Configuration de la connexion à la base de données
$servername = "localhost";
$username = "root"; // Remplacez par votre nom d'utilisateur MySQL
$password = ""; // Remplacez par votre mot de passe MySQL
$dbname = "projet_piscine";

// Établissement de la connexion
$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification des erreurs de connexion
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données: " . $conn->connect_error);
}

$sql = "SELECT COUNT(*) AS total_messagerie FROM messagerie;";
$result = $conn->query($sql);
$id_messagerie = $result->fetch_assoc()['total_messagerie']+1;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $titre = $_POST['TitreMessagerie'];
    $mail = $_SESSION['email'];
    if (isset($_POST['participant1'])) { // Il y a p1
        $participant1 = $_POST['participant1'];
        if (isset($_POST['participant2'])) { // Il y a p1 et p2
            $participant2 = $_POST['participant2'];
            if (isset($_POST['participant3'])) { // Il y a p1, p2 et p3
                $participant3 = $_POST['participant3'];
                $sql = "INSERT INTO messagerie (id_messagerie, titre, participant1_mail, participant2_mail, participant3_mail, participant4_mail) VALUES ($id_messagerie, '$titre', '$participant1', '$participant2', '$participant3', '$mail');";
            }
            else { // Il y a p1 et p2 mais pas p3
                $sql = "INSERT INTO messagerie (id_messagerie, titre, participant1_mail, participant2_mail, participant3_mail, participant4_mail) VALUES ($id_messagerie, '$titre', '$participant1', '$participant2', null, '$mail');";
            }
        }
        else { // il y a p1 mais pas p2
            if (isset($_POST['participant3'])) { // Il y a p1 et p3 mais pas p2
                $participant3 = $_POST['participant3'];
                $sql = "INSERT INTO messagerie (id_messagerie, titre, participant1_mail, participant2_mail, participant3_mail, participant4_mail) VALUES ($id_messagerie, '$titre', '$participant1', null, '$participant3', '$mail');";
            }
            else { // Il y a p1 mais pas p2 ni p3
                $sql = "INSERT INTO messagerie (id_messagerie, titre, participant1_mail, participant2_mail, participant3_mail, participant4_mail) VALUES ($id_messagerie, '$titre', '$participant1', null, null, '$mail');";
            }
        }
    }
    else{ // pas p1
        if (isset($_POST['participant2'])) { // Il y a pas p1 mais il y a p2
            $participant2 = $_POST['participant2'];
            if (isset($_POST['participant3'])) { // Il y a pas p1 mais il y a p2 et p3
                $participant3 = $_POST['participant3'];
                $sql = "INSERT INTO messagerie (id_messagerie, titre, participant1_mail, participant2_mail, participant3_mail, participant4_mail) VALUES ($id_messagerie, '$titre', null, '$participant2', '$participant3', '$mail');";
            }
            else { // Il y a pas p1 et p3 mais il y a p2
                $sql = "INSERT INTO messagerie (id_messagerie, titre, participant1_mail, participant2_mail, participant3_mail, participant4_mail) VALUES ($id_messagerie, '$titre', null, '$participant2', null, '$mail');";
            }
        }
        else{// Il y a pas P1 et p2 
            if (isset($_POST['participant3'])) { // Il y a pas p1 et p2 mais il y a p3
                $participant3 = $_POST['participant3'];
                $sql = "INSERT INTO messagerie (id_messagerie, titre, participant1_mail, participant2_mail, participant3_mail, participant4_mail) VALUES ($id_messagerie, '$titre', null, null, '$participant3', '$mail');";
            }

        }

    }

    if ($conn->query($sql) === TRUE) {
        echo "success";
    }
    else {
        echo "error";
    }

}



?>