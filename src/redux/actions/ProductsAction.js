import { typeProducts } from "../types";

export const getIngredient = (arrProducts) => ({
  type: typeProducts.get,
  payload: arrProducts,
})