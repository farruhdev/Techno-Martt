import React, {useRef} from "react";
import {
  IconButton,
  Box,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue as mode,
  useDisclosure,
  AlertDescription,
  Alert,
  AlertIcon,
  AlertTitle,
  Divider,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  useToast,
  Container
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsPhoneFlip } from "react-icons/bs";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import NavLink from "./NavLink";
import ColorModeToggle from "./ColorModeToggle";
import { BiUserCheck, BiLogInCircle } from "react-icons/bi";
import { toggleFavorites } from "../redux/actions/productActions";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { TbShoppingCart } from "react-icons/tb";
import { logout } from "../redux/actions/userActions";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { googleLogout } from "@react-oauth/google";

const Links = [
  { name: "Hot Deals", route: "/hot-deals" },
  { name: "Contact", route: "/contact" },
  { name: "Services", route: "/services" },
];

const categories = [
  { name: "All Products", value: "all" },
  { name: "Smartphone", value: "Smartphone" },
  { name: "Laptops", value: "Laptops" },
  { name: "Living Appliances", value: "Living Appliances" },
  { name: "Home Digital", value: "Home Digital" },
  { name: "Camera", value: "Camera" },
  { name: "Kitchen Appliances", value: "Kitchen Appliances" },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const { favoritesToggled } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const [showBanner, setShowBanner] = useState(
      userInfo ? !userInfo.active : false
  );

  useEffect(() => {
    if (userInfo && !userInfo.active) {
      setShowBanner(true);
    }
  }, [favoritesToggled, dispatch, userInfo]);

  const logoutHandler = () => {
    googleLogout();
    dispatch(logout());
    toast({
      description: "You have been logged out.",
      status: "success",
      isClosable: "true",
    });
  };

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const handleSelect = (category) => {
    setSelectedCategory(category.name);
    setCategoryOpen(false);
    navigate(category.value === "all" ? "/products" : `/products/${category.value}`);
  };

  // Закрытие списка при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
      <Box ref={dropdownRef} className="bg-[#76E4F7] relative z-30" bg={mode(`cyan.300`, "gray.900")}>
        <Container maxW="container.xl">
          <Flex
              h="16"
              alignItems="center"
              justifyContent="space-between"
              px={{base: "0.5", md: "0"}}
          >
            <Flex display={{base: "flex", md: "none"}} alignItems="center">
              <IconButton
                  bg="parent"
                  size="md"
                  icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
                  onClick={isOpen ? onClose : onOpen}
              />
              <IconButton
                  ml="12"
                  position="absolute"
                  icon={<TbShoppingCart size="20px"/>}
                  as={ReactLink}
                  to="/cart"
                  variant="ghost"
              />
              {cartItems.length > 0 && (
                  <Text
                      fontWeight="bold"
                      fontStyle="italic"
                      position="absolute"
                      ml="74px"
                      mt="-6"
                      fontSize="sm"
                  >
                    {cartItems.length}
                  </Text>
              )}
            </Flex>
            <HStack spacing="8" alignItems="center">
              <Box alignItems="center" display="flex" as={ReactLink} to="/">
                <Icon
                    as={BsPhoneFlip}
                    h="6"
                    w="6"
                    color={mode("black", "yellow.200")}
                />
                <Text as="b">TechnoMart</Text>
              </Box>
              <HStack as="nav" spacing="4" display={{base: "none", md: "flex"}}>
                <div className="relative inline-block text-left">
                  {/* Текущая выбранная категория */}
                  <button
                      onClick={() => setCategoryOpen(!categoryOpen)}
                      className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  >
                    {selectedCategory}
                    <svg
                        className="ml-2 h-5 w-5 text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                      <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Выпадающий список */}
                  {categoryOpen && (
                      <div
                          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                          {categories.map((category) => (
                              <button
                                  key={category.value}
                                  onClick={() => handleSelect(category)}
                                  className={`block w-full text-left px-4 py-2 text-sm ${
                                      selectedCategory === category.name
                                          ? "bg-[#76E4F7] text-white dark:bg-cyan-500"
                                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                  }`}
                              >
                                {category.name}
                              </button>
                          ))}
                        </div>
                      </div>
                  )}
                </div>

                {Links.map((link) => (
                    <NavLink route={link.route} key={link.route}>
                      <Text fontWeight="medium">{link.name}</Text>
                    </NavLink>
                ))}
                <Box>
                  <IconButton
                      icon={<TbShoppingCart size="20px"/>}
                      as={ReactLink}
                      to="/cart"
                      variant="ghost"
                  />
                  {cartItems.length > 0 && (
                      <Text
                          fontWeight="bold"
                          fontStyle="italic"
                          position="absolute"
                          ml="26px"
                          mt="-6"
                          fontSize="sm"
                      >
                        {cartItems.length}
                      </Text>
                  )}
                </Box>

                <ColorModeToggle/>
                {favoritesToggled ? (
                    <IconButton
                        onClick={() => dispatch(toggleFavorites(false))}
                        icon={<MdOutlineFavorite size="20px"/>}
                        variant="ghost"
                    />
                ) : (
                    <IconButton
                        onClick={() => dispatch(toggleFavorites(true))}
                        icon={<MdOutlineFavoriteBorder size="20px"/>}
                        variant="ghost"
                    />
                )}
              </HStack>
            </HStack>
            <Flex alignItems="center">
              {userInfo ? (
                  <Menu>
                    <MenuButton
                        rounded="full"
                        variant="link"
                        cursor="pointer"
                        minW="0"
                    >
                      <HStack>
                        {userInfo.googleImage ? (
                            <Image
                                borderRadius="full"
                                boxSize="40px"
                                src={userInfo.googleImage}
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <BiUserCheck size="30"/>
                        )}

                        <ChevronDownIcon/>
                      </HStack>
                    </MenuButton>
                    <MenuList>
                      <HStack>
                        <Text pl="3" as="i">
                          {userInfo.email}
                        </Text>
                        {userInfo.googleId && <FcGoogle/>}
                      </HStack>
                      <Divider py="1"/>
                      <MenuItem as={ReactLink} to="/order-history">
                        Order History
                      </MenuItem>
                      <MenuItem as={ReactLink} to="/profile">
                        Profile
                      </MenuItem>
                      {userInfo.isAdmin && (
                          <>
                            <MenuDivider/>
                            <MenuItem as={ReactLink} to="/admin-console">
                              <MdOutlineAdminPanelSettings/>
                              <Text ml="2">Admin Console</Text>
                            </MenuItem>
                          </>
                      )}
                      <MenuDivider/>
                      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
              ) : (
                  <Menu>
                    <MenuButton
                        as={IconButton}
                        variant="ghost"
                        cursor="pointer"
                        icon={<BiLogInCircle size="25px"/>}
                    />
                    <MenuList>
                      <MenuItem
                          as={ReactLink}
                          to="/login"
                          p="2"
                          fontWeight="400"
                          variant="link"
                      >
                        Sign in
                      </MenuItem>
                      <MenuDivider/>
                      <MenuItem
                          as={ReactLink}
                          to="/registration"
                          p="2"
                          fontWeight="400"
                          variant="link"
                      >
                        Sign up
                      </MenuItem>
                    </MenuList>
                  </Menu>
              )}
            </Flex>
          </Flex>
          <Box>
            {isOpen && (
                <Box
                    pb="4"
                    display={{base: "flex", md: "none"}}
                    position={"absolute"}
                    bg={mode(`cyan.300`, "gray.900")}
                    width={"full"}
                    left="0"
                    zIndex={50}
                    boxShadow={"md"}
                    flexDir={"column"}
                >
                  <Stack as="nav" spacing="4" px="4">
                    {Links.map((link) => (
                        <NavLink
                            route={link.route}
                            key={link.route}
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                        >
                          <Text fontWeight="medium">{link.name}</Text>
                        </NavLink>
                    ))}
                  </Stack>
                  <Stack display={"flex"} flexDir={"row"} px="4">
                    {favoritesToggled ? (
                        <IconButton
                            onClick={() => dispatch(toggleFavorites(false))}
                            icon={<MdOutlineFavorite size="20px"/>}
                            variant="ghost"
                        />
                    ) : (
                        <IconButton
                            onClick={() => dispatch(toggleFavorites(true))}
                            icon={<MdOutlineFavoriteBorder size="20px"/>}
                            variant="ghost"
                        />
                    )}
                    <ColorModeToggle/>
                  </Stack>
                </Box>
            )}
          </Box>
        </Container>

        {userInfo && !userInfo.active && showBanner && (
            <Container maxW="container.xl">
              <Alert status="warning">
                <AlertIcon/>
                <AlertTitle>Email not verified!</AlertTitle>
                <AlertDescription>
                  You must verify your email address.
                </AlertDescription>
                <Spacer/>
                <CloseIcon
                    cursor={"pointer"}
                    onClick={() => setShowBanner(false)}
                />
              </Alert>
            </Container>
        )}
      </Box>
  );
};

export default Header;