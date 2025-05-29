function showRecipe(response) {
  const fullHtml = response.data.answer;

  const nameMatch = fullHtml.match(/<div id="RecipeName">(.*?)<\/div>/s);
  const ingredientsMatch = fullHtml.match(
    /<div id="RecipeIngridients">(.*?)<\/div>/s
  );
  const instructionsMatch = fullHtml.match(
    /<div id="RecipeInstructions">(.*?)<\/div>/s
  );

  if (nameMatch) {
    new Typewriter("#RecipeName", {
      strings: nameMatch[1].trim(),
      autoStart: true,
      delay: 10,
      cursor: "",
    });
  }

  if (ingredientsMatch) {
    let rawIngredients = ingredientsMatch[1].trim();
    console.log("RAW INGREDIENTS:", rawIngredients);

    let listItems = rawIngredients
      .split(/<br>|[\n\r]/)
      .map((line) => line.replace(/^[-•*●▪︎‣]+[\s–-]*/, "").trim())
      .filter((line) => line.length > 0)
      .map((line) => `<li>${line}</li>`)
      .join("");

    let formattedList = `<ul style="padding-left: 20px; text-align: left;">${listItems}</ul>`;

    new Typewriter("#RecipeIngridients", {
      strings: formattedList,
      autoStart: true,
      delay: 10,
      cursor: "",
    });
  }

  if (instructionsMatch) {
    let rawInstructions = instructionsMatch[1].trim();

    let listItems = rawInstructions
      .split("<br>")
      .filter((line) => /^\d+\./.test(line.trim()))
      .map((line) => `<li>${line.replace(/^\d+\.\s*/, "").trim()}</li>`)
      .join("");

    let formattedList = `<ol style="padding-left: 20px; text-align: left;">${listItems}</ol>`;

    new Typewriter("#RecipeInstructions", {
      strings: formattedList,
      autoStart: true,
      delay: 10,
      cursor: "",
    });
  }
}
function generateRecipe(event) {
  event.preventDefault();

  let customerInput = document.querySelector("#searchBar");
  let apiKey = "cf40cbba3b587f08e75d7ob82t7ad6ff";
  let context =
    "You are a skilled chef who loves to create delicious and creative recipes. When I provide one or more ingredients, generate one complete recipe that meets the following criteria: The recipe must be short and easy to prepare, requiring no more than 30 minutes. Focus on flavor, creativity, and practicality. Structure the output exactly as follows: 1. Title of the recipe and place it with the id=RecipeName, 2. List ingredients with exact quantities using bulletpoints and place it in the section with id = RecipeIngridients 3. Step-by-step cooking instructions, clearly written and easy to follow. Use numbering for the different steps and write them below each other in the section with id = RecipeInstructions. Add one paragraph break between each section. Only return one recipe per input and wait for further user input before generating another. Do not include any explanations or additional text outside the recipe.";
  let prompt = `Create a tasty recipe using the following ingredients ${customerInput.value}. Include a name, ingredient list with quantities, and clear cooking instructions.`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let recipeElement = document.querySelector("#LoadingText");
  recipeElement.innerHTML = `⏳ Let’s whip up something tasty with ${customerInput.value} — just a moment!`;

  axios.get(apiUrl).then(showRecipe);
}

let generatorFormElement = document.querySelector("#Generator");
generatorFormElement.addEventListener("submit", generateRecipe);
