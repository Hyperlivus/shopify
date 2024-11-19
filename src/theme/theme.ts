"use client"

import { createTheme } from '@mui/material/styles';


const theme = createTheme({
    typography: {
        "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette : {
        background : {
            paper : "#221f1f",
            default : "#fff",
        },
        primary : {
            main : "#00a046",
            light : "#f1f1f1",
            //dark : "#000",
        }
    },
    components : {

    },

});

export default theme;