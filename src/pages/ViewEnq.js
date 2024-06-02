import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAEnquiry } from '../features/enquiry/enquirySlice';
import { BiArrowBack } from 'react-icons/bi';

const ViewEnq = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getEnqId = location.pathname.split("/")[3];
    const enqState = useSelector((state) => state.enquiry);
    const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;
    useEffect(() => {
        dispatch(getAEnquiry(getEnqId));
    }, [getEnqId]);

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <h3 className='mb-4 title'>Número de Consulta</h3>
                <button className='bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1'
                    onClick={goBack}
                >
                    <BiArrowBack className='fs-6' /> Volver
                </button>
            </div>
            <div className='mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3'>
                <div className='d-flex align-items-center gap-3'>
                    <h6 className='mb-0'>Nombre:</h6>
                    <p className='mb-0'>{enqName}</p>
                </div>
                <div className='d-flex align-items-center gap-3'>
                    <h6 className='mb-0'>Telefono:</h6>
                    <p className='mb-0'>
                        <a href={`tel:+54${enqMobile}`}>{enqMobile}</a>
                    </p>
                </div>
                <div className='d-flex align-items-center gap-3'>
                    <h6 className='mb-0'>Email:</h6>
                    <p className='mb-0'>
                        <a href={`mailto:${enqEmail}`}>{enqEmail}</a>
                    </p>
                </div>
                <div className='d-flex align-items-center gap-3'>
                    <h6 className='mb-0'>Comentario:</h6>
                    <p className='mb-0'>{enqComment}</p>
                </div>
                <div className='d-flex align-items-center gap-3'>
                    <h6 className='mb-0'>Estado:</h6>
                    <p className='mb-0'>{enqStatus}</p>
                </div>
                <div className='d-flex align-items-center gap-3'>
                    <h6 className='mb-0'>Cambiar estado:</h6>
                    <div>
                        <select
                            defaultValue={enqStatus ? enqStatus : "Submitted"}
                            className='form-control form-select'
                        >
                            <option value="Submitted">
                                Enviado
                            </option>
                            <option value="Contacted">
                                Contactar
                            </option>
                            <option value="In Progress">
                                En progreso
                            </option>
                            <option value="Resolved">
                                Resuelto
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewEnq;