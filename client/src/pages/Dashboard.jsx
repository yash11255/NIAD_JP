import { useContext, useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {

    const navigate = useNavigate()
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768) // Default open for large screens

    // Logout function
    const logout = () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }

    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/manage-jobs')
        }

        // Close sidebar on smaller screens
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth > 768)
        }
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [companyData, navigate])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            
            {/* Navbar */}
            <nav className="bg-white shadow-md py-4 px-5 flex justify-between items-center">
                {/* Sidebar Toggle Button (Mobile) */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    className="md:hidden text-gray-700 hover:text-gray-900 transition">
                    ☰
                </button>

                <img 
                    onClick={() => navigate('/')} 
                    className="max-sm:w-32 cursor-pointer transition-transform hover:scale-105" 
                    src={assets.logo} 
                    alt="Logo" 
                />
                
                {companyData && (
                    <div className="flex items-center gap-4">
                        <p className="max-sm:hidden font-semibold text-gray-700">Welcome, {companyData.name}</p>
                        <div className="relative group">
                            <img 
                                className="w-10 h-10 border rounded-full cursor-pointer object-cover" 
                                src={companyData.image || assets.default_company_logo} 
                                alt="Company" 
                            />
                            <div className="absolute hidden group-hover:block top-12 right-0 z-10 text-black rounded-md bg-white border shadow-lg">
                                <ul className="list-none m-0 p-2 text-sm">
                                    <li 
                                        onClick={logout} 
                                        className="py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-md transition">
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            <div className="flex flex-1">
                
                {/* Sidebar (Collapsible in Mobile) */}
                <aside className={`fixed md:relative z-50 bg-white border-r shadow-md transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0 md:w-64'} min-h-screen overflow-hidden md:block`}>
                    <ul className="flex flex-col pt-5 text-gray-800">
                        
                        <SidebarItem 
                            to="/dashboard/add-job"
                            icon={assets.add_icon}
                            label="Add Job"
                            isSidebarOpen={isSidebarOpen}
                        />
                        
                        <SidebarItem 
                            to="/dashboard/manage-jobs"
                            icon={assets.home_icon}
                            label="Manage Jobs"
                            isSidebarOpen={isSidebarOpen}
                        />
                        
                        <SidebarItem 
                            to="/dashboard/view-applications"
                            icon={assets.person_tick_icon}
                            label="View Applications"
                            isSidebarOpen={isSidebarOpen}
                        />

                    </ul>
                </aside>

                {/* Main Content */}
                <main className="flex-1 h-full p-4 sm:p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    )
}

/**
 * Sidebar Navigation Item Component
 */
const SidebarItem = ({ to, icon, label, isSidebarOpen }) => {
    return (
        <NavLink 
            to={to} 
            className={({ isActive }) => 
                `flex items-center p-4 sm:px-6 gap-3 w-full transition-all duration-200
                 ${isActive ? 'bg-blue-500 text-white border-r-4 border-blue-700' : 'hover:bg-gray-200'}`
            }>
            <img className="w-5" src={icon} alt="" />
            {isSidebarOpen && <p className="transition-opacity">{label}</p>}
        </NavLink>
    )
}

export default Dashboard