import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseHttpClientService } from '../common/base-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private basehttp: BaseHttpClientService) { }

  CatUrl: string = environment.api

  // http://localhost:9090/student/getAllCourse


  getAllStudentCourses(userid) {
    return this.basehttp.getData(this.CatUrl + '/ocademy/course/getCourseByUserId/'+ userid);
  }


  getStudentPurchasedCourses(userid){
    return this.basehttp.getData(this.CatUrl + '/ocademy/student/myPurchasedCourses/'+ userid);
  };

  // GET /ocademy/student/myPurchasedCourses/{userId}



// http://localhost:9091/ocademy/course/getCourseByUserId/{userId}


  // getCat(cat) {
  //   return this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getByCategory/' + cat);
  // }

  getCat(cat) {
    return this.basehttp.getData(this.CatUrl + '/ocademy/student/getByCategoryForStudent/' + cat + '/Approved');
  }


  // getSubCat(subCat) {
  //   return this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getBySubCategory/' + subCat);
  // }


getCourseByCategoryOrSubCategoryOrTopicService(Cat, SubCat, TopicName , course_Title){
    return this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopic/' +  Cat + '/' + SubCat + '/' + TopicName + '/'+ course_Title);
}

    // http://localhost:9091/ocademy/users/coursecontent/
  // getCourseByCategoryOrSubCategoryOrTopic/null/null/JavaScript


  getTheCoursebasedOnlevelService(Cat, SubCat, TopicName,levelName){
    return this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopicAndLevel/'+ Cat + '/'+SubCat + '/' + TopicName + '/' + levelName );
  }

  //ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopicAndLevel/Development/null/null/Beginner  -- global serach by level 





  
  getSubCat(subCat) {
    return this.basehttp.getData(this.CatUrl + '/ocademy/student/getByCategoryForStudent/' + subCat + '/Approved');
  }


  getAllCoursesService(){
    return  this.basehttp.getData(this.CatUrl + '/ocademy/student/getAllApprovedCourses/Approved');
  }

  // http://localhost:9091/ocademy/student/getAllApprovedCourses/{publishStatus}(Approved)

  
  // ShowNotificationServices(){
  //   return  this.basehttp.getData(this.CatUrl + '/notifications/notify');
  // }


  CreateCourseRatingByCourseID(cid, Rating_data){
      return this.basehttp.postData<any>(this.CatUrl + '/ocademy/ratings/createRatingByCourseId/' + cid, Rating_data);
    }
  

    AddWishlistService(userId , wishlistData ){
      return this.basehttp.putData(this.CatUrl + '/ocademy/student/addToWishList/' + userId , wishlistData )
    }

    // /ocademy/student/getWishListByUserId/1




    getWishListService(userId){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/student/getWishListByUserId/' + userId);
    }


    AddToCartService(userID , cartData){
      return this.basehttp.putData(this.CatUrl + '/ocademy/cart/addToCart/' + userID , cartData );
    }
    
    getCartService(userID){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/cart/getCartCoursesByUserId/' + userID );
    }

    studentcheckoutService(userid , checkoutData){
      return this.basehttp.putData(this.CatUrl + '/ocademy/student/checkOutCourses/' + userid , checkoutData );  
    }


    // deleteLessonBySIDLID(sid,lid){
    //   return this._http.delData<any>(this.CatUrl + '/ocademy/tutor/lesson/deleteLesson/'+sid+'/'+lid);
    // }
  

    removeCartService(userID , cartData){
      return this.basehttp.delData<any>(this.CatUrl + '/ocademy/cart/deleteCartCourse/'+userID+'/'+cartData);
    }

    getuserDetailsByUserIDService(userid){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/user/getUserById/' + userid);
    }


    updateuserDetailsandPasswordService(userid,  current_password, updatedetails ){
      return this.basehttp.putData(this.CatUrl + '/ocademy/user/updateUser/' + userid  + '/' + current_password, updatedetails );  
    }

    // PUT /ocademy/user/updateUser/{userId}




    forgotpasswordService(userid ,password){
      return this.basehttp.putData(this.CatUrl + '/ocademy/user/changePassword/' + userid , password );  
    }



    filterbyTopicWiseService(CatName , SubCatName , TopicName , SelectedTopicName){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopicAndFilterTopicOrFilterLevelOrFilterLanguage/' + CatName + '/' + SubCatName + '/' + TopicName + '?filterTopicName=' + SelectedTopicName);     
    }


    filterbyLevelwiseService(CatName , SubCatName , TopicName , SelectedLevelName){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopicAndFilterTopicOrFilterLevelOrFilterLanguage/' + CatName + '/' + SubCatName + '/' + TopicName + '?filterLevel=' + SelectedLevelName);     
    }

    filterbyLanguagewiseService(CatName , SubCatName , TopicName , SelectedLevelName){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopicAndFilterTopicOrFilterLevelOrFilterLanguage/' + CatName + '/' + SubCatName + '/' + TopicName + '?filterLanguage=' + SelectedLevelName);     
    }


    
    filterbyTopicNameAndLevelwiseService(CatName , SubCatName , TopicName , SelectedTopicName , SelectedLevelName){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopicAndFilterTopicOrFilterLevelOrFilterLanguage/' + CatName + '/' + SubCatName + '/' + TopicName + '?filterTopicName=' + SelectedTopicName + '&&filterLevel=' + SelectedLevelName );
    }


    filterbyTopicNameAndLanguagewiseService(CatName , SubCatName , TopicName , SelectedTopicName , SelectedLanguageName){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopicAndFilterTopicOrFilterLevelOrFilterLanguage/' + CatName + '/' + SubCatName + '/' + TopicName + '?filterTopicName=' + SelectedTopicName + '&&filterLanguage=' + SelectedLanguageName );
    }


    filterbyLevelAndLanguagewiseService(CatName , SubCatName , TopicName , SelectedLevelName , SelectedLanguageName){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopicAndFilterTopicOrFilterLevelOrFilterLanguage/' + CatName + '/' + SubCatName + '/' + TopicName + '?filterLevel=' + SelectedLevelName + '&&filterLanguage=' + SelectedLanguageName );
    }
    

    filterbyLevelAndLanguageAndTopicNamewiseService(CatName , SubCatName , TopicName ,SelectedTopicName , SelectedLevelName , SelectedLanguageName  ){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopicAndFilterTopicOrFilterLevelOrFilterLanguage/' + CatName + '/' + SubCatName + '/' + TopicName + '?filterTopicName=' + SelectedTopicName + '&&filterLevel=' + SelectedLevelName +  '&&filterLanguage=' + SelectedLanguageName );
    }



    checkCouponisActiveorNotService(couponId){
      return  this.basehttp.getData(this.CatUrl + '/ocademy/admin/coupon/getCouponById/' +  couponId);     
    }

    // /ocademy/admin/coupon/getCouponById/{couponId}
    ///ocademy/admin/coupon/getCouponById/{couponId} 







    // http://localhost:9091
    // /ocademy/users/coursecontent/getCourseByCategoryOrSubCategoryOrTopicAndFilterTopicOrFilterLevelOrFilterLanguage/
    // Development/nul/null?filterLevel=Intermediate&&filterLanguage=hindi,german




    // http://localhost:9091/ocademy/users/coursecontent/
    // getCourseByCategoryOrSubCategoryOrTopicAndFilterTopicOrFilterLevelOrFilterLanguage/
    // Development/nul/null?filterTopicName=Java Script,Python&&filterLevel=Beginner,advance



    // http://localhost:9091
    // /ocademy/users/coursecontent/
    // getCourseByCategoryOrSubCategoryOrTopicAndFilterTopicOrFilterLevelOrFilterLanguage/
    // Development/nul/null?
    // filterTopicName=Java Script,Python
    // &&filterLevel=Beginner,advance


    // PUT /ocademy/user/changePassword/{userId}


    // GET /ocademy/user/getUserById/{userId}

    // PUT /ocademy/student/checkOutCourses/{userId}

    // PUT /ocademy/student/updatePurchasedCourses/{userId}


    // GET /ocademy/cart/getCartCoursesByUserId/{userId}

    // PUT /ocademy/cart/addToCart/{userId}


    // https://ocademyapiqa.onpassive.com/ocademy/student/getWishListByUserId/1

    // http://localhost:9091/ocademy/student/wishList/1

}
