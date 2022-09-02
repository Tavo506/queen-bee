import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class UpdatePwaService {

  constructor(private readonly updates: SwUpdate) {
    this.updates.checkForUpdate().then(res => {
      if (res) {
        this.showAppUpdateAlert()
      }
    })
  }

  showAppUpdateAlert(): void {
    Swal.fire({
      icon: 'info',
      title: 'App Update available',
      text: "Choose Ok to update",
      showConfirmButton: true,
      confirmButtonText: "Ok",
      showCancelButton: true,
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed){
        this.update();
      }
    })
  }

  update(): void {
    this.updates.activateUpdate().then(() => {
      document.location.reload();
    });
  }
}
