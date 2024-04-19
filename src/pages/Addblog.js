import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import RichTextEditor from "react-rte";

const Addblog = () => {
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        console.log(e);
    };
    return (
        <div>
            <h3 className='mb-4'>Agregar Blog</h3>
            <div>
                <form action=''>
                    <CustomInput type='text' label='Ingrese Titulo del Blog' />
                    <select name='' id=''>
                        <option value=''>Seleccione Cat del Blog</option>
                    </select>
                    <RichTextEditor
                        value={this.state.value}
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