import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public menus = [
    {
      title: "Transactions",
      url: "/menu/transaction",
      icon: "cart"
    },
    {
      title: "Détails",
      url: "/menu/details",
      icon: "options"
    },
    {
      title: "Deconnexion",
      url: "/menu/deconnexion",
      icon: "log-out"
    }
  ]

  constructor( private router: Router) { }

  ngOnInit() {
  }

  onMenuItem(menu) {
    this.router.navigateByUrl(menu.url)
  }
}
