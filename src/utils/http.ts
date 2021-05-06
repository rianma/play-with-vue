import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import Vue from 'vue';

const defaultErrorMsg = '网络请求失败';

const defaultAxiosConfig: AxiosRequestConfig = {
  baseURL: 'https://httpbin.org/',
  // 查询对象序列化函数
  paramsSerializer(params) {
    return qs.stringify(params);
  },
  // 超时设置
  timeout: 10000,
  // withCredentials: true,
  responseType: 'json',

  // 下传和下载进度回调
  onUploadProgress(progressEvent: ProgressEvent) {
    return Math.round((progressEvent.loaded * 100) / progressEvent.total);
  },
  onDownloadProgress(progressEvent: ProgressEvent) {
    return Math.round((progressEvent.loaded * 100) / progressEvent.total);
  },

  // 自定义错误状态码范围，仅 20x 被认为是正确的
  validateStatus(status: number) {
    return status >= 200 && status < 300;
  },
};

const instance = axios.create(defaultAxiosConfig);

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.method?.toLowerCase() === 'post') {
      Object.assign(config.headers, { 'Content-Type': 'application/json' });
      Object.assign(config, { data: JSON.stringify(config.data) });
    }
    return config;
  },
  (error) => {
    console.error('send-request-failed', error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    debugger;
    const { data } = res;
    if (!data) {
      console.error('bizlogic-empty-data', defaultErrorMsg);
      Vue.toasted.error(`bizlogic-empty-data: ${defaultErrorMsg}`);
      // MARK1
      return Promise.reject(res);
    }
    // code === '200', data.msg 是为了兼容mws接口
    if (data.code === 0 || data.code === '200') {
      return data;
    }
    const msg = data.message || data.msg || defaultErrorMsg;
    console.error('bizlogic-failure-code', msg);
    Vue.toasted.error(`bizlogic-failure-code: ${msg}`);
    // MARK2
    return Promise.reject(res);
  },

  // 当且仅当 HTTP 状态码不等于 20x 时
  (error) => {
    /**
     * Q: 何时执行？
     * A: ...
     */
    // 如果error.response不存在，通常因为请求超时被axios取消，axios会提供一个较友好的文案提示，即error.message
    if (!error.response) {
      const msg = error.message;
      console.error('axios-rejected-empty-response', msg);
      Vue.toasted.error(`axios-rejected-empty-response: ${msg}`);
      // MARK3
      return Promise.reject(msg);
    }

    // 如果 error.response 存在
    const errMsg = error.response.data && error.response.data.message
      ? error.response.data.message
      : `${error.response.status} ${error.response.statusText}`;

    console.error('axios-rejected-response-data', errMsg);
    Vue.toasted.error(`axios-rejected-response-data: ${errMsg}`);
    // MARK4
    return Promise.reject(error.response);
  },
);

export default instance;
