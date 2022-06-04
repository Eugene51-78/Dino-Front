import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-medic-page',
  templateUrl: './medic-page.component.html',
  styleUrls: ['./medic-page.component.css']
})
export class MedicPageComponent implements OnInit {

  currentOperation: any;

  constructor(private modalService: NgbModal) {

  }

  ngOnInit() {

  }

  openMultiModal(multiModal: any, type: any) {
    if (type === 1) {
      this.currentOperation = 'Отчет о медосмотре';
    }
    else {
        this.currentOperation = 'Направление дино на лечение';
    }
    console.log(multiModal)
    this.modalService.open(multiModal).result
      .then((result) => console.log('Modal closed'))
      .catch(err => '');
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    // const url = 'http://localhost:8888/friends/addnew';
    // this.httpClient.post(url, f.value)
    //   .subscribe((result) => {
    //     this.ngOnInit(); //reload the table
    //   });
    this.modalService.dismissAll(); //dismiss the modal
  }
}
