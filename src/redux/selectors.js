const selectAlbumsInCart = (state) => {
  const cartValues = Object.values(state.cart.cartItems); // returns an array with the value of each entry in the cartItems object
  const albums = cartValues.map((cartVal) => cartVal.album);
  return albums;
};

export { selectAlbumsInCart };
