import styled from 'styled-components';

const TextField = styled.input`
  width: 10rem;
  font-size: 1em;
  border: 1px solid #ddd;
  border-color: ${props => (props.primary ? 'black' : 'palevioletred')};
`;

export default TextField;
