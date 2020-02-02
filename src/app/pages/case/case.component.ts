import { Component, OnInit } from '@angular/core';
import { CaseModel } from '../../models/case.model';
import { NgForm } from '@angular/forms';
import { CasesService } from 'src/app/services/cases.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  caseModel: CaseModel = new CaseModel();

  constructor(private caseService: CasesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.caseService.getCase(id)
        .subscribe((resp: CaseModel) => {
          this.caseModel = resp;
          this.caseModel.id = id;
        });
    }
  }


  manageCase(form: NgForm) {

    if (form.invalid) {
      console.error('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Guardando información',
      imageUrl: './assets/images/firebase-logo.png',
      imageWidth: 200,
      imageHeight: 100,
      allowOutsideClick: false
    });
    Swal.showLoading();

    if (this.caseModel.id) {
      this.caseService.updateCase(this.caseModel);
    } else {
      this.caseService.saveCase(this.caseModel)
        .subscribe((resp: CaseModel) => {
          console.log(resp);
          this.caseModel = resp;
        });
    }

    setTimeout(() => {
      Swal.close();
      Swal.fire({
        imageUrl: './assets/images/firebase-logo.png',
        imageWidth: 200,
        imageHeight: 100,
        timer: 2000,
        title: 'Información guardada correctamente',
      });
    }, 1000);

  }

}
