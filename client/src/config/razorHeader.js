// const username = "rzp_live_VMGLEhEd6uLVJm";
// const password = "y3NEE7Eb12whbSSjdlLLbBR2";

const username = "rzp_test_LkGyvMQnSFDTBu";
const password = "plReqYFenjeSYL2waLPPwKmy";

const token = Buffer.from(`${username}:${password}`, "utf8").toString("base64");
const Header = {
    'Authorization': `Basic ${token}`,
    'Accept': '*/*',
    'Content-Type': 'application/json',
};
export default Header;
