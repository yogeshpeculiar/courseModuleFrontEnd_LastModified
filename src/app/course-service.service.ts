import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {
  metakeywords:string;
  textContent:string;
  editorName:string;
  constructor(private http: HttpClient) { }
  view(){
    return this.http.get("http://localhost:5656/courses/")
  }
  uploadImage(file:string){
    
      return this.http.get("http://localhost:5656/courses/addImage"+file);
  }
  viewLevel(){
    return this.http.get("http://localhost:5656/courses/viewLevels")
  }
  viewCategory(){
    return this.http.get("http://localhost:5656/courses/viewCategories")
  }
  viewLevelById( id:number){
return this.http.get("http://localhost:5656/courses/viewLevelById"+id)
  }
  viewCategoryById( id:number){
    return this.http.get("http://localhost:5656/courses/viewCategoryById"+id)
      }
  viewCourseById(id:number){
    return this.http.get("http://localhost:5656/courses/viewCourseById/"+id);
  }
  update(data:any,id:number,doc:any,videoToBeAddedArray:Array<any>,createdOn:any){
    let body={};
   
    if(doc!=null){
      console.log("created time of the document is --->"+doc.createdOn);
      console.log("updateing existing document")
     body={
     id:id,
        name: data.courseName,
        tag:data.tags.toString(),
        slug:data.slug,
        isLevelOverride:data.levelOverride,
        completionActivityPoints:data.completionActivityPoints,
        enrollmentActivityPoints:data.enrollmentActivityPoints,
        description:data.description,
        metaKey:data.metaKey.toString(),
        mode:data.mode,
        metaDesc:data.metaDescription,
        course_icon:data.chooseIcon,
        isPreSignUp:data.isPreSignUp,
        isDashboard:data.isDashboard,
        isSlugLogin:data.isSlugLogin,
        version:data.version,
        createdOn:createdOn,
        docObj: [{
          "id":doc.id,
          name:data.editorName,
         content:data.editorContentText,
         "createdOn":doc.createdOn
        }],
        "courseSubscribedVideo":videoToBeAddedArray,
     levelId:data.level,
      categoryId:data.category,
      isActive:"true"
      };
    }
    else{
      console.log("updateing new document")
       body={
        id:id,
           name: data.courseName,
           tag:data.tags.toString(),
           slug:data.slug,
           isLevelOverride:data.levelOverride,
           isPreSignUp:data.isPreSignUp,
           isDashboard:data.isDashboard,
           isSlugLogin:data.isSlugLogin,
           createdOn:createdOn,
           completionActivityPoints:data.completionActivityPoints,
           enrollmentActivityPoints:data.enrollmentActivityPoints,
           mode:data.mode,
           description:data.description,
           version:data.version,
           metaKey:data.metaKey.toString(),
           metaDesc:data.metaDescription,
           course_icon:data.chooseIcon,
           docObj: [{
            name:data.newEditorName,
            content:data.newEditorContentText
           }],
           "courseSubscribedVideo":videoToBeAddedArray,
        levelId:data.level,
         categoryId:data.category,
         isActive:"true"
         };

    }
     
      
      // console.log(body.levelId);
      const headers=new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put("http://localhost:5656/courses/", body).pipe(map(res => res, { 'headers': headers }));
  
    }
  
  insert(data:any,videoArray:Array<any>){
   
      const body={
        name: data.courseName,
        tag:data.tags.toString(),
        slug:data.slug,
        version:1,
        mode:data.mode,
        isLevelOverride:data.levelOverride,
        isPreSignUp:data.isPreSignUp,
        isDashboard:data.isDashboard,
        isSlugLogin:data.isSlugLogin,
        completionActivityPoints:data.completionActivityPoints,
        enrollmentActivityPoints:data.enrollmentActivityPoints,
        description:data.description,
        metaKey:data.metaKey.toString(),
        metaDesc:data.metaDescription,
        course_icon:data.chooseIcon,
        "docObj": [{
          "name":data.editorName,
         "content": data.editorContentText
         
      }
  ],

      levelObj:{
        "id":data.level
      },
      categoryObj:{
        "id":data.category
      },
      isActive:"true",
      "courseSubscribedVideo":videoArray
  
        
      };
      console.log(body);
      const headers=new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post("http://localhost:5656/courses/", body).pipe(map(res => res, { 'headers': headers }));
  }
  
  clone(data:any,docId:number,videoToBeAddedArray:Array<any>){
   if(docId!=null){
   this.textContent=data.editorContentText;
  this.editorName=data.editorName; 
  }
   else{
   this.textContent=data.newEditorContentText;
   this.editorName=data.newEditorName;
  }
    const body={
      name: data.courseName,
      tag:data.tags.toString(),
      slug:data.slug,
      mode:data.mode,
      version:1,
      isLevelOverride:data.levelOverride,
      isPreSignUp:data.isPreSignUp,
      isDashboard:data.isDashboard,
      isSlugLogin:data.isSlugLogin,
      completionActivityPoints:data.completionActivityPoints,
      enrollmentActivityPoints:data.enrollmentActivityPoints,
      description:data.description,
      metaKey:data.metaKey.toString(),
      metaDesc:data.metaDescription,
      course_icon:data.chooseIcon,
      "docObj": [{
        "name":this.editorName,
       "content":this.textContent
    }
],

    levelObj:{
      "id":data.level
    },
    categoryObj:{
      "id":data.category
    },
    isActive:"true",
    "courseSubscribedVideo":videoToBeAddedArray,

      
    };
    console.log(body);
    const headers=new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:5656/courses/", body).pipe(map(res => res, { 'headers': headers }));
}

  switchStatus(id:number){
    return this.http.get("http://localhost:5656/courses/switchStatus/"+id);
  }
  viewDocByCourseId(id:number){
    return this.http.get("http://localhost:5656/courses/viewDocByCourseId/"+id);
  }
  viewVideoByCourseId(id:number){
    return this.http.get("http://localhost:5656/courses/viewVideoByCourseId/"+id);
  }
  viewAllVideos(){
    return this.http.get("http://localhost:5656/videos/listAll");
  }
  viewVideoById(id:number){
    return this.http.get("http://localhost:5656/videos/listVideoById/"+id);
  }
  deleteCourseVideoMapping(id:number){
    return this.http.delete("http://localhost:5656/courses/deleteCourseVideoMappingById/"+id);
  }
  delete(id:number)
  {
    return this.http.delete("http://localhost:5656/courses/"+id);
  }
  login(loginData:any){
    const body={
      userId:loginData.userId,
      password:loginData.password
    }
    const headers=new Headers();
    headers.append('Content-Type', 'application/json');
   
    console.log("login service is called and the body is-->"+body.userId);
    return this.http.post("http://localhost:5656/courses/login", body).pipe(map(res => res, { 'headers': headers }));
  }
}
