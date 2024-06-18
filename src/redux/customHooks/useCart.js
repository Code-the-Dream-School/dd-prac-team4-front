import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reduceItem, addItem, clearCart } from '../shoppingCart';
import axiosInstance from '../../apis/axiosClient';

//custom hook
export default function useCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //function to round number to 2 decimal digits

  const roundedNumber = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

  // values come from Redux store

  const itemsInCart = useSelector((state) => state.cart);

  const subtotal = roundedNumber(useSelector((state) => state.cart.subtotal)); //total price of all items

  const tax = useSelector((state) => state.cart.tax);

  const total = roundedNumber(useSelector((state) => state.cart.totalAmount)); //total amount after tax

  const handleMoveToWishlist = async (album) => {
    dispatch(
      reduceItem({ album, quantity: itemsInCart.items[album.id].quantity })
    ); // Reduce the quantity of the item in the cart first

    const response = await axiosInstance.post('/wishlist'); // Make the call to create or get the wishlist

    const wishlistId = response.data.wishlist._id;

    await axiosInstance.patch(`/wishlist/${wishlistId}/add_album/${album.id}`); // Make the call to add the album to the wishlist

    console.log('Album successfully added to wishlist');
  };

  const handleAdd = (album) => {
    dispatch(addItem({ album, quantity: 1 }));
  };

  const handleReduce = (album) => {
    dispatch(reduceItem({ album, quantity: 1 }));
  };

  const handleRemove = (album) => {
    dispatch(
      reduceItem({ album, quantity: itemsInCart.items[album.id].quantity })
    );
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  //64fd67815fca88489ab99564

  const handleCheckout = () => {
    // Create the order data object

    const orderData = {
      orderItems: Object.values(itemsInCart.items).map((item) => ({
        album: item.album.id,

        quantity: item.quantity,
      })),

      subtotal,

      tax,

      total,
    };

    //clear the cart

    dispatch(clearCart());

    //navigate to checkout page and send order data as state

    navigate('/checkout', { state: { orderData } });
  };

  const variables = {
    itemsInCart,
    itemValues: Object.values(itemsInCart.items),
    subtotal,
    tax,
    total,
  };
  const functions = {
    handleMoveToWishlist,
    handleAdd,
    handleReduce,
    handleRemove,
    handleClearCart,
    handleCheckout,
  };

  return [variables, functions];
}
