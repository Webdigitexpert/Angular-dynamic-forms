import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../../services/auth/authentication.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
  }
  logOut(){
    this.authService.logout();
  }

}
