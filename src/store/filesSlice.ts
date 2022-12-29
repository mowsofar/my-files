import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IFile {
    name: string,
    directoryId: string | null,
    id: string
}

interface IDirectory {
    name: string,
    directoryId: string | null,
    id: string
}

interface IMainPageFiles {
    files: Array<IFile>,
    directories: Array<IDirectory>
}

interface IFilesState {
    dirsAndFiles: IMainPageFiles,
    currentDir: string | null,
    directoryFiles: Array<IFile>,
    windowActive: boolean,
    isLoading: boolean,
    dirName: string,
    status: 'pending' | 'fulfilled' | 'rejected',
    status2: 'pending' | 'fulfilled' | 'rejected'
}

const initialState: IFilesState = {
    dirsAndFiles: {directories: [], files: []},
    currentDir: null,
    directoryFiles: [],
    windowActive: false,
    isLoading: false,
    dirName: '',
    status: null,
    status2: null
}

export const getDirectoryFiles = createAsyncThunk(
  'filesSlice/getDirectoryFiles',
  async ({ token, dir }: { token: string, dir: string | null }) => {
      const requestOptions: RequestInit = {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json',
          }
      }
      const response = await fetch(`https://file-store-fe.vercel.app/api/files/directoryContent/${dir}`, requestOptions);
      const data = await response.json();
      return data.files;
  }
);


export const getFiles = createAsyncThunk(
    'filesSlice/getFiles',
    async (token: string) => {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json',
            }
        }
        const response = await fetch(`https://file-store-fe.vercel.app/api/files/my`, requestOptions);
        return await response.json();
    }
);

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setDirectories(state, action: PayloadAction<Array<IDirectory>>) {
            state.dirsAndFiles.directories = action.payload;
        },
        setFiles(state, action: PayloadAction<Array<IFile>>) {
            state.dirsAndFiles.files = action.payload;
        },
        setDirectoryFiles(state, action: PayloadAction<Array<IFile>>) {
            state.directoryFiles = action.payload
        },
        setCurrentDir(state, action: PayloadAction<string>) {
            state.currentDir = action.payload;
        },
        setCurDirName(state, action: PayloadAction<string>) {
            state.dirName = action.payload;
        },
        setWindowActive(state, action: PayloadAction<boolean>) {
            state.windowActive = action.payload;
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        }
    },
    extraReducers: {
        [getDirectoryFiles.pending.toString()]: (state) => {
            state.status = 'pending';
            state.isLoading = true;
        },

        [getDirectoryFiles.fulfilled.toString()]: (state, action:PayloadAction<Array<IFile>>) => {
            state.status = 'fulfilled';
            state.isLoading = false;
            state.directoryFiles = action.payload;
        },

        [getDirectoryFiles.rejected.toString()]: (state) => {
            state.status = 'rejected';
            state.isLoading = false;
        },

        [getFiles.pending.toString()]: (state) => {
            state.status2 = 'pending';
            state.isLoading = true;
        },

        [getFiles.fulfilled.toString()]: (state, action:PayloadAction<IMainPageFiles>) => {
            state.status2 = 'fulfilled';
            state.isLoading = false;
            state.dirsAndFiles = action.payload;
        },

        [getFiles.rejected.toString()]: (state) => {
            state.status2 = 'rejected';
            state.isLoading = false;
        }

    }
})

export const { setDirectoryFiles, setCurrentDir, setCurDirName, setWindowActive, setIsLoading } = filesSlice.actions;
export default filesSlice.reducer;