export const nutrientColor = (score: number) => {
  if (score < 24) {
    return "red";
  } else if (score < 50) {
    return "yellow";
  } else if (score < 75) {
    return "lime";
  } else {
    return "green";
  }
};

export const nutritionTips = (score: number) => {
  if (score < 24) {
    return "the recipe may have limited nutritional value. It's recommended to choose recipes that offer more comprehensive nutrients to meet your dietary needs";
  } else if (score < 50) {
    return "the recipe provides some nutritional value, but there is significant potential for enhancement. Explore other recipes with higher nutritional content";
  } else if (score < 75) {
    return "the recipe offers good nutritional value, but there is still room for improvement. Consider incorporating additional nutrient-rich ingredients for an even healthier option";
  } else {
    return "this recipe has very high nutritional value, containing an abundance of essential nutrients. It is an exceptionally healthy choice. Please continue to maintain this level of nutrition.";
  }
};
