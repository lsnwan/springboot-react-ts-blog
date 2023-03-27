import styled from "styled-components";

export const HeaderBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 56px;
  background-color: ${(props) => (props.theme === "light" ? "#fff" : "#000")};
  color: ${(props) => (props.theme === "light" ? "#333" : "#fff")};
`;

export const BrandBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`

export const SearchBox = styled.div`
  width: 500px;
  height: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 900px) {
    width: 300px;
  }

  @media (max-width: 730px) {
    display: none;
  }
`;

export const SearchInputBox = styled.div`
  display: flex;
  align-items: center;
  height: 35px;
  background-color: ${(props) => (props.theme === 'light'  ? '#fff' : '#333')};
  border-top: 1px solid #222;
  border-left: 1px solid #222;
  border-bottom: 1px solid #222;
  border-radius: 50px 0 0 50px;
  padding: 0 20px;
  flex: auto;
  z-index: 10;
`

export const SearchInput = styled.input`
  font-size: 1em;
  background: none;
  border-style: none;
  width: 100%;
  color: white;
  outline: none;
`

export const SearchButtonBox = styled.div`
  width: 60px;
  height: 35px;
  border-radius: 0 50px 50px 0;
  background-color: #222;
  border: 1px solid #222;
  color: ${(props) => (props.theme === 'light' ? '#fff' : '')};
  text-align: center;
  font-size: 1.2em;
  line-height: 35px;
  cursor: pointer;
  transition: .3s ease;
  &:hover {
    background-color: #111;
  }
`

export const MenuIcon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  font-size: 1.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: .3s ease;
  border-radius: 50%;
  &:hover {
    background-color: white;
    color: #333;
  }
`

export const Logo = styled.a`
  margin: 0;
  font-size: 1.5em;
  display: block;
  font-weight: bold;
  cursor: pointer;
  
  &:after {
    content: 'DevAround';
  }
  
  @media (max-width: 430px) {
    font-size: 1.2em;
    &:after {
      content: 'D.A';
    }
  }
`;


export const ProfileBox = styled.div`
  height: inherit;
  display: flex;
  justify-content: right;
  align-items: center;
`;

export const headerButton = styled.div`
  background-color: #1abc9c;
  display: inline;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: ease 0.3s;
  &:hover {
    background-color: #099c7d;
  }
  @media (max-width: 730px) {
    font-size: 0.8em;
    padding: 8px 15px;
  }
`

export const ThemeButton = styled.div`
  font-size: 1.5em;
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 10px;
`

export const MobileSearchButtonBox = styled.div`
  width: 50px;
  height: 50px;
  font-size: 1.3em;
  cursor: pointer;
  display: none;
  @media (max-width: 730px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export const ProfileButton = styled.div`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
`

export const NotificationButton = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  cursor: pointer;
`