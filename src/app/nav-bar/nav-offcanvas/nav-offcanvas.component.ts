import {Component, inject, Input, Output, TemplateRef, ViewChild} from '@angular/core';

import {NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'nav-offcanvas',
  standalone: true,
  imports: [NgbDatepickerModule, NgIf, RouterLink],
  templateUrl: 'nav-offcanvas.component.html',
})
export class NavOffcanvasComponent {
  private offcanvasService = inject(NgbOffcanvas);
  closeResult = '';

  user_logged: string = 'Hey'
  @Output() authentication_status: string = 'Логин'

  @Input() user: string = '';

  @ViewChild('content') content!: TemplateRef<any>

  @Output() open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {scroll: true, position: "end", ariaLabelledBy: 'offcanvas-basic-title'}).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
