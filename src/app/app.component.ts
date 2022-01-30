import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from './core/account.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  sideNavOpened = true;
  sideNavMode: 'side' | 'over' = 'side';
  toolBarHeight = 64;
  private readonly mediaWatcher: Subscription;
  rsideNavOpened: boolean = false;

  constructor(media: MediaObserver, private router: Router, public accountService: AccountService) {
    this.mediaWatcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'sm' || change.mqAlias === 'xs') {
        if (this.sideNavOpened) {
          this.sideNavOpened = false;
        }
        this.sideNavMode = 'over';
      } else {
        this.sideNavOpened = true;
        this.sideNavMode = 'side';
      }
      if (change.mqAlias === 'xs') {
        this.toolBarHeight = 56;
      } else {
        this.toolBarHeight = 64;
      }
      if(!this.accountService.isAuthenticated()){
        this.sideNavOpened = false;
      }
    });
  }
  ngOnInit() {
    this.accountService.getAuthenticationState().subscribe(user=>{
      if(!this.accountService.isAuthenticated()){
        this.sideNavOpened = false;
        this.rsideNavOpened = false;
      }
    })
    this.router.events.subscribe((val) => {
      if (this.sideNavMode == 'over')
        this.sideNavOpened = false;
    })
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();

  }
}
