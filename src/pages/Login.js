import React from 'react'
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
    let schema = Yup.object().shape({
        email: Yup.string().
            email("El email debe ser valido").
            required("El email es requerido"),
        password: Yup.string().required("La contraseña es requerida"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
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
                    <div className='error'>
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="password"
                        name='password'
                        label="Escribe tu contraseña"
                        id="pass"
                        val={formik.values.password}
                        onCh={formik.handleChange('password')}
                    />
                    <div className='error'>
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>
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