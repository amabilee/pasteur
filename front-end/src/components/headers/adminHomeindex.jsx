import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './style.css'
import leaveIcon from '../../assets/leaveIconColab.svg'
import menuIcon from '../../assets/menuIconColab.svg'
import userIcon from '../../assets/userIcon.svg'
import boxIcon from '../../assets/boxIcon.svg'
import minusIcon from '../../assets/minusBlack.svg'
import configOptionsIcon from '../../assets/configOptionsIcon.svg'
import addIcon from '../../assets/addBlackIcon.svg'
import historyIcon from '../../assets/historyIconAdmin.svg'
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../hooks/index';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';



export default function HeaderHomeColab() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(true);
    const [showMenuStyle, setShowMenuStyle] = useState('menuAdmin');
    const [buttonUsersStyle, setbuttonUsersStyle] = useState('button-16-enable');
    const [buttonFamilyStyle, setbuttonFamilyStyle] = useState('button-16-disable');
    const [buttonEntryStyle, setbuttonEntryStyle] = useState('button-16-disable');
    const [buttonExitStyle, setbuttonExitStyle] = useState('button-16-disable');
    const [buttonHistoryStyle, setbuttonHistoryStyle] = useState('button-16-disable');
    const [showMenuUser, setShowMenuUser] = useState(false);
    
    
    const { signOut } = UseAuth()

    function returnLogin() {
        navigate('/login')
        signOut()
        console.log('deslogar')
    }

    function handleMenu() {
        if (showMenu == false) {
            setShowMenu(true)
            setShowMenuStyle('menuAdmin-slide-down')
        } else if (showMenu == true) {
            setShowMenuStyle('menuAdmin-slide-up')
            setTimeout(() => {
                setShowMenu(false);
            }, 500);
        }
    }

    useEffect(() => {
        const path = location.pathname;
        if (path === '/staff-admin'){
        setButtonStyles('button-16-enable', 'button-16-disable', 'button-16-disable', 'button-16-disable', 'button-16-disable')
        } else if (path === '/familia-admin'){
            setButtonStyles('button-16-disable', 'button-16-enable', 'button-16-disable', 'button-16-disable', 'button-16-disable');
        } else if (path === '/entry-admin'){
            setButtonStyles('button-16-disable', 'button-16-disable', 'button-16-enable', 'button-16-disable', 'button-16-disable');
        } else if (path === '/exit-admin'){
            setButtonStyles('button-16-disable', 'button-16-disable', 'button-16-disable', 'button-16-enable', 'button-16-disable');
        } else if (path === '/history-admin'){
            setButtonStyles('button-16-disable', 'button-16-disable', 'button-16-disable', 'button-16-disable', 'button-16-enable');
        }
    }, [location.pathname]);

    function setButtonStyles(users, family, entry, exit, history) {
        setbuttonUsersStyle(users);
        setbuttonFamilyStyle(family)
        setbuttonEntryStyle(entry);
        setbuttonExitStyle(exit);
        setbuttonHistoryStyle(history);
    }

    function buttonUserClicked() {
        navigate('/staff-admin');
    }

    function buttonBoxClicked() {
        navigate('/familia-admin');
    }

    function buttonEntryClicked() {
        navigate('/entry-admin');
    }

    function buttonExitClicked() {
        navigate('/exit-admin')
    }

    function buttonHistoryClicked() {
        navigate('/history-admin')
    }

    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#494949',
            color: theme.palette.common.white,
            boxShadow: theme.shadows[2],
            fontSize: 13,
            fontFamily: 'Inter',
            borderRadius: 5,
            fontWeight: 400,
            letterSpacing: '0.5px'
        },
    }));

    function buttonConfigClicked() {
        if (showMenuUser) {
            setShowMenuUser(false)
        } else {
            setShowMenuUser(true)
            console.log('mostrando')
        }
    }

    function spaceOutClicked() {
        setShowMenuUser(false)
    }

    return (
        <Container>
            <div className="headerHomeColab">
                <div className='headerHomeColabContainer'>
                    <button className='button-17' onClick={handleMenu}>
                        <img src={menuIcon} />
                    </button>
                    <div className="logoHomeColab"></div>
                </div>
                <LightTooltip title="Opções" placement="bottom" >
                    <button className='button-17' onClick={buttonConfigClicked}><img src={configOptionsIcon} /></button>
                </LightTooltip>
            </div>
            {showMenu && (
                <div className={showMenuStyle}>
                    <LightTooltip title="Usuários" placement="right" >
                        <button className={buttonUsersStyle} onClick={buttonUserClicked}><img src={userIcon} /></button>
                    </LightTooltip>
                    <LightTooltip title="Famílias" placement="right" >
                        <button className={buttonFamilyStyle} onClick={buttonBoxClicked}><img src={boxIcon} className='boxIcon' /></button>
                    </LightTooltip>
                    <LightTooltip title="Entrada" placement="right" >
                        <button className={buttonEntryStyle} onClick={buttonEntryClicked}><img src={addIcon} /></button>
                    </LightTooltip>
                    <LightTooltip title="Saída" placement="right" >
                        <button className={buttonExitStyle} onClick={buttonExitClicked}><img src={minusIcon}/></button>
                    </LightTooltip>
                    <LightTooltip title="Histórico" placement="right" >
                        <button className={buttonHistoryStyle} onClick={buttonHistoryClicked}><img src={historyIcon} /></button>
                    </LightTooltip>
                </div>
            )}
            {showMenuUser && (
                        <div className="showMenuContainer" onClick={spaceOutClicked}>
                            <div className="showMenuStyleModal">
                                <ul>
                                    <li>Nível: Administrador</li>
                                    <li><button>Mudar senha</button></li>
                                    <li><button onClick={returnLogin}>Sair</button></li>
                                </ul>
                            </div>
                        </div>
                    )}
        </Container>
    );
}