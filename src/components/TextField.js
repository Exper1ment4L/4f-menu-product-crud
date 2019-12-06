import styled, { css } from 'styled-components';

const TextField = styled.input`
  padding: 0.375rem 0rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-bottom: 1px;
  :focus {
    outline: none;
    box-shadow: 0 0 0.1rem 0.5pt #007bff;
  }

  ${props =>
    props.full &&
    css`
      min-width: 100%;
    `};
  ${props =>
    props.center &&
    css`
      text-align: Center;
    `};
`;

export default TextField;
