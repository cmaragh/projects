import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import CuisineCheckboxes from "../components/CuisineCheckboxes";
import DietRadio from "../components/DietRadio";
import ToggleDiet from "../components/ToggleDiet";

const EditFood: React.FC<{
  cuisineFilterHandler: (checkedCuisines: Array<any>) => void;
  dietFilterHandler: (selectedDiet: any) => void;
  loadedHandler: (bool: boolean) => void;
}> = (props) => {
  const [cuisineOrDiet, setCuisineOrDiet] = useState<string>("cuisine");

  const selectCuisineOrDiet = (selection: string) => {
    setCuisineOrDiet(selection);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Edit Diet</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ToggleDiet
          selectCuisineOrDiet={selectCuisineOrDiet}
          selectedValue={cuisineOrDiet}
        />
        {cuisineOrDiet === "cuisine" ? (
          <CuisineCheckboxes
            loadedHandler={props.loadedHandler}
            cuisineFilterHandler={props.cuisineFilterHandler}
          />
        ) : (
          <DietRadio
            loadedHandler={props.loadedHandler}
            dietFilterHandler={props.dietFilterHandler}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditFood;
