import { createContext, useContext, useState } from 'react';

import PropTypes from 'prop-types';

const CartIsOpenContext = createContext();
const { Provider } = CartIsOpenContext;
function CartIsOpenProvider({ children }) {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  return <Provider value={{ cartIsOpen, setCartIsOpen }}>{children}</Provider>;
}

CartIsOpenProvider.propTypes = {
  children: PropTypes.node,
};

function useCart() {
  return useContext(CartIsOpenContext);
}
export { CartIsOpenProvider, useCart };
