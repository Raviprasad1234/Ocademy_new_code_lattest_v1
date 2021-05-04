import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseHttpClientService } from '../../common/base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CourseMakerHomeService {

  CatUrl: string = environment.api

  constructor(private _http: BaseHttpClientService) { }

  getSectiondata(cid){
    return this._http.getData<any>(this.CatUrl + '/ocademy/tutor/section/getAllSectionsByCourseId/' + cid);
  }

  getLessondataBySID(sid){
    return this._http.getData<any>(this.CatUrl + '/ocademy/tutor/lesson/getAllLessonsBySectionId/' + sid);
  }

  addSectionByCID(cid, s_data) {
    return this._http.postData<any>(this.CatUrl + '/ocademy/tutor/section/createSectionByCourseId/' + cid, s_data);
  }

  addVideoBySID(sid, s_data){
    return this._http.postData<any>(this.CatUrl + '/ocademy/tutor/lesson/createLessonBySectionId/' + sid, s_data);
  }

  updateLessionBySectionIdAndLessionId(sid, lid, s_data){
    return this._http.putData<any>(this.CatUrl + '/ocademy/tutor/lesson/updateLessonBySectionIdAndLessonId/' + sid + '/' + lid, s_data);
  }


  // need to implement
  updateSectionByCourseIdAndSectioId(cid, sid, s_data){
    return this._http.putData<any>(this.CatUrl + '/ocademy/tutor/section/updateSectionByCourseIdAndSectioId/' + cid + '/' + sid, s_data);
  }


  deleteLessonBySIDLID(sid,lid){
    return this._http.delData<any>(this.CatUrl + '/ocademy/tutor/lesson/deleteLesson/'+sid+'/'+lid);
  }

  // deleteSectionByCIDSID(cid,sid){
  //   return this._http.delData<any>(this.CatUrl + '/deleteSection/'+cid+'/'+sid);
  // }


  deleteSectionByCIDSID(cid,sid){
    return this._http.delData<any>(this.CatUrl + '/ocademy/tutor/section/deleteSectionByCourseId/'+cid+'/'+sid);
  }



  getAllCoursesLessonsBasedOnCourseID(cid){
    return this._http.getData<any>(this.CatUrl + '/ocademy/course/getCourseByCourseId/' + cid);
  }


}
