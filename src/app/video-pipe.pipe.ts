import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'videoPipe'
})
export class VideoPipePipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer){

  }

  transform(url:string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
