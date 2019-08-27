import fetch from 'utils/fetch';
import axiosService from '@/utils/axiosService';

/**
 * 用户名登录
 * @param username
 * @param password
 * @returns {*|boolean|AxiosPromise}
 */
export function loginByUserName(username, password) {
  const data = {
    username,
    password
  };
  return axiosService.getService().post('/Admin/Auth/login',data);
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

