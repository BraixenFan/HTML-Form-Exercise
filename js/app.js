const body = document.body;
const formulary = body.getElementsByClassName("form-container");
const contacts = body.getElementsByClassName("contact-search");

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

async function searchContacts() {
  contacts[0].append(loadingText);
  responseText.remove();

  const response = await fetch("https://reqres.in/api/users?delay=4");
  const data = await response.json();

  loadingText.remove();
  
  data.data.forEach(element => {
    const {first_name} = element;
    const {last_name} = element;
    const {email} = element;
    const {avatar} = element;

    const container = developElement("div", "contact-card");
    const containerDetails = developElement("div");
    const image = developElement("img", "contact-card-image", null, "src", avatar);
    const personName = developElement("p", "contact-card-name", `${first_name} ${last_name}`);
    const personEmail = developElement("p", "contact-card-email", email)

    container.append(image, containerDetails);
    containerDetails.append(personName, personEmail);

    contacts[0].append(container);
  });
}

function developElement(tag, classname, text, attributename, attributevalue) {
  const newElement = document.createElement(tag);

  if (classname != null) newElement.classList.add(classname);
  if (text != null) newElement.textContent = text;
  if (attributename != null && attributevalue != null) newElement.setAttribute(attributename, attributevalue);

  return newElement;
}

function toggleForm() {
  formulary[0].classList.toggle("hidden");
}