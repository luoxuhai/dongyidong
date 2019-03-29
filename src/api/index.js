import { request } from '@/libs/utils';
import { BASE_URL } from '@/libs/config';

const USER_INFO_URL = BASE_URL + '/userInfo';
const TRAINING_TEACHER_URL = BASE_URL + '/trainingTeacher';
const MESSAGE_NEWS_URL = BASE_URL + '/client/messageNews';
const COURSE_URL = BASE_URL + '/client/course';

//用户
export class UserInfo {
  static login(data, header) {
    const url = USER_INFO_URL + '/login';
    return request('POST', url, data, header);
  }

  static insertBasicUserInfo(data, header) {
    const url = USER_INFO_URL + '/insertBasicUserInfo';
    return request('POST', url, data, header);
  }
  static selectUserInfo(data, header) {
    const url = USER_INFO_URL + '/selectUserInfo';
    return request('POST', url, data, header);
  }
}
//名师
export class TrainingTeacher {
  static teacherList(data, header) {
    const url = TRAINING_TEACHER_URL + '/teacherList';
    return request('POST', url, data, header);
  }
  static teacherDetail(data, header) {
    const url = TRAINING_TEACHER_URL + '/teacherDetail';
    return request('POST', url, data, header);
  }
}

//课程
export class Course {
  static userCourseList(data, header) {
    const url = COURSE_URL + '/userCourseList';
    return request('POST', url, data, header);
  }
  static courseAction(data, header) {
    const url = COURSE_URL + '/courseAction';
    return request('POST', url, data, header);
  }
}

//动态页面api
export class MessageNews {
  static selectMessageByType(data, header) {
    const url = MESSAGE_NEWS_URL + '/selectMessageByType';
    return request('POST', url, data, header);
  }
  static selectMessageDetail(data, header) {
    const url = MESSAGE_NEWS_URL + '/selectMessageDetail';
    return request('POST', url, data, header);
  }
  static addInCollect(data, header) {
    const url = MESSAGE_NEWS_URL + '/addInCollect';
    return request('POST', url, data, header);
  }
  static cancelCollect(data, header) {
    const url = MESSAGE_NEWS_URL + '/cancelCollect';
    return request('POST', url, data, header);
  }
  static userCollectMessage(data, header) {
    const url = MESSAGE_NEWS_URL + '/userCollectMessage';
    return request('POST', url, data, header);
  }
}
