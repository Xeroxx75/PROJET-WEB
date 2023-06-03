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

$sql = "SELECT MAX(id_evenement) AS max_id FROM evenement;";
$result = $conn->query($sql);
$id_event = $result->fetch_assoc()['max_id']+1;

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $titre = $_POST['title'];
    $description = $_POST['description'];
    $date = $_POST['date'];
    $mail = $_SESSION['email'];
    $nb_image = $_POST['nb_images'];
    $insert_image="";
    for ($i = 0; $i < $nb_image; $i++) {
        
        if (isset($_FILES["image" . $i]) && $_FILES["image".$i]["error"] == 0) {
            $image = $_FILES["image".$i];
            $tempFilePath = $image['tmp_name'];
            $fileName_image = "evenement" . $id_event . "_" . $i . '.jpg';
            $uploadDir = 'photo_evenement/';
            $upload = $uploadDir . $fileName_image;
            if (move_uploaded_file($tempFilePath, $upload)) {
                $insert_image .= $fileName_image . "|";
            } else {
                echo 'Une erreur s\'est produite lors de la sauvegarde de l\'image.';
            }
        }
    }
    $insert_image = rtrim($insert_image, "|");
    $sql = "INSERT INTO evenement (id_evenement, nom_evenement, description, date_evenement, auteur_mail, image) VALUES ('$id_event', '$titre', '$description', '$date', '$mail', '$insert_image');";
    $result = $conn->query($sql);
    if ($result) {
        echo "true";
    }
    else {
        echo "false";
    }
}

// Fermeture de la connexion à la base de données
$conn->close();
?>
