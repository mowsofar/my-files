import React, { useEffect } from 'react';
import './ListOfFiles.scss';
// @ts-ignore
import folder from '../../images/folder.png';
// @ts-ignore
import doc from '../../images/file.png';
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHook';
import { Link } from 'react-router-dom';
import MainPagePanel from "../MainPagePanel/";
import {
    getFiles,
    setCurDirName,
    setCurrentDir
} from "../../store/filesSlice";
import LoadingSpinner from "../LoadingSpinner";

interface IDir {
    name: string,
    id: string | null
}

const ListOfFiles: React.FC = () => {

    const linkStyle: any = {
        textDecoration: 'none',
    }

    const dispatch = useAppDispatch();


    const token = useAppSelector(state => state.token.token);

    useEffect(() => {
        dispatch(getFiles(token))
    }, []);

    const dirsAndFiles = useAppSelector(state => state.files.dirsAndFiles)
    const directories = dirsAndFiles.directories;
    const files = dirsAndFiles.files;

    const selectDir = (directory: IDir) => {
        dispatch(setCurrentDir(directory.id));
        dispatch(setCurDirName(directory.name));
    }

    const isLoading = useAppSelector(state => state.files.isLoading);

    return (
        <div>
            <MainPagePanel/>
            {isLoading ? <LoadingSpinner/>:
                <div className='folders'>
                    {directories.map(dir => (<Link key={dir.id} to={`/myFiles/${dir.id}`} style={linkStyle}>
                            <div className='folder' onClick={() => {
                                selectDir(dir)
                            }}>
                                <img style={{height: '70px', width: '70px'}} src={folder} alt=''/>
                                <div>{dir.name}</div>
                            </div>
                        </Link>)
                    )}
                    {files.map(file => (<a key={file.id} download={true}
                                           href={`https://file-store-fe.vercel.app/api/files/read/${token}/${file.id}/${file.name}`}>
                            <div className='folder'>
                                <img style={{height: '70px', width: '60px'}} src={doc} alt={file.name}/>
                                <div
                                    className='name'>{file.name.length < 8 ? file.name : file.name.substr(0, 7) + '..'}</div>
                            </div>
                        </a>)
                    )}
                </div>}

        </div>

    );
};

export default ListOfFiles;