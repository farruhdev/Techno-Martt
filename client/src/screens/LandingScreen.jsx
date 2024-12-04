import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  useColorModeValue as mode,
  Text,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { NavLink, Link as ReactLink } from "react-router-dom";
import { BsPhoneFlip } from "react-icons/bs";
import {
  couch,
  product1,
  product2,
  product3,
  cross,
  monitor,
  bag,
  truck,
  support,
  returning,
  grid3,
  sofa,
} from "../assets/constansImages";

import styles from "../styles/bootstrap.module.css";
import "../styles/mobileStyle.css";
import "../styles/style.css";
import "../styles/tiny-slider.css";
import ProductCarousel from "../components/ProductCarusel";
import Hero from "../components/Hero";
// const LandingScreen = () => (
// 	<Box maxW='8xl' mx='auto' p={{ base: '0', lg: '12' }} minH='6xl'>
// 		<Stack direction={{ base: 'column-reverse', lg: 'row' }} spacing={{ base: '0', lg: '20' }}>
// 			<Box
// 				width={{ lg: 'sm' }}
// 				transform={{ base: 'translateY(-50%)', lg: 'none' }}
// 				bg={{ base: mode('cyan.50', 'gray.700'), lg: 'transparent' }}
// 				mx={{ base: '6', md: '8', lg: '0' }}
// 				px={{ base: '6', md: '8', lg: '0' }}
// 				py={{ base: '6', md: '8', lg: '12' }}>
// 				<Stack spacing={{ base: '8', lg: '10' }}>
// 					<Stack spacing={{ base: '2', lg: '4' }}>
// 						<Flex alignItems='center'>
// 							<Icon as={BsPhoneFlip} h={12} w={12} color={mode('cyan.500', 'yellow.200')} />
// 							<Text fontSize='4xl' fontWeight='bold'>
// 								Tech Lines
// 							</Text>
// 						</Flex>
// 						<Heading size='xl' fontWeight='normal'>
// 							Refresh your equipment
// 						</Heading>
// 					</Stack>
// 					<HStack spacing='3'>
// 						<Link as={ReactLink} to='/products' color={mode('cyan.500', 'yellow.200')}>
// 							Discover now
// 						</Link>
// 						<Icon color={mode('cyan.500', 'yellow.200')} as={FaArrowRight} />
// 					</HStack>
// 				</Stack>
// 			</Box>
// 			<Flex flex='1' overflow='hidden'>
// 				<Image
// 					src={mode('images/landing-light.jpg', 'images/landing-dark.jpg')}
// 					fallback={<Skeleton />}
// 					maxH='550px'
// 					minW='300px'
// 					objectFit='cover'
// 					flex='1'
// 				/>
// 			</Flex>
// 		</Stack>
// 	</Box>
// );

const LandingScreen = () => {
  return (
    <>
      <Hero />
      <ProductCarousel />
      {/*<Product />*/}
      <Services />
      <Help />
      <PopularProducts />
    </>
  );
};

export default LandingScreen;

