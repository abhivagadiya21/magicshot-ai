import { Outlet } from "react-router-dom"
import Header from '../components/Heading/Heading.jsx';

function MainLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}
export default MainLayout