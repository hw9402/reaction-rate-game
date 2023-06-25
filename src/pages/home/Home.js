import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Container>
        <Title>⚡ 반응속도 테스트</Title>
        <Link to="/game">
          <Button>플레이</Button>
        </Link>
        <Link to="/rank">
          <Button>순위</Button>
        </Link>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  font-family: 'GmarketSansMedium';
  margin-bottom: 87px;
`;

const Button = styled.button`
  width: 310px;
  height: 77px;
  background-color: #AFD3E2;
  border: none;
  border-radius: 24px;
  font-family: 'GmarketSansMedium';
  font-size: 32px;
  margin-bottom: 43px;

  &:hover {  
    font-size: 36px;
  }
`;

export default Home;