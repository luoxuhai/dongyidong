import { request } from '@/libs/utils';
import { BASE_URL } from '@/libs/config';

const messageNewsUrl = BASE_URL + '/client/messageNews';

export const login = data => {
  const url = BASE_URL + '/userInfo/login';
  return request('POST', url, data);
};

//动态页面api
export class MessageNews {
  static selectMessageByType(data) {
    const url = messageNewsUrl + '/selectMessageByType';
    return request('POST', url, data);
  }
  static selectMessageDetail(data) {
    const url = messageNewsUrl + '/selectMessageDetail';
    return request('POST', url, data);
  }
  static addInCollect(data) {
    const url = messageNewsUrl + '/addInCollect';
    return request('POST', url, data);
  }
  static cancelCollect(data) {
    const url = messageNewsUrl + '/cancelCollect';
    return request('POST', url, data);
  }
  static userCollectMessage(data) {
    const url = messageNewsUrl + '/userCollectMessage';
    return request('POST', url, data);
  }
}
