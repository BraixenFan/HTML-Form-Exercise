const body = document.body;
const formulary = body.getElementsByClassName("form-container")

const loadingText = document.createElement("span");
loadingText.textContent = "Cargando...";
loadingText.classList.add("loading-text");

const responseText = document.createElement("span");
responseText.classList.add("reply-text");

async function submitForm(form) {
  body.append(loadingText);
  responseText.remove();
  toggleForm();

  const response = await fetch("https://reqres.in/api/users?delay=4", {
    method: 'POST',
    body: JSON.stringify({
      first_name: form.fname.value,
      last_name: form.lname.value,
      email: form.email.value
    })});
  const data = await response.json();
  responseText.textContent = `Se ha creado tu usuario con éxito! Tu ID de usuario es ${data.id}`;

  body.append(responseText);
  loadingText.remove();
  toggleForm();
  
  console.log(data);
}

function toggleForm() {
  formulary[0].classList.toggle("hidden");
}