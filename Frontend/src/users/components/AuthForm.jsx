import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../shared/components/context/AuthContext";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: "", password: "", firstName: "", lastName: "" });
    const { setIsAuthenticated } = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const validate = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 4) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // First & Last name (only for register)
        if (!isLogin) {
            if (!formData.firstName.trim()) {
                newErrors.firstName = "First name is required";
            } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
                newErrors.firstName = "First name should contain only letters";
            }

            if (!formData.lastName.trim()) {
                newErrors.lastName = "Last name is required";
            } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
                newErrors.lastName = "Last name should contain only letters";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        if (isLogin) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BACKEND_URL}/user/login`,
                    {
                        email: formData.email,
                        password: formData.password,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true, // allows the backend to send cookies to the frontend and store it in browser 
                        // if this is not included , the browser ignores the cookie 
                    }
                );

                const userData = response.data; // axios automatically parses JSON
                setIsAuthenticated(true);
                navigate(`/`);
            } catch (err) { }

        } else {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BACKEND_URL}/user/register`,
                    {
                        firstname: formData.firstName,
                        lastname: formData.lastName,
                        email: formData.email,
                        password: formData.password,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true, // allows the backend to send cookies to the frontend and store it in browser 
                        // if this is not included , the browser ignores the cookie 
                    }
                );

                const userData = response.data;
                setIsAuthenticated(true);
                navigate(`/`);
            } catch (err) { }
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {isLogin ? "Sign In" : "Create an New Account"}
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label className="block text-gray-700 mb-1">FirstName</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter your FirstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm">{errors.firstName}</p>
                        )}
                    </div>
                )}

                {!isLogin && (
                    <div>
                        <label className="block text-gray-700 mb-1">LastName</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter your LastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName}</p>
                        )}
                    </div>
                )}

                <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-all duration-300"
                >
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>

            <p className="text-center text-gray-600 mt-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                    type="button"
                    onClick={toggleMode}
                    className="text-green-600 font-semibold hover:underline"
                >
                    {isLogin ? "Register" : "Login"}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
