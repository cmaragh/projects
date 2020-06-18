import React, { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { fastFoodOutline, pencilOutline } from "ionicons/icons";
import MainPage from "./pages/MainPage";
import EditFood from "./pages/EditFood";
import Food from "./pages/Food";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  const [cuisineFilter, setCuisineFilter] = useState<any>("");
  const [dietFilter, setDietFilter] = useState<any>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentFood, setCurrentFood] = useState<any>({});
  const [selectedFood, setSelectedFood] = useState<any>("1003464");
  const [ingredients, setIngredients] = useState<any>();
  const [instructions, setInstructions] = useState<any>();

  useEffect(() => {
    if (!loaded) {

      const randomNumber = Math.floor(Math.random() * 500);

      Promise.all([
        fetch(
          `https://api.spoonacular.com/recipes/search?apiKey=f27ad60c36824064a367cf7833623485&number=16&cuisine=${cuisineFilter}&diet=${dietFilter}&offset=${randomNumber}`
        ).then((res) => res.json()),
        fetch(
          `https://api.spoonacular.com/recipes/${selectedFood}/ingredientWidget.json?apiKey=f27ad60c36824064a367cf7833623485`
        ).then((res) => res.json()),
        fetch(
          `https://api.spoonacular.com/recipes/${selectedFood}/analyzedInstructions?apiKey=f27ad60c36824064a367cf7833623485`
        ).then((res) => res.json()),
      ])
        .then(([fetchCurrentFood, fetchIngredients, fetchInstructions]) => {
          const food = fetchCurrentFood;
          const ingred = fetchIngredients;
          const instruct = fetchInstructions;
          setCurrentFood(food);
          setIngredients(ingred);
          setInstructions(instruct);
        })
        .then(() => {
          setLoaded(true);
        })
        .catch((err) => console.log(err));
    }
  }, [cuisineFilter, dietFilter, loaded, selectedFood]);

  // useEffect(() => {
  //   console.log(currentFood, ingredients, instructions);
  // },[loaded]);

  const cuisineFilterHandler = (checkedCuisines: Array<any>) => {
    checkedCuisines.length === 0
      ? setCuisineFilter("")
      : setCuisineFilter(checkedCuisines.join(","));
  };

  const dietFilterHandler = (selectedDiet: any) => {
    setDietFilter(selectedDiet);
  };

  const currentFootHandler = (data: any) => {
    setCurrentFood(data);
  };

  const loadedHandler = (bool: boolean) => {
    setLoaded(bool);
  };

  const selectedFoodHandler = (food: string) => {
    setSelectedFood(food);
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/food">
              <MainPage
                cuisineFilter={cuisineFilter}
                loaded={loaded}
                loadedHandler={loadedHandler}
                currentFoodHandler={currentFootHandler}
                currentFood={currentFood}
              />
            </Route>
            <Route path="/food/:foodId">
              <Food
                cuisineFilter={cuisineFilter}
                loaded={loaded}
                loadedHandler={loadedHandler}
                currentFoodHandler={currentFootHandler}
                currentFood={currentFood}
                ingredients={ingredients}
                instructions={instructions}
                selectedFoodHandler={selectedFoodHandler}
              />
            </Route>
            <Route exact path="/editfood">
              <EditFood
                cuisineFilterHandler={cuisineFilterHandler}
                dietFilterHandler={dietFilterHandler}
                loadedHandler={loadedHandler}
              />
            </Route>
            <Redirect exact path="/" to="/food" />
          </IonRouterOutlet>
          <IonTabBar color="primary" slot="bottom">
            <IonTabButton tab="food" href="/food">
              <IonIcon icon={fastFoodOutline} />
            </IonTabButton>
            <IonTabButton tab="edit-food" href="/editfood">
              <IonIcon icon={pencilOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
