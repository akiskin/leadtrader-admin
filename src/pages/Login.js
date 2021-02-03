import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { getCsrf, login as performLogin } from "common/requests/auth";
import { ACTIONS } from "store/auth/actions";

const Login = () => {
  let history = useHistory();
  let location = useLocation();

  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState(process.env.REACT_APP_TEST_LOGIN);
  const [password, setPassword] = useState(process.env.REACT_APP_TEST_PASSWORD);

  const dispatch = useDispatch();

  const { from } = location.state || { from: { pathname: "/" } };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    await getCsrf();

    const [status, user] = await performLogin(username, password);

    if (status === 200) {
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, user });
      history.replace(from);
    } else {
      //TODO wrong login
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div
        className={
          "flex flex-col border border-gray-100 rounded bg-white py-5 px-10 space-y-5" +
          (isLoading ? " animate-pulse  " : " ")
        }
      >
        <div className="text-2xl">Please, identify yourself</div>
        <div className="flex flex-col">
          <input
            type="text"
            className="border rounded-t h-8 pl-2 border-purple-200"
            placeholder="E-mail"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="password"
            className="border border-t-0 rounded-b h-8 pl-2 border-purple-200"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="flex justify-center h-10 items-center">
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <button
              onClick={login}
              className="w-20 border rounded border-purple-500 px-2 py-1 ring-2"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
