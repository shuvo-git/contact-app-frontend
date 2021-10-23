import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Cred } from './Cred';
import { LoginResponseJWT } from './login-response-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup: FormGroup ;
  public credential : Cred ={"username":"","password":""};
  
  constructor(private authService: AuthService,private router:Router) {
    this.initForm();
   }

  ngOnInit(): void {
  }

  private initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    });
  }

  public loginProcess(){
    
    
      
      this.authService.login(this.credential).subscribe(
        (res)=>{
          this.authService.setAccessToken(res.access_token);
          this.authService.setRefreshToken(res.refresh_token);
          console.log(this.authService.getAccessToken());
          
          this.authService.setValid(true);
          this.router.navigate(['contact-list']);
        },
        (err)=>{
          console.log(err);
          this.router.navigate(['login']);
        }
      );
      this.credential ={"username":"","password":""};
    
  }

}
