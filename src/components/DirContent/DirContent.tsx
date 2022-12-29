import React, { useEffect } from 'react';
import './DirContent.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/TypedHook';
import { setCurrentDir, setCurDirName, setDirectoryFiles, getDirectoryFiles } from '../../store/filesSlice';
import { useNavigate, useParams } from 'react-router-dom';
// @ts-ignore
import arrow from '../../images/arrow.png';
// @ts-ignore
import doc from '../../images/file.png';
import MainPagePanel from '../MainPagePanel/';
import LoadingSpinner from "../LoadingSpinner";

const DirContent = () => {

    const {dir} = useParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const token = useAppSelector(state => state.token.token);

    const goBack = () => {
        dispatch(setCurrentDir(null));
        dispatch(setDirectoryFiles([]));
        dispatch(setCurDirName(''));
        navigate('/main');
    }

    useEffect(() => {
        dispatch(getDirectoryFiles({token, dir}))
    }, [])

    const directoryFiles = useAppSelector(state => state.files.directoryFiles);
    const name = useAppSelector(state => state.files.dirName);

    const isLoading = useAppSelector(state => state.files.isLoading);

    return (
        <div>
            <MainPagePanel/>
            {isLoading ? <LoadingSpinner/>:
            <div className='folder-files'>
                <div className='flex'>
                    <button onClick={goBack}><img style={{height: '30px', width: '30px'}} src={arrow} alt=''/></button>
                    <h1>{name}</h1>
                </div>
                <div className='folders'>
                    {directoryFiles.map(file => (<a key={file.id} download={true} href={`https://file-store-fe.vercel.app/api/files/read/${token}/${file.id}/${file.name}`}>
                        <div className='folder' >
                            <img style={{height: '70px', width: '60px'}} src={doc} alt={file.name}/>
                            <div className='name'>{file.name.length < 8 ? file.name : file.name.substr(0, 6) + '..'}</div>
                        </div></a>)
                    )}
                </div>
            </div>}
        </div>
    );
};

export default DirContent;