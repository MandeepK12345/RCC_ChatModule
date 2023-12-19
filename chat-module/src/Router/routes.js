import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import VerifyAccount from "../pages/VerifyAccount";
import Dashboard from "../pages/Dashboard";

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
