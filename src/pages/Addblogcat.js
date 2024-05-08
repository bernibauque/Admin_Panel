import { React, useEffect } from 'react';
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createNewblogcat, resetState } from "../features/bcategory/bcategorySlice"

let schema = yup.object().shape({
    title: yup.string().required("Es necesario colocar el Nombre de la Categoria del Blog."),
});

const Addblogcat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newBlogCategory = useSelector((state) => state.bCategory);
    const { isSuccess, isError, isLoading, createBlogCategory } = newBlogCategory;

    useEffect(() => {
        if (isSuccess && createBlogCategory) {
            toast.success("Categoria de Blog agregada con Exito!");
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
            dispatch(createNewblogcat(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState())
                navigate('/admin/blog-category-list');
            }, 3000);
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>Agregar categoría de blog</h3>
            <div>
                <form action='' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type='text'
                        name='title'
                        onCh={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title}
                        label='Ingrese la categoria deb Blog'
                        id="blogcat"
                    />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Agregar categoría de blog
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addblogcat