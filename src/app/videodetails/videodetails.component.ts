import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseServiceService } from '../course-service.service';

@Component({
  selector: 'app-videodetails',
  templateUrl: './videodetails.component.html',
  styleUrls: ['./videodetails.component.css']
})
export class VideodetailsComponent implements OnInit {
  id:number;
  listOfVideos:Array<any>=[];
  constructor(private router: Router,private route:ActivatedRoute,private courseService:CourseServiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.id=params['id'];
    });
    this.viewvideoById();
  }
viewvideoById(){
  this.courseService.viewVideoById(this.id).subscribe((res:any)=>{
    this.listOfVideos=res;
    this.listOfVideos = arrayparse(this.listOfVideos);
    function arrayparse(object) {
      return new Array(object);
    }
    console.log(this.listOfVideos);
  });
}
back()
{
 this.router.navigateByUrl("/view");
}
}
