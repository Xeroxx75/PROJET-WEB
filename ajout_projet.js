function creerFormulaire_projet() {
      // Création d'éléments de formulaire
      var parentElement = document.getElementById("partie_droite");

       // Vérifier si le formulaire existe déjà
      var form3 = document.getElementById("ajout_projet");
      if (form3) {
            parentElement.removeChild(form3);
            return; // Sortir de la fonction pour fermer le formulaire
      }
      var form3 = document.createElement("form");
      var input4 = document.createElement("input");
      var input1 = document.createElement("input");
      var input2 = document.createElement("input");
      var input3 = document.createElement("input");
      var submitBtn = document.createElement("input");

      // Définition des attributs des éléments de formulaire
      form3.method = "POST";
      form3.action = "ajout_projet.php";
      form3.id = "ajout_projet";

      input1.type = "date";
      input1.name = "Date_debut";
      input1.placeholder = "date de debut";
      input1.required = true;

      input2.type = "date";
      input2.name = "Date_fin";
      input2.placeholder = "Date de fin";
      input2.required = true;

      input3.type = "text";
      input3.name = "Description";
      input3.placeholder = "Description projet";
      input3.maxLength=30;
      input3.required = true;

      input4.type="text";
      input4.name = "lieu"
      input4.placeholder ="lieu où a ete fait le projet";
      input4.maxLength = 30;
      input4.required =true;

      submitBtn.type = "submit";
      submitBtn.value = "Ajouter projet";

      // Ajout des éléments au formulaire
      //parentElement.appendChild(form);
      form3.appendChild(input4);
      form3.appendChild(input1);
      form3.appendChild(input2);
      form3.appendChild(input3);
      form3.appendChild(submitBtn);
      
      // Ajout du formulaire à la page
      parentElement.appendChild(form3);
      form3.addEventListener("submit", function(event) {
          event.preventDefault(); // Empêche le rechargement de la page
          parentElement.removeChild(form3);

          var formData = new FormData(form3);

          var xhr = new XMLHttpRequest();
          xhr.open("POST", form3.action, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              // Traitement de la réponse
              console.log(xhr.responseText);
              console.log("on est la");
              chargement_profil();
            }
          };
          xhr.send(formData);
        });
      }

function supprimer_projet(){
   // Création d'éléments de formulaire
      var parentElement = document.getElementById("partie_droite");

       // Vérifier si le formulaire existe déjà
      var form4 = document.getElementById("suppr_projet");
      if (form4) {
            parentElement.removeChild(form4);
            return; // Sortir de la fonction pour fermer le formulaire
      }
      var form4 = document.createElement("form");
      var input4 = document.createElement("input");
      var input1 = document.createElement("input");
      var input2 = document.createElement("input");
      var input3 = document.createElement("input");
      var submitBtn = document.createElement("input");

      // Définition des attributs des éléments de formulaire
      form4.method = "POST";
      form4.action = "supprimer_projet.php";
      form4.id = "suppr_projet";

      input1.type = "date";
      input1.name = "Date_debut";
      input1.placeholder = "date de debut";
      input1.required = true;

      input2.type = "date";
      input2.name = "Date_fin";
      input2.placeholder = "Date de fin";
      input2.required = true;

      input3.type = "text";
      input3.name = "Description";
      input3.placeholder = "Description projet";
      input3.maxLength = 30;
      input3.required = true;

      input4.type="text";
      input4.name = "lieu"
      input4.placeholder ="lieu où a ete fait le projet";
      input4.maxLength = 30;
      input4.required =true;

      submitBtn.type = "submit";
      submitBtn.value = "supprimer projet";

      // Ajout des éléments au formulaire
      //parentElement.appendChild(form);
      form4.appendChild(input4);
      form4.appendChild(input1);
      form4.appendChild(input2);
      form4.appendChild(input3);
      form4.appendChild(submitBtn);
      
      // Ajout du formulaire à la page
      parentElement.appendChild(form4);
      form4.addEventListener("submit", function(event) {
          event.preventDefault(); // Empêche le rechargement de la page
          parentElement.removeChild(form4);

          var formData = new FormData(form4);

          var xhr = new XMLHttpRequest();
          xhr.open("POST", form4.action, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              // Traitement de la réponse
              console.log(xhr.responseText);
              chargement_profil();
            }
          };
          xhr.send(formData);
        });
}
