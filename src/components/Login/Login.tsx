import React, { useEffect, useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { changeIsAuth } from '../../store/authorizedSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHook';
import { setToken } from '../../store/tokenSlice';


const Login = () => {

    const navigate = useNavigate();

    const goToMain = () => {
        navigate('/main');
    }

    const text = useAppSelector(state => state.isAuth.text);

    const dispatch = useAppDispatch();

    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');

    const [loginEmpty, setLoginEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [loginError, setLoginError] = useState('Логин не может быть пустым');
    const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
    const [formValid, setFormValid] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        if (passwordError || loginError) {
            setFormValid(false);
        }
        else {
            setFormValid(true);
        }
    }, [loginError, passwordError])


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'login':
                setLoginEmpty(true);
                break
            case 'password':
                setPasswordEmpty(true);
        }
    }

    const loginHandler = (e) => {
        setLogin(e.target.value);
        if (e.target.value) {
            setLoginError('');
            setError('');
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        if (e.target.value) {
            setPasswordError('');
            setError('');
        }
    }


    const authorization = async (login, password) => {
        try {
            const requestOptions: RequestInit = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({login, password})
            }
            const response = await fetch(`https://file-store-fe.vercel.app/api/auth/signIn`, requestOptions);
            const data = await response.json();
            const token = data.token;
            dispatch(setToken(token));

            if (response.status===400) {
                setError('Неверный логин или пароль');
            }
            if (response.ok) {
                dispatch(changeIsAuth(true));
                goToMain();
            }

        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="block">
            <form onSubmit={(event) => {
                event.preventDefault();
                authorization(login, password);
            }} className="form f1">
                <h2>Вход</h2>
                {text && <div style={{color: "green", marginBottom: "15px"}}>{text}</div>}
                {(loginEmpty && loginError) && <div style={{color: "red"}}>{loginError}</div>}
                <input onChange={e => loginHandler(e)} onBlur={e => blurHandler(e)} name="login" placeholder="Логин"
                       type="text"/>
                {(passwordEmpty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
                <input onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)} name="password"
                       placeholder="Пароль" type="password"/>
                <button disabled={!formValid} className="green">ВОЙТИ</button>
                {error && <div style={{color: "red", marginTop: "10px"}}>{error}</div>}
                <p>
                    Еще не зарегистрированы? <Link to="/registration">Регистрация</Link>
                </p>
            </form>
        </div>
    )
}
export default Login;