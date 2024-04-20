import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Addblog = () => {
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        console.log(e);
    };
    return (
        <div>
            <h3 className='mb-4'>Agregar Blog</h3>
            <div className=''>
                <form action=''>
                    <CustomInput type='text' label='Ingrese Titulo del Blog' />
                    <select name='' id=''>
                        <option value=''>Seleccione Categoria del Blog</option>
                    </select>
                    <ReactQuill
                        theme='snow'
                        value={desc}
                        onChange={(evt) => {
                            handleDesc(evt.target.value);
                        }}
                    />
                </form>
            </div>
        </div>
    )
}

export default Addblog