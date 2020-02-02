export class CaseModel {
  id: string;
  name: string;
  lastname: string;
  phone: string;
  state: string;

  constructor() {
    this.state = 'Abierto';
  }
}
