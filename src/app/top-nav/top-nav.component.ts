import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/core/account.service';
import { JwtUtil } from 'src/app/core/jwt.util';
import { Lavozim } from 'src/app/shared/model/lavozimlar';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit, AfterViewInit {
  @Output() sideNavToggled = new EventEmitter<void>();
  @Output() rsideNavToggled = new EventEmitter<void>();
  title = 'ProDon intelektual tizimi'
 
  authenticated = false;
  siteLanguage: string = "O'zbek";
  
 
  constructor(private readonly router: Router, private jwtUtil: JwtUtil,
    public activatedroute: ActivatedRoute, public accountService: AccountService,
    private translate: TranslateService) { }
  ngAfterViewInit(): void {
    this.changeLang(this.translate.currentLang)
  }

  ngOnInit() {
    
    this.accountService.getAuthenticationState().pipe(
      (r) => {
        this.authenticated = this.accountService.isAuthenticated();
        return r;
      }
    );
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(this.router)
      )
      .subscribe((event) => {

        this.authenticated = this.accountService.isAuthenticated();
         return event;
      }
      );
      
  }

  toggleSidebar() {
    this.sideNavToggled.emit();
  }
  rsnavToggle() {
    this.rsideNavToggled.emit();
  }

  onLoggedout() {
    this.jwtUtil.clear();
    this.accountService.authenticate(null);
    this.router.navigate(['']);
  }
  changeLang(lang: string){
    this.translate.use(lang);
    switch(lang){
      case 'en': this.siteLanguage = "English"; break;
      case 'uz-Lat': this.siteLanguage = "O'zbek"; break;
      case 'uz-Cyrl': this.siteLanguage = "Ўзбек"; break;
      case 'ru': this.siteLanguage = "Русский"; break;
    }
  }
}
