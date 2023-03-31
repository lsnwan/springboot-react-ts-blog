import styled from "styled-components";

type ContentWidthType = {
  width: number;
}

export const BodyBox = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'light' ? '#f0f0f0' : '#0f0f0f'};
  color: ${props => props.theme === 'light' ? '#333' : '#fff'};
  transition: all .3s;
  
`;

export const ContentBody = styled.div`
  padding: 66px 13px 10px 13px;
  width: calc(100% - 30px);
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
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

export const ContentContainer = styled.div<ContentWidthType>`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: ${(props) => (props.width > 2430 ? "2160px;" : props.width > 2070 ? "1800px;" : props.width > 1770 ? "1500px;" : props.width > 1770 ? "1500px;" : "1100px;")}
`;

export const TagBody = styled.div<ContentWidthType>`
  width: ${(props) => (props.width > 2430 ? "2160px;" : props.width > 2070 ? "1800px;" : props.width > 1770 ? "1500px;" : props.width > 1770 ? "1500px;" : "1100px;")};
  height: 50px;
  margin: 0 auto 10px auto;
  padding: 2px 10px 55px 10px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  &:hover {
    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 5px;
    }

    &::-webkit-scrollbar-track {
      background: #656565;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #afafaf;
      border-radius: 20px;
    }
  }
  
`;

export const TagBadge = styled.button`
  background: #575757;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 14px;
  margin-left: 7px;
  &:nth-child(1) {
    margin-left: 0;
  }
  
  &:hover {
    background: #e5e5e5;
    color: #0f0f0f;
  }
  
  &.active {
    background: #e5e5e5;
    color: #0f0f0f;
  }
`;

export const BlogCard = styled.div<ContentWidthType>`
  width: 350px;
  height: 300px;
  border-radius: 10px;
  margin: 5px;
  
`;

export const BlogThumb = styled.div`
  width: 350px;
  height: 197px;
  background-color: darkgreen;
  overflow: hidden;
  border-radius: inherit;
`;

export const BlogCardBody = styled.div`
  display: flex;
  padding: 5px 10px;
  margin-top: 5px;
`;

export const UserProfile = styled.div`
  width: 35px; 
  height: 35px;
  background-color: red;
  border-radius: 100%;
  line-height: 35px;
  text-align: center;
`;

export const BlogInfo = styled.div`
  margin-left: 10px;
  width: 300px;
`;

export const BlogInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserProfileName = styled.h5`
  font-size: 15px;
  margin-bottom: 0;
`;

export const BlogTitle = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 5px;
`;

export const UserProfileMoreButton = styled.p`
  margin-bottom: 0;
  font-size: 14px;
`;