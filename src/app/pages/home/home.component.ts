import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lowerLevel: number = 1;
  higherLevel: number = 15;
  order: number = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  validInputs(lower: Number, higher: Number): boolean {
    return !(lower > 15 || higher > 15 || lower < 1 || higher < 1);
  }

  start(): void {
    if (!this.validInputs(this.lowerLevel, this.higherLevel)){
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Levels must be between 1 and 15"
      })

      return;
    }
    if (this.lowerLevel > this.higherLevel) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Lower level can\'t be higher than higher level"
      })
      return;
    }
    this.router.navigate(['study', {lowerLevel: this.lowerLevel, higherLevel: this.higherLevel, order: this.order}])
  }

}
