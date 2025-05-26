declare global {
  /** access_token của app */
  var access_token: string | null
  /**dữ liệu cấu hình của môi trường hiện tại */
  var $env: Env
  /**NODE_ENV hiện tại */
  var $node_env: string
  
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}
export default global
