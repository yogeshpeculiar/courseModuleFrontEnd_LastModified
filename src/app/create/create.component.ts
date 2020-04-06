import { Component, OnInit } from '@angular/core';
import{FormGroup, FormControl, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import * as classicEditor from '@ckeditor/ckeditor5-build-classic';
import {ViewChild} from '@angular/core';
import {CourseServiceService} from '../course-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('editorReference') editorContent:any;
  public editor=classicEditor;
  saveEditorContent:boolean;
  contentInEditor:any;

  
  levels:Array<any>=[];
  course_name="";
  slug:any;
  categories:Array<any>=[];
  textEditor:any;
  metaKey:string;
  tagValue:string;
  listOfVideos:any;
  videoIdArray:Array<number>;
  videoArray:Array<any>;
  videoCheckBoxValuesArray:FormArray;
  videoToBeAddedArray:Array<any>=[];

  createForm=new FormGroup({
      courseName:new FormControl(),
      level:new FormControl(),
      category:new FormControl(),
      tags:new FormControl(),
      slug:new FormControl(),
      levelOverride:new FormControl(),
      mode:new FormControl(),
      isPreSignUp:new FormControl(),
      isSlugLogin:new FormControl(),
      isDashboard:new FormControl(),
      completionActivityPoints:new FormControl(),
      enrollmentActivityPoints:new FormControl(),
      description:new FormControl(),
      metaKey:new FormControl(),
      metaDescription:new FormControl(),
      chooseIcon:new FormControl(),
      editorName:new FormControl(),
      editorContentText:new FormControl(),
      videoToBeAdded:new FormArray([])
});
  constructor(private router:Router,private courseService:CourseServiceService, private modalService:NgbModal) { }
   

  ngOnInit(): void {
    this.viewLevels();
    this.viewCategories();
    this.viewVideos();
  }
  onPublish(){
    this.createForm.value.mode="p";
  // console.log(this.createForm.value)
   this.courseService.insert(this.createForm.value,this.videoToBeAddedArray).subscribe((res:any)=>{
    this.router.navigateByUrl("/view");  
  });
                               
  }
  onDraft(){
    this.createForm.value.mode="d";
    // console.log(this.createForm.value);
    this.courseService.insert(this.createForm.value,this.videoToBeAddedArray).subscribe((res:any)=>{
      this.router.navigateByUrl("/view"); 
    });
    
  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}
  
  navigateToSeekEditor(){
    this.router.navigate(['seek-editor']);
  }
  viewLevels(){
    this.courseService.viewLevel().subscribe(
      (res:any)=>{
          this.levels=res.data;
          
      }
    );
  }
  viewCategories(){
    this.courseService.viewCategory().subscribe(
      (res:any) =>{
        this.categories=res.data;
      }
    );

}
open(content) {
  this.modalService.open(content,{
    size: 'xl'
});
}
 saveContent(){
  this.saveEditorContent=true;
  console.log("save method is called")
  this.modalService.dismissAll();
      }
    viewVideos(){
      this.courseService.viewAllVideos().subscribe(
        (res:any)=>{
        this.listOfVideos=res;
      })
      
    }
    onCheckBoxChange(event){
      console.log("Checkboxchanged method called")
      const formArray: FormArray = this.createForm.get('videoToBeAdded') as FormArray;
      if(event.target.checked){
        formArray.push(new FormControl(event.target.value));
      }
    }
    addSelectedVideo(){
      const formArray: FormArray = this.createForm.get('videoToBeAdded') as FormArray;
      console.log("add button is clicked and value===>"+formArray)
      
      for(let i=0;i<formArray.length;i++){
        console.log("elements are"+formArray.at(i).value)
       let video={
         "videoId":formArray.at(i).value
       }
       this.videoToBeAddedArray.push(video);
    }
    console.log("resultant array:"+this.videoToBeAddedArray);
    this.modalService.dismissAll();
    }
    openAddVideoModal(content){
      console.log("open modal is called")
      this.modalService.open(content,{
        size: 'md'
    });
  }
  back()
  {
    this.router.navigateByUrl("/view");
  }

}