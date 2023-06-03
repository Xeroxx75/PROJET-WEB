var id_messagerie_actuel = 0;
var last_nb_message = 0;

function load_friend() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'afficher_amis.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Réponse du serveur
            var response = xhr.responseText;
            if (response == "error"){
                // Pas d'amis
            }
            else{
                response = JSON.parse(response);
                for (var i = 0; i < response.length; i++) {
                    var email = response[i]['liste_amis'];
                    
                }
            }
          }
    };
    xhr.send();
}

 
function load_messagerie() {
    document.getElementById("messagerie_list").innerHTML = "";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'load_messagerie.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Réponse du serveur
            var response = xhr.responseText;
            if (response == "error"){
                // Pas de messagerie
            }
            else{
                response = JSON.parse(response);
                for (var i = 0; i < response.length; i++) {
                    var id = response[i]['id_messagerie'];
                    var button = document.createElement("button");
                    button.innerHTML = response[i]['titre'];
                    button.id = id;
                    button.addEventListener("click", change_chat.bind(null, response[i]));
                    document.getElementById("messagerie_list").appendChild(button);
                }
            }
          }
    };
    xhr.send();
}

function change_chat(tab_id_messagerie){
    id_messagerie_actuel = tab_id_messagerie['id_messagerie'];
    if (tab_id_messagerie['participant1_mail'] !== null){
        if (tab_id_messagerie['participant2_mail'] !== null){
            if (tab_id_messagerie['participant3_mail'] !== null){
                document.getElementById("messagerie_info").innerHTML = tab_id_messagerie['participant1_mail']+"<br>"+tab_id_messagerie['participant2_mail']+"<br>"+tab_id_messagerie['participant3_mail']+"<br>"+tab_id_messagerie['participant4_mail'];
            }
            else{
                document.getElementById("messagerie_info").innerHTML = tab_id_messagerie['participant1_mail']+"<br>"+tab_id_messagerie['participant2_mail']+"<br>"+tab_id_messagerie['participant4_mail'];
            }
        }
        else{
            if (tab_id_messagerie['participant3_mail'] !== null){
                document.getElementById("messagerie_info").innerHTML = tab_id_messagerie['participant1_mail']+"<br>"+tab_id_messagerie['participant3_mail']+"<br>"+tab_id_messagerie['participant4_mail'];
            }
            else{
                document.getElementById("messagerie_info").innerHTML = tab_id_messagerie['participant1_mail']+"<br>"+tab_id_messagerie['participant4_mail'];
            }        
        }
    } 
    else{
        if (tab_id_messagerie['participant2_mail'] !== null){
            if (tab_id_messagerie['participant3_mail'] !== null){
                document.getElementById("messagerie_info").innerHTML = tab_id_messagerie['participant2_mail']+"<br>"+tab_id_messagerie['participant3_mail']+"<br>"+tab_id_messagerie['participant4_mail'];
            }
            else{
                document.getElementById("messagerie_info").innerHTML = tab_id_messagerie['participant2_mail']+"<br>"+tab_id_messagerie['participant4_mail'];
            }
        }
        else{
            if (tab_id_messagerie['participant3_mail'] !== null){
                document.getElementById("messagerie_info").innerHTML = tab_id_messagerie['participant3_mail']+"<br>"+tab_id_messagerie['participant4_mail'];
            }
        }
    }
}

$(document).ready(load_messagerie()); 
$(document).ready(chat());


function chat(){
    if (id_messagerie_actuel != 0){
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'charger_chat.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText !== "error"){
                    var response = JSON.parse(xhr.responseText);     
                    var email_sender = response[0];
                    var chatContainer = document.querySelector('.chat_box');
                    chatContainer.innerHTML = "";
                    for (var i = 1; i < response.length; i++) {
                        var message = document.createElement("div");
                        message.innerHTML = response[i]['envoyeur_mail'] + "<br>" + response[i]['texte'];
                        if (response[i]['image'] !== "/")
                        {
                            var image = document.createElement("img");
                            image.src = response[i]['image'];
                            image.className = "image_message";
                            message.appendChild(image);
                        }
                        if (response[i]['envoyeur_mail'] == email_sender){
                            message.className = "message_sender";
                        }
                        else{
                            message.className = "message_receiver";
                        }
                        document.getElementById("chat_box").appendChild(message);
                    }
                    if (response.length > last_nb_message){
                        // Récupérer l'élément .chat_box
                        var chatContainer = document.querySelector('.chat_box');

                        // Régler la propriété scrollTop sur la valeur maximale
                        chatContainer.scrollTop = chatContainer.scrollHeight;
                        last_nb_message = response.length;
                    }
                }
                else{
                    document.getElementById("chat_box").innerHTML = "Soyez le premier à parler !";
                }

            }
        };
        xhr.send('id_messagerie=' + encodeURIComponent(id_messagerie_actuel));
        
    }
    setTimeout(chat.bind(null, id_messagerie_actuel), 500);
}

