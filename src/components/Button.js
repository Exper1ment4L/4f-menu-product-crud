import styled from "styled-components";
import React from "react";

const Button = styled.button`
  background-color: ${props => props.delete ? 'red' : 'green'};
  font-size: 1em;
  color:white;
  margin: 1em;
  padding: 0.25em 1em;
  border-color:transparent;
  border-radius: 3px;
`;

export default Button;
