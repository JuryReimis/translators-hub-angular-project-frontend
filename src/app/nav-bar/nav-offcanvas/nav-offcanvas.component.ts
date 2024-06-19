import {Component, inject, Output, TemplateRef, ViewChild} from '@angular/core';

import {NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nav-offcanvas',
  standalone: true,
  imports: [NgbDatepickerModule],
  templateUrl: 'nav-offcanvas.component.html',
})
export class NavOffcanvasComponent {
  private offcanvasService = inject(NgbOffcanvas);
  closeResult = '';

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
