import { Link, useNavigate } from "react-router-dom";
import SubmissionType from "../../Utils/SubmissionTypeHelper";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const logoutHandler = async (e) => {
        e.preventDefault();
        await logout();
        setIsOpen(false);
        navigate("/");
    };

    return (
        <>
            {/* Navbar */}
            <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-4 shadow-md">
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    CodeWithFun
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {isAuthenticated && (
                        <Link
                            to={`/submissions/${SubmissionType.ALL_MY_SUBMISSIONS}`}
                            className="hover:text-sky-400 transition"
                        >
                            My Submissions
                        </Link>
                    )}

                    {!isAuthenticated ? (
                        <Link
                            to="/auth"
                            className="bg-sky-500 hover:bg-sky-600 px-5 py-2 rounded-lg"
                        >
                            Sign Up / Log In
                        </Link>
                    ) : (
                        <button
                            onClick={logoutHandler}
                            className="bg-sky-500 hover:bg-sky-600 px-5 py-2 rounded-lg"
                        >
                            Log Out
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu size={28} />
                </button>
            </nav>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 z-50`}
            >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsOpen(false)}>
                        <X size={28} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex flex-col gap-6 px-6">
                    {isAuthenticated && (
                        <Link
                            to={`/submissions/${SubmissionType.ALL_MY_SUBMISSIONS}`}
                            onClick={() => setIsOpen(false)}
                            className="hover:text-sky-400"
                        >
                            My Submissions
                        </Link>
                    )}

                    {!isAuthenticated ? (
                        <Link
                            to="/auth"
                            onClick={() => setIsOpen(false)}
                            className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg text-center"
                        >
                            Sign Up / Log In
                        </Link>
                    ) : (
                        <button
                            onClick={logoutHandler}
                            className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg"
                        >
                            Log Out
                        </button>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;
