import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar/Navbar";
import {
  decrement_cart_count,
  increment_cartitems_count,
  remove_from_cart,
} from "../redux/cart/cart.action";

const CartItemsPage = () => {
  let dispatch = useDispatch();

  let handleIncrement = (id) => {
    dispatch(increment_cartitems_count(id));
  };

  let handleDecrement = (id) => {
    dispatch(decrement_cart_count(id));
  };

  let store = useSelector((state) => state.cartManager);
  console.log(store.cartItems, "cart ");

  let totalvalue = 0;

  for (let i = 0; i < store.cartItems.length; i++) {
    totalvalue +=
      (store.cartItems[i].cart_count + 1) * store.cartItems[i].price;
    console.log(store);
    console.log("inside", store.cartItems);
  }

  console.log(totalvalue);

  let handleRemove = (id) => {
    dispatch(remove_from_cart(id));
  };

  return (
    <Box>
      <Navbar />

      <Heading textAlign={"center"} py="20px" fontSize={"40px"}>
        Your Cart : {store.cartItems.length} Items{" "}
      </Heading>

      <Stack
        gap={5}
        p={5}
        w={"90%"}
        margin="auto">

        {store.cartItems.map((el) => (
          <Stack
            direction={{ base: "column", md: "row" }}
            // bg="rgb(220,220,220)"
            borderRadius={"20px"}
            p={5}
            alignItems="center"
            justifyContent={"space-around"}
            boxShadow= "rgba(0, 0, 0, 0.35) 0px 5px 15px" >
            <Box w={{ base: "70%", md: "18%" }} >
              <Image src={el.image} w="100%" />
            </Box>
            <Box>
              <Text fontSize={"25px"} fontWeight="bold"> {el.title}</Text>
            </Box>
            <Box>
              <Text fontSize={"25px"} fontWeight="bold">  ₹ {el.price}</Text>
            </Box>

            <HStack>
              <Button disabled={true}
                onClick={() => handleDecrement(el.id)}
                bg="blue"
                color={"white"} >
                -
              </Button>
              <Button bg="blue" color={"white"}>
                {el.cart_count + 1}
              </Button>
              <Button
                bg="blue"
                color={"white"}
                onClick={() => handleIncrement(el.id)}>
                +
              </Button>
            </HStack>

            <Box>
              <Text fontSize={"25px"} fontWeight="bold" >
                Total: ₹ {(el.cart_count + 1) * el.price}{" "}
              </Text>
            </Box>

            <Box>
              <Button
                onClick={() => handleRemove(el.id)}
                color="white"
                bg={"red"}>
                Delete
              </Button>
            </Box>
          </Stack>
        ))}
      </Stack>

      <Stack m={"auto"} mb={20} gap={5} mt="10px" alignItems="center" >
        <Heading>Total Price: ₹ {totalvalue} </Heading>
        <Link to={"/payment"}>
          <Box>
            <Button bg={"teal"} w="200px" color={"white"}>
              Proceed to Buy{" "}
            </Button>
          </Box>
        </Link>
      </Stack>

      <Footer />
    </Box>
  );
};

export default CartItemsPage;
