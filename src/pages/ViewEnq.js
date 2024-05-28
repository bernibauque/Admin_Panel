import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAEnquiry } from '../features/enquiry/enquirySlice';

const ViewEnq = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const getEnqId = location.pathname.split("/")[3];
    const enqState = useSelector((state) => state.enquiry);
    const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;
    useEffect(() => {
        dispatch(getAEnquiry(getEnqId));
    }, [getEnqId]);

    return (
        <div>
            <h3 className='mb-4 title'>Número de Consulta</h3>
            <div className='mt-5 bg-white p-4 rounded-3'>
                <div className='d-flex align-items-center'></div>
            </div>
        </div>
    );
};

export default ViewEnq;