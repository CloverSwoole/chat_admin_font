
import axios from 'axios';
import Qs from 'qs';

/**
 *
 * @type {{createService: axiosService.createService, getService: axiosService.getService}}
 */
const axiosService = {
    createService:()=>{

    },
    getService:()=>{
        return axios.create({
            baseURL: 'http://127.0.0.1:9501/',
            timeout: 20000,
            withCredentials: true,
            /**
             * 数据格式
             */
            transformRequest: [function (data) {
                data = JSON.stringify(data);
                return data;
            }],
            /**
             * 协议头
             */
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
/**
 * 导出
 */
export default axiosService;
