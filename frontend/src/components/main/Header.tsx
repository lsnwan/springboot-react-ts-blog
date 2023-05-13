import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import * as SH from "../styled/header-styled";
import * as SC from "../styled/common-styled";
import {ButtonPrimary, InputLabelBlock, InputTextBlock, MessageBox} from "../styled/common-styled";
import ToggleMenu from "./ToggleMenu";
import {useNavigate} from "react-router";
import * as Utils from "../../utils";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";
import {BsBrightnessHighFill, BsFillMoonFill} from "react-icons/all";
import {useAuth} from "../../contexts";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import {Modal, ModalContent} from "./Modal";

type PropsType = {
  theme: string | undefined;
}

type CreateBlogFormType = {
  blogPath: string;

}

const Header = (props: PropsType) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const themeType = useSelector<AppState, T.State>(state => state.themeType);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>();
  const dropboxRef = useRef<HTMLDivElement>(null);
  const theme = useSelector<AppState, T.State>(state => state.themeType);

  const [showCreateBlogModal, setShowCreateBlogModal] = useState<boolean>();
  const handleDelete = () => {
    setShowCreateBlogModal(false);
    setCreateBlogFormError({
      blogPath: ''
    });
    setCreateBlogFormError({
      blogPath: ''
    });
  };

  const [createBlogForm, setCreateBlogForm] = useState<CreateBlogFormType>({
    blogPath: '',
  });

  const [createBlogFormError, setCreateBlogFormError] = useState<CreateBlogFormType>({
    blogPath: '',
  });


  /*
   ! 시작하기 클릭
   */
  const goLoginHandler = useCallback(() => {
    navigate('/login');
  }, [navigate])
  const {logout, loggedUser} = useAuth();

  /*
   ! 테마 변경 클릭
   */
  const changeThemeHandler = () => {

    if (themeType === undefined || themeType === 'dark') {
      Utils.setCookie('theme', 'light');
    } else {
      Utils.setCookie('theme', 'dark');
    }

    dispatch({type: '@theme/setTheme', payload: Utils.getCookie('theme')});
  }

  /*
   ! 프로필 클릭 이벤트(드롭다운 토글)
   */
  const handleOpen = () => {
    setProfileMenuOpen(prevState => !prevState);
  }

  /*
   ! 드롭다운 외부 클릭 처리
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropboxRef.current && !dropboxRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropboxRef]);

  /*
   ! 로그아웃
   */
  const handleLogout = () => {
    logout(() => {
      navigate("/");
    });
  }

  /*
   ! 내 블로그 클릭
   */
  const handleMyProfile = () => {
    axios.get('/api/blogs/check')
      .then(res => res.data)
      .then((result: {code: string, message: string, path: string | Partial<Path>;}) => {
        if (result.code === 'D-001') {
          setShowCreateBlogModal(true);
          return;
        }

        // location.href = result.path.toString();
        navigate(result.path);
      })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCreateBlogForm(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreateBlogForm({
      blogPath: '',
    });

    setCreateBlogFormError({
      blogPath: '',
    });

    axios.post('/api/blogs', createBlogForm)
      .then(res => res.data)
      .then((result : {code: string; message: string; data?: any; path: string | Partial<Path>;}) => {
        if (result.code === 'Q-001') {
          setCreateBlogFormError({
            blogPath: result.data.blogPath === undefined ? result.message : result.data.blogPath,
          });
          return;
        }

        if (result.code === '201') {
          setShowCreateBlogModal(false);
          navigate(result.path);
        }

      });

  }

  return (
    <SH.HeaderBox theme={props.theme}>
      <SH.BrandBox>
        <ToggleMenu theme={props.theme}/>
        <SH.Logo theme={props.theme} onClick={() => navigate('/')}>YouBlog</SH.Logo>
      </SH.BrandBox>

      <SH.SearchBox>
        <SH.SearchInputBox theme={props.theme}>
          <SH.SearchInput theme={props.theme}/>
        </SH.SearchInputBox>
        <SH.SearchButtonBox theme={props.theme}>
          <FontAwesomeIcon icon={icon.faSearch}/>
        </SH.SearchButtonBox>
      </SH.SearchBox>

      <SH.ProfileBox>

        <SH.ThemeButton onClick={changeThemeHandler}>
          {themeType === 'light' && (
            <BsFillMoonFill/>
          )}
          {themeType === 'dark' && (
            <BsBrightnessHighFill/>
          )}
        </SH.ThemeButton>

        {/*익명 사용자*/}
        {!localStorage.getItem("userId") && (
          <SH.headerButton onClick={goLoginHandler}>시작하기</SH.headerButton>
        )}

        {/*인증된 사용자*/}
        {localStorage.getItem("userId") && (
          <SH.ProfileButton onClick={handleOpen} ref={dropboxRef} profilePath={loggedUser?.profilePath === null ? '/images/no-profile.png' : loggedUser?.profilePath}>
            <SH.ProfileDropBoxBody theme={theme} className={profileMenuOpen ? "active" : ""} >
              <SH.ProfileDropBoxList theme={theme} onClick={handleMyProfile}>내 블로그</SH.ProfileDropBoxList>
              <SH.ProfileDropBoxList theme={theme} onClick={() => navigate("/settings")}>설정</SH.ProfileDropBoxList>
              <SC.Divider></SC.Divider>
              <SH.ProfileDropBoxList theme={theme} onClick={handleLogout}>로그아웃</SH.ProfileDropBoxList>
            </SH.ProfileDropBoxBody>
          </SH.ProfileButton>
        )}
      </SH.ProfileBox>

      {showCreateBlogModal && (
        <Modal title="블로그 시작하기" onDelete={handleDelete}>
          <ModalContent>
            <h5>아직 블로그를 생성하지 않았군요</h5>
            <p>아래 블로그 아이디를 입력해 주세요</p>
            <p>입력한 아이디는 블로그 주소로 사용됩니다.</p>
            <p className="mt-2">ex) <span className="badge rounded-pill text-bg-secondary py-2 px-2">/@[블로그 ID]</span></p>
            <form onSubmit={handleSubmit}>
              <div className="mb-2 mt-4">
                <InputLabelBlock htmlFor="blogPath">블로그 ID</InputLabelBlock>
                <div className="d-flex justify-content-between align-items-center">
                  <div>@</div>
                  <InputTextBlock theme={theme} type="text" className="ms-2" id="blogPath" name="blogPath" onChange={handleChange} />
                </div>
                {createBlogFormError.blogPath && (
                  <MessageBox className="error">{createBlogFormError.blogPath}</MessageBox>
                )}
              </div>
              <div className="mt-3">
                <ButtonPrimary className="block">생성하기</ButtonPrimary>
              </div>
            </form>

          </ModalContent>
        </Modal>
      )}

    </SH.HeaderBox>
  );

};

export default Header;