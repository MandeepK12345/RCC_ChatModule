import Login from "../pages/login";
import Signup from "../pages/signUp";
import VerifyAccount from "../pages/verifyAccount";
import Dashboard from "../pages/dashboard";

const routesPath = {
	LOGIN: "/",
	DASHBOARD: "/dashboard",
	SIGNUP: "/signup",
	VERIFY: "/verify-account",
};

const pageRoutes = [
	{
		name: "Login",
		path: routesPath.LOGIN,
		Component: Login,
	},
	{
		name: "Signup",
		path: routesPath.SIGNUP,
		Component: Signup,
	},
	{
		name: "verifyAccount",
		path: routesPath.VERIFY,
		Component: VerifyAccount,
	},
	{
		name: "Dashboard",
		path: routesPath.DASHBOARD,
		Component: Dashboard,
	},
];

export { pageRoutes, routesPath };
