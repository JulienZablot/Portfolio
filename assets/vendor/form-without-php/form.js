
  var form = document.getElementById("my-form");
  
  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
	var button = document.getElementById("my-form-button");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
		button.style.display = 'none';
        status.innerHTML = '<div class="text-form">Votre message a bien été envoyé</div>';
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
          } else {
            status.innerHTML = '<div class="text-form">Un problème est survenu, veuillez de nouveau envoyer votre message</div>'
          }
        })
      }
    }).catch(error => {
      status.innerHTML = '<div class="text-form">Un problème est survenu, veuillez de nouveau envoyer votre message</div>'
    });
  }
  form.addEventListener("submit", handleSubmit)