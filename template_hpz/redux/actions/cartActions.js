import * as actionTypes from "./actionTypes";

export function addToCard(cartItem) 
{
  return {type:actionTypes.ADD_TO_CART,payload:cartItem} 
}
export function removeFromCart(cartItem) 
{
  return {type:actionTypes.REMOVE_FROM_CART,payload:cartItem}
}

