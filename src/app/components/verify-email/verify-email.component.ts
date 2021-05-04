import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  emailid = '';

  constructor(private router: Router,
    private toster: ToastrService,
    private route: ActivatedRoute,
    private authservice: AuthService) {

    var id = this.route.snapshot['_routerState'].url
    var afterQuestionmark = id.substr(id.indexOf('?') + 1);
    this.emailid = afterQuestionmark;
    this.route.queryParams.subscribe(params => {
      //  this.userid = (Object.keys(params)[0]);
    });

  }

  ngOnInit(): void {
    this.emailverifyaftermailedMethod();

  }

  emailverifyaftermailedMethod() {
    var emailAddress = this.emailid;
    this.authservice.getverifymailAftermailclickService(emailAddress).subscribe((response) => {
      console.log(response, "res");
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000);
      this.toster.success('Wait for 2 sec you will navigate to home page..!', '', { timeOut: 2000 });
    }, (error) => {
      console.log(error);
      this.toster.warning('Server TimeOut..!', '', { timeOut: 2000 });
    });
  }

}
