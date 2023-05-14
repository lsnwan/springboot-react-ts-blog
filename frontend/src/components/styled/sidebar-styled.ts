import styled from "styled-components";

type isSideBarProps = {
  isSideBar: boolean;
};

export const SidebarBox = styled.div`
  padding: 66px 10px 10px 10px;
  box-sizing: border-box;
  background-color: ${props => props.theme === 'light' ? "#f0f0f0" : "#0f0f0f"};
  color: ${props => props.theme === 'light' ? "#333" : "#fff"};
  width: 240px;
  height: 100vh;
  flex-shrink: 0;
  &.close {
    width: 80px;
  }
`;

export const SideMenuStyled = styled.div`
  overflow: hidden;
  overflow-y: auto;
  height: 100%;
  padding-right: 10px;
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #656565;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: #afafaf;
    border-radius: 5px;
  }
`;

export const SingleMenuUL = styled.ul`
  list-style: none;
  padding-left: 0;
  border-bottom: 1px solid gray;
  
  &.border_none {
    border: none;
  }
  
  &.subscribe {
    max-height: 480px;
    overflow: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    
    &::-webkit-scrollbar {
      display: none;
    }
    
  }
`;

export const SingleMenuLI = styled.li<isSideBarProps>`
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const SingleMenuButton = styled.h1<isSideBarProps>`
  padding: ${(props) => (props.isSideBar ? '10px 20px;' : '10px 0;')}
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  margin: 0 auto 0 auto;
  display: flex;
  justify-content: ${(props) => (props.isSideBar ? 'flex-start;' : 'center;')};
  align-items: center;
  &:hover {
    background-color: cornflowerblue;
    color: white;
  }
`;

export const SingleMenuIcon = styled.div`
  font-size: 18px;
  line-height: 0;
`;

export const SingleMenuButtonName = styled.span`
  margin-left: 20px;
`;

export const SubMenuUL = styled.ul`
  padding: 0;
  border-bottom: 1px solid gray;
  
`;
export const SubMenuLI = styled.li`
  //padding-left: 20px;
`;

export const SubMenuTitle = styled.h1<isSideBarProps>`
  font-size: 16px;
  margin-bottom: 0;
  padding: 5px;
  font-weight: bold;
  text-align: ${(props) => (props.isSideBar ? "" : "center;")};
`;

export const Footer = styled.footer`
  text-align: center;
  font-size: 12px;
`;

export const SubscribeProfileBox = styled.div<isSideBarProps>`
  display: flex;
  padding: ${(props) => props.isSideBar ? "5px 20px;" : "0;"}
  justify-content: ${(props) => props.isSideBar ? "0;" : "center;"}
  align-items: center;
  cursor: pointer;
  margin: 5px 0;
  border-radius: 10px;
  &:hover {
    background-color: cornflowerblue;
    color: white;
  }
`;

type SubscribeProfileType = {
  imagePath: string
}
export const SubscribeProfile = styled.div<SubscribeProfileType>`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  ${(props) => props.imagePath && (`background-image: url(${props.imagePath});`)};
  background-color: white;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const SubscribeProfileName = styled.h5`
  font-size: 14px;
  margin-bottom: 0;
  margin-left: 10px;
`;