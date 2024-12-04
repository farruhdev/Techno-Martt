import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../redux/actions/productActions";
import Slider from "react-slick";
import {
    Box,
    Badge,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue as mode,
    Container,
    Skeleton,
    Alert,
    AlertIcon,
    Button,
    Flex,
    Icon
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@chakra-ui/icons";


const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <Button
            onClick={onClick}
            position="absolute"
            right={-10}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            w={8}
            h={8}
            minW={8}
            bg={mode("gray.200", "gray.700")}
            _hover={{ bg: mode("gray.300", "gray.600") }}
        >
            <Icon as={ChevronRightIcon} />
        </Button>
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <Button
            onClick={onClick}
            position="absolute"
            left={-10}
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            rounded="full"
            w={8}
            h={8}
            minW={8}
            bg={mode("gray.200", "gray.700")}
            _hover={{ bg: mode("gray.300", "gray.600") }}
        >
            <Icon as={ChevronLeftIcon} />
        </Button>
    );
};

const ProductCard = ({ product, isNewSection }) => {
    const navigate = useNavigate();
    const calculateDiscountedPrice = (price, discountPercentage) => {
        return (price * (100 - discountPercentage) / 100).toFixed(2);
    };

    const handleProductClick = (e) => {
        // Предотвращаем срабатывание клика при использовании стрелок карусели
        if (e.target.closest('button')) {
            return;
        }
        navigate(`/product/${product._id}`);
    };

    return (
        <Box p={4}>
            <Box
                position="relative"
                rounded="lg"
                overflow="hidden"
                shadow="md"
                transition="transform 0.2s"
                _hover={{
                    transform: 'scale(1.02)',
                    cursor: 'pointer',
                    shadow: 'lg'
                }}
                onClick={handleProductClick}
            >
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    w="full"
                    h="250px"
                    objectFit="cover"
                />
                <Stack
                    position="absolute"
                    top={2}
                    left={2}
                    spacing={2}
                >
                    {!isNewSection && product.hasDiscount && (
                        <Badge
                            colorScheme="red"
                            fontSize="0.9em"
                            px={2}
                            py={1}
                            rounded="md"
                        >
                            {product.discountPercentage}% OFF
                        </Badge>
                    )}
                    {isNewSection && (
                        <Badge
                            colorScheme="green"
                            fontSize="0.9em"
                            px={2}
                            py={1}
                            rounded="md"
                        >
                            NEW
                        </Badge>
                    )}
                </Stack>
            </Box>
            <Stack
                mt={4}
                spacing={2}
                onClick={handleProductClick}
                _hover={{ cursor: 'pointer' }}
            >
                <Heading as="h3" size="md" noOfLines={1}>
                    {product.name}
                </Heading>
                <Text color={mode("gray.600", "gray.300")} noOfLines={2}>
                    {product.description}
                </Text>
                <Flex align="center" justify="space-between">
                    <Stack spacing={1}>
                        {!isNewSection && product.hasDiscount ? (
                            <>
                                <Text
                                    as="s"
                                    color={mode("gray.600", "gray.400")}
                                    fontSize="md"
                                >
                                    ${product.price}
                                </Text>
                                <Text
                                    fontWeight="bold"
                                    fontSize="2xl"
                                    color="red.500"
                                >
                                    ${calculateDiscountedPrice(product.price, product.discountPercentage)}
                                </Text>
                            </>
                        ) : (
                            <Text
                                fontWeight="bold"
                                fontSize="xl"
                                color={mode("gray.800", "white")}
                            >
                                ${product.price}
                            </Text>
                        )}
                    </Stack>
                    {product.rating && (
                        <Flex align="center" gap={1}>
                            <Icon as={StarIcon} color="yellow.400" />
                            <Text>{product.rating}</Text>
                        </Flex>
                    )}
                </Flex>
            </Stack>
        </Box>
    );
};

const ProductCarouselSection = ({ title, products, bgColor, isNewSection }) => {
    const settings = {
        dots: true,
        infinite: products.length > 3,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    if (products.length === 0) return null;

    return (
        <Stack spacing={8} bg={bgColor} p={6} rounded="lg" mb={8}>
            <Heading
                as="h2"
                size="lg"
                color={mode("gray.800", "white")}
                textAlign="center"
            >
                {title}
            </Heading>
            <Box px={10}>
                <Slider {...settings}>
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            isNewSection={isNewSection}
                        />
                    ))}
                </Slider>
            </Box>
        </Stack>
    );
};

const DualProductCarousel = () => {
    const dispatch = useDispatch();
    const { products = [], loading, error } = useSelector((state) => state.product || {});

    useEffect(() => {
        dispatch(getProducts(1, false));
    }, [dispatch]);

    const newProducts = products.filter(product => product.productIsNew);
    const discountedProducts = products.filter(product => product.hasDiscount);

    if (loading) {
        return (
            <Container maxW="container.xl" py={8}>
                <Stack spacing={8}>
                    {[1, 2].map((section) => (
                        <Stack key={section} spacing={4}>
                            <Skeleton height="40px" width="300px" />
                            <Flex gap={4}>
                                {[1, 2, 3].map((i) => (
                                    <Box key={i} flex={1}>
                                        <Skeleton height="200px" mb={4} />
                                        <Skeleton height="20px" mb={2} />
                                        <Skeleton height="20px" width="80%" />
                                    </Box>
                                ))}
                            </Flex>
                        </Stack>
                    ))}
                </Stack>
            </Container>
        );
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                Error loading products: {error}
            </Alert>
        );
    }

    if (newProducts.length === 0 && discountedProducts.length === 0) {
        return null;
    }

    return (
        <Container maxW="container.xl" py={8}>
            <ProductCarouselSection
                title="New Arrivals"
                products={newProducts}
                bgColor={mode("gray.50", "gray.800")}
                isNewSection={true}
            />
            <ProductCarouselSection
                title="Special Offers"
                products={discountedProducts}
                bgColor="transparent"
                isNewSection={false}
            />
        </Container>
    );
};

export default DualProductCarousel;