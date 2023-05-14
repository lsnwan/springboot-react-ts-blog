import React, {useEffect} from 'react';
import {
  Footer,
  SideMenuStyled,
  SingleMenuButton,
  SingleMenuButtonName,
  SingleMenuIcon,
  SingleMenuLI,
  SingleMenuUL,
  SubMenuLI,
  SubMenuTitle,
  SubMenuUL,
  SubscribeProfile,
  SubscribeProfileBox,
  SubscribeProfileName
} from "../styled/sidebar-styled";
import {BsClockHistory, BsFillHouseFill, BsFillStarFill, GoLightBulb} from "react-icons/all";
import {useAuth} from "../../contexts";
import {ButtonPrimary} from "../styled/common-styled";
import {useNavigate} from "react-router";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import {useDispatch, useSelector} from "react-redux";
import * as MS from "../../store/subscribe";
import {AppState} from "../../store";
import * as TS from "../../store/theme";
import {useLocation} from "react-router-dom";


type PropsType = {
  isSideBar: boolean;
}

const SideMenu = (props :PropsType) => {

  const auth = useAuth();
  const loggedUser = auth.loggedUser;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector<AppState, TS.State>(state => state.themeType);
  const mySubscribes = useSelector<AppState, MS.State>(state => state.mySubscribes);
  const location = useLocation();

  useEffect(() => {

    if (localStorage.getItem("userId")) {
      if (mySubscribes.length === 0) {
        axios.post("/api/subscribe")
          .then(res => res.data)
          .then((result: { code: string; message: string; data?: any; path: string | Partial<Path>; }) => {
            console.log(result);
            dispatch(MS.setSubscribes(result.data));
          });
      }
    }

  }, []);

  return (
    <SideMenuStyled>
      <SingleMenuUL>
        <SingleMenuLI isSideBar={props.isSideBar} onClick={() => navigate("/")}>
          <SingleMenuButton isSideBar={props.isSideBar}>
            <SingleMenuIcon><BsFillHouseFill/></SingleMenuIcon>
            {props.isSideBar && (
              <SingleMenuButtonName>홈</SingleMenuButtonName>
            )}
          </SingleMenuButton>
        </SingleMenuLI>
      </SingleMenuUL>

      {localStorage.getItem("userId") && (
        <>
          {!loggedUser?.emailVerifiedConfirmDate && (
            <div className="text-center mb-2 pb-1 border-bottom border-light border-opacity-50">
              <small>이메일 인증을 하지 않았습니다.</small>
              <ButtonPrimary className="block my-2">이메일 인증하기</ButtonPrimary>
            </div>
          )}

          {loggedUser?.emailVerifiedConfirmDate && (
            <>
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
                      <SingleMenuButtonName>이력</SingleMenuButtonName>
                    )}
                  </SingleMenuButton>
                </SingleMenuLI>
              </SingleMenuUL>

              {/* 구독 */}
              <SubMenuUL>
                <SubMenuLI>
                  <SubMenuTitle isSideBar={props.isSideBar}>구독</SubMenuTitle>
                  <SingleMenuUL className="border_none subscribe">
                    {mySubscribes && mySubscribes.map((subscribe, index) => (
                      <SingleMenuLI isSideBar={props.isSideBar} key={index} onClick={() => navigate(`/@${subscribe.blogPath}`)}>
                        <SubscribeProfileBox isSideBar={props.isSideBar}>
                          <SubscribeProfile imagePath={subscribe.profilePath}></SubscribeProfile>
                          {props.isSideBar && (
                            <SubscribeProfileName>{subscribe.nickname}</SubscribeProfileName>
                          )}
                        </SubscribeProfileBox>
                      </SingleMenuLI>
                    ))}
                    {mySubscribes.length == 0 && (
                      <div className="text-center mb-2">
                        {props.isSideBar && (
                          <small>구독 정보가 없습니다.</small>
                        )}
                      </div>
                    )}
                  </SingleMenuUL>
                </SubMenuLI>
              </SubMenuUL>
            </>
          )}

        </>
      )}

      <SubMenuUL>
        <SubMenuLI>
          <SubMenuTitle isSideBar={props.isSideBar}>탐색</SubMenuTitle>
          <SingleMenuUL className="border_none">
            <SingleMenuLI isSideBar={props.isSideBar}>
              <SingleMenuButton isSideBar={props.isSideBar}>
                <SingleMenuIcon><GoLightBulb/></SingleMenuIcon>
                {props.isSideBar && (
                  <SingleMenuButtonName>취미</SingleMenuButtonName>
                )}
              </SingleMenuButton>
            </SingleMenuLI>
            <SingleMenuLI isSideBar={props.isSideBar}>
              <SingleMenuButton isSideBar={props.isSideBar}>
                <SingleMenuIcon><GoLightBulb/></SingleMenuIcon>
                {props.isSideBar && (
                  <SingleMenuButtonName>생활</SingleMenuButtonName>
                )}
              </SingleMenuButton>
            </SingleMenuLI>
            <SingleMenuLI isSideBar={props.isSideBar}>
              <SingleMenuButton isSideBar={props.isSideBar}>
                <SingleMenuIcon><GoLightBulb/></SingleMenuIcon>
                {props.isSideBar && (
                  <SingleMenuButtonName>쇼핑</SingleMenuButtonName>
                )}
              </SingleMenuButton>
            </SingleMenuLI>
            <SingleMenuLI isSideBar={props.isSideBar}>
              <SingleMenuButton isSideBar={props.isSideBar}>
                <SingleMenuIcon><GoLightBulb/></SingleMenuIcon>
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
          본 사이트는 포트폴리오 용도로 제작 되었습니다.
        </Footer>
      )}

    </SideMenuStyled>
  );
};

export default SideMenu;