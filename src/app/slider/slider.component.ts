import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
   images:any=['../../assets/img/s4.jpg','../../assets/img/s3.jpg','../../assets/img/s1.jpg','../../assets/img/s2.jpg'];

 
  constructor() { }

  ngOnInit(): void {

  }

}
