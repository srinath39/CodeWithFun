import AuthForm from "../components/AuthForm";

const AuthPage = () => {
    return (
        <div className="min-h-screen flex justify-center pt-10 bg-linear-to-br bg-gray-100 p-4">
            <div className="w-full">
                <AuthForm />
            </div>
        </div>
    );
};

export default AuthPage;
