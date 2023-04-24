import styled from "styled-components";

export const BlogBgDiv = styled.div`
  width: 100%;
  height: 400px;
  background-color: darkgreen;
  position: relative;
`;

export const BlogBgChange = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const BlogBgButton = styled.button`
  padding: 3px 5px;
  background-color: rgba(0, 0, 0, .2);
  border-style: none;
  font-size: 14px;
  color: #ababab;

  &:hover {
    background-color: rgba(14, 171, 171, 0.2);
  }
`;

type ProfilePropsType = {
  profilePath?: string
}
export const BlogAvatar = styled.div<ProfilePropsType>`
  width: 100px;
  height: 100px;
  background-color: white;
  ${(props) => props.profilePath && `background-image: url(${props.profilePath})`};
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const BlogAuthorDiv = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 1100px;
  margin: 0 auto;
`;

export const BlogContainer = styled.div`
  width: 1100px;
  margin-left: auto;
  margin-right: auto;
`;

export const BlogTabMenuDiv = styled.div`
  margin-top: 30px;
  width: 1100px;
  margin-left: auto;
  margin-right: auto;

  ul {
    list-style: none;
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    border-bottom: 1px solid gray;
  }

  ul li {
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      background-color: #0682a6;
      border-radius: 7px 7px 0 0;
    }
    
    &.active {
      border-radius: 7px 7px 0 0;
      box-shadow: 0 0 0 1px gray inset;
      margin-bottom: -1px;
    }
  }

`;

export const BlogWrite = styled.div`
  white-space: nowrap;
`;

export const TabMenuContentDiv = styled.div`
  
  div {
    padding-right: 10px;
  }
  
  div h1 {
    font-size: 20px;
  }
  div p {
    font-size: 14px;
  }
  
`;

export const BlogInfoDiv = styled.div`
  width: 500px;
  height: 500px;
  padding-left: 10px;
  
  div h1 {
    font-size: 16px;
    margin-bottom: 0;
  }
`;