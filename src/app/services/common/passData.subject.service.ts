// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class SharingService {
//     private SectionNamesubject = new Subject<any>();

//     sendSectionNameSubMethod(SectionNameData: any) {
//         this.SectionNamesubject.next({ SecNameData: SectionNameData });
//     }

//     clearSectionName() {
//         this.SectionNamesubject.next();
//     }

//     getSectionNameSubMethod(): Observable<any> {
//         return this.SectionNamesubject.asObservable();
//     }
// }

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharingService {
    private subject = new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        
        return this.subject.asObservable();
    }
}