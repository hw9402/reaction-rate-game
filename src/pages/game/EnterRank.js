import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { db } from '../../db/firebase-config';
import { addDoc, collection } from "firebase/firestore";

const EnterRank = () => {
  const rankCollectionRef = collection(db, "rank");

  const location = useLocation();
  const { recent } = location.state;

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [state, setState] = useState(false);

  const handleChange = e => {
    const { value } = e.target;
    setName(value);
  }

  const saveFirebase = async () => {
    setState(true);
    await addDoc(rankCollectionRef, {
      name: name,
      score: Math.floor(recent.reduce((sum, index) => sum + index) / recent.length),
      date: new Date()
    });
    alert('순위가 등록되었습니다!');
    navigate('/rank');
  }

  return (
    <>
      <Container>
        <Title>순위 등록하기!</Title>
        <Input placeholder='닉네임을 작성해주세요!' onChange={handleChange}/>
        <Button onClick={() => saveFirebase()} disabled={state}>등록</Button>
        <Hint>점수는 3번의 게임 결과의 평균값으로 산정됩니다.</Hint>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 45px;
  font-family: 'GmarketSansMedium';
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 20vw;
  height: 6vh;
  font-size: 25px;
  font-family: 'GmarketSansMedium';
  margin-bottom: 5px;

  &::placeholder {
    font-size: 17px;
    text-align: center;
  }
`;

const Button = styled.button`
  width: 20vw;
  height: 4vh;
  background-color: #AFD3E2;
  font-family: 'GmarketSansMedium';
  font-size: 18px;
  margin-bottom: 15px;
`;

const Hint = styled.p`
  font-family: 'GmarketSansMedium';
  color: #8A8A8A;
`;

export default EnterRank;