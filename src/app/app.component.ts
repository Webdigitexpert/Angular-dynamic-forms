import { Component,OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Navigation } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cmsAdmin';
  public isLogin:boolean = false;
  constructor(private router:Router) {}

  ngOnInit() {
    this.router.events.forEach((event) => {
      if( event instanceof NavigationStart){
        if(event['url']==='/login' || event['url']==='/'){
          this.isLogin = true;
        }
        else{
          this.isLogin = false;
        }
      }
    })
  }

}
