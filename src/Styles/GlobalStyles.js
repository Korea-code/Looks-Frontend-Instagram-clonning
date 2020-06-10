import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset}
    @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap');
    *{
        box-sizing:border-box;
        
    }
    
    body {
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.blackColor};
        font-family: 'Roboto Condensed', sans-serif;
    }
    h1 {
        font-family: 'Quicksand', sans-serif;
    }
    a {
        color: ${props => props.theme.blueColor};
        text-decoration: none;
    }
    
`;
