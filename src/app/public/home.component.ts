import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { HisobService } from 'src/app/shared/service/hisob.service';
import { MessageTexts } from '../core/message-texts';
import { TranzaksiyaService } from '../shared/service/tranzaksiya.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {


  siteLanguage: string = "";
  hisoblar: any;

  constructor(private hisobService: HisobService, private transService: TranzaksiyaService, private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document, private translate: TranslateService) { }
  ngAfterViewInit(): void {
  }


  ngOnInit() {
    this.translate.get('home').subscribe((home: any) => {
      MessageTexts.errorMessage = home["message-error"];
      MessageTexts.loginError = home["message-login-error"];
      MessageTexts.successMessage = home["message-success"];
    });
    switch (this.translate.defaultLang) {
      case 'en': this.siteLanguage = "English"; break;
      case 'uz-Lat': this.siteLanguage = "O'zbek"; break;
      case 'uz-Cyrl': this.siteLanguage = "Ўзбек"; break;
      case 'ru': this.siteLanguage = "Русский"; break;
    }
   


  }
 
  changeLang(lang: string) {
    if (lang) {
      this.translate.use(lang);
      localStorage.setItem('lang', lang);
      this.translate.get('home').subscribe((home: any) => {
        MessageTexts.errorMessage = home["message-error"];
        MessageTexts.loginError = home["message-login-error"];
        MessageTexts.successMessage = home["message-success"];
      });
    }
    switch (lang) {
      case 'en': this.siteLanguage = "English"; break;
      case 'uz-Lat': this.siteLanguage = "O'zbek"; break;
      case 'uz-Cyrl': this.siteLanguage = "Ўзбек"; break;
      case 'ru': this.siteLanguage = "Русский"; break;
    }

  }

}

