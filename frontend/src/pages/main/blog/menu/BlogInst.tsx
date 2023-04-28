import React from 'react';
import {BlogContainer, BlogInfoDiv, TabMenuContentDiv} from "../../../../components/styled/myblog-styled";
import {FlexBetween, FlexCenter, FlexStart} from "../../../../components/styled/common-styled";
import {useOutletContext} from "react-router";
import {BlogInfoType} from "../../../BlogLayout";

type Props = {};

type ChildProps = {
  blogInfo: BlogInfoType
}


const BlogInst = (props: Props) => {

  const {blogInfo} = useOutletContext<ChildProps>();
  const registeredDate = new Date(blogInfo.registeredDate);


  return (
    <BlogContainer>
      <FlexStart>
        <TabMenuContentDiv>
          <div>
            <h1>소개</h1>
            <p>
              {blogInfo.blogIntro}
            </p>
          </div>
        </TabMenuContentDiv>
        <BlogInfoDiv>
          <div>
            <h1>블로그 시작일</h1>
            <p>{registeredDate.getFullYear() + '-' + (registeredDate.getMonth() + 1).toString().padStart(2, '0') + '-' + registeredDate.getDate().toString().padStart(2, '0') + ' ' + registeredDate.getHours().toString().padStart(2, '0') + ':' + registeredDate.getMinutes().toString().padStart(2, '0') + ':' + registeredDate.getSeconds().toString().padStart(2, '0')}</p>
          </div>
        </BlogInfoDiv>
      </FlexStart>
    </BlogContainer>
  );
};

export default BlogInst;