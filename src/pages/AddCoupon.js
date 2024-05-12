import { React, useEffect } from 'react';
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCoupon, resetState } from '../features/coupon/couponSlice';

let schema = yup.object().shape({
    name: yup.string().required("Es necesario colocar el nombre del cupon."),
    expiry: yup.date().required("Es necesario colocar los datos de caducidad."),
    discount: yup.number().required("Es necesario colocar el porcentaje de descuento."),
});

const AddCoupon = () => {
    const dispatch = useDispatch();
    const newCoupon = useSelector((state) => state.coupon);
    const { isSuccess, isError, isLoading, createdCoupon } = newCoupon;

    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Cupon agregado con Exito!");
        }
        if (isError) {
            toast.error("Algo salio mal!");
        }
    }, [isSuccess, isError, isLoading]);
    const formik = useFormik({
        initialValues: {
            name: "",
            expiry: "",
            discount: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createCoupon(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState);
            }, 3000);
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>Agregar Cupon</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='text'
                        name='name'
                        onCh={formik.handleChange("name")}
                        onBlr={formik.handleBlur("name")}
                        val={formik.values.name}
                        label='Ingrese nombre del Cupon'
                        id="name"
                    />
                    <div className='error'>
                        {formik.touched.name && formik.errors.name}
                    </div>
                    <CustomInput
                        type='date'
                        name='expiry'
                        onCh={formik.handleChange("expiry")}
                        onBlr={formik.handleBlur("expiry")}
                        val={formik.values.expiry}
                        label='Ingrese datos de caducidad'
                        id="date"
                    />
                    <div className='error'>
                        {formik.touched.expiry && formik.errors.expiry}
                    </div>
                    <CustomInput
                        type='number'
                        name='discount'
                        onCh={formik.handleChange("discount")}
                        onBlr={formik.handleBlur("discount")}
                        val={formik.values.discount}
                        label='Ingrese descuento'
                        id="discount"
                    />
                    <div className='error'>
                        {formik.touched.discount && formik.errors.discount}
                    </div>
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Agregar Cupon
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCoupon;