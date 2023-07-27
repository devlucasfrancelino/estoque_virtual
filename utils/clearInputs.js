function clearInputs() {
  const inputs = document.querySelectorAll("#input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

export default clearInputs;
