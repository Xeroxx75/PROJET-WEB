<?php
// Récupérez les valeurs mises à jour depuis la requête POST ou GET




if($_POST['supprimer']==0){
    $updatedId = $_POST['id'];
    $updatedTitre = $_POST['titre'];
    $updatedDatePublication = $_POST['date_publication'];
    $updatedLieu = $_POST['lieu'];
    $updatedDateEmbauche = $_POST['date_embauche'];
    $updatedDuree = $_POST['duree'];
    $updatedContrat = $_POST['contrat'];
    $updatedDescription = $_POST['description'];
    $updatedRemuneration = $_POST['remuneration'];
}
else{
    $updatedId = $_POST['id'];
}

// Effectuez la connexion à votre base de données
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "projet_piscine";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérifiez la connexion
if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

// Préparez et exécutez la requête SQL UPDATE pour mettre à jour les données
//Si $_POST n'est pas vide, on met à jour les données, sinon on supprime l'offre d'emploi
//AFFICHER LA TAILLE DE $_POST

if($_POST['supprimer']==0){
    $updatedDescription = str_replace("'", "''", $updatedDescription);
    $sql = "UPDATE emplois SET 
                titre = '$updatedTitre',
                date_publication = '$updatedDatePublication',
                date_embauche = '$updatedDateEmbauche',
                duree = '$updatedDuree',
                contrat = '$updatedContrat',
                description = '$updatedDescription',
                remuneration = $updatedRemuneration,
                lieu = '$updatedLieu'
            WHERE id_emplois = $updatedId";
}
else{
    $sql = "DELETE FROM emplois WHERE id_emplois = $updatedId";
}

if ($conn->query($sql) === TRUE) {
    // Les données ont été mises à jour avec succès
    $response = array('success' => true, 'message' => 'Les données de l\'offre d\'emploi ont été mises à jour avec succès.');
} else {
    // Erreur lors de la mise à jour des données
    $response = array('success' => false, 'message' => 'Erreur lors de la mise à jour des données de l\'offre d\'emploi : ' . $conn->error);
}

$conn->close();

// Renvoyer la réponse JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
