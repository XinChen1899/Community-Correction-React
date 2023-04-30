import { Route } from "react-router-dom";
import { RouteItem, routeTable } from "./routerTable";

const generateRoute = (routeTable: RouteItem[]) => {
	const routes: React.ReactElement[] = [];
	routeTable.forEach((route: any) => {
		if (route.page.component) {
			routes.push(
				<Route
					key={route.url}
					path={route.url}
					element={<route.page.component />}
				/>
			);
		} else {
			routes.push(<Route key={route.url} path={route.url} />);
		}
		if (route.children && route.children.length) {
			routes.push(...generateRoute(route.children));
		}
	});
	return routes;
};

export const Routers = generateRoute(routeTable);
