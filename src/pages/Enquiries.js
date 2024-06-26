import React, { useEffect, useState } from 'react'
import { Table } from "antd";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { deleteAEnquiry, getEnquiries, resetState, updateAEnquiry } from '../features/enquiry/enquirySlice';
import CustomModal from '../components/CustomModal';

const columns = [
    {
        title: 'Numero',
        dataIndex: 'key',
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Telefono',
        dataIndex: 'mobile',
    },
    {
        title: 'Estado',
        dataIndex: 'status',
    },
    {
        title: 'Accion',
        dataIndex: 'action',
    },
];

const Enquiries = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [enqId, setenqId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setenqId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    useEffect(() => {
        dispatch(resetState());
        dispatch(getEnquiries());
    }, []);
    const enqState = useSelector((state) => state.enquiry.enquiries);
    const data1 = [];
    for (let i = 0; i < enqState.length; i++) {
        data1.push({
            key: i + 1,
            name: enqState[i].name,
            email: enqState[i].email,
            mobile: enqState[i].mobile,
            status: (
                <>
                    <select
                        defaultValue={enqState[i].status ? enqState[i].status : "Submitted"}
                        className='form-control form-select'
                        id=""
                        onChange={(e) => setEnquiryStatus(e.target.value, enqState[i]._id)}
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
                </>
            ),
            action: (
                <>
                    <Link
                        className='ms-3 fs-3 text-danger'
                        to={`/admin/enquiries/${enqState[i]._id}`}
                    >
                        <AiOutlineEye />
                    </Link>
                    <button
                        className='ms-3 fs-3 text-danger bg-transparent border-0'
                        onClick={() => showModal(enqState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }
    const setEnquiryStatus = (e, i) => {
        console.log(e, i);
        const data = { id: i, enqData: e };
        dispatch(updateAEnquiry(data));
    };
    const deleteEnq = (e) => {
        dispatch(deleteAEnquiry(e))
        setOpen(false);
        setTimeout(() => {
            dispatch(getEnquiries());
        }, 100);
    };
    return (
        <div>
            <h3 className='mb-4 title'>Consultas</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteEnq(enqId);
                }}
                title='Estas seguro de que deseas eliminar esta Consulta?'
            />
        </div>
    )
}

export default Enquiries