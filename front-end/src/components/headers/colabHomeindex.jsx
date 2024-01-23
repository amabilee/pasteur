import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './style.css'
import leaveIcon from '../../assets/leaveIconColab.svg'
import menuIcon from '../../assets/menuIconColab.svg'
import entryIcon from '../../assets/entryIcon.svg'
import exitIcon from '../../assets/exitIcon.svg'
import historyIcon from '../../assets/historyIcon.svg'
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
        if (path === '/entry-colaborador') {
            setButtonStyles('button-16-enable', 'button-16-disable', 'button-16-disable');
        } else if (path === '/exit-colaborador') {
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

    function buttonEntryClicked() {
        setButtonStyles('button-16-enable', 'button-16-disable', 'button-16-disable');
        navigate('/entry-colaborador');
    }

    function buttonExitClicked() {
        setButtonStyles('button-16-disable', 'button-16-enable', 'button-16-disable');
        navigate('/exit-colaborador');
    }

    function buttonHistoryClicked() {
        setButtonStyles('button-16-disable', 'button-16-disable', 'button-16-enable');
        navigate('/history-colaborador')
    }

    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: '#518FA7',
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
            <div className="headerHomeColab">
                <div className='headerHomeColabContainer'>
                    <button className='button-17' onClick={handleMenu}>
                        <img src={menuIcon} />
                    </button>
                    <div className="logoHomeColab"></div>
                </div>
                <LightTooltip title="Sair" placement="bottom" >
                    <button className='button-17' onClick={returnLogin}><img src={leaveIcon} /></button>
                </LightTooltip>
            </div>
            {showMenu && (
                <div className={showMenuStyle}>
                    <LightTooltip title="Entrada" placement="right" >
                        <button className={buttonEntryStyle} onClick={buttonEntryClicked}><img src={entryIcon} /></button>
                    </LightTooltip>
                    <LightTooltip title="Saída" placement="right" >
                        <button className={buttonExitStyle} onClick={buttonExitClicked}><img src={exitIcon} className='exitIcon' /></button>
                    </LightTooltip>
                    <LightTooltip title="Histórico" placement="right" >
                        <button className={buttonHistoryStyle} onClick={buttonHistoryClicked}><img src={historyIcon} /></button>
                    </LightTooltip>
                </div>
            )}
        </Container>
    );
}