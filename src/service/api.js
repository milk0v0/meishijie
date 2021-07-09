import axios from 'axios';

class HttpRequest {
  constructor(options) {
    this.defaults = {
      baseUrl: ''
    }

    this.defaults = { ...this.defaults, ...options }
  }
  interceptors(install) {
    install.interceptors.request.use(config => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.authorization = `token ${token}`;
      }

      return config
    }, err => {
      return Promise.reject(err)
    });

    install.interceptors.response.use(res => {
      const { data } = res;

      return data
    }, err => {
      return Promise.reject(err)
    });
  }

  request(options) {
    options = { ...this.defaults, ...options }
    const instance = axios.create(options);
    this.interceptors(instance);
    return instance
  }
}

const http = new HttpRequest({
  baseURL: '/api'
}).request();

// 获取banner数据
export async function getBanner(){
  return await http.get('/banner');
}

/**
 * 拿到用户发布的菜谱，可做筛使用选
 * @export
 * @param {Object} [params] - 不填写，则获取所有的菜谱
 * @param {string} [params.userId] - 指定用户的菜单
 * @param {string} [params.classify] - 按照菜单分类，进行筛选
 * @param {string} [params.property] - 指定菜单属性进行筛选
 * @param {string} [params.property.craft] - 按工艺筛选
 * @param {string} [params.property.flavor] - 按口味筛选
 * @param {string} [params.property.hard] - 按难度筛选
 * @param {string} [params.property.people] - 按人数筛选
 * @param {string} [params.page] - 指定页码
 * @returns
 */
 export async function getMenus(params){
  return await http.get('/menu/query', {params});
}

/**
 * @export
 * @param {Object} params - 
 * @param {string} params.name - 用户名
 * @param {string} params.password - 密码
 * @returns
 */

export async function login(params){
  return await http.post('/user/login', params);
}

/**
 * 获取用户信息
 * @export
 * @param {Object} params - 
 * @param {string} [params.userId] - 用户id
 * @returns
 */
 export async function userInfo(params){
  return await http.post('/user/info', params);
}

/**
 * 账号登出
 */
export async function login_out(){
  return await http.post('/user/login_out');
}

/**
 * 注册账号
 * @export
 * @param {Object} params - 
 * @param {Object} params.name - 用户名
 * @param {Object} params.password - 密码
 * @returns
 */
export async function register(params){
  return await http.post('/user/create', params);
}