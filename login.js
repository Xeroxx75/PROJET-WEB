


var xhr = new XMLHttpRequest();
xhr.open('GET', 'verif_login.php', true);
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Réponse du serveur
        if (xhr.responseText === 'false') {
            login();
        }
        else if (xhr.responseText === 'admin') {
          // Redirection vers une autre page sans rechargement
          window.location.replace("admin.html");
        }
        else {
          document.getElementById("general").style.display = "block";
          document.getElementById("loginDiv").style.display = "none";
        }
      }
    };
xhr.send();
  
  
  
  
  

function login() {
  document.getElementById("general").style.display = "none";
  document.getElementById("loginDiv").style.display = "block";

  document.getElementById('loginForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Empêche l'envoi du formulaire

      // Récupération des valeurs du formulaire
      var username = document.getElementById('email_login').value;
      var password = document.getElementById('password_login').value;

      // Envoi des données de connexion au serveur
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'login.php', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
              // Réponse du serveur
              if (xhr.responseText === 'false') {
                
              }
              else if (xhr.responseText === 'admin') {
                // Redirection vers une autre page sans rechargement
                window.location.replace("admin.html");

              }
              else {  
                document.getElementById("general").style.display = "block";
                document.getElementById("loginDiv").style.display = "none";
              }
              document.getElementById('email_login').value = '';
              document.getElementById('password_login').value = '';

          }
          
      };
      xhr.send('email=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password));
  });
}

$(document).ready(function() {
  $("#logoutButton").click(function() {
    $.ajax({
      url: "deconnexion.php",
      type: "POST",
      success: function(response) {
        // Traitez ici la réponse de la requête de déconnexion
        document.getElementById('email_login').value = '';
        document.getElementById('password_login').value = '';
        document.getElementById("general").style.display = "none";
        document.getElementById("loginDiv").style.display = "block";
      }
    });
  });
});
