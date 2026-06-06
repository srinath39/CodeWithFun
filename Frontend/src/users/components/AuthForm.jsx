import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../shared/components/context/AuthContext";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: "", password: "", firstName: "", lastName: "" });
    const { setIsAuthenticated } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setTouched({});
        setPasswordStrength(0);
        setIsLoading(false);
        setFormError("");
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Real-time validation
        if (touched[name]) {
            validateField(name, value);
        }
        
        // Calculate password strength
        if (name === "password") {
            calculatePasswordStrength(value);
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({ ...touched, [name]: true });
        validateField(name, formData[name]);
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[!@#$%^&*]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };

        switch (name) {
            case "email":
                if (!value.trim()) {
                    newErrors.email = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.email = "Invalid email format (e.g., user@example.com)";
                } else {
                    delete newErrors.email;
                }
                break;
            
            case "password":
                if (!value) {
                    newErrors.password = "Password is required";
                } else if (value.length < 6) {
                    newErrors.password = "Password must be at least 6 characters";
                } else {
                    delete newErrors.password;
                }
                break;
            
            case "firstName":
                if (!value.trim()) {
                    newErrors.firstName = "First name is required";
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    newErrors.firstName = "First name should contain only letters";
                } else if (value.trim().length < 5) {
                    newErrors.firstName = "First name must be at least 5 characters";
                } else {
                    delete newErrors.firstName;
                }
                break;
            
            case "lastName":
                if (!value.trim()) {
                    newErrors.lastName = "Last name is required";
                } else if (!/^[A-Za-z\s]+$/.test(value)) {
                    newErrors.lastName = "Last name should contain only letters";
                } else if (value.trim().length < 5) {
                    newErrors.lastName = "Last name must be at least 5 characters";
                } else {
                    delete newErrors.lastName;
                }
                break;
            
            default:
                break;
        }

        setErrors(newErrors);
    };

    const validate = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format (e.g., user@example.com)";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        // First & Last name (only for register)
        if (!isLogin) {
            if (!formData.firstName.trim()) {
                newErrors.firstName = "First name is required";
            } else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {
                newErrors.firstName = "First name should contain only letters";
            } else if (formData.firstName.trim().length < 5) {
                newErrors.firstName = "First name must be at least 5 characters";
            }

            if (!formData.lastName.trim()) {
                newErrors.lastName = "Last name is required";
            } else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) {
                newErrors.lastName = "Last name should contain only letters";
            } else if (formData.lastName.trim().length < 5) {
                newErrors.lastName = "Last name must be at least 5 characters";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setFormError("");
        setIsLoading(true);

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
            } catch (err) {
                setIsLoading(false);
                const errorMessage = err.response?.data?.message || err.message || "Login failed. Please try again.";
                setFormError(errorMessage);
            }

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
            } catch (err) {
                setIsLoading(false);
                const errorMessage = err.response?.data?.message || err.message || "Registration failed. Please try again.";
                setFormError(errorMessage);
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                {isLogin ? "Sign In" : "Create an New Account"}
            </h2>

            {formError && (
                <div className="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                        <p className="text-red-800 font-medium text-sm">{formError}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setFormError("")}
                        className="text-red-400 hover:text-red-600 transition"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}

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
                            onBlur={handleBlur}
                            required
                            className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                errors.firstName && touched.firstName
                                    ? "border-red-500 focus:ring-red-400 bg-red-50"
                                    : "border-gray-300 focus:ring-green-500"
                            }`}
                        />
                        {errors.firstName && touched.firstName && (
                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
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
                            onBlur={handleBlur}
                            required
                            className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                errors.lastName && touched.lastName
                                    ? "border-red-500 focus:ring-red-400 bg-red-50"
                                    : "border-gray-300 focus:ring-green-500"
                            }`}
                        />
                        {errors.lastName && touched.lastName && (
                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
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
                        onBlur={handleBlur}
                        required
                        className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.email && touched.email
                                ? "border-red-500 focus:ring-red-400 bg-red-50"
                                : "border-gray-300 focus:ring-green-500"
                        }`}
                    />
                    {errors.email && touched.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                        onBlur={handleBlur}
                        required
                        className={`w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                            errors.password && touched.password
                                ? "border-red-500 focus:ring-red-400 bg-red-50"
                                : "border-gray-300 focus:ring-green-500"
                        }`}
                    />
                    {errors.password && touched.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                    
                    {!isLogin && formData.password && (
                        <div className="mt-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Strength:</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-2 w-6 rounded transition-colors ${
                                                passwordStrength >= level
                                                    ? passwordStrength <= 2
                                                        ? "bg-red-500"
                                                        : passwordStrength <= 3
                                                        ? "bg-yellow-500"
                                                        : "bg-green-500"
                                                    : "bg-gray-200"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Use uppercase, lowercase, numbers, and special characters for a stronger password
                            </p>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105 active:scale-95 ${
                        isLoading
                            ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed shadow-md"
                            : isLogin 
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/50"
                            : "bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-emerald-500/50"
                    }`}
                >
                    {isLoading && (
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    )}
                    <span className="tracking-wide">
                        {isLoading ? (isLogin ? "Logging in..." : "Registering...") : (isLogin ? "Login" : "Register")}
                    </span>
                </button>
            </form>

            <p className="text-center text-gray-700 mt-6 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                    type="button"
                    onClick={toggleMode}
                    className={`font-bold transition-all duration-300 hover:opacity-80 ${
                        isLogin 
                            ? "text-emerald-600 hover:text-emerald-700" 
                            : "text-blue-600 hover:text-blue-700"
                    }`}
                >
                    {isLogin ? "Sign Up" : "Login"}
                </button>
            </p>
        </div>
    );
};

export default AuthForm;
