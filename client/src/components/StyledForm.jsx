import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;

  label {
    line-height: 1.7;
    letter-spacing: 0.4px;
    color: #767676;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 10px;

    &::after {
      content: ":";
      width: auto;
      color: #767676;
    }
  }

  input,
  button {
    width: 100%;
    height: 44px;
    margin: 10px 0;
    font-size: 16px;
    outline: none;
  }

  input {
    padding: 6px;
    height: 54px;
  }

  button {
    background: #2d2d2d;
    color: #fff;
    border: none;
    cursor: pointer;
    letter-spacing: 1px;
    text-transform: uppercase;

    &:hover {
      background: rgb(118, 118, 118);
    }
  }
`;
