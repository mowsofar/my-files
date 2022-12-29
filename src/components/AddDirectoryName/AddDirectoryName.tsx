import React, { useState } from 'react';
import './AddDirectoryName.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHook';
import { getFiles, setWindowActive } from "../../store/filesSlice";

const AddDirectoryName = () => {

    const token = useAppSelector(state => state.token.token);

    const active = useAppSelector(state => state.files.windowActive)

    const dispatch = useAppDispatch();

    const [directoryName, setDirectoryName] = useState('');
    const [error, setError] = useState('');

    const createDirectoryHandler = (e) => {
        setDirectoryName(e.target.value);
    }

    const submitHandler = () => {
        setDirectoryName('')
        setError('');
        dispatch(setWindowActive(false));
    }

    const createDirectory = async ()  => { // создание папки
        try {
            const requestOptions = {
                method: 'POST',
                headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({name: directoryName})
            }
            const response = await fetch(`https://file-store-fe.vercel.app/api/files/createDirectory`, requestOptions);

            if (response.ok) {
                submitHandler();
                dispatch(getFiles(token));
            }
            else {
                setError('Придумайте другое имя папки')
            }

        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className={active ? 'window active' : 'window'}>
            <div className='content'>
                <h2>Новая папка</h2>
                {error && <div style={{color: 'red', fontSize:'14px', marginBottom: '10px'}}>{error}</div>}
                <input value={directoryName} name='folder-name' type='text' placeholder='Имя папки' onChange={(e) => {createDirectoryHandler(e)}}/>
                <button onClick={() => {createDirectory();}}>Создать</button>
                <button onClick={() => dispatch(setWindowActive(false))}>Отмена</button>
            </div>
        </div>
    );
};

export default AddDirectoryName;