// const Product = () => {
//   return (
//     <Stack bg={mode(`white`, "gray.600")} className="product-section">
//       <div className={styles["container"]}>
//         <h1>This is Products</h1>
//         <div className={styles["row"]}>
//           <div
//             className={`${styles["col-md-12"]} ${styles["col-lg-3"]} ${styles["mb-5"]} ${styles["mb-lg-0"]}`}
//           >
//             <Heading
//               as={"h2"}
//               color={mode("gray.800", "white")}
//               className={`${styles["mb-4"]} section-title`}
//             >
//               Crafted with excellent material.
//             </Heading>
//             <Text className={styles["mb-4"]}>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
//               minus molestiae natus aut, quia illum eveniet?
//             </Text>
//             <p>
//               <NavLink to="/products" className="btn">
//                 Explore
//               </NavLink>
//             </p>
//           </div>
//
//           <div
//             className={`box ${styles["col-12"]} ${styles["col-md-4"]} ${styles["col-lg-3"]} ${styles["mb-5"]} ${styles["mb-md-0"]}`}
//           >
//             <a className="product-item" href="#">
//               <img
//                 alt="product-thumbnail"
//                 src={product1}
//                 className={`${styles["img-fluid"]} product-thumbnail`}
//               />
//               <Heading
//                 as={"h2"}
//                 color={mode("gray.800", "white")}
//                 className="product-title"
//               >
//                 Smart Phone
//               </Heading>
//               <Text className="product-price">$50.00</Text>
//
//               <span className="icon-cross">
//                 <img
//                   src={cross}
//                   alt="product-thumbnail"
//                   className={styles["img-fluid"]}
//                 />
//               </span>
//             </a>
//           </div>
//
//           <div
//             className={`box ${styles["col-12"]} ${styles["col-md-4"]} ${styles["col-lg-3"]} ${styles["mb-5"]} ${styles["mb-md-0"]}`}
//           >
//             <a className="product-item" href="#">
//               <img
//                 alt="product-thumbnail"
//                 src={product2}
//                 className={`${styles["img-fluid"]} product-thumbnail`}
//               />
//               <Heading
//                 as={"h2"}
//                 color={mode("gray.800", "white")}
//                 className="product-title"
//               >
//                 Smart Phone
//               </Heading>
//               <Text className="product-price">$78.00</Text>
//
//               <span className="icon-cross">
//                 <img src={cross} alt="cross" className={styles["img-fluid"]} />
//               </span>
//             </a>
//           </div>
//
//           <div
//             className={`box ${styles["col-12"]} ${styles["col-md-4"]} ${styles["col-lg-3"]} ${styles["mb-5"]} ${styles["mb-md-0"]}`}
//           >
//             <a className="product-item" href="#">
//               <img
//                 alt="thumbnail"
//                 src={product3}
//                 className={`${styles["img-fluid"]} product-thumbnail`}
//               />
//               <Heading
//                 as={"h2"}
//                 color={mode("gray.800", "white")}
//                 className="product-title"
//               >
//                 Smart Phone
//               </Heading>
//               <Text className="product-price">$43.00</Text>
//
//               <span className="icon-cross">
//                 <img
//                   src={cross}
//                   alt="thumbnail"
//                   className={styles["img-fluid"]}
//                 />
//               </span>
//             </a>
//           </div>
//         </div>
//       </div>
//     </Stack>
//   );
// };

const Services = () => {
  return (
    <Stack
      bg={mode(`white`, "gray.600")}
      id="services"
      className="why-choose-section"
    >
      <div className={styles["container"]}>
        <div
          className={`${styles["row"]} ${styles["justify-content-between"]} ${styles["text-center"]} ${styles["flex-column-reverse"]} ${styles["flex-lg-row"]}`}
        >
          <div className={`${styles["col-lg-6"]}`}>
            <Heading
              as={"h2"}
              color={mode(`gray.900`, "white")}
              className="section-title"
            >
              Why Choose Us
            </Heading>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad
              accusantium perferendis laborum magni! Nobis, quisquam quasi?
            </p>
            <div className={`${styles["my-5"]} ${styles["row"]}`}>
              <div className={`${styles["col-6"]} ${styles["col-md-6"]}`}>
                <div className="feature">
                  <div className="icon">
                    <img src={truck} alt="Truck" className="imf-fluid" />
                  </div>

                  <Heading
                    as={"h2"}
                    size={"sm"}
                    color={mode(`gray.900`, "white")}
                  >
                    Fast &amp; Free Shipping
                  </Heading>
                  <Text color={mode(`gray.900`, "white")}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Veritatis dolore illo eum quis? Non.
                  </Text>
                </div>
              </div>

              <div className={`${styles["col-6"]} ${styles["col-md-6"]}`}>
                <div className="feature">
                  <div className="icon">
                    <img src={bag} alt="Bag" className="imf-fluid" />
                  </div>
                  <Heading
                    as={"h2"}
                    size={"sm"}
                    color={mode(`gray.900`, "white")}
                  >
                    Easy to Shop
                  </Heading>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eveniet at enim perferendis necessitatibus ea!
                  </p>
                </div>
              </div>

              <div className={`${styles["col-6"]} ${styles["col-md-6"]}`}>
                <div className="feature">
                  <div className="icon">
                    <img src={support} alt="support" className="imf-fluid" />
                  </div>
                  <Heading
                    as={"h2"}
                    size={"sm"}
                    color={mode(`gray.900`, "white")}
                  >
                    24/7 Support
                  </Heading>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Praesentium totam corporis animi doloremque rerum?
                  </p>
                </div>
              </div>

              <div className={`${styles["col-6"]} ${styles["col-md-6"]}`}>
                <div className="feature">
                  <div className="icon">
                    <img
                      src={returning}
                      alt="returning"
                      className="imf-fluid"
                    />
                  </div>
                  <Heading
                    as={"h2"}
                    size={"sm"}
                    color={mode(`gray.900`, "white")}
                  >
                    Hassle Free Returns
                  </Heading>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis modi animi earum deserunt magni.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles["col-lg-5"]}>
            <div className="img-wrap">
              <img
                src={monitor}
                alt="monitor"
                className={`${styles["img-fluid"]}`}
              />
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
};

