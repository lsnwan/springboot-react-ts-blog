import React, {ChangeEvent, useEffect, useMemo, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Container, ContentBody} from "../../../components/styled/content-styled";
import {
  AbsoluteDiv,
  ButtonBlink,
  ButtonPrimary,
  ButtonSecondary,
  FlexBetween,
  InputLabelBlock,
  InputTextBlock,
  ItemTitle,
  MessageBox,
  RelativeDiv
} from "../../../components/styled/common-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../store";
import * as T from "../../../store/theme";
import {Modal, ModalContent} from "../../../components/main/Modal";
import {BadgeBox, ImageUploadDiv} from "../../../components/styled/myblog-styled";
import {AiOutlineEnter, BsSendPlusFill, IoIosArrowBack, MdOutlineClose} from "react-icons/all";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {Path} from "@remix-run/router/history";
import ToggleSwitch from "../../../components/cmm/ToggleSwitch";


type Props = {};

const CreateBlog = (props: Props) => {

  const [editorContent, setEditorContent] = useState('');
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const {blogPath} = useParams<string>();
  const [showPublishedBlogModal, setShowPublishedBlogModal] = useState<boolean>();
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const thumbnailImageRef = useRef<HTMLInputElement>(document.createElement('input'));
  const quillRef = useRef<ReactQuill>(null);
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState<boolean>(false);
  const [tagsMessage, setTagsMessage] = useState<string>('');
  const [titleMessage, setTitleMessage] = useState<string>('');

  useEffect(() => {
    const authenticated = localStorage.getItem("userId");
    if (authenticated == null) {
      navigate("/login");
    }

  }, []);

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
        axios.post(`/api/blogs/${blogPath}/create/image`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
          .then(res => res.data)
          .then((result: {code: string; message: string; data?: any; path: string | Partial<Path>;}) => {
            if (result.code === '201') {
              const editor = quillRef.current?.getEditor();
              const range = editor?.getSelection();
              if (editor && range) {
                editor.insertEmbed(range.index, 'image', result.data.imageUrl);
                editor.setSelection(range.index + 1, range.length);
              }

              return;
            }

            alert(result.message);

          });
      } // & if(file)
    }); // & input.addEventListener
  } // & imageUploadHandler

  const modules = useMemo(() => {
    return {
        toolbar: {
          container: [
            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            [{'header': [1, 2, 3, 4, 5, 6, false]}],

            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote'],

            [{'color': []}, {'background': []}],          // dropdown with defaults from theme

            [{'align': []}],

            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent

            ['image', 'link', 'video', 'code-block'],
          ],
          handlers: {
            image: handleImageUpload,
          }
        }
    }
  }, []);

  const handleShowModal = () => {
    const contentText = quillRef.current?.getEditor().getText();
    if (contentText?.trim().length === 0) {
      alert('컨텐츠를 작성하세요');
      return;
    }
    setShowPublishedBlogModal(true);
  }

  const handleDelete = () => {
    setShowPublishedBlogModal(false);
  };

  /**********************************************
   **** 테그 관련  *******************************
   **********************************************/
  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tagText.trim()) {
      return;
    }

    if (tagText.indexOf(' ') !== -1 || !(tagText.length >= 2 && tagText.length <= 20)) {
      alert('공백 없이 2~20자 내외로 입력하세요');
      return;
    }

    if (tags) {
      let duplicated = false;
      tags.map((tag) => {
        if (tagText === tag) {
          duplicated = true;
          return;
        }
      });

      if (duplicated) {
        alert('이미 등록한 태그 입니다.');
        return;
      }
    }

    
    const tagRegex = /^[a-zA-Z가-힣.-]*$/;
    if (!tagRegex.exec(tagText)) {
      alert('한글 및 영어와 \'.\', \'-\'만 입력하세요');
      return;
    }


    setTags([...tags, tagText]);
    setTagText('');
  }

  const handleTagDelete = (tagName : string) => {
    setTags(tags.filter((tag) => tag !== tagName));
  }

  /**********************************************
   **** 썸네일 관련  ******************************
   **********************************************/
  const handleThumbnailImageUpload = () => {
    thumbnailImageRef.current.click();
  }

  const handleFileInputChange = () => {
    const file = thumbnailImageRef.current?.files?.[0];
    if (file) {
      const fileExt = file.type.substring(file.type.indexOf("/")+1, file.type.length);
      const permitExt = ['png', 'jpg', 'jpeg'];
      if (!permitExt.includes(fileExt)) {
        alert('이미지 파일(jpg, jpeg, png)만 업로드 하세요');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumbnailImageUrl(reader.result as string);
      };
    } else {
      setThumbnailImageUrl(null);
    }
  }

  const handleDeleteImage = () => {
    setThumbnailImageUrl(null);
  }

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const files = event.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      const fileExt = file.type.substring(file.type.indexOf("/")+1, file.type.length);
      const permitExt = ['png', 'jpg', 'jpeg'];
      if (!permitExt.includes(fileExt)) {
        alert('이미지 파일(jpg, jpeg, png)만 업로드 하세요');
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumbnailImageUrl(reader.result as string);
      };
    }
  };

  const handleChangeEnabled = () => {
    setEnabled(!enabled);
  }

  const handleBlogSubmit = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', editorContent);
    formData.append("enabled", enabled ? "1" : "0");
    if (tags) {
      tags.map((tag) => {
        formData.append('tags', tag);
      });
    }

    const file = thumbnailImageRef.current?.files?.[0];
    if (file) {
      formData.append('file', file);
    }

    if (!confirm('게시글을 등록하시겠습니까?')) {
      return;
    }

    axios.post(`/api/blogs/${blogPath}/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseEncoding: "utf-8"
    })
      .then(res => res.data)
      .then((result: {code: string; message: string; data?: any; path: string | Partial<Path>;}) => {
        if (result.code === 'Q-001') {
          if (result.data.title) {
            setTitleMessage(result.data.title);
          }
          if (result.data.tags) {
            setTagsMessage(result.data.tags);
          }
        }

        if (result.code === '201') {
          navigate(result.path);
        }

      });

  }

  return (
    <ContentBody>
      <Container>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <ButtonSecondary className="small" onClick={() => navigate(-1)}><IoIosArrowBack/> 돌아가기</ButtonSecondary>
          </div>
          <div>
            <ButtonPrimary className="small ms-1" onClick={handleShowModal}><BsSendPlusFill /> 보내기</ButtonPrimary>
          </div>
        </div>

        <div className="mt-2">
          <ReactQuill theme="snow" value={editorContent} modules={modules} onChange={setEditorContent} ref={quillRef} />
        </div>


        {showPublishedBlogModal && (
          <Modal title="블로그 발행하기" onDelete={handleDelete}>
            <ModalContent width="500px">
              <div>
                <FlexBetween>
                  <ItemTitle className="mb-1">썸네일</ItemTitle>
                  {thumbnailImageUrl && <ButtonBlink theme={theme} style={{fontSize: '13px'}} onClick={handleDeleteImage}>삭제</ButtonBlink>}
                </FlexBetween>
                
                <ImageUploadDiv height="180px"
                                draggable={true}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={handleThumbnailImageUpload}>
                  {thumbnailImageUrl && <img src={thumbnailImageUrl} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="thumbnail image"/>}
                  {!thumbnailImageUrl && <p>여기를 클릭 하거나 이미지를 끌어서 놓으세요</p>}
                </ImageUploadDiv>
                <input type="file" name="thumbnail" ref={thumbnailImageRef} onChange={handleFileInputChange} hidden/>
              </div>

              <div className="mt-3">
                <ItemTitle className="mb-1">제목</ItemTitle>
                <InputLabelBlock htmlFor="blogTitle" className="mt-3 visually-hidden">제목</InputLabelBlock>
                <InputTextBlock theme={theme} type="text" id="blogTitle" onChange={(e: ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value); setTitleMessage('')}} ref={inputRef} />
                {titleMessage && (
                  <MessageBox className="error">{titleMessage}</MessageBox>
                )}
              </div>

              <div className="mt-3">
                <RelativeDiv>
                  <ItemTitle className="mb-1">태그</ItemTitle>
                  <InputLabelBlock htmlFor="blogTag" className="mt-3 visually-hidden">태그</InputLabelBlock>
                  <form id="tagsForm" onSubmit={handleTagSubmit}>
                    <InputTextBlock theme={theme} type="text" id="blogTag" onChange={(e: ChangeEvent<HTMLInputElement>) => {setTagText(e.target.value); setTagsMessage('')}} value={tagText} />
                    {tagText.trim() != '' && (
                      <AbsoluteDiv top="27px" right="15px">
                        <ButtonBlink type="submit" theme={theme}>
                          <AiOutlineEnter style={{cursor: "pointer"}}/>
                        </ButtonBlink>
                      </AbsoluteDiv>
                    )}
                  </form>
                </RelativeDiv>
                {tagsMessage && (
                  <MessageBox className="error">{tagsMessage}</MessageBox>
                )}
                <BadgeBox className="mt-2">
                  {tags.map((tagName, index) => (
                    <span key={index} className="badge bg-secondary">{tagName} <MdOutlineClose style={{cursor: 'pointer'}} onClick={() => handleTagDelete(tagName)} /></span>
                  ))}
                </BadgeBox>
              </div>

              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                  <ItemTitle className="mb-1">공개여부</ItemTitle>
                  <ToggleSwitch enabled={enabled} changeEnabled={handleChangeEnabled} />
                </div>
              </div>

              <div className="mt-3 text-end">
                <ButtonPrimary className="block" onClick={handleBlogSubmit}>발행하기</ButtonPrimary>
              </div>
            </ModalContent>
          </Modal>
        )}
      </Container>

    </ContentBody>
  );
};

export default CreateBlog;