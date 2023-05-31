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
                    var email = response[i]['abonne'];
                    var button = document.createElement("button");
                    button.innerHTML = email;
                    button.classList.add('button_friend');
                    button.addEventListener('click', function() {
                        chat(email); // Appeler la fonction de chat avec l'ID du membre
                    });
                    document.getElementById("friend_list").appendChild(button);
                }
            }
          }
    };
    xhr.send();
}

$(document).ready(load_friend()); 

function chat(email){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'charger_chat.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send('email_ami=' + encodeURIComponent(email));

}