

$('#ajout_membre').submit(function(e) {
    e.preventDefault();

    var formData = new FormData(this);

    var nomValue = formData.get('nom');
    var prenomValue = formData.get('prenom');
    var emailValue = formData.get('mail');
    var formationsValue = formData.get('formations');
    var passwordValue = formData.get('password');
    var projetsValue = formData.get('projets');
    var chemin_xmlValue = formData.get('chemin_xml');
    var photo_de_profileValue = formData.get('photo_de_profile');
    var image_fondValue = formData.get('image_fond');
    var descriptionValue = formData.get('description');
    var lieu_travailValue = formData.get('lieu_travail');
    var parcours_scolaireValue = formData.get('parcours_scolaire');
    var roleValue = formData.get('role');

    if (nomValue === '') {
      formData.set('nom', '/');
    }
    if (prenomValue === '') {
        formData.set('prenom', '/');
    }
    if (formationsValue === '') {
        formData.set('formations', '/');
    }
    if (projetsValue === '') {
        formData.set('projets', '/');
    }
    if (chemin_xmlValue === '') {
        formData.set('chemin_xml', '/');
    }
    if (photo_de_profileValue === '') {
        formData.set('photo_de_profile', '/');
    }
    if (image_fondValue === '') {
        formData.set('image_fond', '/');
    }
    if (descriptionValue === '') {
        formData.set('description', '/');
    }
    if (lieu_travailValue === '') {
        formData.set('lieu_travail', '/');
    }
    if (parcours_scolaireValue === '') {
        formData.set('parcours_scolaire', '/');
    }
    if (roleValue !== 'admin' && roleValue !== 'auteur') {
        alert('Le rôle doit être admin ou auteur');
    }
    else {
    
        $.ajax({
            url: 'ajout_membre.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                document.getElementById("resultat").innerHTML = "Membre ajouté avec succès !"
            // Traitement réussi
            },
            error: function() {
            // Traitement échoué
                document.getElementById("resultat").innerHTML = "Echec de l'ajout du membre"
            }
        });
    }
});
