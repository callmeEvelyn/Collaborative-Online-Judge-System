import {Injectable, Inject} from '@angular/core';
import {Router,CanActivate} from "@angular/router";

@Injectable()
export class AuthGuardService implements  CanActivate {

  profile: any;

  constructor(@Inject("auth") private auth, private router: Router) { }

  canActivate(): boolean{
    if(this.auth.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(['/problems']);
      return false;
    }
  }
  // isAdmin() : boolean {
  //     this.auth.getProfile((err, profile) => {
  //       this.profile = profile;
  //     });
  //
  //     if (this.auth.isAuthenticated() && this.auth.getProfile().roles.includes("Admin")){
  //       return true;
  //     }else{
  //       return false;
  //     }
  // }
}
