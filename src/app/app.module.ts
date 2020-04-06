import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CourseServiceService } from './course-service.service';
import { CreateComponent } from './create/create.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule} from '@angular/forms'
import {TagInputModule} from 'ngx-chips';   //fot getting tags as input
import {NgxPaginationModule} from 'ngx-pagination';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {Ng2SearchPipeModule } from 'ng2-search-filter';
import { UpdateComponent } from './update/update.component';
import { CloneComponent } from './clone/clone.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VideoPipePipe } from './video-pipe.pipe';
import { VideodetailsComponent } from './videodetails/videodetails.component';
@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    CreateComponent,
    NavBarComponent,
    UpdateComponent,
    CloneComponent,
    LoginComponent,
    DetailsComponent,
    VideoPipePipe,
    VideodetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TagInputModule,
    FormsModule,
    NgxPaginationModule,
    CKEditorModule,
    Ng2SearchPipeModule,
    NoopAnimationsModule
    
  ],
  providers: [
    HttpClient,
    CourseServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
