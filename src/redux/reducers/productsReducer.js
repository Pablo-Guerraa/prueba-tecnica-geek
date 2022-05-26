import { typeProducts } from '../types';

const initialState = null;

export const productsReducer = ( state= initialState, action) => {
  switch(action.type){
    case typeProducts.get: 
      return action.payload 

    default:
      return state;
  }
}