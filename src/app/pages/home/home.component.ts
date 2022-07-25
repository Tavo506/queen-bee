import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lowerLevel: number = 1;
  higherLevel: number = 15;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  start(): void {
    if (this.lowerLevel > this.higherLevel) {
      alert('Lower level can\'t be higher than higher level');
      return;
    }
    this.router.navigate(['study', {lowerLevel: this.lowerLevel, higherLevel: this.higherLevel}])
  }

}
