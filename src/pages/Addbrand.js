import { React, useEffect } from 'react';
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
    createBrand,
    getABrand,
    resetState,
    updateABrand,
} from '../features/brand/brandSlice';

let schema = yup.object().shape({
    title: yup.string().required("Es necesario colocar el Nombre de la Marca."),
});

const Addbrand = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getBrandId = location.pathname.split("/")[3];
    const newBrand = useSelector((state) => state.brand);
    const {
        isSuccess,
        isError,
        isLoading,
        createdBrand,
        brandName,
        updatedBrand
    } = newBrand;
    useEffect(() => {
        if (getBrandId !== undefined) {
            dispatch(getABrand(getBrandId));
        } else {
            dispatch(resetState());
        }
    }, [getBrandId]);

    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success("Marca agregada con Exito!");
        }
        if (isSuccess && updatedBrand) {
            toast.success("Marca modificada con Exito!");
            navigate('/admin/list-brand');
        }
        if (isError) {
            toast.error("Algo salio mal!");
        }
    }, [isSuccess, isError, isLoading]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: brandName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBrandId !== undefined) {
                const data = { id: getBrandId, brandData: values };
                dispatch(updateABrand(data));
                dispatch(resetState());
            } else {
                dispatch(createBrand(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 300);
            }
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>
                {getBrandId !== undefined ? "Editar" : "Agregar"} Marca
            </h3>
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
                        {getBrandId !== undefined ? "Editar" : "Agregar"} Marca
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addbrand;