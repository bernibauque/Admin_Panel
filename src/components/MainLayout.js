import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { Layout, Menu, Button, theme } from 'antd';
import { AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser, } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key == "signout") {
                        } else {
                            navigate(key)
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className='fs-4' />,
                            label: 'Panel',
                        },
                        {
                            key: 'customers',
                            icon: <AiOutlineUser className='fs-4' />,
                            label: 'Clientes',
                        },
                        {
                            key: 'Catalog',
                            icon: <AiOutlineShoppingCart className='fs-4' />,
                            label: 'Catalogo',
                            children: [
                                {
                                    key: 'product',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Añadir Producto',
                                },
                                {
                                    key: 'product-list',
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Listado de Productos',
                                },
                                {
                                    key: 'brand',
                                    icon: <SiBrandfolder className='fs-4' />,
                                    label: 'Marca',
                                },
                                {
                                    key: 'list-brand',
                                    icon: <SiBrandfolder className='fs-4' />,
                                    label: 'Lista de Marcas',
                                },
                                {
                                    key: 'category',
                                    icon: <BiCategoryAlt className='fs-4' />,
                                    label: 'Categoria',
                                },
                                {
                                    key: 'list-category',
                                    icon: <BiCategoryAlt className='fs-4' />,
                                    label: 'Lista de Categorias',
                                },
                            ]
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;