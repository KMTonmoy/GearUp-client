import { useAppSelector } from "../Components/redux/hooks";

const useUserRole = (): { email: string | null, role: string | null } => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return { email: null, role: null };
    }

    return {
        email: user.email,
        role: user.role
    };
};

export default useUserRole;
