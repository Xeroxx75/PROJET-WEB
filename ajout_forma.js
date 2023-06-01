function creerFormulaire() {
      // Création d'éléments de formulaire
      var parentElement = document.getElementById("partie_droite");
      var form = document.createElement("form");
      var input4 = document.createElement("input");
      var input1 = document.createElement("input");
      var input2 = document.createElement("input");
      var input3 = document.createElement("input");
      var submitBtn = document.createElement("input");

      // Définition des attributs des éléments de formulaire
      form.method = "POST";
      form.action = "ajout_forma.php";

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
      input3.required = true;

      input4.type="file";
      input4.name = "logo"
      input4.required =true;

      submitBtn.type = "submit";
      submitBtn.textContent = "Ajouter";

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
            }
          };
          xhr.send(formData);
        });
      }
