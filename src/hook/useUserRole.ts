import { useAppSelector } from "../Components/redux/hooks";
import { TUser } from "../redux/auth/authSlice";

 const useUserRole = (): string | null => {
    const user = useAppSelector((state) => state.auth.user);
    if (!user) {
        return null;
    }

    return user.role;
};

export default useUserRole;
