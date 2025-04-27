import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Auth from "./Authentication/Auth";
import { useContext, useEffect } from "react";
import chatContext from "../context/chatContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../Img/logo2.svg'
const Home = () => {
  // context
  const context = useContext(chatContext);
  const { isAuthenticated } = context;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [index, setindex] = useState();
  const navigator = useNavigate();
  console.log(isAuthenticated)
  useEffect(() => {
    if (isAuthenticated) {
      navigator("/chat/dashboard");
    }
  });

  const handleloginopen = () => {
    setindex(0);
    onOpen();
  };

  const handlesignupopen = () => {
    setindex(1);
    onOpen();
  };

  return (
    <Box h={"max-content"} verticalAlign="middle">
      <Flex direction="column" align="center" justify="center" minH="80vh">
        <Box textAlign="center">
          
          <Text fontSize={"7xl"} fontWeight={"bold"} fontFamily={"Work sans"}>
            {/* Hik 8 */}
            <img src={Logo}></img>
          </Text>
          <Text color='white' fontSize="xl" fontWeight="bold" mb={4}>
            Online Chatting App
          </Text>
          <Button  mr={3} onClick={handleloginopen}>
            Login
          </Button>
          <Button style={{backgroundColor:'#fa3c6a',color:'white'}} colorScheme="purple" onClick={handlesignupopen}>
            Sign Up
          </Button>
        </Box>
      </Flex>
      {/* Copyright */}
      <Text
        fontSize="sm"
        position={"fixed"}
        bottom={2}
        // style={{backgroundColor:'#f5f5dc'}}
        left={"calc(50% - 155px)"}
        mt={4}
        textAlign="center"
      >
        &copy; 2024 Conversa. All rights reserved.
        <Link to="" target="_blank">
          <Text as="u" ml={1}>
            Hik 8
          </Text>
        </Link>
      </Text>
      {/* <Auth /> */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        colorScheme="red"
        size={{ base: "md", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent w={{ base: "95vw" }}>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Auth tabindex={index} />
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Home;
