import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  background-color: rgba(0,0,0,1)
  box-shadow: 10px, 20px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`;

const ModalContent = styled.div`
  width: 80vh;
  height: 70vh;
  background-color: white;
  border: 1px solid black;
`;

const ModalHeader = styled.div`
  padding: 10px;
  border: 1px solid black;
`;

const ModalTitle = styled.div`
  margin: 0;
  border: 1px solid black;
`;

const ModalBody = styled.div`
  padding: 10px;
  height: 50vh;
  border-top: 1px solid #eee;
  border bottom: 1px solid #eee;
  overflow: auto;
  border: 1px solid black;
`;

const ModalFooter = styled.div`
  padding: 10px;
  border: 1px solid black;
`;

const ReviewPhotos = ({current, show, index, onClose}) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    setCurrentIndex(index);
  }, [index])


console.log('the piccc:', current, "--index: ", index);
  if (!show) {
    return null;
  }
  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <h4 className="modal-title">Write Your Review</h4>
        </ModalHeader>
        <ModalBody>
          About the {index}
        </ModalBody>
        <ModalFooter className="modal-footer">
          <button onClick={() => {onClose(); setCurrentIndex(null)}} className="button">Close</button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ReviewPhotos;
