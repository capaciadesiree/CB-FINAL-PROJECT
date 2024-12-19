import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.dashboardBackground};
  }
  
  :root {
    --logo-fill: ${props => props.theme.logoFill};
    --icon-fill: ${props => props.theme.textColor};
  }
`;

export default GlobalStyle;