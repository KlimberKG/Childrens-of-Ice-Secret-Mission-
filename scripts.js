//ПРОВЕРКА КОТЛА

var ingredients = {};
var string = "Котёл пуст";

if (Array.isArray($gameMap.ingredients) && $gameMap.ingredients.length > 0) {
  for (ingredient of $gameMap.ingredients) {
    ingredients[ingredient.name] = {
      name: ingredient.name,
      count: Number.isInteger((ingredients[ingredient.name] || {}).count) ? ++ingredients[ingredient.name].count : 1
    }
  }

  var ingredientsAsArray = [];
  string = "В котле: ";

  for (i in ingredients) {
	ingredientsAsArray.push("\\C[3]" + ingredients[i].name + " x" + ingredients[i].count + "\\C[3]");
  }

  string += ingredientsAsArray.join(", ");
}

$gameMessage.add(string);
//_____________________________

//ГОТОВКА

function compareArrays(a, b) {
  return a.length === b.length && a.sort().every(function(value, index) { return value === b.sort()[index]});
}

var dishVariableId = 4;

var recipes = [
  {
    name: 'Жаренная морковь',
    id: 1,
    recipe: ['Дикая морковь']
  },
  {
    name: 'Морковный пирог',
    id: 2,
    recipe: ['Дикая морковь', 'Дикая морковь']
  },
  {
    name: 'Морковный торт',
    id: 3,
    recipe: ['Дикая морковь', 'Дикая морковь', 'Дикая морковь']
  },
  {
    name: 'Морковный пирог с сюрпризом',
    id: 4,
    recipe: ['Дикая морковь', 'Дикая морковь', 'Серая поганка']
  },
];

var ingredients = $gameMap.ingredients.map(function(ingredient) {
	return ingredient.name;
});

var dishId = -1;

for (var i = 0; i < recipes.length; i++) {
  if (compareArrays(recipes[i].recipe, ingredients)) {
    dishId = recipes[i].id;

    break;
  }
}

$gameVariables.setValue(dishVariableId, dishId);
$gameMap.ingredients = [];
//_____________________________
