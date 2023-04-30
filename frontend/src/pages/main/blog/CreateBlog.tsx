import React, {ChangeEvent, useRef, useState} from 'react';
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
  RelativeDiv
} from "../../../components/styled/common-styled";
import {useSelector} from "react-redux";
import {AppState} from "../../../store";
import * as T from "../../../store/theme";
import {Modal, ModalContent} from "../../../components/main/Modal";
import {BadgeBox, ImageUploadDiv} from "../../../components/styled/myblog-styled";
import {AiOutlineEnter, BsSendPlusFill, IoIosArrowBack, MdOutlineClose} from "react-icons/all";
import {useNavigate} from "react-router";

type Props = {};

const CreateBlog = (props: Props) => {

  const container = document.getElementById('editor');
  const [value, setValue] = useState('');
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const [showPublishedBlogModal, setShowPublishedBlogModal] = useState<boolean>();
  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagText, setTagText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(document.createElement('input'));
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ]
  }

  const handleShowModal = () => {
    setShowPublishedBlogModal(true);
  }

  const handleDelete = () => {
    setShowPublishedBlogModal(false);
  };

  const handleThumbnailImageUpload = () => {
    fileInputRef.current.click();
  }

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tagText.trim()) {
      return;
    }

    if (tagText.indexOf(' ') !== -1 || !(tagText.length >= 2 && tagText.length <= 20)) {
      alert('공백 없이 2~20자 내외로 입력하세요');
      return;
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

  const handleFileInputChange = () => {
    const file = fileInputRef.current?.files?.[0];
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
        setImageUrl(reader.result as string);
      };
    } else {
      setImageUrl(null);
    }
  }

  const handleDeleteImage = () => {
    setImageUrl(null);
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
        setImageUrl(reader.result as string);
      };
    }
  };

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
          <ReactQuill theme="snow" value={value} modules={modules} onChange={setValue} />
        </div>


        {showPublishedBlogModal && (
          <Modal title="블로그 발행하기" onDelete={handleDelete}>
            <ModalContent width="500px">
              <div>
                <FlexBetween>
                  <ItemTitle className="mb-1">썸네일</ItemTitle>
                  {imageUrl && <ButtonBlink theme={theme} style={{fontSize: '13px'}} onClick={handleDeleteImage}>삭제</ButtonBlink>}
                </FlexBetween>
                
                <ImageUploadDiv height="180px"
                                draggable={true}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onClick={handleThumbnailImageUpload}>
                  {imageUrl && <img src={imageUrl} style={{width: '100%', height: '100%', objectFit: 'cover'}} alt="thumbnail image"/>}
                  {!imageUrl && <p>여기를 클릭 하거나 이미지를 끌어서 놓으세요</p>}
                </ImageUploadDiv>
                <input type="file" name="thumbnail" ref={fileInputRef} onChange={handleFileInputChange} hidden/>
              </div>

              <div className="mt-3">
                <ItemTitle className="mb-1">제목</ItemTitle>
                <InputLabelBlock htmlFor="blogTitle" className="mt-3 visually-hidden">제목</InputLabelBlock>
                <InputTextBlock theme={theme} type="text" id="blogTitle" onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} ref={inputRef} />
              </div>

              <div className="mt-3">
                <RelativeDiv>
                  <ItemTitle className="mb-1">태그</ItemTitle>
                  <InputLabelBlock htmlFor="blogTag" className="mt-3 visually-hidden">태그</InputLabelBlock>
                  <form id="tagsForm" onSubmit={handleTagSubmit}>
                    <InputTextBlock theme={theme} type="text" id="blogTag" onChange={(e: ChangeEvent<HTMLInputElement>) => setTagText(e.target.value)} value={tagText} />
                    {tagText.trim() != '' && (
                      <AbsoluteDiv top="27px" right="15px">
                        <ButtonBlink type="submit" theme={theme}>
                          <AiOutlineEnter style={{cursor: "pointer"}}/>
                        </ButtonBlink>
                      </AbsoluteDiv>
                    )}
                  </form>
                </RelativeDiv>
                <BadgeBox className="mt-2">
                  {tags.map((tagName, index) => (
                    <span key={index} className="badge bg-secondary">{tagName} <MdOutlineClose style={{cursor: 'pointer'}} onClick={() => handleTagDelete(tagName)} /></span>
                  ))}
                </BadgeBox>
              </div>


              <div className="mt-3 text-end">
                <ButtonPrimary className="block">발행하기</ButtonPrimary>
              </div>
            </ModalContent>
          </Modal>
        )}
      </Container>

    </ContentBody>
  );
};

export default CreateBlog;