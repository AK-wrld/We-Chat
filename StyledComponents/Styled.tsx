"use client";
import { Grid } from '@mui/material'
import { errorColor, primary, subTitleSize, text, textSize, title, titleSize } from './Global';
import styled from '@emotion/styled'

export const StyledGrid = styled(Grid)`
background:${primary};
height:100vh;
padding:0;
display:flex;
`
export const StyledTitle = styled.h1`
color:${title};
font-size: ${titleSize}
`
export const StyledSubTitle = styled.h2`
color:${text};
font-size: ${subTitleSize};

`
export const StyledText = styled.p`
font-size: ${textSize};
`
export const ErrorSpan = styled.span`
color:${errorColor};
font-size:13px
`
export const StyleButton = styled.button`
background-color: ${text};
    border-radius: 8px;
    border-style: none;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: 500;
    height: 40px;
    line-height: 20px;
    list-style: none;
    margin: 0;
    outline: none;
    padding: 10px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: color 100ms;
    vertical-align: baseline;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    transition:all 0.5s;
    &:hover {
        background-color: #fc7690;
        
      }

`