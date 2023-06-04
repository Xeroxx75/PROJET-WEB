function creerFormulaire() {
      // Création d'éléments de formulaire
      var parentElement = document.getElementById("partie_droite");

       // Vérifier si le formulaire existe déjà
       // Vérifier si le formulaire existe déjà
      var form = document.getElementById("ajout_form");
      var form2 = document.getElementById("suppr_form");
      var form3 = document.getElementById("ajout_projet");
      var form4 = document.getElementById("suppr_projet");
      if (form) {
            parentElement.removeChild(form);
            return; // Sortir de la fonction pour fermer le formulaire
      }
      if (form2) {
            parentElement.removeChild(form2);
            //return;
      }
      if (form3) {
            parentElement.removeChild(form3);
      }
      if (form4) {
            parentElement.removeChild(form4);
      }
      var form = document.createElement("form");
      var input4 = document.createElement("input");
      var input1 = document.createElement("input");
      var input2 = document.createElement("input");
      var input3 = document.createElement("input");
      var submitBtn = document.createElement("input");

      // Définition des attributs des éléments de formulaire
      form.method = "POST";
      form.action = "ajout_forma.php";
      form.id = "ajout_form";

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
      input3.placeholder = "Description formation";
      input3.maxLength=30;
      input3.required = true;

      input4.type="file";
      input4.name = "logo"

      submitBtn.type = "submit";
      submitBtn.value = "Ajouter formation";

      // Ajout des éléments au formulaire
      //parentElement.appendChild(form);
      form.appendChild(input4);
      form.appendChild(input1);
      form.appendChild(input2);
      form.appendChild(input3);
      form.appendChild(submitBtn);
      
      // Ajout du formulaire à la page
      parentElement.appendChild(form);
      form.addEventListener("submit", function(event) {
          event.preventDefault(); // Empêche le rechargement de la page
          parentElement.removeChild(form);

          var formData = new FormData(form);

          var xhr = new XMLHttpRequest();
          xhr.open("POST", form.action, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              // Traitement de la réponse
              console.log(xhr.responseText);
              console.log('ici');
              chargement_profil();
            }
          };
          xhr.send(formData);
        });
      

      }

function supprimer_formation(){
        // Création d'éléments de formulaire
      var parentElement = document.getElementById("partie_droite");

       // Vérifier si le formulaire existe déjà
      var form = document.getElementById("ajout_form");
      var form2 = document.getElementById("suppr_form");
      var form3 = document.getElementById("ajout_projet");
      var form4 = document.getElementById("suppr_projet");
      if (form) {
            parentElement.removeChild(form);
            
      }
      if (form2) {
            parentElement.removeChild(form2);
            return;
      }
      if (form3) {
            parentElement.removeChild(form3);
      }
      if (form4) {
            parentElement.removeChild(form4);
      }
      var form2 = document.createElement("form");
      var input4 = document.createElement("input");
      var input1 = document.createElement("input");
      var input2 = document.createElement("input");
      var input3 = document.createElement("input");
      var submitBtn = document.createElement("input");

      // Définition des attributs des éléments de formulaire
      form2.method = "POST";
      form2.action = "supprimer_forma.php";
      form2.id = "suppr_form";

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
      input3.placeholder = "Description formation";
      input3.maxLength = 30;
      input3.required = true;

      input4.type="file";
      input4.name = "logo"

      submitBtn.type = "submit";
      submitBtn.value = "Supprimer formation";

      // Ajout des éléments au formulaire
      //parentElement.appendChild(form);
      form2.appendChild(input4);
      form2.appendChild(input1);
      form2.appendChild(input2);
      form2.appendChild(input3);
      form2.appendChild(submitBtn);
      
      // Ajout du formulaire à la page
      parentElement.appendChild(form2);
      form2.addEventListener("submit", function(event) {
          event.preventDefault(); // Empêche le rechargement de la page
          parentElement.removeChild(form2);

          var formData = new FormData(form2);

          var xhr = new XMLHttpRequest();
          xhr.open("POST", form2.action, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              // Traitement de la réponse
              console.log(xhr.responseText);
              console.log('on supr');
              chargement_profil();
            }
          };
          xhr.send(formData);
        });
      }