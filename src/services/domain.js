let domain;
if(process.env.NODE_ENV === "production"){
    domain = "";
} else {
    domain = "http://192.168.1.81:1337";
}
export default domain