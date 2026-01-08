import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";
import navigationConfig from "configs/NavigationConfig";
import ListView from "components/ListView";
import FormDrawer from "components/FormDrawer";
import pagesConfig from "configs/route/pagesConfig";
import Dashboard from "./dashboard";
import CreateRent from "./CreateRent";
import Messages from "./Messages";

export const AppViews = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/dashboard`} component={Dashboard} />
        <Route path={`${APP_PREFIX_PATH}/create-rent`} component={CreateRent} />
        <Route path={`${APP_PREFIX_PATH}/messages`} component={Messages} />
        {navigationConfig[0].submenu
          .filter((config) => !config.role || user[config.role])
          .map((config, key) => {
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
                    endpoint: lv_config.endpoint || config.key,
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
