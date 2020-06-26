import React from "react";
import styled from "styled-components";
import screenshot1 from "./screenshot-1.gif";
import screenshot2 from "./screenshot-2.gif";
import screenshot3 from "./screenshot-3.png";

const Wrapper = styled.div`
    padding: 10px 10px 1px;
`;

const ImgWrapper = styled.p`
    text-align: center;
`;

const Img = styled.img`
    max-width: 100%;
    border: 1px solid #cc9a9a;
`;

function About(): JSX.Element {
    return (
        <Wrapper>
            <header>
                <b>Habits</b> is a completely free service which help build good
                habits and break bad ones. <a href="/login">Click here</a> to
                get started.
            </header>
            <p>It allows you to</p>
            <ul>
                <li>Add daily tasks</li>
                <li>Remind you of undone tasks</li>
                <li>Show a graph of your commitment over the past year</li>
                <li>Complete a habit</li>
            </ul>
            <h3>How to use:</h3>
            <h4>1. Create a habit you want to develop</h4>
            <ImgWrapper>
                <Img src={screenshot1} alt="Create a habit" />
            </ImgWrapper>
            <h4>2. Click on the habit to indicate you have done it today</h4>
            <ImgWrapper>
                <Img src={screenshot2} alt="Click on a habit" />
            </ImgWrapper>
            <h4>3. Show a graph of your commitment over the past year</h4>
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