$('#message_form').submit(function(event) {
    event.preventDefault();
    if (id_messagerie_actuel != 0){
        var formData = new FormData(this);
        var texte = formData.get('message_text');
        var image = formData.get('message_file');
        if (texte === "" && image.size === 0){
            alert("Veuillez écrire un message ou envoyer une image");
        }
        else{
            formData.append('id_messagerie', id_messagerie_actuel);
            var message_file = formData.get('message_file');
            if (message_file.size === 0){
                formData.delete('message_file');
            }
            $.ajax({
                url: 'envoyer_message.php',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                // Traitement réussi
                },
                error: function() {
                // Traitement échoué
                    console.log("Erreur");
                }
            });
        }
    }
    else{
        alert("Veuillez sélectionner une messagerie");
    }
    document.getElementById("message_form").reset();
});

function create_messagerie(){
    if (document.getElementById("divFormMessagerie").style.display === "block"){
        document.getElementById("divFormMessagerie").style.display = "none";
    }
    else{
        document.getElementById("divFormMessagerie").style.display = "block";
    }
}

function leave_messagerie(){
    if (id_messagerie_actuel !== 0){
        Swal.fire({
            title: 'Quitter la messagerie ?',
            text: 'voulez-vous vraiment quitter le chat "' + document.getElementById(id_messagerie_actuel).innerHTML + '" ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmer',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                // Action à effectuer lorsque le bouton de confirmation est cliqué
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'leave_messagerie.php', true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                    }
                };
                xhr.send('id_messagerie=' + encodeURIComponent(id_messagerie_actuel));
                load_messagerie();
                id_messagerie_actuel = 0;
                document.getElementById("chat_box").innerHTML = "";
                document.getElementById("messagerie_info").innerHTML = "";
                alert("Vous avez quitté la messagerie");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Action à effectuer lorsque le bouton d'annulation est cliqué

            }
        });
    }
}

function remplir_participant(){
    $.ajax({
        url: 'afficher_amis.php',
        type: 'GET',
        data: null,
        processData: false,
        contentType: false,
        success: function(response) {
            if (response !== "error"){
                response = JSON.parse(response);
                for (var i = 0; i < response.length; i++) {
                    var option = document.createElement("option");
                    option.innerHTML = response[i]['liste_amis'];
                    option.value = response[i]['liste_amis'];
                    // Le probleme est ici
                    document.getElementById("participant1").appendChild(option.cloneNode(true));
                    document.getElementById("participant2").appendChild(option.cloneNode(true));
                    document.getElementById("participant3").appendChild(option.cloneNode(true));
                }
            }
        // Traitement réussi
        },
        error: function() {
        // Traitement échoué
            console.log("Erreur");
        }
    });
}

$(document).ready(remplir_participant()); 

$('#create_messagerie_form').submit(function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var participant1 = formData.get('participant1');
    var participant2 = formData.get('participant2');
    var participant3 = formData.get('participant3');
    var TitreMessagerie = formData.get('TitreMessagerie');
    if (participant1 === "" && participant2 === "" && participant3 === ""){
        alert("Veuillez selectionnez au moins un participant");
    }
    else if (TitreMessagerie === ""){
        alert("Veuillez donner un titre à la messagerie");
    }
    else{
        if (participant1 === ""){
            formData.delete('participant1');
        }
        if (participant2 === ""){
            formData.delete('participant2');
        }
        if (participant3 === ""){
            formData.delete('participant3');
        }
        $.ajax({
            url: 'create_messagerie.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                load_messagerie();
            // Traitement réussi
            },
            error: function() {
            // Traitement échoué
                console.log("Erreur");
            }
        });
    }
});


$(document).ready(function() {
    var clientId = "KG6MJWEIRMCqrMCeIa1bqQ";
    var redirectUri = "http://localhost/PROJET-WEB-MAIN/create_call.php";
    // Gestionnaire d'événement pour le clic sur le bouton
    $('#createCallButton').click(function() {
      // Appeler la fonction PHP pour créer l'appel
      var authUrl = "https://zoom.us/oauth/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectUri;
      window.location.href = authUrl;
    });
  });