import { useAppDispatch } from "../Components/redux/hooks";
import { TUser, setUser } from "../Components/redux/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useLoginMutation } from "../Components/redux/auth/authApi";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const defaultValues = {
        email: "",
        password: "",
    };

    const [login] = useLoginMutation();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;

        const toastId = toast.loading("Logging in...");

        try {
            const userInfo = { email, password };
            const res = await login(userInfo).unwrap();
            console.log(res)
            if (res.success) {
                const user = verifyToken(res.data.token) as TUser;
                dispatch(setUser({ user, token: res.data.token }));
                toast.success(res.message || "Logged in successfully", { id: toastId, duration: 2000 });
                console.log(user.role)
                if (res.data.needsPasswordChange) {
                    navigate(`/change-password`);
                } else {
                    navigate(`/`);
                }
            } else {
                toast.error(res.message || "Something went wrong", { id: toastId, duration: 2000 });
            }
        } catch (err) {
            toast.error(err?.data?.message || "Something went wrong", { id: toastId, duration: 2000 });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-4">Login to Your Account</h2>

                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={defaultValues.email}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            defaultValue={defaultValues.password}
                            required
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-indigo-600 hover:text-indigo-800">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Login;
