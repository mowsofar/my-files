import React, { useEffect, useState } from 'react';
import './Registration.scss';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/TypedHook";
import { addText } from "../../store/authorizedSlice";

const Registration = () => {

    const navigate = useNavigate();

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
        }
    }

    const registration = async (login, password) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({login, password})
            }
            const response = await fetch(`https://file-store-fe.vercel.app/api/auth/signUp`, requestOptions);

            if (response.status===400) {
                setError('Пользователь с таким логином уже существует');
            }
            if (response.ok) {
                dispatch(addText('Вы успешно зарегистрированы!'));
                navigate("/");
            }

        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="block">
            <form onSubmit={(event) => {
                event.preventDefault();
                registration(login, password);
            }} className="form f2">
                <h2>Регистрация</h2>
                {(loginEmpty && loginError) && <div style={{color: "red"}}>{loginError}</div>}
                <input onChange={e => loginHandler(e)} onBlur={e => blurHandler(e)} name="login" type="text"
                       placeholder="Логин"/>
                {(passwordEmpty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
                <input onChange={e => passwordHandler(e)} onBlur={e => blurHandler(e)} name="password" type="password"
                       placeholder="Пароль"/>
                <button disabled={!formValid} className="green">ЗАРЕГИСТРИРОВАТЬСЯ</button>
                {error && <div style={{color: "red", marginLeft: "30px", marginTop: "10px"}}>{error}</div>}
                <p>
                    Есть аккаунт? <Link to="/">Войти</Link>
                </p>
            </form>
        </div>
    )
}
export default Registration;