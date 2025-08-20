

import { recipes } from "../Data/Data";
import Recipes from "./Recipes";

function CallingFun() {
  return (
    <div>
      <h1>Recipes list</h1>
      {
        recipes.map((recipe) => (
          <Recipes {...recipe} key={recipe.id} />
        ))
      }
    </div>
  );
}

export default CallingFun;
