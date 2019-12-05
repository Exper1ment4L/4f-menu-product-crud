import styled from 'styled-components';

const TextField = styled.input`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-right:2px;
  color: #495057;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-bottom: 1px;
  :focus {
    outline: none;
    box-shadow: 0 0 0.1rem 0.5pt #007bff;
  }
`;

export default TextField;
