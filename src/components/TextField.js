import styled, { css } from 'styled-components';

const TextField = styled.input`
  padding: 0.375rem;
  padding-right: 0;
  padding-left: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-bottom: 5px;
  margin-right: 5px;
  :focus {
    outline: none;
    box-shadow: 0 0 0.1rem 0.5pt #007bff;
  }

  ${props =>
    props.search &&
    css`
      border:none;
      border-radius:0px;
      border-bottom:1px solid;
      :focus {
        outline: none;
        box-shadow: 0 0 0.1rem 0.5pt transparent;
        color:red;
        border-color:black;
        caret-color:black;
      }
      background-color: white;
      background-size: 16px;
      background-image: url('https://image.flaticon.com/icons/svg/116/116836.svg');
      background-position: 10px 10px;
      background-repeat: no-repeat;
      padding-left: 40px;
      min-width: 100%;
    `};

  ${props =>
    props.full &&
    css`
    `};
  ${props =>
    props.center &&
    css`
      text-align: Center;
    `};
`;

export default TextField;
