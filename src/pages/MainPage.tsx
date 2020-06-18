import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react";

const MainPage: React.FC<{
  cuisineFilter: string;
  loaded: boolean;
  loadedHandler: (bool: boolean) => void;
  currentFoodHandler: (data: any) => void;
  currentFood: any;
}> = (props) => {

  let foodCards = (
    <IonText className='ion-text-center'><h1>Loading Recipes...</h1></IonText>
  );

  if (props.loaded) {
    foodCards = props.currentFood.results.map((food: any) => {
      return (
        <IonCol size="6" key={food.id}>
          <IonCard href={`/food/${food.id}`}>
            <IonCardHeader>
              <IonCardSubtitle>Calories: {food.calories}</IonCardSubtitle>
              <IonCardTitle>{food.title}</IonCardTitle>
            </IonCardHeader>
            <img
              src={`https://spoonacular.com/recipeImages/${food.id}-312x231.jpg`}
              alt=""
            ></img>
          </IonCard>
        </IonCol>
      );
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Recipii</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>{foodCards}</IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MainPage;
