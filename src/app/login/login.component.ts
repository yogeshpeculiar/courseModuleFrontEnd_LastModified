import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router} from '@angular/router';
import {CourseServiceService} from '../course-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private courseService: CourseServiceService,private router:Router) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  loginForm=new FormGroup({
    userId:new FormControl(),
    password:new FormControl()
  });
  onSubmit(){
    console.log("submit is called..."+this.loginForm.value)
    this.courseService.login(this.loginForm.value).subscribe((res:any)=>{
      console.log(res)
     const status=true;
      console.log("submit is called..."+this.loginForm.value)
      localStorage.setItem('status', JSON.stringify(status));
      console.log("user status is-->"+localStorage.getItem('status'))
        this.router.navigate(['/view']) 
    });
  }
}