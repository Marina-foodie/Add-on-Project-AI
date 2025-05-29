let generatorFormElement = document.querySelector("#Generator");
generatorFormElement.addEventListener("submit", generateRecipe);

function generateRecipe(event) {
  event.preventDefault();

  new Typewriter("#containerText", {
    strings: "joke",
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}
