import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { AccountService } from 'src/app/core/account.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
 isAdmin = false;
 
  @Output() changeRoute = new EventEmitter<string>();

  constructor(public accountService: AccountService, 
    public router: Router, public activatedRoute: ActivatedRoute) { }

  changeMenu(path: string) {
    console.log("path:", path);
   
  }
  ngOnInit() {
    this.isAdmin = this.accountService.hasAnyAuthority("ADMIN");
   
    
    this.router.events
    .pipe(
       filter((event) => event instanceof NavigationEnd),
       startWith(this.router)
    )
    .subscribe((event: any) => {
   

      const path = this.activatedRoute.snapshot!.firstChild?.routeConfig!.path ?? '-';
      this.changeMenu(path!);
      return event;
    }
  );
  }
}
