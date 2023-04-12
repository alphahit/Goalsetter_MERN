import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
//Thunk functions (middleware) used for asynchronous functions
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register User
//Async Thunk Function
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
    try {
        return await authService.register(user, thunkAPI)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.message) || error.message ||
            error.toString()

        return thunkAPI.rejectWithValue(message)

    }
})


//login User
//Async Thunk Function
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
    try {
        console.log("Async Thunk Function user ====>",user)
        return await authService.login(user, thunkAPI)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.message) || error.message ||
            error.toString()

        return thunkAPI.rejectWithValue(message)

    }
})

export const logout = createAsyncThunk('auth/logout',
    async () =>{
        authService.logout()
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    //Anything we put in reducers is not going to be thunk 
    //functions or async functions
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    //Extra Reducers are there for thunk(async) functions
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                    //This message will be sent when there is an error and 
                    //the message inside the error of thunk.reject will be sent
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                    //This message will be sent when there is an error and 
                    //the message inside the error of thunk.reject will be sent
                state.user = null
            })
            .addCase(logout.fulfilled, (state)=>{
                state.user = null
            })
    },
})

//If we have a reducer inside inside the reducers we have to export
//using authSlice.actions
export const { reset } = authSlice.actions
export default authSlice.reducer