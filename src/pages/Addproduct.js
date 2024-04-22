import { React, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
    name: "file",
    multiple: true,
    action: "http://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};
const Addproduct = () => {
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        setDesc(e);
    };
    return (
        <div>
            <h3 className='mb-4 title'>Agregar Prodcutos</h3>
            <div>
                <form>
                    <CustomInput type='text' label='Ingrese el Titulo del Producto' />
                    <div className='mb-3'>
                        <ReactQuill
                            theme='snow'
                            value={desc}
                            onChange={(evt) => {
                                handleDesc(evt);
                            }}
                        />
                    </div>
                    <CustomInput type='number' label='Ingrese el Precio del Producto' />
                    <select name='' className='form-control py-3 mb-3' id=''>
                        <option value=''>Seleccione Marca</option>
                    </select>
                    <select name='' className='form-control py-3 mb-3' id=''>
                        <option value=''>Seleccione Categoria</option>
                    </select>
                    <select name='' className='form-control py-3 mb-3' id=''>
                        <option value=''>Seleccione Color</option>
                    </select>
                    <CustomInput type='number' label='Ingrese Cantidad del Producto' />
                    <Dragger {...props}>
                        <p className='ant-upload-drag-icon'>
                            <InboxOutlined />
                        </p>
                        <p className='ant-upload-text'>
                            Haga Click o arrastre el archivo a esta área para cargarlo.
                        </p>
                        <p className='ant-upload-hint'>
                            Soporte para una carga única o masiva. Prohibido estrictamente
                            cargar datos de la empresa u otros archivos privados.
                        </p>
                    </Dragger>
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