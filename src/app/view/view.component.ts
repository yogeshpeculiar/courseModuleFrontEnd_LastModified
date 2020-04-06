import { Component, OnInit } from '@angular/core';
import { CourseServiceService } from '../course-service.service';
import { Router } from '@angular/router';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
   courses: Array<any> = []
   pages:Array<any>;
   file :string;
   result:string;
   config:any;
   x:number=0;
   retVal:boolean;
   searchText:string;
   confirmation:boolean;
  constructor(private courseService:CourseServiceService,private router:Router) {
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.courses.length
    };
   }

  ngOnInit(): void {
    this.view();
  } 
  view(){
    this.courseService.view().subscribe((res: any) => {
      this.courses=res.data;
      console.log(this.courses);
    });
  }
    
  onFileChanged = (event)=>{
   this.file=event.target.files[0]
    this.courseService.uploadImage(this.file).subscribe((res :any)=>{
      this.result=res;
      console.log(this.result);
    });
  
  }
  navigateToCreateComponent=()=>{
    this.router.navigate(['/create']);
  }
  navigatToUpdateComponent=(id:number)=>{
    this.router.navigate(['/update'],{ queryParams: { id: id} });
  }
  navigatToCloneComponent=(id:number)=>{
    this.router.navigate(['/clone'],{ queryParams: { id: id} });
  }
  onPageChange=(event)=>{
    this.config.currentPage=event;
    console.log('current page'+this.config.currentPage);
  }

  switchStatus(id:number){

    this.courseService.switchStatus(id).subscribe((res :any)=>{
      
      console.log("switching status function has been called");
      this.ngOnInit();
    });
  }
  checkSwitchToActive(id:number){
    this.retVal=confirm("Are you sure you want to switch to ACTIVE state")
    if(this.retVal)
      this.switchStatus(id);
  }
  checkSwitchToInActive(id:number){
    this.retVal=confirm("Are you sure you want to switch to INACTIVE state")
    if(this.retVal)
      this.switchStatus(id);
  }

  delete(id:number)
  {
    console.log("delete called");
  this.confirmation=confirm("Are you sure to delete this course")
  if(this.confirmation)
  {
    this.courseService.delete(id).subscribe((res:any)=>{
      this.view();
      console.log("Delete this course");
    },error=>{
      this.view();
      console.log(error)
    });
  }
}

}
