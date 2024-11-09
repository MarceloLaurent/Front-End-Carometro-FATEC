import styled, { css } from 'styled-components';

export const ButtonContainer = styled.button`
    background: #156082;
    border-radius: 22px;
    color: #FFFFFF;
    padding: 2px 12px;
    width: 100px; 
    margin-right: 10px; 

    ${({variant}) => variant !== "primary" && css`
        min-width: 60px;

        background: #DC143C;

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
`;
