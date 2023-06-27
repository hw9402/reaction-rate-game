import { useState, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from 'react-router-dom';
import Header from "../../components/common/Header";

const Game = () => {
  const [step, setStep] = useState(1); // landing: 1, waiting: 2, ready: 3, click: 4, wrong: 5
  const [recent, setRecent] = useState([]);

  const timeout = useRef();
  const startTime = useRef();
  const endTime = useRef();

  const navigate = useNavigate();

  // 1: 시작페이지
  // 2: 클릭 기다리기  onClick? 5: wrong page
  // 3: 색깔 바뀜     onClick? 4: result page
  // 6: 게임 종료!

  const onClick = () => {
    if (step === 6) {
      setRecent([]);
      setStep(1);
      return;
    }
    if (recent.length === 3) {
      setStep(6);
      return;
    }
    if (step === 1) {
      setStep(2);
      startTimeout();
    } else if (step === 2) {
        clearTimeout(timeout.current);
        setStep(5);
    } else if (step === 3) {
        endTime.current = new Date();
        setStep(4);
        setRecent([...recent, endTime.current - startTime.current]);
    } else if (step === 4 || step === 5) {
      setStep(2);
      startTimeout();
    }
  }

  const startTimeout = () => {
    timeout.current = setTimeout(() => {
      setStep(3);
      startTime.current = new Date();
    }, Math.floor(Math.random() * 2000) + 1000); // 1~3초
  }

  return (
    <>
      <Container>
        <Header value='game' />
        {
          step === 1 ? (
            <ClickArea1 onClick={() => onClick()}>
              <Describe1>클릭하면 시작합니다.</Describe1>
              <Describe1>배경색이 바뀌면 빠르게 클릭하세요~!</Describe1>
            </ClickArea1>
          ) : step === 2 ? (
            <ClickArea1 onClick={() => onClick()}>
              <Describe1>빠르게 클릭하세요!</Describe1>
            </ClickArea1>
          ) : step === 3 ? (
            <ClickArea2 onClick={() => onClick()}>
              <Describe2>빠르게 클릭하세요!</Describe2>
            </ClickArea2>
          ) : step === 4 ? (
            <ClickArea3 onClick={() => onClick()}>
              <Describe3>결과 : {recent.at(-1)}ms</Describe3>
              <Describe3>다시하려면 클릭하세요!</Describe3>
            </ClickArea3>
          ) : step === 5 ? (
            <ClickArea3 onClick={() => onClick()}>
              <Describe3>너무 일찍 클릭했어요</Describe3>
              <Describe3>다시하려면 클릭하세요!</Describe3>
            </ClickArea3>
          ) : step === 6 ? (
            <ClickArea3>
              <Describe3>끝!</Describe3>
            </ClickArea3>
          ) : null
        }
        <Section>
          <RecentDiv>
            <RecentTitle>최근 기록 <RecentSubTitle>(3회가 넘어가면 초기화됩니다)</RecentSubTitle></RecentTitle>
            <Recent>{recent.map(v => <RecentElement>{v}ms</RecentElement>)}</Recent>
          </RecentDiv>
          {step === 6 && (
            <>
              <Retry onClick={() => onClick()}>다시하기</Retry>
              <GoToRank onClick={() => navigate('/form', { state: {recent: recent} })}>순위 등록</GoToRank>
            </>
          )}
        </Section>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClickArea1 = styled.div`
  width: 70vw;
  height: 52.6vh;
  background-color: #19A7CE;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ClickArea2 = styled.div`
  width: 70vw;
  height: 52.6vh;
  background-color: #D3D04F;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ClickArea3 = styled.div`
  width: 70vw;
  height: 52.6vh;
  background-color: #F45050;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Describe1 = styled.p`
  color: white;
  font-size: 28px;
  font-family: 'GmarketSansMedium';
  background-color: #19A7CE;
  line-height: 60px;
`;

const Describe2 = styled.p`
  color: white;
  font-size: 28px;
  font-family: 'GmarketSansMedium';
  background-color: #D3D04F;
  line-height: 60px;
`;

const Describe3 = styled.p`
  color: white;
  font-size: 28px;
  font-family: 'GmarketSansMedium';
  background-color: #F45050;
  line-height: 60px;
`;

const Section = styled.div`
  width: 70vw;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const RecentDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const RecentTitle = styled.p`
  font-size: 32px;
`;

const RecentSubTitle = styled.span`
  font-size: 16px;
`;

const Recent = styled.div`
  width: 45vw;
  height: 8vh;
  margin-top: 8px;
  display: flex;
  gap: 50px;
  border: 2px solid black;
  justify-content: center;
  align-items: center;
`;

const RecentElement = styled.span`
  font-size: 25px;
  font-family: 'GmarketSansMedium';
`;

const Retry = styled.button`
  width: 10vw;
  height: 8vh;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;

const GoToRank = styled.button`
  width: 10vw;
  height: 8vh;
  font-size: 20px;
  font-family: 'GmarketSansMedium';
`;

export default Game;