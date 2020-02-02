import { Component, OnInit } from '@angular/core';
import { CasesService } from 'src/app/services/cases.service';
import { CaseModel } from 'src/app/models/case.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {

  cases: CaseModel[] = [];
  loading = false;

  constructor(private caseService: CasesService) { }


  ngOnInit() {
    this.loading = true;
    this.caseService.getCases()
      .subscribe(resp => {
        this.cases = resp;
        this.loading = false;
      });
  }

  deleteCase(caseModel: CaseModel, i: number) {

    Swal.fire({
      title: 'Estas seguro(a)?',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Eh... mejor no'
    }).then((resp) => {
      if (resp.value) {
        this.caseService.deleteCase(caseModel.id)
          .subscribe(() => {
            this.cases.splice(i, 1);
          });
      }
    });
  }


}
