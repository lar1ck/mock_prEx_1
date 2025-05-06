import { Link, useNavigate } from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/auth-page')
    }
    return (
        <div className="flex gap-4 py-2 justify-between items-center px-5">
            <div className="flex gap-4 ">
                <Link to='/view-trades'>Trades</Link>
                <Link to='/view-trainees'>Trainees</Link>
                <Link to='/view-modules'>Modules</Link>
                <Link to='/view-marks'>Marks</Link>
            </div>
            <div >
                <button onClick={handleLogOut} className="border border-gray-400 px-4 py-1 rounded-xl hover:bg-red-500 hover:text-white font-bold duration-300 hover:cursor-pointer hover:border-red-400 ">
                    Logout
                </button>
            </div>
        </div>
    )
}

export default NavBar