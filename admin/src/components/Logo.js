import React from "react";

import logoImg from "../images/logo.png";

const Logo = (props) => {
  return <img alt="Logo" src={logoImg} style={{ height: 50 }} {...props} />;
};

export default Logo;
