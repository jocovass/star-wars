import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const ldsRing = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled.div`
  display: block;
  position: relative;
  width: 60px;
  height: 60px;
  margin: 3.5rem auto;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #cadeef;
    border-radius: 50%;
    animation: ${ldsRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #cadeef transparent transparent transparent;
  }

  div:nth-of-type(1) {
    animation-delay: -0.45s;
  }

  div:nth-of-type(2) {
    animation-delay: -0.3s;
  }

  div:nth-of-type(3) {
    animation-delay: -0.15s;
  }
`;

export default function Loader() {
  return (
    <StyledLoader>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoader>
  );
}
