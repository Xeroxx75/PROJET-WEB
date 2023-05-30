function chargement_profil() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'load_profil.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Réponse du serveur
            var response = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
  
}

if (document.getElementById("general").style.display === "none") {
    chargement_profil();
}

document.getElementById('loginForm').addEventListener('submit', chargement_profil());

console.log("chargement profil");
