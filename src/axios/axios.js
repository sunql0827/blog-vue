import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout=5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//axios.defaults.baseURL ='http://localhost:8080/blog/';
axios.defaults.baseURL ='http://www.sunql.top/blog-1.0.1/blog/';
//'http://www.zhenxueche.com:8080/feesys/'
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(config.method && config.method.toLocaleLowerCase() === 'post'){
    	if(config.data){
    		config.data = qs.stringify(config.data)
    	}
    }
    return config;
  }, function (error) {
    // Do something with request error 
    return Promise.reject(error);
 });
 
// Add a response interceptor 
axios.interceptors.response.use(function (response) {
    return response;
 }, function (error) {
    return Promise.reject(error);
});

export default axios;