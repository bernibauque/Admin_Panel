// Importaciones de Redux Toolkit, incluyendo createSlice y createAsyncThunk,
// y el servicio authService que maneja la lógica de autenticación.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserfromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

// Estado inicial del slice de autenticación completo.
const initialState = {
    user: getUserfromLocalStorage, // Información del usuario
    isError: false, // Bandera para manejar errores
    isLoading: false, // Bandera para indicar si la aplicación está cargando
    isSuccess: false, // Bandera para indicar si la operación fue exitosa
    message: "", // Mensaje de error u otra información relevante
};

// Definición del thunk asíncrono para iniciar sesión.
// Este thunk es utilizado para iniciar sesión en la aplicación.
export const login = createAsyncThunk(
    "auth/admin-login",
    async (user, thunkAPI) => {
        try {
            // Llamada al servicio authService para iniciar sesión.
            return await authService.login(user);
        } catch (error) {
            // Si hay un error, se rechaza la operación con el valor del error.
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Creación del slice de Redux llamado authSlice.
export const authSlice = createSlice({
    name: "auth", // Nombre del slice
    initialState, // Estado inicial
    reducers: {}, // Reducers adicionales (en este caso no hay ninguno definido)
    extraReducers: (builder) => {
        // Reducer para manejar el estado cuando se está realizando el inicio de sesión.
        builder.addCase(login.pending, (state) => {
            state.isLoading = true; // Se establece isLoading en true mientras se carga
        });

        // Reducer para manejar el estado cuando el inicio de sesión es exitoso.
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false; // Se establece isLoading en false
            state.isSuccess = true; // Se marca la operación como exitosa
            state.user = action.payload; // Se actualiza la información del usuario
        });

        // Reducer para manejar el estado cuando el inicio de sesión es rechazado o falla.
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false; // Se establece isLoading en false
            state.isError = true; // Se marca la operación como con error
            state.isSuccess = false; // Se marca la operación como no exitosa
            state.user = null; // Se limpia la información del usuario
        });
    },
});

// Exportación del reducer del slice de autenticación.
export default authSlice.reducer;
