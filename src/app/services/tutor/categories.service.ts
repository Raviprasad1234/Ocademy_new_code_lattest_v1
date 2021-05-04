import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseHttpClientService } from '../common/base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  CatUrl: string = environment.api


  constructor(private basehttp: BaseHttpClientService) { }
  getCategoriesFamily() {
    return this.basehttp.getData<any>(environment.api + '/ocademy/admin/category/getAllCategory');
  }

  getALlCourseByUserID(userid){
    return this.basehttp.getData<any>(environment.api + '/ocademy/course/getCourseByUserId/' + userid);
  }


  getAllCourses(){
    return this.basehttp.getData<any>(environment.api + '/ocademy/course/getAllCourses');
  };

  
// http://localhost:9091/ocademy/course/getCourseByUserId/{userId}



  // getByCatServiceMethod(selectedCat) {
  //   return this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getByCategory/category/' + selectedCat);
  // }

  
  getByCatServiceMethod(selectedCat) {
    return this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getByCategory/category/' + selectedCat);
  }



  getBySubCatServiceMethod(selectedSubCat) {
    return this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getBySubCategory/subCategory/' + selectedSubCat);
  }
}
