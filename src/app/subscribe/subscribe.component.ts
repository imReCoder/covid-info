import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './../services/apiService/api-service.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Location } from '@angular/common';
import { State } from './../models/state.model';
import { District } from './../models/district.model';
import { Center } from './../models/center.model';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
  host: {
    '(document:click)': 'windowClick($event)',
  },
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('100ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ],
    ),
    trigger(
      'enterAnimationDropDown', [
      transition(':enter', [
        style({ transform: 'translateY(-10%)', opacity: 0 }),
        animate('100ms', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(10%)', opacity: 1 }),
        animate('100ms', style({ transform: 'translateY(0%)', opacity: 0 }))
      ])
    ],
    ),
  ],
})


export class SubscribeComponent implements OnInit {
  active:number = 1; // for pincode and district tab
  focusState: boolean = false;
  focusDistrict: boolean = false;

  inputPincode: string = '';
  
  statesData;
  filteredStatesData;

  districtData;
  filteredDistrictData;

  selectedState: string = 'Select Your State';

  selectedDistrict = {
    name: 'Select Your District',
    _id: ""
  }
  statesSearchQuery: string = '';
  districtSearchQuery: string = '';

  allCenters;
  allCentersFiltered;

  dose: string = 'Dose - 1';
  vaccineType: string = "Vaccine(2)"
  vaccines = {
    'COVAXIN': { name: 'COVAXIN', checked: true },
    'COVIESHIELD': { name: 'COVISHIELD', checked: true }
  }

  hospitalName: string = '';
  noCenters: boolean = false;
   showSkeletonCenters:boolean=false;
   showSkeletonDistrict:boolean=false;
  constructor( private api: ApiServiceService, private location: Location) { }

  ngOnInit(): void {
    this.api.getStates().subscribe(data => { //get all states on page load
      this.statesData = data;
      this.filteredStatesData = data;
      console.log(data);
    })

  }

  goBack(): void {
    this.location.back();
  }

  switchTab(t){
    if(this.active!=t){
      this.allCenters=null;
      this.allCentersFiltered=null;
      this.inputPincode='';
      this.statesSearchQuery='';
      this.districtSearchQuery=''
    }
    
    this.active=t;
  }

  //get centers by pincode
  getByPincode() {
    this. showSkeletonCenters =true;
    this.noCenters=false;

    this.api.getCentersByPin(this.inputPincode).subscribe(data => {
      this.allCenters = data;
      this.allCentersFiltered = data;
      if (this.allCenters.length == 0) {
        this.noCenters = true;
      } else {
        this.noCenters = false;
      }
      console.log(this.allCenters);
      this. showSkeletonCenters =false;

    })
  }


  //get centers by district
  getByDistrict() {
    this. showSkeletonCenters =true;
    this.noCenters=false;
    this.api.getCentersByDistrict(this.selectedDistrict._id).subscribe(data => {
      this.allCenters = data;
      this.allCentersFiltered = data;
      if (this.allCenters && this.allCenters.length == 0) {
        this.noCenters = true;
      } else {
        this.noCenters = false;
      }
      console.log(this.allCenters);
      this. showSkeletonCenters = false;
    })
  }

    resetCenterData(){
      this.allCenters = null;
      this.allCentersFiltered = null;
    
    }
    
unFocusDistricInputs(){
  this.focusDistrict = false;
    this.focusState = false;
}

stateInputClick(){
  this.focusState=true;
  this.selectedState='Select Your State';
  this.resetCenterData();
}

districtInputClick():void{
  this.focusDistrict=true;
  this.districtSearchQuery='';
  this.resetCenterData();
}

  // for state district
  selectState(state):void { // take the value of selected state
    this.showSkeletonDistrict=true;
    this.resetCenterData();
    this.statesSearchQuery = state.stateName;
    this.districtSearchQuery = '';
    this.unFocusDistricInputs();

    this.api.getDistrict(state._id).subscribe(data => {
      this.districtData = data;
      this.filteredDistrictData = data;
      this.showSkeletonDistrict=false;
    })

  }

  selectDistrict(district):void {
    this.selectedDistrict = district;
    this.districtSearchQuery = district.districtName;
    this.unFocusDistricInputs();
    this.getByDistrict(); // get all centers for selected district
  }


  windowClick(e) {//close dropdown 
    if (e.srcElement.className.includes('sInput') || e.srcElement.className.includes('dInput')) {
    } else {
      this.focusState = false;
      this.focusDistrict = false;
    }
  }

  searchState(value: string): void {
    this.filteredStatesData = this.statesData.filter((val) => val.stateName.toLowerCase().includes(value));
  }
  searchDistrict(value: string): void {
    this.filteredDistrictData = this.districtData.filter((val) => val.districtName.toLowerCase().includes(value));
  }


  searchHospital(value: string): void {
    this.allCentersFiltered = this.allCenters.filter((val) => val.name.toLowerCase().includes(value) || val.address.toLowerCase().includes(value));
  }



  //filters 
  changeDose(name):void{
    this.dose = name;
  }
  vaccineTypeChange():void {
    let all = true;
    for (let key in this.vaccines) {
      if (!this.vaccines[key].checked) {
        all = false;
      }
    }
    if (all) {
      this.vaccineType = 'Vaccine(2)';
    } else {
      if (this.vaccines['COVAXIN'].checked) {
        this.vaccineType = 'COVAXIN';

      } else if (this.vaccines['COVIESHIELD'].checked) {
        this.vaccineType = 'COVIESHIELD';
      } else {
        this.vaccineType = 'Vaccine(0)';
      }
    }
    console.log(this.vaccines);
  }

  

}
