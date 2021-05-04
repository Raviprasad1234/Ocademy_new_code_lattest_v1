import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ObservableService {
    private subject = new Subject<any>();


    private  CourseSubject = new Subject<any>();

    private  SectionNameSubject = new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }


    // getting  page name 
    sendpagenameService(page: any) {
        this.subject.next({ pagename: page });
    }

    clearPagenameService() {
        this.subject.next();
    }

    getPageNameService(): Observable<any> {
        return this.subject.asObservable();
    }
    // end getting page name 



    // geting section name


    sendSectionameObserService(secName: any) {
        this.SectionNameSubject.next({ sectionName: secName });
    }

    clearSectionnameObserService() {
        this.SectionNameSubject.next();
    }

    getSectionameObserService(): Observable<any> {
        return this.SectionNameSubject.asObservable();
    }

    // end getting section name






    sendCourseName(searchCourse){
        this.CourseSubject.next({courseName : searchCourse})
    }

    getCourseName(){
        return this.CourseSubject.asObservable();     
    }

    clearCourseName(){
        this.CourseSubject.next();
    }

}



