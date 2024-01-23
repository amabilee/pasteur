import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './style.css'
import leaveIcon from '../../assets/leaveIconAdmin.svg'
import menuIcon from '../../assets/menuIconAdmin.svg'
import userIcon from '../../assets/userIcon.svg'
import boxIcon from '../../assets/boxIcon.svg'
import historyIcon from '../../assets/historyIconAdmin.svg'
import { useNavigate } from 'react-router-dom';
import { UseAuth } from '../../hooks/index';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';



export default function HeaderHomeColab() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(true);
    const [showMenuStyle, setShowMenuStyle] = useState('menuColab');
    const [buttonEntryStyle, setbuttonEntryStyle] = useState('button-16-enable');
    const [buttonExitStyle, setbuttonExitStyle] = useState('button-16-disable');
    const [buttonHistoryStyle, setbuttonHistoryStyle] = useState('button-16-disable');
    const {signOut} = UseAuth()

    function returnLogin() {
        navigate('/login')
        signOut()
        console.log('deslogar')
    }

    function handleMenu() {
        if (showMenu == false) {
            setShowMenu(true)
            setShowMenuStyle('menuColab-slide-down')
        } else if (showMenu == true) {
            setShowMenuStyle('menuColab-slide-up')
            setTimeout(() => {
                setShowMenu(false);
            }, 500);
        }
    }

    useEffect(() => {
        const path = location.pathname;
        if (path === '/staff-admin') {
            setButtonStyles('button-16-enable', 'button-16-disable', 'button-16-disable');
        } else if (path === '/familia-admin') {
            setButtonStyles('button-16-disable', 'button-16-enable', 'button-16-disable');
        } else {
            setButtonStyles('button-16-disable', 'button-16-disable', 'button-16-enable');
        }
    }, [location.pathname]);

    function setButtonStyles(entry, exit, history) {
        setbuttonEntryStyle(entry);
        setbuttonExitStyle(exit);
        setbuttonHistoryStyle(history);
    }

    function buttonUserClicked() {
        setButtonStyles('button-16-enable', 'button-16-disable', 'button-16-disable');
        navigate('/staff-admin');
    }

    function buttonBoxClicked() {
        setButtonStyles('button-16-disable', 'button-16-enable', 'button-16-disable');
        navigate('/familia-admin');
    }

    function buttonHistoryClicked() {
        setButtonStyles('button-16-disable', 'button-16-disable', 'button-16-enable');
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


    return (
        <Container>
            <div className="headerHomeAdmin">
                <div className='headerHomeAdminContainer'>
                    <button className='button-17' onClick={handleMenu}>
                        <img src={menuIcon} />
                    </button>
                    <div className="logoHomeAdmin"></div>
                </div>
                <LightTooltip title="Sair" placement="bottom" >
                    <button className='button-17' onClick={returnLogin}><img src={leaveIcon} /></button>
                </LightTooltip>
            </div>
            {showMenu && (
                <div className={showMenuStyle}>
                    <LightTooltip title="Colaboradores" placement="right" >
                        <button className={buttonEntryStyle} onClick={buttonUserClicked}><img src={userIcon} /></button>
                    </LightTooltip>
                    <LightTooltip title="Famílias" placement="right" >
                        <button className={buttonExitStyle} onClick={buttonBoxClicked}><img src={boxIcon} className='boxIcon' /></button>
                    </LightTooltip>
                    <LightTooltip title="Histórico" placement="right" >
                        <button className={buttonHistoryStyle} onClick={buttonHistoryClicked}><img src={historyIcon} /></button>
                    </LightTooltip>
                </div>
            )}
        </Container>
    );
}