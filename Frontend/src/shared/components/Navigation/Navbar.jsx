import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-gray-900 text-white px-8 py-4 shadow-md sticky top-0 z-50">
            <Link to="/" className="text-2xl font-bold tracking-wide">
                CodeWithFun
            </Link>

            <Link
                to="/auth"
                className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300"
            >
                Sign Up / Log In
            </Link>
        </nav>
    );
};

export default Navbar;
