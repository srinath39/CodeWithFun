import AuthForm from "../components/AuthForm";

const AuthPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-300 via-sky-400 to-sky-500 p-4">
            <div className="w-full">
                <AuthForm />
            </div>
        </div>
    );
};

export default AuthPage;
