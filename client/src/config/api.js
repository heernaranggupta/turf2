// const api = "http://ec2-13-126-112-36.ap-south-1.compute.amazonaws.com:8080/";
const api = "http://ec2-13-234-161-66.ap-south-1.compute.amazonaws.com:8080/";
// const api = "http://192.168.29.120:8080/";
// const api = process.env.REACT_APP_API_URL;
export const TurfMail = process.env.REACT_APP_MAIL_URL;
export default api;

// server {
//     listen 80;
//     server_name http://rebounce-admin.qwertyvate.com  *rebounce-admin.qwertyvate.com;
//     location / {
//         proxy_pass http://18.219.80.22:3001;
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_cache_bypass $http_upgrade;
//     }
// }


// server {
//     listen 80;
//     server_name www.rebounce-admin.qwertyvate.com;
//     return 301 $scheme://rebounce-admin.qwertyvate.com$request_uri;
// }
// server {
//     listen 80;

//     server_name rebounce-admin.qwertyvate.com;

//     location / {
//         proxy_pass http://18.219.80.22:3001;
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_cache_bypass $http_upgrade;
//     }
// }