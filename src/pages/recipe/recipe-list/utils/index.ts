import { recipes_pageSize } from "const";

export const cookingDifficulty = (time: number) => {
  if (time < 40) {
    return "Easy";
  } else if (time >= 40 && time < 60) {
    return "Medium";
  } else {
    return "Hard";
  }
};

export const offsetToPage = (offset: number = 20) => {
  return Math.ceil(offset / recipes_pageSize) + 1 || 1;
};

export const PageToOffset = (page: number = 1) => {
  return Math.ceil((page - 1) * recipes_pageSize) || 0;
};
