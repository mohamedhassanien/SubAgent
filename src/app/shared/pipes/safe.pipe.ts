import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  // safe pipe to safely pass the url 
  transform(url : string) {
    // check if the url has been sanitizered before or not
    if (this.sanitizer.bypassSecurityTrustResourceUrl(url)){
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    else {
      return url
    }
  }

}
