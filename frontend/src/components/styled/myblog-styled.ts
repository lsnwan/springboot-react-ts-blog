import styled from "styled-components";

type SizeType = {
  width?: string;
  height?: string;
}

type ImagePropsType = {
  imagePath?: string
}
export const BlogBgDiv = styled.div<ImagePropsType>`
  width: 100%;
  height: 400px;
  background-color: darkgreen;
  ${(props) => props.imagePath && (`background-image: url(${props.imagePath})`)};
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
  width: 1080px;
  margin: 0 auto;
`;

export const BlogContainer = styled.div`
  width: 1080px;
  margin-left: auto;
  margin-right: auto;
`;

export const BlogTabMenuDiv = styled.div`
  margin-top: 30px;
  width: 1080px;
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
      color: white;
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

type BadgeBoxType = {
  width?: string
}
export const BadgeBox = styled.div<BadgeBoxType>`
  ${(props) => props.width && (`width: ${props.width};`)}
  .badge:not(:first-child):not(:last-child) {
    margin: 0 2px;
  }
  
  .badge:first-child {
    margin-right: 2px;
  }
  
  .badge:last-child {
    margin-left: 2px;
  }
`;

export const ImageUploadDiv = styled.div<SizeType>`
  position: relative;
  ${(props) => props.width && (`width: ${props.width};`)};
  ${(props) => props.height && (`height: ${props.height};`)};
  border: 1px dashed gray;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    white-space: nowrap;
  }
`;

export const BlogStatCard = styled.div`
  width: 180px;
  height: 100px;
  border-radius: 10px;
  background-color: ${(props) => (props.theme === "light" ? "#f0f0f0" : "#333333")};
  color: ${(props) => (props.theme === "light" ? "#333" : "#fff")};
  padding: 15px 10px;
  border: ${(props) => props.theme === 'light' ? '1px solid' : 'none;'};
  h5 {
    font-size: 16px; 
    font-weight: bold;
  }
  
  p {
    font-size: 30px;
  }
`;

type BannerImagePreviewType = {
  image: string
}
export const BannerImagePreview = styled.div<BannerImagePreviewType>`
  width: 100px;
  height: 56.25px;
  background-color: gray;
  ${props => props.image && (`background-image: url(${props.image})`)}
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;