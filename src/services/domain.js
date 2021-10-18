let domain;
if(process.env.NODE_ENV === "production"){
    domain = "https://sandbox.merchant.vn/note-api";
} else {
    // domain = "http://192.168.1.81:1337";
    domain = "https://sandbox.merchant.vn/note-api";
}
export default domain