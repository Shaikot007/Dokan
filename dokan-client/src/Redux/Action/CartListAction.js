import { CART_LIST } from "../Constant/CartListConstant";

//Redux action

export const cartListAddAction = (data) => {
  return (dispatch, getState) => {

    const cartList = getState().cartlist;
    const exits = cartList.find(item => item._id === data._id);

    if(exits !== undefined) {
      const cartItems = cartList.map(item => item._id === data._id ?
        {...exits, order_quantity: exits.order_quantity + 1} : item
      );
      dispatch({
        type: CART_LIST,
        payload: cartItems
      })
    }
    else {
      const cartItems = [...cartList, {...data, order_quantity: 1}]
      dispatch({
        type: CART_LIST,
        payload: cartItems
      })
    }
  }
};

export const cartListRemoveAction = (data) => {
  return (dispatch, getState) => {

    const cartList = getState().cartlist;
    const exits = cartList.find(item => item._id === data._id);

    if(exits.order_quantity !== 1) {
      const cartItems = cartList.map(item => item._id === data._id ?
        {...exits, order_quantity: exits.order_quantity - 1} : item
      );
      dispatch({
        type: CART_LIST,
        payload: cartItems
      })
    }
    else {
      const cartItems = cartList.filter(item => item._id !== data._id);
      dispatch({
        type: CART_LIST,
        payload: cartItems
      })
    }
  }
};

export const cartItemDeleteAction = (data) => {
  return (dispatch, getState) => {

    const cartList = getState().cartlist;
    const exits = cartList.find(item => item._id === data._id);

    if(exits) {
      const cartItems = cartList.filter(item => item._id !== data._id);
      dispatch({
        type: CART_LIST,
        payload: cartItems
      })
    }
  }
};
