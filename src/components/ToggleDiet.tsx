import React from "react";
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";

const ToggleDiet: React.FC<{
  selectedValue: string;
  selectCuisineOrDiet: (value: string) => void;
}> = (props) => {
  const inputChangeHandler = (event: CustomEvent) => {
    props.selectCuisineOrDiet(event.detail.value);
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler}>
      <IonSegmentButton value="cuisine">
        <IonLabel>Cuisine</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="diet">
        <IonLabel>Diet</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default ToggleDiet;
