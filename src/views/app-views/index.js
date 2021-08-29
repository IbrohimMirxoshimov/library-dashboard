import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import navigationConfig from "configs/NavigationConfig";
import ListView from "components/ListView/crud/list";
import FormDrawer from "components/FormDrawer";
import pagesConfig from "configs/route/pagesConfig";
import Dashboard from "./dashboard";

export const AppViews = () => {
	return (
		<Suspense fallback={<Loading cover="content" />}>
			<Switch>
				<Route path={`${APP_PREFIX_PATH}/dashboard`} component={Dashboard} />
				{navigationConfig[0].submenu.map((config, key) => {
					let lv_config = pagesConfig[config.key];
					return (
						<Route key={key} path={config.path}>
							<ListView
								columns={
									lv_config?.columns || [
										{
											title: "id",
											key: "id",
											dataIndex: "id",
										},
									]
								}
								resource={{
									name: config.title,
									endpoint: config.key,
								}}
								{...lv_config?.listView}
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
