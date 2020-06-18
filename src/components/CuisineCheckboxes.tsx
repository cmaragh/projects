import React, { useState, useEffect } from "react";
import {
  IonItem,
  IonCheckbox,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

const CuisineCheckboxes: React.FC<{
  cuisineFilterHandler: (cuisineArray: Array<any>) => void;
  loadedHandler: (bool: boolean) => void;
}> = (props) => {
  const [checkedCuisines, setCheckedCuisines] = useState<any>([]);

  const cuisineCheckedHandler = (event: CustomEvent) => {
    props.loadedHandler(false);
    if (!checkedCuisines.includes(event.detail.value)) {
      setCheckedCuisines([...checkedCuisines, event.detail.value]);
    } else {
      let checkedCuisinesCopy = [...checkedCuisines];
      for (let i = 0; i < checkedCuisines.length; i++) {
        if (event.detail.value === checkedCuisines[i]) {
          checkedCuisinesCopy.splice(i, 1);
          break;
        }
      }
      setCheckedCuisines(checkedCuisinesCopy);
    }
  };

  useEffect(() => {
    props.cuisineFilterHandler(checkedCuisines);
  });
  const cuisineOptions = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ].map((option) => {
    return (
      <IonCol size="6" key={option}>
        <IonItem>
          <IonLabel class="ion-text-wrap">{option}</IonLabel>
          <IonCheckbox
            slot="start"
            value={option}
            onIonChange={cuisineCheckedHandler}
          />
        </IonItem>
      </IonCol>
    );
  });

  return (
    <IonGrid>
      <IonRow>{cuisineOptions}</IonRow>
    </IonGrid>
  );
};

export default CuisineCheckboxes;
