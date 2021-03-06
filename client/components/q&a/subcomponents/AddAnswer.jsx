import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UploadImg from './UploadImg.jsx';

const Modal = styled.div`
  position: fixed;
  background-color: hsla(0, 0%, 0%, .8);
  box-shadow: 10px, 20px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 80%;
  height: 70%;
  background-color: white;
`;

const ModalHeader = styled.div`
  padding: 10px;
`;

const ModalBody = styled.div`
  padding: 10px;
  height: 50vh;
  border-top: 1px solid #eee;
  border bottom: 1px solid #eee;
  overflow: auto;
  font-weight: bold;
  font-size: 25px;

  input {
    width: 80%;
    height: 15%;
  }
`;

const ModalFooter = styled.div`
  padding: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  background: white;
  height: auto;
  width: auto;
  border: 1px solid black;
  margin-right: 1rem;
  padding: 1rem;
  font-size: .7rem;
`;

const AddAnswer = ({ current, show, onClose }) => {
  const [answer, updateAnswer] = useState('');
  const [nickname, updateNickname] = useState('');
  const [email, updateEmail] = useState('');
  const [imgLinks, updateImgLinks] = useState('')
  const [showImgUpload, setShowImgUpload] = useState(false);
  const [id, setId] = useState(null);

  const onAnswerChange = (e) => {
    updateAnswer(e);
  }

  const onNicknameChange = (e) => {
    updateNickname(e);
  }

  const onEmailChange = (e) => {
    updateEmail(e);
  }

  const onImgChange = (e) => {
    updateImgLinks(e);
  }

  const onSubmit = (e) => {
    const id = current.question_id;

    axios.post(`qa/questions/${id}/answers?question_id=${id}`,
    {
      "body": answer,
      "name": nickname,
      "email": email,
      "photos": [imgLinks]
    })
    .then(res => {
      onClose()
      console.log('success')
    })
    .catch(err => console.log(err))
  }

  if (!show) {
    return null;
  }
  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <UploadImg onClose={() => setShowImgUpload(true)} onClick={onClose} pass={onClose} current={current} show={showImgUpload} style={{ cursor: 'pointer' }} />
        <ModalHeader>
          <h1 className="modal-title">Add Answer</h1>
        </ModalHeader>
        <ModalBody>
          <div>*Answer</div>
          <input onChange={e => onAnswerChange(e.target.value)}placeholder='Enter answer to question asked here!'></input>
          <div>*Nickname</div>
          <input onChange={e => onNicknameChange(e.target.value)} placeholder='jackson11!'></input>
          <div>*Upload</div>
          <input onChange={e => onImgChange(e.target.value)} placeholder='Insert up to 5 comma separated links'></input>
          <div >*Email</div>
          <input onChange={e => onEmailChange(e.target.value)} placeholder='Example: jack@email.com'></input>
          <div>For authentication reasons, you will not be emailed</div>
          {/* thumbnail should appear and max 5 */}
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button onClick={onClose} className="button">Cancel</Button>
          {/* <Button style={{ cursor: 'pointer' }} onClick={() => setShowImgUpload(true)}><u>Add Photos</u></Button> */}
          <Button className="submit" onClick={() => onSubmit()}>Submit</Button>
          <div>Will close on successful submit</div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddAnswer;
