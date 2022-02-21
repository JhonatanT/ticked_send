import { parseCookies } from 'nookies';
import React, { useState, useEffect, useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { AuthContext } from '../../contexts/AuthContext';
import { Button } from '../../styles/globalStyles';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    NavIcon,
    MobileIcon,
    NavMenu,
    NavItem,
    NavItemBtn,
    NavLinks,
    NavBtnLink
} from './Navbar.elements';

export function Navbar() {
        
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    const { ['token']: id } = parseCookies();
    if(id){
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {  upload_bd } = useContext(AuthContext);
        
        return (
            <body>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <Nav>
                        <NavbarContainer>
                            <NavLogo to='/' onClick={closeMobileMenu} >
                                <NavIcon />
                                Hayashi
                            </NavLogo>
                            <MobileIcon onClick={handleClick}>
                                {click ? <FaTimes /> : <FaBars />}
                            </MobileIcon>
                            <NavMenu onClick={handleClick} click={click} >
                            <NavItemBtn>
                                        <NavBtnLink>
                                            <Button onClick={() => upload_bd()} fontBig primary>
                                                    Atualizar Dados dos Clientes
                                            </Button>
                                        </NavBtnLink>
                                </NavItemBtn>
                            </NavMenu>
                        </NavbarContainer>
                    </Nav>
                </IconContext.Provider>
    
            </body>
        );
    }
    else{
        return (
            <body>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <Nav>
                        <NavbarContainer>
                            <NavLogo to='/' onClick={closeMobileMenu} >
                                <NavIcon />
                                Hayashi
                            </NavLogo>
                            <MobileIcon onClick={handleClick}>
                                {click ? <FaTimes /> : <FaBars />}
                            </MobileIcon>
                            <NavMenu onClick={handleClick} click={click} >
   
                            </NavMenu>
                        </NavbarContainer>
                    </Nav>
                </IconContext.Provider>
    
            </body>
        );
    }


}