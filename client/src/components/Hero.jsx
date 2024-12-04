import React, { useState, useEffect } from "react";
import { Heading, Stack, Image, Box, Spinner, Center } from "@chakra-ui/react";
import { useColorModeValue as mode } from "@chakra-ui/react";
import styles from "../styles/bootstrap.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Hero = () => {
    const [products, setProducts] = useState([]);
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("/api/products/1/10"); // Пример API-запроса
                setProducts(data.products || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (products.length === 0) return;

        const interval = setInterval(() => {
            setCurrentProductIndex((prevIndex) => (prevIndex + 1) % products.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [products]);

    if (loading) {
        return (
            <Center h="400px">
                <Spinner size="xl" thickness="4px" speed="0.65s" color="cyan.500" />
            </Center>
        );
    }

    const currentProduct = products[currentProductIndex];
    const productImage =
        currentProduct?.images?.[0] || "https://via.placeholder.com/150";

    return (
        <Stack className="hero" bg={mode(`cyan.300`, "gray.900")}>
            <div className={styles["container"]}>
                <div
                    className={`${styles["row"]} ${styles["justify-content-between"]}`}
                >
                    <div className={styles["col-lg-5"]}>
                        <div className="intro-excerpt">
                            <Heading as={"h1"} color={mode(`gray.900`, "white")}>
                                Transform Your Life
                                <span className={styles["d-block"]}>
                                 With the Latest Technology!
                                </span>
                            </Heading>
                            <p className={styles["mb-4"]}>
                            Discover a wide range of innovative electronics designed to simplify and 
                            enhance your everyday life. 
                            From smart gadgets to home appliances, we’ve got it all!"
                            </p>
                            <p>
                                <NavLink
                                    to="/products"
                                    style={{ background: "#ffffff" }}
                                    className={`btn btn-secondary ${styles["me-2"]}`}
                                >
                                    Shop Now 
                                </NavLink>
                                <NavLink href="#" className="btn btn-white-outline">
                                    Explore 
                                </NavLink>
                            </p>
                        </div>
                    </div>
                    <div className={styles["col-lg-7"]}>
                        <Box
                            className="hero-img-wrap"
                            style={{
                                position: "relative",
                                overflow: "hidden",
                                height: "400px",
                                borderRadius: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                className="animate__animated animate__fadeIn"
                                alt={currentProduct?.name || "Product"}
                                src={productImage}
                                fallbackSrc="https://via.placeholder.com/150"
                                style={{
                                    maxWidth: "90%", // Изображение будет уменьшено
                                    maxHeight: "90%", // Уменьшаем высоту изображения
                                    objectFit: "contain", // Полное отображение изображения
                                    transition: "opacity 1s ease-in-out",
                                }}
                            />
                        </Box>
                    </div>
                </div>
            </div>
        </Stack>
    );
};

export default Hero;
