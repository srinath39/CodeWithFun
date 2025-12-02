import { Link, useNavigate } from "react-router-dom";
import SubmissionType from "../../Utils/SubmissionTypeHelper";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutHandler = async (e) => {
        e.preventDefault();
        await logout();
        navigate("/");
    }
    return (
        <nav className="flex justify-between items-center bg-gray-900 text-white px-8 py-4 shadow-md">
            <Link to="/" className="text-2xl font-bold tracking-wide">
                CodeWithFun
            </Link>

            <div className="flex items-center gap-6">
                {isAuthenticated && (<Link
                    to={`/submissions/${SubmissionType.ALL_MY_SUBMISSIONS}`}
                    className="hover:text-sky-400 transition-all duration-300 font-medium"
                >
                    My Submissions
                </Link>
                )}

                {!isAuthenticated ? (<Link
                    to="/auth"
                    className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300"
                >
                    Sign Up / Log In
                </Link>) : (<button
                    onClick={logoutHandler}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300"
                >
                    Log Out
                </button>)}
            </div>
        </nav>
    );
};

export default Navbar;
