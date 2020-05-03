import React from "react";
import styled, { keyframes } from "styled-components";

const Canvas = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 90%;
    background-image: radial-gradient(
        circle farthest-corner at center,
        #3c4b57 0%,
        #1c262b 100%
    );
`;

const Loader = styled.div`
    position: absolute;
    top: calc(50% - 32px);
    left: calc(50% - 32px);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    perspective: 800px;
`;

const Inner = styled.div`
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;

const rotateOne = keyframes`
    0% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
    }
`;

const rotateTwo = keyframes`
    0% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(50deg) rotateY(10deg) rotateZ(360deg);
    }
`;

const rotateThree = keyframes`
    0% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(35deg) rotateY(55deg) rotateZ(360deg);
    }
`;

const InnerOne = styled(Inner)`
    left: 0%;
    top: 0%;
    animation: ${rotateOne} 1s linear infinite;
    border-bottom: 3px solid #efeffa;
`;

const InnerTwo = styled(Inner)`
    right: 0%;
    top: 0%;
    animation: ${rotateTwo} 1s linear infinite;
    border-right: 3px solid #efeffa;
`;

const InnerThree = styled(Inner)`
    right: 0%;
    bottom: 0%;
    animation: ${rotateThree} 1s linear infinite;
    border-top: 3px solid #efeffa;
`;

export default function Loading(): JSX.Element {
    return (
        <Canvas>
            <Loader>
                <InnerOne />
                <InnerTwo />
                <InnerThree />
            </Loader>
        </Canvas>
    );
}
