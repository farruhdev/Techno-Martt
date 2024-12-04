import axios from 'axios';
import { setError, setLoading, setShippingCosts, cartItemAdd, cartItemRemoval, clearCart } from '../slices/cart';

export const addCartItem = (id, qty) => async (dispatch) => {
	dispatch(setLoading(true));
	try {
		const { data } = await axios.get(`/api/products/${id}`);

		const discountedPrice = data.hasDiscount
			? (data.price * (100 - data.discountPercentage) / 100).toFixed(2)
			: data.price;

		const itemToAdd = {
			id: data._id,
			name: data.name,
			subtitle: data.subtitle,
			image: data.images[0],
			price: discountedPrice,
			originalPrice: data.price,
			stock: data.stock,
			brand: data.brand,
			qty,
			stripeId: data.stripeId,
			hasDiscount: data.hasDiscount,
			discountPercentage: data.discountPercentage,
		};

		dispatch(cartItemAdd(itemToAdd));
	} catch (error) {
		dispatch(
			setError(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
						? error.message
						: 'An expected error has occurred. Please try again later.'
			)
		);
	}
};


export const removeCartItem = (id) => async (dispatch) => {
	dispatch(setLoading(true));
	dispatch(cartItemRemoval(id));
};

export const setShipping = (value) => async (dispatch) => {
	dispatch(setShippingCosts(value));
};

export const resetCart = () => (dispatch) => {
	dispatch(clearCart);
};
