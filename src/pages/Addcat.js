import React from 'react';
import CustomInput from "../components/CustomInput";

const Addcat = () => {
    return (
        <div>
            <h3 className='mb-4'>Agregar categoría</h3>
            <div>
                <form action=''>
                    <CustomInput type='text' label='Ingrese categoría' />
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Agregar categoría
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addcat