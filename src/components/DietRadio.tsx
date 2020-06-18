import React from "react";
import { IonRadioGroup, IonItem, IonLabel, IonRadio } from "@ionic/react";

const DietRadio: React.FC<{
  dietFilterHandler: (cuisineArray: any) => void;
  loadedHandler: (bool: boolean) => void;
}> = (props) => {
  const dietSelectedHandler = (event: CustomEvent) => {
    props.loadedHandler(false);
    if (!event.detail.value) {
      props.dietFilterHandler("");
    } else {
      props.dietFilterHandler(event.detail.value);
    }
  };
  const dietOptions = [
    "Gluten-Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Whole30",
  ].map((option) => {
    return (
      <IonItem>
        <IonLabel>{option}</IonLabel>
        <IonRadio slot="start" value={option}></IonRadio>
      </IonItem>
    );
  });
  return (
    <IonRadioGroup allowEmptySelection onIonChange={dietSelectedHandler}>
      {dietOptions}
    </IonRadioGroup>
  );
};

export default DietRadio;
