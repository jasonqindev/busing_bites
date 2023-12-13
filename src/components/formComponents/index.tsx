import CuisinesSelect from "./cuisinesSelect";
import DietSelect from "./dietSelect";
import EquipmentInput from "./equipmentInput";
import ExcludeIngredsInput from "./exIngredsInput";
import IncludeIngredsInput from "./inIngredsInput";
import IntolerancesSelect from "./intolerancesSelect";
import RecipeInput from "./recipeInput";
import TypeSelect from "./typeSelect";

export const getFormComponents = (type: string) => {
  switch (type) {
    case "cuisines":
      return <CuisinesSelect />;
    case "diet":
      return <DietSelect />;
    case "type":
      return <TypeSelect />;
    case "equipment":
      return <EquipmentInput />;
    case "intolerances":
      return <IntolerancesSelect />;
    case "includeIngreds":
      return <IncludeIngredsInput />;
    case "excludeIngreds":
      return <ExcludeIngredsInput />;
    case "recipe":
      return <RecipeInput label="Search" placeholder="Search by name" />;
  }
};
