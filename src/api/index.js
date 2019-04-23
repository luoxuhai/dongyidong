import { request } from '@/libs/utils';
import { BASE_URL } from '@/libs/config';

const HOME_URL = BASE_URL + '/client/home';
const USER_INFO_URL = BASE_URL + '/client/userInfo';
const TRAINING_TEACHER_URL = BASE_URL + '/client/trainingTeacher';
const MESSAGE_NEWS_URL = BASE_URL + '/client/messageNews';
const COURSE_URL = BASE_URL + '/client/course';
const CAROUSEL_URL = BASE_URL + '/client/carousel';
const FEEDBACK_URL = BASE_URL + '/client/feedback';
const WEATHER_URL = 'http://t.weather.sojson.com/api/weather/city/101030100';

export class Home {
  static selectMessage(data) {
    const url = HOME_URL + '/selectMessage';
    return request('POST', url, data);
  }
  static getWeather(data) {
    const url = WEATHER_URL;
    return request('GET', url, data);
  }
}

export class Feedback {
  static insertFeedBack(data) {
    const url = FEEDBACK_URL + '/insertFeedBack';
    return request('POST', url, data);
  }
}

export class Carousel {
  static selectCarouselByType(data) {
    const url = CAROUSEL_URL + '/selectCarouselByType';
    return request('POST', url, data);
  }
}
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

  static upDateUserBasicInfo(data, header) {
    const url = USER_INFO_URL + '/upDateUserBasicInfo';
    return request('POST', url, data, header);
  }

  static selectTest(data, header) {
    const url = USER_INFO_URL + '/selectTest';
    return request('POST', url, data, header);
  }

  static selectClassAndSchool(data, header) {
    const url = USER_INFO_URL + '/selectClassAndSchool';
    return request('POST', url, data, header);
  }

  static insertPhone(data, header) {
    const url = USER_INFO_URL + '/insertPhone';
    return request('POST', url, data, header);
  }

  static selectPhone(data, header) {
    const url = USER_INFO_URL + '/selectPhone';
    return request('POST', url, data, header);
  }

  static auth(data, header) {
    const url = USER_INFO_URL + '/auth';
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
  static courseList(data, header) {
    const url = COURSE_URL + '/courseList';
    return request('POST', url, data, header);
  }
  static courseDetail(data, header) {
    const url = COURSE_URL + '/courseDetail';
    return request('POST', url, data, header);
  }
  static collectCourse(data, header) {
    const url = COURSE_URL + '/collectCourse';
    return request('POST', url, data, header);
  }
  static cancelCollect(data, header) {
    const url = COURSE_URL + '/cancelCollect';
    return request('POST', url, data, header);
  }
  static joinCourse(data, header) {
    const url = COURSE_URL + '/joinCourse';
    return request('POST', url, data, header);
  }
  static withdrawCourse(data, header) {
    const url = COURSE_URL + '/withdrawCourse';
    return request('POST', url, data, header);
  }
  static userCollectCourse(data, header) {
    const url = COURSE_URL + '/userCollectCourse';
    return request('POST', url, data, header);
  }
  static userCourseList(data, header) {
    const url = COURSE_URL + '/userCourseList';
    return request('POST', url, data, header);
  }
  static courseAction(data, header) {
    const url = COURSE_URL + '/courseAction';
    return request('POST', url, data, header);
  }
  static courseHotList(data, header) {
    const url = COURSE_URL + '/courseHotList';
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
