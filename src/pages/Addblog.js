import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Addblog = () => {
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        setDesc(e);
    };
    return (
        <div>
            <h3 className='mb-4'>Agregar Blog</h3>
            <div className=''>
                <form action=''>
                    <CustomInput type='text' label='Ingrese Titulo del Blog' />
                    <select name='' className='form-control py-3 mb-3' id=''>
                        <option value=''>Seleccione Categoria del Blog</option>
                    </select>
                    <ReactQuill
                        theme='snow'
                        value={desc}
                        onChange={(evt) => {
                            handleDesc(evt);
                        }}
                    />
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Agregar Blog
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addblog