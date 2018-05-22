import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menus',
  templateUrl: 'menus.html',
})
export class MenusPage {

  rootPage = TabsPage;

  @ViewChild(Nav) nav: Nav;

  pages: PageInterface[] = [
    {title: 'Inicio', pageName: 'TabsPage', tabComponent: 'LandingPage', index: 0, icon: 'home'},
    {title: 'Diario', pageName: 'TabsPage', tabComponent: 'DiarioPage', index: 1, icon: 'calendar'},
    {title: 'Informes', pageName: 'TabsPage', tabComponent: 'InformesPage', index: 2, icon: 'stats'},
    {title: 'Peso', pageName: 'TabsPage', tabComponent: 'PesoPage', index: 3, icon: 'disc'}
    //{title: 'Special', pageName: 'SpecialPage', icon: 'home'}
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(page: PageInterface){
    let params = {};
    if (page.index){
      params = { tabIndex: page.index };
    }
    if (this.nav.getActiveChildNav() && page.index != undefined){
      this.nav.getActiveChildNav().select(page.index);
    } else {
      this.nav.setRoot(page.pageName, params);
    }
  }
  isActive(page: PageInterface){
    let childNav = this.nav.getActiveChildNav();
    if (childNav){
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent){
        return 'primary';
      }
      return;
    }
    if(this.nav.getActive() && this.nav.getActive().name === page.pageName){
      return 'primary';
    }
  }

}
