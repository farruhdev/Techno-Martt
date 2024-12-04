import express from 'express';
import Product from '../models/Product.js';
import { protectRoute, admin } from '../middleware/authMiddleware.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const productRoutes = express.Router();

const getProducts = async (req, res) => {
	const page = parseInt(req.params.page); // 1, 2 or 3
	const perPage = parseInt(req.params.perPage); // 10

	const products = await Product.find({});

	if (page && perPage) {
		const totalPages = Math.ceil(products.length / perPage);
		const startIndex = (page - 1) * perPage;
		const endIndex = startIndex + perPage;
		const paginatedProducts = products.slice(startIndex, endIndex);
		res.json({ products: paginatedProducts, pagination: { currentPage: page, totalPages } });
	} else {
		res.json({ products, pagination: {} });
	}
};

const getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404).send('Product not found.');
		throw new Error('Product not found');
	}
};

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment, userId, title } = req.body;

	const product = await Product.findById(req.params.id);
	const user = await User.findById(userId);

	if (product) {
		const alreadyReviewed = product.reviews.find((review) => review.user.toString() === user._id.toString());

		if (alreadyReviewed) {
			res.status(400).send('Product already reviewed.');
			throw new Error('Product already reviewed.');
		}

		const review = {
			name: user.name,
			rating: Number(rating),
			comment,
			title,
			user: user._id,
		};

		product.reviews.push(review);

		product.numberOfReviews = product.reviews.length;
		product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
		await product.save();
		res.status(201).json({ message: 'Review has been saved.' });
	} else {
		res.status(404).send('Product not found.');
		throw new Error('Product not found.');
	}
});

const createNewProduct = asyncHandler(async (req, res) => {
	try {
		const {
			brand,
			name,
			category,
			stock,
			price,
			images,
			productIsNew,
			description,
			subtitle,
			stripeId,
			hasDiscount,
			discountPercentage,
		} = req.body;

		// Проверьте обязательные поля
		if (!brand || !name || !category || !price || !images || images.length === 0) {
			res.status(400).json({ message: 'Missing required fields' });
			throw new Error('Missing required fields');
		}

		const newProduct = await Product.create({
			brand,
			name,
			category,
			subtitle,
			description,
			stock,
			price,
			images,
			productIsNew,
			stripeId,
			hasDiscount,
			discountPercentage,
		});

		res.status(201).json(newProduct);
	} catch (error) {
		console.error('Error creating product:', error);
		res.status(500).json({ message: error.message || 'Internal Server Error' });
	}
});

const updateProduct = asyncHandler(async (req, res) => {
	const {
		brand,
		name,
		category,
		stock,
		price,
		id,
		productIsNew,
		description,
		subtitle,
		stripeId,
		images, // Новый массив изображений
		hasDiscount,
		discountPercentage,
	} = req.body;

	// Находим продукт по ID
	const product = await Product.findById(id);

	if (product) {
		// Обновляем поля, если они переданы
		product.name = name || product.name;
		product.subtitle = subtitle || product.subtitle;
		product.price = price || product.price;
		product.description = description || product.description;
		product.brand = brand || product.brand;
		product.category = category || product.category;
		product.stock = stock || product.stock;
		product.productIsNew = productIsNew !== undefined ? productIsNew : product.productIsNew;
		product.stripeId = stripeId || product.stripeId;
		product.images = images && images.length > 0 ? images : product.images; // Используем новый массив, если он передан
		product.hasDiscount = hasDiscount !== undefined ? hasDiscount : product.hasDiscount;
		product.discountPercentage = discountPercentage || product.discountPercentage;

		// Сохраняем изменения
		await product.save();

		// Возвращаем обновленный список продуктов
		const products = await Product.find({});
		res.json(products);
	} else {
		res.status(404).send('Product not found.');
		throw new Error('Product not found.');
	}
});



const removeProductReview = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.productId);

	const updatedReviews = product.reviews.filter((review) => review._id.valueOf() !== req.params.reviewId);

	if (product) {
		product.reviews = updatedReviews;

		product.numberOfReviews = product.reviews.length;

		if (product.numberOfReviews > 0) {
			product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
		} else {
			product.rating = 5;
		}

		await product.save();
		const products = await Product.find({});
		res.json({ products, pagination: {} });
	} else {
		res.status(404).send('Product not found.');
		throw new Error('Product not found.');
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findByIdAndDelete(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404).send('Product not found.');
		throw new Error('Product not found.');
	}
});

productRoutes.route('/:page/:perPage').get(getProducts);
productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProduct);
productRoutes.route('/reviews/:id').post(protectRoute, createProductReview);
productRoutes.route('/:id').delete(protectRoute, admin, deleteProduct);
productRoutes.route('/').put(protectRoute, admin, updateProduct);
productRoutes.route('/:productId/:reviewId').put(protectRoute, admin, removeProductReview);
productRoutes.route('/').post(protectRoute, admin, createNewProduct);

export default productRoutes;
