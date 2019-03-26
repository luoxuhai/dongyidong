import { request } from '@/libs/utils';
import { BASE_URL } from '@/libs/config';

const userInfoUrl = BASE_URL + '/userInfo';
const trainingTeacherUrl = BASE_URL + '/trainingTeacher';
const messageNewsUrl = BASE_URL + '/client/messageNews';
const courseUrl = BASE_URL + '/client/course';

export class UserInfo {
  static login(data) {
    const url = userInfoUrl + '/login';
    return request('POST', url, data);
  }
  static insertBasicUserInfo(data) {
    const url = userInfoUrl + '/insertBasicUserInfo';
    return request('POST', url, data);
  }
  static selectUserInfo(data) {
    const url = userInfoUrl + '/selectUserInfo';
    return request('POST', url, data);
  }
}

export class TrainingTeacher {
  static teacherList(data) {
    const url = trainingTeacherUrl + '/teacherList';
    return request('POST', url, data);
  }
  static teacherDetail(data) {
    const url = trainingTeacherUrl + '/teacherDetail';
    return request('POST', url, data);
  }
}

export class Course {
  static userCourseList(data) {
      const url = courseUrl + '/userCourseList';
    return request('POST', url, data);
  }
}

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
