import styled from "styled-components";
import React from "react";

const Button = styled.button`
  background-color: ${props => props.delete ? 'red' : props.update? '#ffc107' : 'green'};
  font-size: 1em;
  color: ${props => props.update? 'black' : 'white'};
  margin: 1em;
  padding: 0.25em 1em;
  border-color:transparent;
  border-radius: 3px;
`;

export default Button;

