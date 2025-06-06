import React from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
} from "@chakra-ui/react";

const DeleteMessageModal = (props) => {
  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to delete this message?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button onClick={() => props.handleDeleteMessage(2)} m={1}>
              Delete from everyone
            </Button>
            <Button
              onClick={() => props.handleDeleteMessage(1)}
              // colorScheme={"purple"}
              style={{backgroundColor:'#fa3c6a !important;'}}
              m={1}
            >
              Delete from Me
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteMessageModal;
