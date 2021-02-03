import { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Modal from "react-modal";

import routes from "./routes/index";
import { useDispatch, useSelector } from "react-redux";
import { checkIfLoggedIn } from "common/requests/auth";
import { ACTIONS } from "store/auth/actions";

//TODO implement storage of auth data - see https://github.com/upstatement/react-router-guards

Modal.setAppElement("#root");

const App = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function check() {
      const [loggedIn, user] = await checkIfLoggedIn();

      if (loggedIn) {
        dispatch({ type: ACTIONS.LOGIN_SUCCESS, user: user });
      }
      setChecked(true);
    }
    check();
  }, [dispatch]);

  if (checked) {
    return (
      <Router>
        <div className="w-full">
          <nav
            aria-label="primary"
            class="relative z-20  flex-grow  pb-0 flex flex-row"
          >
            <div class="relative group">
              <button class="items-center px-4 py-4 text-base font-bold text-left uppercase bg-transparent rounded-lg w-full inline mt-0 ml-4 focus:outline-none font-montserrat">
                <span>Catalogs</span>
              </button>
              <div class="absolute z-10 hidden bg-grey-200 group-hover:block">
                <div class="px-2 pt-2 pb-4 bg-white shadow-lg">
                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <Link to={"/products"}>Products (read-only)</Link>
                    </div>
                    <div>
                      <Link to={"/products"}>Products</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative group">
              <button class="items-center px-4 py-4 text-base font-bold text-left uppercase bg-transparent rounded-lg w-full inline mt-0 ml-4 focus:outline-none font-montserrat">
                <span>Second Dropdown</span>
              </button>
              <div class="absolute z-10 hidden bg-grey-200 group-hover:block">
                <div class="px-2 pt-2 pb-4 bg-white shadow-lg">
                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <Link to={"/products"}>Products</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="w-full">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                {routes.map((route, index) =>
                  "public" in route && route.public ? (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      children={<route.main />}
                    />
                  ) : (
                    <PrivateRoute
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      children={<route.main />}
                    />
                  )
                )}
              </Switch>
            </Suspense>
          </div>
        </div>
      </Router>
    );
  } else {
    return null;
  }
};

const PrivateRoute = ({ children, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
