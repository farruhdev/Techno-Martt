import React, { useState, useEffect } from 'react';
import {
	Box,
	Image,
	Text,
	Badge,
	Flex,
	IconButton,
	Skeleton,
	useToast,
	Tooltip,
	useColorModeValue as mode,
} from '@chakra-ui/react';
import { BiExpand } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link as ReactLink } from 'react-router-dom';
import { addToFavorites, removeFromFavorites } from '../redux/actions/productActions';
import { addCartItem } from '../redux/actions/cartActions';
import { TbShoppingCartPlus } from 'react-icons/tb';

const ProductCard = ({ product, loading }) => {
	const dispatch = useDispatch();
	const { favorites } = useSelector((state) => state.product);
	const { cartItems } = useSelector((state) => state.cart);
	const toast = useToast();
	const [isShown, setIsShown] = useState(false);
	const [cartPlusDisabled, setCartPlusDisabled] = useState(false);

	useEffect(() => {
		const item = cartItems.find((cartItem) => cartItem.id === product._id);
		if (item && item.qty === product.stock) {
			setCartPlusDisabled(true);
		}
	}, [product, cartItems]);

	const calculateDiscountedPrice = (price, discountPercentage) => {
		return (price * (100 - discountPercentage) / 100).toFixed(2);
	};

	const addItem = (id) => {
		const existingCartItem = cartItems.find((cartItem) => cartItem.id === id);
		const price = product.hasDiscount
			? parseFloat(calculateDiscountedPrice(product.price, product.discountPercentage))
			: product.price;

		if (existingCartItem) {
			dispatch(addCartItem(id, existingCartItem.qty + 1, { ...existingCartItem, price }));
		} else {
			dispatch(
				addCartItem(id, 1, {
					...product,
					price,
				})
			);
		}

		toast({
			description: 'Item has been added.',
			status: 'success',
			isClosable: true,
		});
	};

	return (
		<Skeleton isLoaded={!loading}>
			<Box
				_hover={{ transform: 'scale(1.1)', transitionDuration: '0.5s' }}
				borderWidth="1px"
				overflow="hidden"
				p="4"
				shadow="md"
			>
				<Image
					onMouseEnter={() => setIsShown(true)}
					onMouseLeave={() => setIsShown(false)}
					src={product.images[isShown && product.images.length === 2 ? 1 : 0]}
					fallbackSrc="https://via.placeholder.com/150"
					alt={product.name}
					height="200px"
				/>
				{product.stock < 5 ? (
					<Badge colorScheme="yellow">only {product.stock} left</Badge>
				) : product.stock < 1 ? (
					<Badge colorScheme="red">Sold out</Badge>
				) : (
					<Badge colorScheme="green">In Stock</Badge>
				)}
				{product.productIsNew && (
					<Badge ml="2" colorScheme="purple">
						new
					</Badge>
				)}
				{product.hasDiscount && (
					<Badge colorScheme="red" ml="2">
						{product.discountPercentage}% OFF
					</Badge>
				)}
				<Text noOfLines={1} fontSize="xl" fontWeight="semibold" mt="2">
					{product.brand} {` `} {product.name}
				</Text>
				<Text noOfLines={1} fontSize="md" color="gray.600">
					{product.subtitle}
				</Text>
				<Flex justify="space-between" alignItems="center" mt="2">
					<Badge colorScheme="cyan">{product.category}</Badge>
					{product.hasDiscount ? (
						<>
							<Text as="s" color={mode('gray.600', 'gray.400')} fontSize="md">
								${product.price}
							</Text>
							<Text fontWeight="bold" fontSize="2xl" color="red.500">
								${calculateDiscountedPrice(product.price, product.discountPercentage)}
							</Text>
						</>
					) : (
						<Text fontWeight="bold" fontSize="xl" color={mode('gray.800', 'white')}>
							${product.price}
						</Text>
					)}
				</Flex>
				<Flex justify="space-between" mt="2">
					{favorites.includes(product._id) ? (
						<IconButton
							icon={<MdOutlineFavorite size="20px" />}
							colorScheme="cyan"
							size="sm"
							onClick={() => dispatch(removeFromFavorites(product._id))}
						/>
					) : (
						<IconButton
							icon={<MdOutlineFavoriteBorder size="20px" />}
							colorScheme="cyan"
							size="sm"
							onClick={() => dispatch(addToFavorites(product._id))}
						/>
					)}

					<IconButton
						icon={<BiExpand size="20" />}
						as={ReactLink}
						to={`/product/${product._id}`}
						colorScheme="cyan"
						size="sm"
					/>

					<Tooltip
						isDisabled={!cartPlusDisabled}
						hasArrow
						label={
							cartPlusDisabled
								? 'You reached the maximum quantity of the product.'
								: product.stock <= 0
									? 'Out of stock'
									: ''
						}
					>
						<IconButton
							isDisabled={product.stock <= 0 || cartPlusDisabled}
							onClick={() => addItem(product._id)}
							icon={<TbShoppingCartPlus size="20" />}
							colorScheme="cyan"
							size="sm"
						/>
					</Tooltip>
				</Flex>
			</Box>
		</Skeleton>
	);
};

export default ProductCard;