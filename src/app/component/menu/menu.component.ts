
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../login/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  constructor(private authService: AuthService) { }

  // isChecked: boolean= false;

  ngOnInit(): void {
   }

  logout() {
    this.authService.logout();
  }

}
