import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    padding: 10px 10px 1px;
`;

function About(): JSX.Element {
    return (
        <Wrapper>
            <header>
                <b>Habits</b> is a completely free service which help build good
                habits and break bad ones.
            </header>
            <p>
                It allows you to
                <ul>
                    <li>Add daily tasks</li>
                    <li>Remind you of undone tasks</li>
                    <li>Show a graph of your commitment over the past year</li>
                    <li>Complete a habit</li>
                </ul>
            </p>
            <h3>Instructions</h3>
            <h3>Why?</h3>
            <p>
                I know that &apos;divide and conquer&apos; is best way to
                develop habits. New year resolution is wishful thinking. I need
                to set daily, weekly and monthly targets. Therefore, I need a
                Web/Native app as a reminder and results-checker. All the
                services I found are either poorly designed or paid. Hence,
                I&apos;ve decided to build it.
            </p>
        </Wrapper>
    );
}

export default About;
