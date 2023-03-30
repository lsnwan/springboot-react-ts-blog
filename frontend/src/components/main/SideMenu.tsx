import React from 'react';
import {
  Footer,
  SideMenuStyled,
  SingleMenuButton, SingleMenuButtonName,
  SingleMenuIcon,
  SingleMenuLI,
  SingleMenuUL,
  SubMenuLI,
  SubMenuTitle,
  SubMenuUL, SubscribeProfile, SubscribeProfileBox, SubscribeProfileName
} from "../styled/sidebar-styled";
import {BsClockHistory, BsFillHouseFill, BsFillStarFill} from "react-icons/all";

type PropsType = {
  isSideBar: boolean;
}

const SideMenu = (props :PropsType) => {
  return (
    <SideMenuStyled>
      <SingleMenuUL>
        <SingleMenuLI isSideBar={props.isSideBar}>
          <SingleMenuButton isSideBar={props.isSideBar}>
            <SingleMenuIcon><BsFillHouseFill/></SingleMenuIcon>
            {props.isSideBar && (
              <SingleMenuButtonName>홈</SingleMenuButtonName>
            )}
          </SingleMenuButton>
        </SingleMenuLI>
      </SingleMenuUL>

      <SingleMenuUL>
        <SingleMenuLI isSideBar={props.isSideBar}>
          <SingleMenuButton isSideBar={props.isSideBar}>
            <SingleMenuIcon><BsFillStarFill/></SingleMenuIcon>
            {props.isSideBar && (
              <SingleMenuButtonName>즐겨찾기</SingleMenuButtonName>
            )}
          </SingleMenuButton>
        </SingleMenuLI>
        <SingleMenuLI isSideBar={props.isSideBar}>
          <SingleMenuButton isSideBar={props.isSideBar}>
            <SingleMenuIcon><BsClockHistory/></SingleMenuIcon>
            {props.isSideBar && (
              <SingleMenuButtonName>본 블로그 이력</SingleMenuButtonName>
            )}
          </SingleMenuButton>
        </SingleMenuLI>
      </SingleMenuUL>

      {/* 구독 */}
      <SubMenuUL>
        <SubMenuLI>
          <SubMenuTitle isSideBar={props.isSideBar}>구독</SubMenuTitle>
          <SingleMenuUL className="border_none">
            <SingleMenuLI isSideBar={props.isSideBar}>
              <SubscribeProfileBox isSideBar={props.isSideBar}>
                <SubscribeProfile></SubscribeProfile>
                {props.isSideBar && (
                  <SubscribeProfileName>홍길동</SubscribeProfileName>
                )}
              </SubscribeProfileBox>
            </SingleMenuLI>
          </SingleMenuUL>
        </SubMenuLI>
      </SubMenuUL>

      <SubMenuUL>
        <SubMenuLI>
          <SubMenuTitle isSideBar={props.isSideBar}>탐색</SubMenuTitle>
          <SingleMenuUL className="border_none">
            <SingleMenuLI isSideBar={props.isSideBar}>
              <SingleMenuButton isSideBar={props.isSideBar}>
                <SingleMenuIcon><BsClockHistory/></SingleMenuIcon>
                {props.isSideBar && (
                  <SingleMenuButtonName>취미</SingleMenuButtonName>
                )}
              </SingleMenuButton>
            </SingleMenuLI>
            <SingleMenuLI isSideBar={props.isSideBar}>
              <SingleMenuButton isSideBar={props.isSideBar}>
                <SingleMenuIcon><BsClockHistory/></SingleMenuIcon>
                {props.isSideBar && (
                  <SingleMenuButtonName>생활</SingleMenuButtonName>
                )}
              </SingleMenuButton>
            </SingleMenuLI>
            <SingleMenuLI isSideBar={props.isSideBar}>
              <SingleMenuButton isSideBar={props.isSideBar}>
                <SingleMenuIcon><BsClockHistory/></SingleMenuIcon>
                {props.isSideBar && (
                  <SingleMenuButtonName>쇼핑</SingleMenuButtonName>
                )}
              </SingleMenuButton>
            </SingleMenuLI>
            <SingleMenuLI isSideBar={props.isSideBar}>
              <SingleMenuButton isSideBar={props.isSideBar}>
                <SingleMenuIcon><BsClockHistory/></SingleMenuIcon>
                {props.isSideBar && (
                  <SingleMenuButtonName>IT</SingleMenuButtonName>
                )}
              </SingleMenuButton>
            </SingleMenuLI>
          </SingleMenuUL>
        </SubMenuLI>
      </SubMenuUL>

      {props.isSideBar && (
        <Footer>
          본 사이트는 포트폴리오 용도로 제작 되었습니다. 언제 사라질지 몰라요
        </Footer>
      )}

    </SideMenuStyled>
  );
};

export default SideMenu;