const Help = () => {
  return (
    <Stack bg={mode(`white`, "gray.600")} className="we-help-section">
      <div className={styles["container"]}>
        <div className="row justify-content-between">
          <div
            className={`${styles["col-lg-7"]} ${styles["mb-5"]} ${styles["mb-lg-0"]}`}
          >
            <div className="imgs-grid">
              <div className="grid grid-1">
                <img src={monitor} alt="online store" />
              </div>
              <div className="grid grid-2">
                <img src={sofa} alt="online store" />
              </div>
              <div className="grid grid-3">
                <img src={grid3} alt="online store" />
              </div>
            </div>
          </div>
          <div className={`${styles["col-lg-5 ps-lg-5"]} ${styles["ps-lg-5"]}`}>
            <Heading
              as={"h2"}
              color={mode(`gray.900`, "white")}
              className={`section-title ${styles["mb-4"]}`}
            >
              We Help You Make a Dicision to Choose The Suitable Divce
            </Heading>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. A illo
              aliquid enim quasi molestiae doloremque voluptate, harum soluta
              suscipit voluptatum.
            </p>

            <ul
              className={`${styles["list-unstyled"]} custom-list ${styles["my-4"]}`}
            >
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
              <li>Lorem, ipsum dolor sit amet consectetur adipisicing.</li>
            </ul>
            <p>
              <a herf="#" className="btn">
                Explore
              </a>
            </p>
          </div>
        </div>
      </div>
    </Stack>
  );
};

const PopularProducts = () => {
  return (
    <Stack bg={mode(`white`, "gray.600")} className="popular-product">
      <div className={styles["container"]}>
        <div className={styles["row"]}>
          <div
            className={`${styles["col-12"]} ${styles["col-md-6"]} ${styles["col-lg-4"]} ${styles["mb-4"]} ${styles["mb-lg-0"]}`}
          >
            <div className={`product-item-sm ${styles["d-flex"]}`}>
              <div className="thumbnail">
                <img
                  src={product1}
                  alt="Product1"
                  className={styles["img-fluid"]}
                />
              </div>
              <div className={styles["pt-3"]}>
                <Heading as={"h3"} color={mode(`gray.900`, "white")}>
                  Smart Phone
                </Heading>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
                  vitae.
                </p>
                <p>
                  <a href="#">Read More</a>
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${styles["col-12"]} ${styles["col-md-6"]} ${styles["col-lg-4"]} ${styles["mb-4"]} ${styles["mb-lg-0"]}`}
          >
            <div className={`product-item-sm ${styles["d-flex"]}`}>
              <div className="thumbnail">
                <img
                  src={product2}
                  alt="product2"
                  className={styles["img-fluid"]}
                />
              </div>
              <div className={styles["pt-3"]}>
                <h3>Smart Phone</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate, voluptatibus.
                </p>
                <p>
                  <a href="#">Read More</a>
                </p>
              </div>
            </div>
          </div>

          <div
            className={`${styles["col-12"]} ${styles["col-md-6"]} ${styles["col-lg-4"]} ${styles["mb-4"]} ${styles["mb-lg-0"]}`}
          >
            <div className={`product-item-sm ${styles["d-flex"]}`}>
              <div className="thumbnail">
                <img
                  src={product3}
                  alt="product3"
                  className={styles["img-fluid"]}
                />
              </div>
              <div className={styles["pt-3"]}>
                <h3>Smart Phone</h3>
                <Text color={mode("gray.800", "white")}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam,
                  reiciendis?
                </Text>
                <p>
                  <a href="#">Read More</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stack>
  );
};
