import { useState } from "react";

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: "", password: "", firstName: "", lastName: "" });

    const toggleMode = () => setIsLogin(!isLogin);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                const responseData = await fetch(
                    'http://localhost:3000/user/login',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: formData.email,
                            password: formData.password,
                        }),
                    }
                );
                const userData = await responseData.json();
                if (!responseData.ok) {
                    throw new Error(dataFetched.message | "User was not not logged In");
                }
                console.log(userData.userId, userData.token);
            } catch (err) { }

        } else {
            try {
                const responseData = await fetch(
                    'http://localhost:3000/user/register',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            firstname: formData.firstName,
                            lastname: formData.lastName,
                            email: formData.email,
                            password: formData.password,
                        }),
                    }
                );
                const userData = await responseData.json();
                if (!responseData.ok) {
                    throw new Error(dataFetched.message | "User was not not logged In");
                }
                console.log(userData.userId, userData.token);
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
