import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineBgColors,
} from 'react-icons/ai';
import { ImBlog } from 'react-icons/im';
import { FaClipboard, FaBloggerB } from 'react-icons/fa';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { Layout, Menu, Button, theme } from 'antd';
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
                <div className="logo" >
                    <h2 className='text-white fs-5 text-center py-3 mb-0'>
                        <span className='sm-logo'>GM</span>
                        <span className='lg-logo'>Green Market</span>
                    </h2>

                </div>
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
                                {
                                    key: 'color',
                                    icon: <AiOutlineBgColors className='fs-4' />,
                                    label: 'Color',
                                },
                                {
                                    key: 'list-color',
                                    icon: <AiOutlineBgColors className='fs-4' />,
                                    label: 'Lista de Colores',
                                },
                            ],
                        },
                        {
                            key: 'orders',
                            icon: <FaClipboard className='fs-4' />,
                            label: 'Ordenes',
                        },
                        {
                            key: 'blog',
                            icon: <FaBloggerB className='fs-4' />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: 'blog',
                                    icon: <ImBlog className='fs-4' />,
                                    label: 'Agregar Blog',
                                },
                                {
                                    key: 'blog-list',
                                    icon: <FaBloggerB className='fs-4' />,
                                    label: 'Lista de Blogs',
                                },
                                {
                                    key: 'blog-category',
                                    icon: <ImBlog className='fs-4' />,
                                    label: 'Agregar Categoria Blog',
                                },
                                {
                                    key: 'blog-category-list',
                                    icon: <FaBloggerB className='fs-4' />,
                                    label: 'Lista de categorías de blogs',
                                },
                            ],
                        },
                        {
                            key: 'enquiries',
                            icon: <FaClipboard className='fs-4' />,
                            label: 'Consultas',
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
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;