import styled, { css } from 'styled-components';

export const ButtonContainer = styled.button`
    background: #483D8B;
    border-radius: 22px;
    position: relative;

    color: #FFFFFF;
    padding: 2px 12px;
    width: 90px;
    height: 30px;

    ${({variant}) => variant !== "primary" && css`
        min-width: 90px;
        height: 30px;

        background: #FF0000;

        &::after {
            content: '';
            position: absolute;
            border: 1px solid #0000FF;
            top: -5px;
            left: -6px;
            width: calc(100% +10px);
            height: calc(100% +10px);
            border-radius: 2px;
        }
    `}
`