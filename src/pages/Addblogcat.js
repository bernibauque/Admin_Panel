import { React, useEffect } from 'react';
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createNewblogcat, getABlogCat, resetState, updateABlogCat } from "../features/bcategory/bcategorySlice"

let schema = yup.object().shape({
    title: yup.string().required("Es necesario colocar el Nombre de la Categoria del Blog."),
});

const Addblogcat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogCatId = location.pathname.split('/')[3];
    const newBlogCategory = useSelector((state) => state.bCategory);
    const {
        isSuccess,
        isError,
        isLoading,
        createBlogCategory,
        blogCatName,
        updatedBlogCategory,
    } = newBlogCategory;

    useEffect(() => {
        if (getBlogCatId !== undefined) {
            dispatch(getABlogCat(getBlogCatId));
        } else {
            dispatch(resetState())
        }
    }, [getBlogCatId]);

    useEffect(() => {
        if (isSuccess && createBlogCategory) {
            toast.success("Categoria de Blog agregada con Exito!");
        }
        if (isSuccess && updatedBlogCategory) {
            toast.success("Categoria de Blog modificada con Exito!");
            navigate("/admin/blog-category-list");
        }
        if (isError) {
            toast.error("Algo salio mal!");
        }
    }, [isSuccess, isError, isLoading]);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogCatName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            const data = { id: getBlogCatId, blogCatData: values }
            if (getBlogCatId !== undefined) {
                dispatch(updateABlogCat(data));
                dispatch(resetState());
            } else {
                dispatch(createNewblogcat(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState())
                }, 300);
            }
        },
    });

    return (
        <div>
            <h3 className='mb-4 title'>
                {getBlogCatId !== undefined ? "Editar" : "Agregar"} categoría de blog</h3>
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
                        {getBlogCatId !== undefined ? "Editar" : "Agregar"} categoría de blog
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addblogcat