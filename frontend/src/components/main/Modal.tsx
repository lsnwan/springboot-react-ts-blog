import React, {DetailedHTMLProps, FC, HTMLAttributes, useEffect} from 'react';
import {createPortal} from "react-dom";
import {FlexBetween, ModalBody, ModalClose, ModalContentStyle, MyModal} from "../styled/common-styled";
import {IoIosClose} from "react-icons/all";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";


type ModalProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  open?: boolean;
  onDelete: () => void;
};

export const Modal: FC<ModalProps> = ({open, onDelete, children, ...props}) => {
  const rootModal = document.getElementById('root')!;
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const handleDelete = () => {
    onDelete();
  }


  return createPortal (
    <MyModal>
      <ModalBody theme={theme}>
        <FlexBetween>
          <h5 className="mb-0 pe-4 fw-semibold">{props.title}</h5>
          <ModalClose onClick={handleDelete}>
            <IoIosClose size="30"/>
          </ModalClose>
        </FlexBetween>
        <div className="mt-2">{children}</div>
      </ModalBody>
    </MyModal>, rootModal
  );
}

type ModalContentProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {

}

export const ModalContent: FC<ModalContentProps> = ({children}) => {
  return (
    <ModalContentStyle>
      {children}
    </ModalContentStyle>
  );
}
