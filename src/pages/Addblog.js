import React, { useState } from 'react';
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
                    <div className='mt-4'>
                        <CustomInput type='text' label='Ingrese Titulo del Blog' />
                    </div>
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