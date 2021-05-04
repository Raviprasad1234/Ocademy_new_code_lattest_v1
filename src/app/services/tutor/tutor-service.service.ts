import { Injectable } from '@angular/core';
import { relative } from 'path';
import { environment } from 'src/environments/environment';
import { BaseHttpClientService } from '../common/base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class TutorServiceService {
  
  constructor(private basehttp: BaseHttpClientService) { }

  CatUrl: string = environment.api
  CategoriesSubmit( userid, CatData) {
    // return this.basehttp.postData(this.CatUrl + '/webDevelopment/saveWebDevelopment', CatData)
    return this.basehttp.postData(this.CatUrl + '/ocademy/course/saveCourse/' + userid , CatData)
  }


  TutorSettingUpdateService(courseId ,settingData ){
    return  this.basehttp.putData(this.CatUrl + '/ocademy/course/updateCourse/' + courseId ,settingData );
  }


  // PUT : http://localhost:9091/ocademy/course/updateCourse/{courseId}


  getVideoAllMethod() {
        // return  this.basehttp.getData(this.CatUrl + '/ocademy/course/getCourseByUserId/' + userid)
     return  this.basehttp.getData(this.CatUrl + '/ocademy/course/getAllCourses');
  }


  getAllCoursesByCourseID(userid){
       return  this.basehttp.getData(this.CatUrl + '/ocademy/course/getCourseByUserId/' + userid)
  }


  getAllCoursesByAscSortAToZService(userid){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/course/getCourseByUserIdAscSort/' + userid)
  }
    

  getAllCoursesByDescSortZToAService(userid){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/course/getCourseByUserIdDescSort/' + userid)
  }
  

  getAllCoursesByLattestService(userid){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/course/getCourseByUserIdLatestSort/' + userid)
  }

  getAllCoursesByOldestService(userid){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/course/getCourseByUserIdOldestSort/' + userid)
  }


  // postUploadVideo(formdata){
  //   return this.basehttp.postFormData(this.CatUrl + '/files', formdata)
  // }

  public username: String;
  public password: String;
  
  postUploadVideo(formdata){
    // return this.basehttp.postFormData(this.CatUrl + '/files/uploadVideoToAWS', formdata)
    return this.basehttp.postFormData(this.CatUrl + '/ocademy/aws/filesave', formdata)
  }

  getAllVideosArray(){
    return this.basehttp.getData(this.CatUrl + '/ocademy/aws/allfiles');
  }

  getAllVideoswithIDs(){
    return this.basehttp.getData(this.CatUrl +'/ocademy/aws/urls');    
  }

  getAllLevelsData(selectedVal){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getByCourseLevel/' + selectedVal);
  }

  // http://localhost:9090/webDevelopment/getByLanguage?language=Spanish
  getAllLanguages(selectedLang){
     return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getByCourseLanguage/' + selectedLang);
  }

  // getAllTopics(selectedTopic){
  //   return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getByTopicName/' + selectedTopic);
  // }

  getAllTopics(selectedTopic){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/student/getByTopicNameForStudent/' + selectedTopic + '/Approved');
  }

  getCoursesByTopicnameForStudentService(selectedTopic){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/student/getByTopicNameForStudent/' + selectedTopic + '/Approved');    
  }

  // getCoursesByCategoriesService(CatName){
  //   return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getByCategory/' + CatName);
  // }

  getCoursesByCategoriesService(CatName){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/student/getByCategoryForStudent/' + CatName + '/Approved');
  }



  // getCoursesBySubCategoriesService(SubCatName){
  //   return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getBySubCategory/' + SubCatName);
  // }

  getCoursesBySubCategoriesService(SubCatName){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/student/getBySubCategoryForStudent/' + SubCatName +'/Approved');
  }

  
  // getCourseByCourseTitleService(CourseTitleName){
  //   return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getByTitleName/' + CourseTitleName);
  // }

  getCourseByCourseTitleService(CourseTitleName){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/student/getByTitleNameForStudent/' + CourseTitleName + '/Approved');
  }


  getCourseByCourseLanguageService(CourseLanguage){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getByCourseLanguage/' + CourseLanguage);
  }

  getCourseByCourseLevelService(CourseLevel){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getByCourseLevel/' + CourseLevel);
  }


  // GET : http://localhost:9091/ocademy/users/coursecontent/getByTitleName/Sel

  // http://localhost:9091/ocademy/users/coursecontent/getBySubCategory/Web Development


  // http://localhost:9091/ocademy/users/coursecontent/getByCategory/Development


  getpublishStatus(publishStatus){
      return this.basehttp.getData(this.CatUrl + '/ocademy/tutor/approvedCourses/' + publishStatus);
  }


  getunPublishStatus(publishStatus){
    return this.basehttp.getData(this.CatUrl + '/ocademy/tutor/unpublishedCourses/' +publishStatus)
  }


  getCourseByCourseIdService(courseId){
    return this.basehttp.getData(this.CatUrl + '/ocademy/course/getCourseByCourseId/' + courseId )
  }
  

  courseSendForApprovalService(courseId ,sData){
    return  this.basehttp.putData(this.CatUrl + '/ocademy/tutor/courseSendForApproval/' + courseId ,sData );
  }


  // PUT /ocademy/tutor/courseSendForApproval/{courseId}


}
