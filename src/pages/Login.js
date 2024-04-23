import React from 'react'
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
    let schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: f,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div className='py-5' style={{ background: "#ffd333", minHeight: "100vh" }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4'>
                <h3 className='text-center title'>Acceso</h3>
                <p className='text-center text-muted small'>Ingresa a tu cuenta para continuar.</p>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        name='email'
                        label="Escribe tu email"
                        id="email"
                        val={formik.values.email}
                        onCh={formik.handleChange('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                    ) : null}
                    <CustomInput
                        type="password"
                        name='password'
                        label="Escribe tu contraseña"
                        id="pass"
                        val={formik.values.password}
                        onCh={formik.handleChange('password')}
                    />
                    <div className='mb-3 text-end'>
                        <Link to='forgot-password'>
                            Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <button
                        className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5'
                        style={{ background: "#ffd333" }}
                        type='submit'
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;