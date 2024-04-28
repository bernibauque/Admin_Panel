import { React, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';

let schema = Yup.object().shape({
    title: Yup.string().required("El Titulo es requerido"),
    description: Yup.string().required("La Descripcion es requerida"),
    price: Yup.number().required("El Precio es requerido"),
});
const Addproduct = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            alert(JSON.stringify(values));
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
                            onBlur={formik.handleBlur("description")}
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
                        onChange={formik.handleChange("price")}
                        onBlur={formik.handleBlur("price")}
                        value={formik.values.price}
                    />
                    <div className='error'>
                        {formik.touched.price && formik.errors.price}
                    </div>
                    <select name='' className='form-control py-3 mb-3' id=''>
                        <option value=''>Seleccione Marca</option>
                        {brandState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>

                    <select name='' className='form-control py-3 mb-3' id=''>
                        <option value=''>Seleccione Categoria</option>
                        {catState.map((i, j) => {
                            return (
                                <option key={j} value={i.title}>
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>

                    <CustomInput type='number' label='Ingrese Cantidad del Producto' />

                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Agregar Producto
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addproduct;