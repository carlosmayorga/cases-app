import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CaseModel } from '../models/case.model';
import {environment} from '../../environments/environment';
import {map, delay} from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CasesService {

  private URL = environment.firebaseUrl;

  constructor(private firebase: HttpClient) {}

  saveCase(caseModel: CaseModel) {
    return this.firebase.post(`${this.URL}/cases.json`, caseModel)
      .pipe(
        map((resp: any) => {
          caseModel.id = resp.name;
          return caseModel;
        })
      );
  }

  updateCase(caseModel: CaseModel) {
    const spreadCase = {
      ...caseModel
    };
    delete spreadCase.id;

    return this.firebase.put(`${this.URL}/cases/${caseModel.id}.json`, spreadCase).subscribe();
  }

  getCases() {
    return this.firebase.get(`${this.URL}/cases.json`)
      .pipe(
        map( resp => {
          if (resp === null) {return []; }

          const cases: CaseModel[] = [];
          Object.keys(resp).forEach(key => {
          const caseModel: CaseModel = resp[key];
          caseModel.id = key;
          cases.push(caseModel);
          });
          return cases;
        }),
        delay(1000)
      );
  }

  getCase(id: string) {
    return this.firebase.get(`${this.URL}/cases/${id}.json`);
  }

  deleteCase(id: string) {
    return this.firebase.delete(`${this.URL}/cases/${id}.json`);
  }

}
