import {
	Alert,
	AlertTitle,
	AlertIcon,
	AlertDescription,
	Box,
	Button,
	Center,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../redux/actions/productActions';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const ProductsScreen = () => {
	const { category } = useParams();
	const dispatch = useDispatch();
	const { loading, error, products: allProducts, pagination, favoritesToggled } = useSelector(
		(state) => state.product
	);

	const [filteredProducts, setFilteredProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10; // Adjust this value based on your actual items per page

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	useEffect(() => {
		if (category) {
			const filtered = allProducts.filter((product) => product.category === category);
			setFilteredProducts(filtered);
		} else {
			setFilteredProducts(allProducts);
		}
		setCurrentPage(1); // Reset to first page when category changes
	}, [category, allProducts]);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<>
			{filteredProducts.length >= 1 ? (
				<Box>
					<Wrap spacing="30px" justify="center" minHeight="80vh" mx={{ base: '12', md: '20', lg: '32' }}>
						{error ? (
							<Alert status="error">
								<AlertIcon />
								<AlertTitle>We are sorry!</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						) : (
							currentItems.map((product) => (
								<WrapItem key={product._id}>
									<Center w="250px" h="450px">
										<ProductCard product={product} loading={loading} />
									</Center>
								</WrapItem>
							))
						)}
					</Wrap>
					{!favoritesToggled && totalPages > 1 && (
						<Wrap spacing="10px" justify="center" p="5">
							<Button
								colorScheme="cyan"
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
							>
								<ArrowLeftIcon />
							</Button>
							{Array.from({ length: totalPages }, (_, i) => (
								<Button
									colorScheme={currentPage === i + 1 ? 'cyan' : 'gray'}
									key={i}
									onClick={() => handlePageChange(i + 1)}
								>
									{i + 1}
								</Button>
							))}
							<Button
								colorScheme="cyan"
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
							>
								<ArrowRightIcon />
							</Button>
						</Wrap>
					)}
				</Box>
			) : (
				<Box className="h-96" mx={{ base: '12', md: '20', lg: '32' }} py="10">
					<Alert
						status="info"
						variant="subtle"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						textAlign="center"
						height="200px"
					>
						<AlertIcon boxSize="40px" mr={0} />
						<AlertTitle mt={4} mb={1} fontSize="lg">
							No products found
						</AlertTitle>
						<AlertDescription maxWidth="sm">
							We couldn't find any products in the "{category}" category. Please try selecting a different category.
						</AlertDescription>
					</Alert>
				</Box>
			)}
		</>
	);
};

export default ProductsScreen;

