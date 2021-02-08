const token = localStorage.getItem("token");

const headerWithToken = {
  headers: {
    "Content-Type": "Application/json",
    Authorization: `Bearer ${token}`,
    // 'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5OTI1Mjk5NDE5IiwiaXNVc2VyIjp0cnVlLCJleHAiOjQxOTk0OTc5NzgsImlhdCI6MTYwNzQ5Nzk3OH0.1Weet_DCaiwRdQ3489JgWvh2YFRPFhI0DJpGZ1Co_iiCFpUviTf0reg_iKdHW89AzZoPysgd0d7SGExxUSKLTw'
  },
};
export default headerWithToken;
