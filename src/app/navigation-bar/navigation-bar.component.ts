import { Component, OnInit ,ViewChild , ElementRef} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  collapsed = true;
  @ViewChild('navbarMenu') navbarMenu:ElementRef;

  constructor() { }

  ngOnInit(): void {
this.handleSmallScreens()
}

// Open links in mobiles
 handleSmallScreens() {
  document.querySelector('.navbar-toggler')
    .addEventListener('click', () => {
    // let navbarMenu = document.querySelector('.navbar-menu')

    if (this.navbarMenu.nativeElement.style.display === 'flex') {
      this.navbarMenu.nativeElement.style.display = 'none'
      return
    }

    this.navbarMenu.nativeElement.style.display = 'flex'
  })
}

}
