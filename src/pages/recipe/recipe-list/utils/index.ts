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

export const offsetToPage = (
  offset: number = 20,
  pageSize: number = recipes_pageSize
) => {
  return Math.ceil(offset / pageSize) + 1 || 1;
};

export const PageToOffset = (
  page: number = 1,
  pageSize: number = recipes_pageSize
) => {
  return Math.ceil((page - 1) * pageSize) || 0;
};
