
function validateData(email, username, password, confirmpassword) {
  if (email == "") {
    return "Digite um email";
  }

  if (!email?.includes("@") || !email?.includes(".")) {
    return "Email inválido";
  }

  if (username == "") {
    return "Digite um nome de usuario";
  }

  if (username?.length < 6) {
    return "Nome de usuário deve ter pelo menos 6 caracteres";
  }

  if (password == "") {
    return "Digite uma senha";
  }

  if (confirmpassword == "") {
    return "Confirme sua senha";
  }

  if (password !== confirmpassword) {
    return "As senhas não são iguais";
  }

  return null;
}
export { validateData };
