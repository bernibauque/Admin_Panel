import { React, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from 'react-dropzone'
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { createBlogs, getABlog, updateABlog } from "../features/blogs/blogSlice";
import { getCategories, resetState } from "../features/bcategory/bcategorySlice"

let schema = Yup.object().shape({
    title: Yup.string().required("Es necesario colocar un Titulo."),
    description: Yup.string().required("Es necesario colocar una Descripcion."),
    category: Yup.string().required("Es necesario seleccionar una Categoria."),
});

const Addblog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[3];
    const imgState = useSelector((state) => state.upload.images);
    const bCatState = useSelector((state) => state.bCategory.bCategories);
    const blogState = useSelector((state) => state.blogs);
    const {
        isSuccess,
        isError,
        isLoading,
        createdBlog,
        blogName,
        blogDesc,
        blogCategory,
        blogImages,
        updatedBlog,
    } = blogState;

    useEffect(() => {
        if (getBlogId !== undefined) {
            dispatch(getABlog(getBlogId));
            img.push(blogImages)
        } else {
            dispatch(resetState());
        }
    }, [getBlogId]);

    useEffect(() => {
        dispatch(resetState());
        dispatch(getCategories());
    }, []);

    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success("Blog agregado con Exito!");
        }
        if (isSuccess && updatedBlog) {
            toast.success("Blog modificado con Exito!");
            navigate('/admin/blog-list')
        }
        if (isError) {
            toast.error("Algo salió mal!");
        }
    }, [isSuccess, isError, isLoading]);

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        formik.values.images = img;
    }, [blogImages]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogName || "",
            description: blogDesc || "",
            category: blogCategory || "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBlogId !== undefined) {
                const data = { id: getBlogId, blogData: values };
                dispatch(updateABlog(data));
                dispatch(resetState());
            } else {
                dispatch(createBlogs(values));
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
                {getBlogId !== undefined ? "Editar" : "Agregar"} Blog
            </h3>

            <div className=''>
                <form action='' onSubmit={formik.handleSubmit}>
                    <div className='mt-4'>
                        <CustomInput
                            type='text'
                            label='Ingrese Titulo del Blog'
                            name='title'
                            onCh={formik.handleChange("title")}
                            onBlr={formik.handleBlur("title")}
                            val={formik.values.title} />
                    </div>
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <select
                        name='category'
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className='form-control py-3 mt-3'
                        id=''
                    >
                        <option value=''>Seleccione Categoria del Blog</option>
                        {bCatState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>
                    <div className='error'>
                        {formik.touched.category && formik.errors.category}
                    </div>
                    <ReactQuill
                        theme='snow'
                        className='mt-3'
                        name='description'
                        onChange={formik.handleChange("description")}
                        value={formik.values.description}
                    />
                    <div className='error'>
                        {formik.touched.description && formik.errors.description}
                    </div>
                    <div className='bg-white border-1 p-5 text-center mt-3'>
                        <Dropzone
                            onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Arrastre y suelte algunos archivos aquí o haga clic para seleccionar archivos</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        {getBlogId !== undefined ? "Editar" : "Agregar"} Blog
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addblog