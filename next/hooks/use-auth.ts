
import { User, UserRole, UserServiceStatus } from "../lib/modules/user/user.model";
import { useSelector } from "../redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DefaultMenuLinks } from "../lib/helpers/menu.helper";

const useAuth = (context?: string[]): User => {
    const [userReducer] = useSelector(({ userReducer }) => [
        userReducer,
    ]);

    const router = useRouter();

    useEffect(() => {
        if (userReducer.user) {
            const { user } = userReducer;
            // console.log("auth.role", userReducer.user.role);
            if (context) {
                if (context.length > 0) {
                    if (!context.includes(user.role)) {
                        router.push(DefaultMenuLinks.DASHBOARD);
                    }
                } else {
                    router.push(DefaultMenuLinks.DASHBOARD);
                }
                if (userReducer.user.serviceStatus === UserServiceStatus.EXPIRED) {
                    router.push(DefaultMenuLinks.DASHBOARD);
                }
            }
        }
    }, [userReducer.user]);

    return userReducer.user;
};


export default useAuth;