function errorMethod() {
    const errorDivs = document.getElementsByClassName("error-div");
      const errorDiv = errorDivs[0];
      errorDiv.classList.add("error");
      setTimeout(() => {
        errorDiv.classList.remove("error");
      }, 2000);
}

export default errorMethod