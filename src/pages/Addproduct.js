import { React, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import Dropzone from 'react-dropzone'
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts, resetState } from "../features/product/productSlice";
import { useNavigate } from 'react-router-dom';

let schema = Yup.object().shape({
    title: Yup.string().required("Es necesario colocar un Titulo."),
    description: Yup.string().required("Es necesario colocar una Descripcion."),
    price: Yup.number().required("Es necesario colocar un Precio."),
    brand: Yup.string().required("Es necesario seleccionar una Marca."),
    category: Yup.string().required("Es necesario seleccionar una Categoria."),
    tags: Yup.string().required("Es necesario agregar Tags."),
    quantity: Yup.number().required("Es necesario colocar una Cantidad."),
});
const Addproduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;
    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Producto agregado con Exito!");
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
    }, [img]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            brand: '',
            category: '',
            tags: "",
            quantity: "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createProducts(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());
            }, 3000);
        },
    });
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        setDesc(e);
    };
    return (
        <div>
            <h3 className='mb-4 title'>Agregar Prodcutos</h3>
            <div>
                <form onSubmit={formik.handleSubmit} className='d-flex gap-3 flex-column'>

                    <CustomInput
                        type='text'
                        label='Ingrese el Titulo del Producto'
                        name='title'
                        onCh={formik.handleChange("title")}
                        onBlr={formik.handleBlur("title")}
                        val={formik.values.title}
                    />
                    <div className='error'>
                        {formik.touched.title && formik.errors.title}
                    </div>

                    <div className=''>
                        <ReactQuill
                            theme='snow'
                            name='description'
                            onChange={formik.handleChange("description")}
                            value={formik.values.description}
                        />
                    </div>
                    <div className='error'>
                        {formik.touched.description && formik.errors.description}
                    </div>

                    <CustomInput
                        type='number'
                        label='Ingrese el Precio del Producto'
                        name='price'
                        onCh={formik.handleChange("price")}
                        onBlr={formik.handleBlur("price")}
                        val={formik.values.price}
                    />
                    <div className='error'>
                        {formik.touched.price && formik.errors.price}
                    </div>

                    <select
                        name='brand'
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                        value={formik.values.brand}
                        className='form-control py-3 mb-3'
                        id=''
                    >
                        <option value=''>Seleccione Marca</option>
                        {brandState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>
                    <div className='error'>
                        {formik.touched.brand && formik.errors.brand}
                    </div>

                    <select
                        name='category'
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                        className='form-control py-3 mb-3'
                        id=''
                    >
                        <option value=''>Seleccione Categoria</option>
                        {catState.map((i, j) => {
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

                    <select
                        name='tags'
                        onChange={formik.handleChange("tags")}
                        onBlur={formik.handleBlur("tags")}
                        value={formik.values.tags}
                        className='form-control py-3 mb-3'
                        id=''
                    >
                        <option value='' disabled>
                            Seleccione Tags
                        </option>
                        <option value='featured'>Featured</option>
                        <option value='popular'>Popular</option>
                        <option value='special'>Especial</option>
                    </select>
                    <div className='error'>
                        {formik.touched.tags && formik.errors.tags}
                    </div>

                    <CustomInput
                        type='number'
                        label='Ingrese Cantidad del Producto'
                        name='quantity'
                        onCh={formik.handleChange("quantity")}
                        onBlr={formik.handleBlur("quantity")}
                        val={formik.values.quantity}
                    />
                    <div className='error'>
                        {formik.touched.quantity && formik.errors.quantity}
                    </div>
                    <div className='bg-white border-1 p-5 text-center'>
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
                    <div className='showimages d-flex flex-wrap gap-3'>
                        {imgState?.map((i, j) => {
                            return (
                                <div className='position-relative' key={j}>
                                    <button
                                        type='button'
                                        onClick={() => dispatch(delImg(i.public_id))}
                                        className='btn-close position-absolute'
                                        style={{ top: '10px', right: '10px' }}
                                    ></button>
                                    <img src={i.url} alt='' width={200} height={200} />
                                </div>
                            );
                        })}

                    </div>
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Agregar Producto
                    </button>
                </form>
            </div>
        </div >
    )
}

export default Addproduct;