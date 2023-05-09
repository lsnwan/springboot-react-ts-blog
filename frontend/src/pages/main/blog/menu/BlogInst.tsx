import React from 'react';
import {BlogContainer, BlogInfoDiv, TabMenuContentDiv} from "../../../../components/styled/myblog-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../../store";
import * as MB from "../../../../store/myblog";
import {AbsoluteDiv} from "../../../../components/styled/common-styled";
import {useLocation} from "react-router-dom";

type Props = {};


const BlogInst = (props: Props) => {
  const blogInfo = useSelector<AppState, MB.State>(state => state.myBlog);
  const registeredDate = new Date(blogInfo.registeredDate);

  return (
    <BlogContainer>
      {!blogInfo.enabled && (
        <>
          <AbsoluteDiv>
            <h5>비공개 블로그 입니다.</h5>
          </AbsoluteDiv>
        </>
      )}

      {blogInfo.enabled && (
        <>
          <div className="d-flex justify-content-between">
            <TabMenuContentDiv>
              <div>
                <h1>소개</h1>
                {blogInfo.blogIntro && (
                  <>
                    <div dangerouslySetInnerHTML={{__html: blogInfo.blogIntro.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\n', '<br/>')}} />
                  </>
                )}
              </div>
            </TabMenuContentDiv>
            <BlogInfoDiv>
              <div>
                <h1>블로그 시작일</h1>
                <p>{registeredDate.getFullYear() + '-' + (registeredDate.getMonth() + 1).toString().padStart(2, '0') + '-' + registeredDate.getDate().toString().padStart(2, '0') + ' ' + registeredDate.getHours().toString().padStart(2, '0') + ':' + registeredDate.getMinutes().toString().padStart(2, '0') + ':' + registeredDate.getSeconds().toString().padStart(2, '0')}</p>
              </div>
            </BlogInfoDiv>
          </div>
        </>
      )}
    </BlogContainer>
  );
};

export default BlogInst;