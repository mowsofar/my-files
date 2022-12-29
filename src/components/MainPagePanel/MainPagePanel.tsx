import React, { useState, useRef } from 'react';
import './MainPagePanel.scss';
// @ts-ignore
import addFolder from '../../images/addfolder.png';
// @ts-ignore
import addFile from '../../images/addfile.png';
// @ts-ignore
import add from '../../images/add.png'
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHook';
import AddDirectoryName from '../AddDirectoryName/AddDirectoryName';
import {getDirectoryFiles, getFiles, setIsLoading, setWindowActive} from '../../store/filesSlice';


const MainPagePanel: React.FC = () => {

    const filePicker = useRef(null);
    const [isOpen, setOpen] = useState(false);


    const token = useAppSelector(state => state.token.token);
    const dir = useAppSelector(state => state.files.currentDir);

    const dispatch = useAppDispatch();

    const handleOpen = () => setOpen(!isOpen);

    const handlePick = () => {
        filePicker.current.click();
    }

    const createFolderHandler = () => {
        dispatch(setWindowActive(true));

    }

    const handleChange = async (event) => { // загрузка файла

        const formData = new FormData();

        formData.append('file', event.target.files[0]);
        formData.append('name', event.target.files[0].name);

        if (dir) {
            formData.append('directoryId', dir);
        }

        dispatch(setIsLoading(true));
        const res = await fetch('https://file-store-fe.vercel.app/api/files/uploadFile', {
            method: 'POST',
            headers: {'Authorization': `Bearer ${token}`, 'Accept': 'application/json'},
            body: formData
        });
        dispatch(setIsLoading(false));
        if (res.ok) {
            dispatch(getFiles(token));
            dispatch(getDirectoryFiles({token, dir}));
        }
    }

    return (
        <div>
            <AddDirectoryName/>

            <div className="main-page-panel">

                <div className="add-panel">

                    <button className="add" onClick={handleOpen}>
                        <img src={add} alt=""/>
                        <div className="text">Создать</div>
                    </button>

                    <input className="hidden" type="file" ref={filePicker} onChange={handleChange}
                           accept="image/*, .png, .jpg, .gif, .web"/>

                    {isOpen && (<div className="dropdown">
                            <ul>
                                {dir === null && <li onClick={createFolderHandler}>Создать папку</li>}
                                <li onClick={handlePick}>Загрузить файл</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="icons">
                    {dir === null && <button onClick={createFolderHandler}><img src={addFolder} alt=""/></button>}
                    <button className="but2" onClick={handlePick}><img src={addFile} alt=""/></button>
                </div>
            </div>

        </div>
    );
};

export default MainPagePanel;