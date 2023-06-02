<?php

session_start();
// Connexion à la base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die("Échec de la connexion à la base de données : " . $conn->connect_error);
}

// Récupérer l'ID du participant et l'ID de la messagerie à partir des paramètres de la requête ou d'une autre source
$mail = $_SESSION['email']; // Exemple d'utilisation d'un paramètre GET, à adapter selon vos besoins
$idMessagerie = $_POST['id_messagerie']; // ID de la messagerie à quitter

// Vérifier quel participant doit quitter la messagerie et mettre à jour la base de données
$sql = "SELECT participant1_mail, participant2_mail, participant3_mail, participant4_mail FROM messagerie WHERE id_messagerie = $idMessagerie";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();

    // Trouver quel participant doit quitter la messagerie
    $participant = null;
    if ($row['participant1_mail'] == $mail) {
        $participant = 'participant1_mail';
    } elseif ($row['participant2_mail'] == $mail) {
        $participant = 'participant2_mail';
    } elseif ($row['participant3_mail'] == $mail) {
        $participant = 'participant3_mail';
    } elseif ($row['participant4_mail'] == $mail) {
        $participant = 'participant4_mail';
    }

    // Si le participant est le seul autre participant, supprimer la messagerie
    $otherParticipants = array_diff([$row['participant1_mail'], $row['participant2_mail'], $row['participant3_mail'], $row['participant4_mail']], [$idParticipant]);
    if (count($otherParticipants) == 1) {
        $sqlDelete = "DELETE FROM messagerie WHERE id_messagerie = $idMessagerie";
        if ($conn->query($sqlDelete) === TRUE) {
            echo "La messagerie a été supprimée.";
        } else {
            echo "Erreur lors de la suppression de la messagerie : " . $conn->error;
        }
    } else {
        // Mettre à jour la base de données pour remplacer le participant par null
        $sqlUpdate = "UPDATE messagerie SET $participant = NULL WHERE id_messagerie = $idMessagerie";
        if ($conn->query($sqlUpdate) === TRUE) {
            echo "Le participant a quitté la messagerie avec succès.";
        } else {
            echo "Erreur lors de la mise à jour de la messagerie : " . $conn->error;
        }
    }
} else {
    echo "La messagerie n'a pas été trouvée.";
}

// Fermer la connexion à la base de données
$conn->close();
?>
