function submitForm(form) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => {
      if (res.ok) {
        console.log("Yipeeee");
      } else {
        console.log("Oh no");
      }
    })
    .then(data => console.log(data))
}