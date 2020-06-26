import React from "react";
import styled from "styled-components";
import screenshot1 from "./screenshot-1.gif";
import screenshot2 from "./screenshot-2.gif";
import screenshot3 from "./screenshot-3.png";

const Wrapper = styled.div`
    padding: 16px 20px 1px;
`;

const ImgWrapper = styled.p`
    text-align: center;
    margin-bottom: 40px;
`;

const Img = styled.img`
    max-width: 100%;
    border: 1px solid #cc9a9a;
`;

const Header = styled.header`
    font-size: 20px;
    line-height: 26px;
    margin-bottom: 30px;
`;

function About(): JSX.Element {
    return (
        <Wrapper>
            <Header>
                <b>Habits</b> is a completely free service which helps build
                good habits and break bad ones. <a href="/login">Click here</a>{" "}
                to get started.
            </Header>
            <h3>1. Create a habit you want to develop</h3>
            <ImgWrapper>
                <Img src={screenshot1} alt="Create a habit" />
            </ImgWrapper>
            <h3>2. Click on the habit to indicate you have done it today</h3>
            <ImgWrapper>
                <Img src={screenshot2} alt="Click on a habit" />
            </ImgWrapper>
            <h3>3. Show a graph of your commitment over the past year</h3>
            <ImgWrapper>
                <Img
                    src={screenshot3}
                    alt="A graph of your commitment over the past year"
                />
            </ImgWrapper>
        </Wrapper>
    );
}

export default About;
