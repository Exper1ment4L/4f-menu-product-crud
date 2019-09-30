import React, { Component } from "react";
import styled from "styled-components";

const TextField = styled.input`
  font-size: 1.45em;
  border: 1px solid #ddd;
  border-color: ${ props => (props.primary ? "black" : "palevioletred")};
`;

export default TextField;
