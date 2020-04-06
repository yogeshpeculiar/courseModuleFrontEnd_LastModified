import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {FormGroup, FormControl, FormArray} from '@angular/forms';
import {CourseServiceService} from '../course-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as classicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-clone',
  templateUrl: './clone.component.html',
  styleUrls: ['./clone.component.css']
})
export class CloneComponent implements OnInit {
id:number;
public editor=classicEditor;
  constructor(private router:Router,private courseService:CourseServiceService,private activeRoute:ActivatedRoute,private modalService:NgbModal) { }
  cloneForm=new FormGroup({
    version:new FormControl(),
    courseName:new FormControl(),
    level:new FormControl(),
    mode:new FormControl(),
    category:new FormControl(),
    tags:new FormControl(),
    slug:new FormControl(),
    levelOverride:new FormControl(),
    isPreSignUp:new FormControl(),
    isSlugLogin:new FormControl(),
    isDashboard:new FormControl(),
    enrollmentActivityPoints:new FormControl(),
    completionActivityPoints:new FormControl(),
    description:new FormControl(),
    metaKey:new FormControl(),
    metaDescription:new FormControl(),
    chooseIcon:new FormControl(),
    newEditorName:new FormControl(),
    newEditorContentText:new FormControl(),
    editorName:new FormControl(),
    editorContentText:new FormControl(),
    videoToBeAdded:new FormArray([])
  });
  course_name:string;
  levels:any;       //to store the available levels for displayin options in the dropdown
  categories:any;   //to store the available categories for displayin options in the dropdown
  tags:any;
  metaKey:string[];
  currentDoc:any;
  saveEditorContent:boolean;
  listOfDocs:any;
  docId:number;
  existingData:any;
  courseVideoMapping:Array<any>;
  listOfVideos:Array<any>=[];
  listOfAllVideos:Array<any>=[];
  listOfVideosId:Array<number>=[];
  listOfAllVideosId:Array<number>=[];
  videoCheckBoxValuesArray:FormArray;
  videoToBeAddedArray:Array<any>=[];
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params=>{
      this.id=params['id'];
    });
    this.viewExistingDataOfChoosenId();
    this.viewLevels();
    this.viewCategories();
    this.viewExistingDocs();
    this.viewExistingVideos();
    this.viewAllVideos();
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
    public onReadyForNewEntry( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }
  public onReadyForExitstingEntry( editor ,doc:any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
    editor.setData(doc.content);
   
  }
  open(content) {
    this.modalService.open(content,{
      size: 'xl'
  });
  }
  openAddVideoModal(content){
    console.log("open modal is called")
    this.modalService.open(content,{
      size: 'md'
  });
  console.log("inside add video modal, size of listOfvideo"+this.listOfVideos.length)
  for(let i=0;i<this.listOfVideos.length;i++){
    this.listOfVideosId.push(this.listOfVideos[i].id);
    console.log("listofvideosId"+this.listOfVideos[i].id)
  }
  }
  openExistingDoc(exisingContent,doc:any){
    this.currentDoc=doc;
    
    console.log("document name==>"+this.currentDoc.name);
    console.log("modal is being opened")
    this.modalService.open(exisingContent);
    this.cloneForm.controls['editorName'].setValue(this.currentDoc.name);
    console.log("the id of the clicked document is==>"+doc.id);
    }
   saveContent(){
    this.saveEditorContent=true;
    console.log("save method is called")
    this.modalService.dismissAll();
        }
        viewExistingDocs(){
          this.courseService.viewDocByCourseId(this.id).subscribe((res)=>{
            this.listOfDocs=res;
          });
        }
        viewExistingVideos(){
          console.log("viewExistingVideos function is called..");
          this.courseService.viewVideoByCourseId(this.id).subscribe((res:Array<any>)=>{
           this.courseVideoMapping=res;
            console.log("response is:---------->"+this.courseVideoMapping)
            console.log("video id=======>"+this.courseVideoMapping[0].videoId)
            this.getVideoById();
          
          });
  
         // console.log(this.courseVideoMapping)
          
          }
          getVideoById(){
            let i=0;
            for(i=0;i<this.courseVideoMapping.length;i++){
              this.courseService.viewVideoById(this.courseVideoMapping[i].videoId).subscribe(
                (res)=>{
                  this.listOfVideos.push(res);
                  console.log("here res is===>"+res)
                  console.log("current state of listOfVideos is==>"+this.listOfVideos)
                }
              );
            }
            console.log("result==========>"+this.listOfVideos.length);
           
          }
          viewAllVideos(){
            this.courseService.viewAllVideos().subscribe(
              (res:any)=>{
              this.listOfAllVideos=res;
              
              for(let i=0;i<this.listOfAllVideos.length;i++)
                  this.listOfAllVideosId.push(this.listOfAllVideos[i].id);
            })
            
          }
         onCheckBoxChange(event){
            console.log("Checkboxchanged method called")
            const formArray: FormArray = this.cloneForm.get('videoToBeAdded') as FormArray;
            if(event.target.checked){
              formArray.push(new FormControl(event.target.value));
            }
          }
          addSelectedVideo(){
            const formArray: FormArray = this.cloneForm.get('videoToBeAdded') as FormArray;
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
          deleteCourseVideoMapping(id:number){
            // console.log("video id:"+id)
            // console.log("courseVideoMapping is+"+this.courseVideoMapping)
            let courseVideoMappingId;
            for(let i=0;i<this.courseVideoMapping.length;i++){
              //console.log(this.courseVideoMapping[i].videoId+"----->"+id)
              if(this.courseVideoMapping[i].videoId==id)
                  courseVideoMappingId=this.courseVideoMapping[i].id;
            }
            return this.courseService.deleteCourseVideoMapping(courseVideoMappingId).subscribe(
              (res)=>{
  
              }
            );
          }
    
onPublish(){
  // console.log("text editor==>"+this.editorContent.editorInstance.getData())
  this.cloneForm.value.mode="p";
  if(this.currentDoc)
  this.docId=this.currentDoc.id;
  else 
  this.docId=null;
  this.courseService.clone(this.cloneForm.value,this.docId,this.videoToBeAddedArray).subscribe(
    (res)=>{
      console.log(res);
      this.router.navigate(['view']);   
    }
  );
 

}
onDraft()
{
  
  this.cloneForm.value.mode="d";
  if(this.currentDoc)
  this.docId=this.currentDoc.id;
  else 
  this.docId=null;
  this.courseService.clone(this.cloneForm.value,this.docId,this.videoToBeAddedArray).subscribe(
    (res)=>{
      console.log(res);
      this.router.navigateByUrl("/view");
    }
  );
  // this.router.navigate(['view']); 
}
viewExistingDataOfChoosenId(){
  console.log("fetched id : ==>"+this.id);
      this.courseService.viewCourseById(this.id).subscribe((res:any)=>{
      this.existingData=res.data;
      console.log(res);
      this.loadValueInUpdateForm();//mapping is done
    });
       
    }
    public loadValueInUpdateForm(){
      console.log("loadvalue function is called"+this.existingData);
      console.log("level_id=====>"+this.existingData.levelObj.id);
      //console.log("document id is===>"+this.existingData.docObj[0].id)
      this.cloneForm.patchValue({
        version:this.existingData.version,
      courseName:this.existingData.name,
      level:this.existingData.levelObj.id,
      category:this.existingData.categoryObj.id,
      slug:this.existingData.slug,
      tags:this.existingData.tag.split(','),
      levelOverride:this.existingData.isLevelOverride,
      isPreSignUp:this.existingData.isPreSignUp,
      isDashboard:this.existingData.isDashboard,
      isSlugLogin:this.existingData.isSlugLogin,
      completionActivityPoints:this.existingData.completionActivityPoints,
      enrollmentActivityPoints:this.existingData.enrollmentActivityPoints,
      description:this.existingData.description,
      metaKey:this.existingData.metaKey.split(','),
      metaDescription:this.existingData.metaDesc,
      chooseIcon:this.existingData.course_icon,

      // editorText:this.existingData.docObj.content,
      // editorID:this.existingData.docObj[0].id
      });
    
    this.cloneForm.controls['courseName'].setValue(this.existingData.name+"(copy)");
      // console.log(this.existingData.name);
    }


back()
{
  this.router.navigateByUrl("/view");
}
}
