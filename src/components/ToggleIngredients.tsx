import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const ToggleIngredients: React.FC<{
  selectedValue: string;
  selectIngredOrInstruct: (value: string) => void;
}> = (props) => {
  const inputChangeHandler = (event: CustomEvent) => {
    props.selectIngredOrInstruct(event.detail.value);
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
      <IonSegmentButton value="ingredients">
        <IonLabel>Ingredients</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="instructions">
        <IonLabel>Instructions</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default ToggleIngredients;
