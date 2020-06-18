import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import ToggleIngredients from "../components/ToggleIngredients";
import "./Food.css";

const Food: React.FC<{
  loaded: boolean;
  cuisineFilter: string;
  loadedHandler: (bool: boolean) => void;
  currentFoodHandler: (data: any) => void;
  currentFood: any;
  instructions: any;
  ingredients: any;
  selectedFoodHandler: (food: string) => void;
}> = (props) => {
  const selectedFood = parseInt(useParams<{ foodId: string }>().foodId);
  const [ingredientsOrInstructions, setIngredientsOrInstructions] = useState<
    string
  >("ingredients");

  let localCurrentFood;
  let ingredientsList = (
    <IonText className="ion-text-center">
      <h1>Loading ingredients...</h1>
    </IonText>
  );
  let instructionsList = (
    <IonText className="ion-text-center">
      <h1>Loading instructions...</h1>
    </IonText>
  );
  let foodImage;

  //CHECK CURRENTFOOD ID TO EXTRACT IMG FROM INITIAL FOODS

  // interface IInitialFoodItem {
  //   calories: number;
  //   carbs: string;
  //   fat: string;
  //   id: number;
  //   image: string;
  //   imageType: string;
  //   protein: string;
  //   title: string;
  // }

  if (props.loaded) {
    foodImage = `https://spoonacular.com/recipeImages/${selectedFood}-312x231.jpg`;

    ingredientsList = props.ingredients.ingredients.map((ingredient: any) => (
      <IonItem key={ingredient.name}>
        <IonLabel>
          <h2>{ingredient.name}</h2>
          <p>
            {ingredient.amount.us.value} {ingredient.amount.us.unit}
          </p>
        </IonLabel>
      </IonItem>
    ));

    if (props.instructions.length > 0) {
      instructionsList = props.instructions[0].steps.map((step: any) => (
        <IonItem key={step.step}>
          <IonLabel>
            <IonText class="ion-text-wrap">
              <h2>{step.step}</h2>
            </IonText>
          </IonLabel>
        </IonItem>
      ));
    } else {
      instructionsList = <h2>Womp womp. Instructions not available :(</h2>;
    }
  }

  ///

  const selectIngredOrInstruct = (selection: string) => {
    setIngredientsOrInstructions(selection);
  };

  useEffect(() => {
    props.loadedHandler(false);
    props.selectedFoodHandler(selectedFood.toString());
  }, [selectedFood]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Recipii</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {props.currentFood && props.loaded && (
          <div>
            <img src={foodImage} alt="No Image" className="img-food"></img>
            <ToggleIngredients
              selectedValue={ingredientsOrInstructions}
              selectIngredOrInstruct={selectIngredOrInstruct}
            />
            <IonList>
              {ingredientsOrInstructions === "ingredients"
                ? ingredientsList
                : instructionsList}
            </IonList>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Food;
