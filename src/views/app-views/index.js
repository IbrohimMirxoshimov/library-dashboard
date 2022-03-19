import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import navigationConfig from "configs/NavigationConfig";
import ListView from "components/ListView";
import FormDrawer from "components/FormDrawer";
import pagesConfig from "configs/route/pagesConfig";
import Dashboard from "./dashboard";
import CreateRent from "./CreateRent";

export const AppViews = () => {
	return (
		<Suspense fallback={<Loading cover="content" />}>
			<Switch>
				<Route path={`${APP_PREFIX_PATH}/dashboard`} component={Dashboard} />
				<Route path={`${APP_PREFIX_PATH}/create-rent`} component={CreateRent} />
				{navigationConfig[0].submenu.map((config, key) => {
					let lv_config = pagesConfig[config.key];

					if (!lv_config) {
						return "";
					}
					return (
						<Route key={key} path={config.path}>
							<ListView
								resource={{
									name: lv_config.name,
									nameOne: lv_config.nameOne,
									endpoint: config.key,
								}}
								{...lv_config}
							/>
						</Route>
					);
				})}
				<Redirect to={`${APP_PREFIX_PATH}/dashboard`} />
			</Switch>
			<FormDrawer />
		</Suspense>
	);
};

export default React.memo(AppViews);
