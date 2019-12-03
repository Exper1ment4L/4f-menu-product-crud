import styled, { css } from 'styled-components';

const Button = styled.button`
  margin: 0.1em;
  border-color: transparent;
  border-radius: 14px;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.55rem;
  font-weight: 400;
  color: #ffffff;
  :focus {
    outline: none;
  }
  ${props =>
    props.large &&
    css`
      padding: 0.475rem 0.85rem;
      font-size: 2rem;
      font-weight: 500;
    `};
  ${props =>
    props.update &&
    css`
      background: #ffc107;
      color: #212529;
    `};
  ${props =>
    props.delete &&
    css`
      background: #dc3545;
    `};
  ${props =>
    props.dark &&
    css`
      background: #343a40;
    `};
  ${props =>
    props.light &&
    css`
      background: #f8f9fa;
      color: #212529;
    `};
    ${props =>
      props.success &&
      css`
        background: #28a745;
        color: #212529;
      `};
  ${props =>
    props.submit &&
    css`
      background: #007bff;
    `};

    ${props =>
      props.full &&
      css`
        width:100%;
      `};

      ${props =>
        props.half &&
        css`
          width:50%;
        `};
`;
export default Button;