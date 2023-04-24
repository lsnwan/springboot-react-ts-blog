import React from 'react';
import {BlogContainer, BlogInfoDiv, TabMenuContentDiv} from "../../../../components/styled/myblog-styled";
import {FlexBetween, FlexCenter, FlexStart} from "../../../../components/styled/common-styled";

type Props = {};

const BlogInst = (props: Props) => {
  return (
    <BlogContainer>
      <FlexStart>
        <TabMenuContentDiv>
          <div>
            <h1>소개</h1>
            <p>
              탄핵결정은 공직으로부터 파면함에 그친다. 그러나, 이에 의하여 민사상이나 형사상의 책임이 면제되지는 아니한다.
              한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다.<br />
              국회는 국정을 감사하거나 특정한 국정사안에 대하여 조사할 수 있으며, <br />이에 필요한 서류의 제출 또는 증인의 출석과
              증언이나 의견의
            </p>
          </div>
        </TabMenuContentDiv>
        <BlogInfoDiv>
          <div>
            <h1>블로그 시작일</h1>
            <p>2022-04-24</p>
          </div>
        </BlogInfoDiv>
      </FlexStart>
    </BlogContainer>
  );
};

export default BlogInst;