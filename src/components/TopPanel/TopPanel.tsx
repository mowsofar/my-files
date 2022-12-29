import React from 'react';
import './TopPanel.scss';
// @ts-ignore
import logo from '../../images/logo1.png';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/TypedHook';

const TopPanel = () => {

    const auth = useAppSelector(state => state.isAuth.isAuth);

    return (
        <div className="top-panel">
            <div className="logo"><img src={logo} alt=""/></div>
            <ul className="menu">
                <li><h2>ГЛАВНАЯ</h2></li>
                <li><h2>О НАС</h2></li>
            </ul>
            {!auth &&
                <div className="panel-links">
                    <Link to='/'>Вход</Link>
                    <Link to='/registration'>Регистрация</Link>
                </div>}
            {auth &&
                <div className="panel-links">
                    <Link to='/'>Выход</Link>
                </div>}
        </div>
    );
};

export default TopPanel;