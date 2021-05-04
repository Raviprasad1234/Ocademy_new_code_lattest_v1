import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseHttpClientService } from '../common/base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    
  constructor(private basehttp: BaseHttpClientService) { }

  CatUrl: string = environment.api; 
 
  getSectiondata(cid){
    return this.basehttp.getData<any>(this.CatUrl + '/ocademy/tutor/section/getAllSectionsByCourseId/' + cid);
  }

  getLessondataBySID(sid){
    return this.basehttp.getData<any>(this.CatUrl + '/ocademy/tutor/lesson/getAllLessonsBySectionId/' + sid);
  }
  deleteSectionByCIDSID(cid,sid){
    return this.basehttp.delData<any>(this.CatUrl + '/ocademy/tutor/section/deleteSectionByCourseId/'+cid+'/'+sid);
  }
  deleteLessonBySIDLID(sid,lid){
    return this.basehttp.delData<any>(this.CatUrl + '/ocademy/tutor/lesson/deleteLesson/'+sid+'/'+lid);
  }

  getCountByroleNameStudent(){
    return this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCountByRoleName/Student');    
  }

  getCountByroleNameTutor(){
    return this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCountByRoleName/Tutor');
  }


  getAllCoupons(){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/admin/coupon/retrieveCoupons');
  }

  
  CreateAllCoupons(postcouponData){
    return this.basehttp.postData(this.CatUrl + '/ocademy/admin/coupon/addCoupon' , postcouponData );
  }
  deleteAllCoupons(delid){
    return  this.basehttp.delData(this.CatUrl + '/ocademy/admin/coupon/deleteCoupon/' + delid);
  }


  getProductCategoriesForCoupon() {
    return this.basehttp.getData<any>(environment.api + '/ocademy/admin/category/getAllCategory');
  }


}
