import React from 'react';
import styled from "styled-components";

const LoadingBody = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #f0f0f0;
  z-index: 1;
`;

const Loading = () => {
  return (
    <LoadingBody>

    </LoadingBody>
  );
};

export default Loading;