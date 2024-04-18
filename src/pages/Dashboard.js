import React from 'react'
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import { Table } from "antd";

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
    data1.push({
        key: i,
        name: `Edward King ${i}`,
        product: 32,
        status: `London, Park Lane no. ${i}`,
    });
}

const Dashboard = () => {
    const data = [
        { type: 'Enero', sales: 35 },
        { type: 'Febrero', sales: 25 },
        { type: 'Marzo', sales: 32 },
        { type: 'Abril', sales: 19 },
        { type: 'Mayo', sales: 22 },
        { type: 'Junio', sales: 65 },
        { type: 'Julio', sales: 41 },
        { type: 'Agosto', sales: 15 },
        { type: 'Septiembre', sales: 25 },
        { type: 'Octubre', sales: 35 },
        { type: 'Noviembre', sales: 85 },
        { type: 'Diciembre', sales: 45 },
    ];
    const config = {
        data,
        xField: "type",
        yField: "sales",
        style: {
            fill: ({ type }) => {
                return "#ffd333";
            }
        },
        label: {
            style: {
                fill: '#FFFFFF',
                opacity: 1,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'Meses',
            },
            sales: {
                alias: 'Ingresos',
            },
        },
    };

    return (
        <div>
            <h3 className='mb-4'>Panel</h3>
            <div className='d-flex justify-content-between align-items-center gap-3'>
                <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3'>
                    <div>
                        <p className=''>Total</p> <h4 className='mb-0'>$1100</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6 className='green'>
                            <BsArrowUpRight /> 62%
                        </h6>
                        <p className='mb-0'>Comparacion con Abril 2023</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3'>
                    <div>
                        <p className=''>Total</p> <h4 className='mb-0'>$1100</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6 className='red'>
                            <BsArrowDownRight /> 12%
                        </h6>
                        <p className='mb-0'>Comparacion con Abril 2023</p>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3'>
                    <div>
                        <p className=''>Total</p> <h4 className='mb-0'>$1100</h4>
                    </div>
                    <div className='d-flex flex-column align-items-end'>
                        <h6 className='green'>
                            <BsArrowUpRight /> 26%
                        </h6>
                        <p className='mb-0'>Comparacion con Abril 2023</p>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <h3 className='mb-4'>Estadística de Ingresos</h3>
                <div>
                    <Column {...config} />
                </div>
            </div>
            <div className='mt-4'>
                <h3 className='mb-4'>Ordenes Recientes</h3>
                <div>
                    <Table columns={columns} dataSource={data1} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
