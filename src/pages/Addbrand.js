import { React, useEffect } from 'react';
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createBrand } from '../features/brand/brandSlice';
import { resetState } from '../features/bcategory/bcategorySlice';

let schema = yup.object().shape({
    title: yup.string().required("Es necesario colocar el Nombre de la Marca."),
});

const Addbrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newBrand = useSelector((state) => state.brand);
    const { isSuccess, isError, isLoading, createdBrand } = newBrand;

    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success("Marca agregada con Exito!");
        }
        if (isError) {
            toast.error("Algo salio mal!");
        }
    }, [isSuccess, isError, isLoading]);
    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBrand(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>Agregar Marca</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='text'
                        name='title'
                        onCh={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title}
                        label='Ingrese Marca'
                        id="brand"
                    />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Agregar Marca
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addbrand;