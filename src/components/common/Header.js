import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Header = ({ value }) => {
  return (
    <>
      <Container>
        <Link to="/"><Logo>⚡</Logo></Link>
        <MenuBar>
          <Link to="/game">
            { value === 'game' 
            ? <Menu>게임</Menu> 
            : <NotMenu>게임</NotMenu> }
          </Link>
          <Link to="/rank">
          { value === 'rank' 
            ? <Menu>순위</Menu> 
            : <NotMenu>순위</NotMenu> }
          </Link>
        </MenuBar>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 70%;
  height: 120px;
  display: flex;
  align-items: center;
  gap: 60px;
`;

const Logo = styled.span`
  font-size: 60px;
  float: left;
`;

const MenuBar = styled.div`
  display: flex;
  gap: 60px;
`;

const Menu = styled.span`
  color: black;
  font-size: 28px;
  font-family: 'GmarketSansMedium';
`;

const NotMenu = styled.span`
  color: #8A8A8A;
  font-size: 28px;
  font-family: 'GmarketSansMedium';
`;

export default Header;