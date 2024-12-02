import { ADD_TO_CART, REMOVE_FROM_CART } from './actions';

const initialState = {
  cart: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.cart.findIndex(
        item => item.id === action.payload.id && item.guarantee === action.payload.guarantee
      );

      if (existingProductIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + action.payload.quantity,
          totalPrice: updatedCart[existingProductIndex].totalPrice + (action.payload.price * action.payload.quantity)
        };
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, {
            ...action.payload,
            quantity: action.payload.quantity,
            totalPrice: action.payload.price * action.payload.quantity,
          }],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => !(item.id === action.payload.id && item.guarantee === action.payload.guarantee)),
      };

    default:
      return state;
  }
};

export default rootReducer;
