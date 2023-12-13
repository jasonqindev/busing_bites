import CuisinesSelect from "./cuisinesSelect";
import DietSelect from "./dietSelect";
import EquipmentInput from "./equipmentInput";
import ExcludeIngredsInput from "./exIngredsInput";
import IncludeIngredsInput from "./inIngredsInput";
import IntolerancesSelect from "./intolerancesSelect";
import RecipeInput from "./recipeInput";
import TypeSelect from "./typeSelect";
export interface IProps {
  disabled?: boolean;
}

export const getFormComponents = (type: string, disabled = false) => {
  switch (type) {
    case "cuisines":
      return <CuisinesSelect disabled={disabled} />;
    case "diet":
      return <DietSelect disabled={disabled} />;
    case "type":
      return <TypeSelect disabled={disabled} />;
    case "equipment":
      return <EquipmentInput disabled={disabled} />;
    case "intolerances":
      return <IntolerancesSelect disabled={disabled} />;
    case "includeIngreds":
      return <IncludeIngredsInput disabled={disabled} />;
    case "excludeIngreds":
      return <ExcludeIngredsInput disabled={disabled} />;
    case "recipe":
      return (
        <RecipeInput
          label="Search"
          placeholder="Search by name"
          disabled={disabled}
        />
      );
  }
};
