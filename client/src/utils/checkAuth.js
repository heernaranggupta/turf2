import { useContext } from "react";
import jwt_decode from "jwt-decode";
import { Context } from "../data/context";

const CheckAuth = async () => {
  const {
    setIsLoggedIn,
    setCartId,
    setUserData,
    setIsLoading,
    setToken,
  } = useContext(Context);

  setIsLoading(true);
  var data = await localStorage.getItem("turfUserDetails");
  var token = await localStorage.getItem("token");
  const cartLocalId = localStorage.getItem("turfCart");

  data = JSON.parse(data);
  if (token) {
    var decoded = await jwt_decode(token);
    if (decoded.exp > Date.now() && data !== null) {
      setToken(token);
      setIsLoggedIn(true);
      setUserData({ ...data });
    } else {
      setIsLoggedIn(false);
      setUserData(null);
      setToken(null);
      localStorage.clear();
    }
  } else {
    setIsLoggedIn(false);
    setUserData(null);
    setToken(null);
    localStorage.clear();
  }

  setCartId(() => (cartLocalId ? cartLocalId : null));
  setIsLoading(false);
};

export default CheckAuth;
