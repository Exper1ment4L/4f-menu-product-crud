import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props =>
    props.delete ? 'red' : props.update ? '#ffc107' : 'green'};
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
`;

export default Button;
