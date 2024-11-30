import styled  from 'styled-components';

export const Container = styled.div`
   
    width: 100%;
    max-width: 80%;
    height: 75px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
`

export const Row = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
`;

export const Wrapper = styled.div`
    background-color: #156082;
    width: 100%;
    height: 75px;
    display:flex;
    justify-content: center;
    align-items: center;
`

export const Menu = styled.a`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    text-decoration: none;
    line-height: 25px;
    color: #FFFFFF;
    margin-right: 12px;
    cursor: pointer;
`

export const RightMenu = styled.a`
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    text-decoration: none;
    line-height: 25px;
    color: #FFFFFF;
    margin-left: 20px;
    cursor: pointer;
`

export const Logo = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    line-height: 25px;
    color: #43555F;
    margin-right: -48px;
    margin-botton: 60px;
`
