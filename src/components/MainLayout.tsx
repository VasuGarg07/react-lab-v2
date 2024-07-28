import Navbar from './Navbar'
import { Outlet, ScrollRestoration } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <ScrollRestoration />
        </>
    )
}

export default MainLayout