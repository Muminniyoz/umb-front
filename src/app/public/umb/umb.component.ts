// umb.component.ts
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { Subject } from 'rxjs';

import * as XLSX from 'xlsx';
import { Dialog } from './dialog.component';
@Component({
  selector: 'app-umb',
  templateUrl: './umb.component.html',
  styleUrls: ['./umb.component.scss']
})
export class UmbComponent implements OnInit, AfterViewInit {

  isLinear = false;
  tanlanganAlgoritm = 1;
  selectedWB!: XLSX.WorkBook;
  selectedSheet: any;
  sheets: { name: string, data: any }[] = [];
  statusText = "";
  columns!: Array<any>;
  displayedColumns!: Array<any>;
  objectNameExist = true;
  observabele = new Subject<boolean>();
  hotSettings: Handsontable.GridSettings = {
    colHeaders: true,
    rowHeaders: true,
    contextMenu: true,
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    afterChange: this.ozgarish,
    afterChangesObserved: this.check
  };
  hotSettings1: Handsontable.GridSettings = {
    colHeaders: true,
    rowHeaders: true,
    contextMenu: true,
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    afterChange: this.ozgarish,
    afterChangesObserved: this.check
  };
  checking: boolean = false;
  progressValue: number = 0;
  progress: boolean = false;
  result: any[] = Array(20).fill(Array(20).fill('', 0, 20), 0, 20);
  ;
  step = 0;




  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  saqlash() {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    for (let sh of this.sheets) {

      /* generate worksheet */
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sh.data);

      /* generate workbook and add the worksheet */

      XLSX.utils.book_append_sheet(wb, ws, sh.name);
    }


    /* save to file */
    XLSX.writeFile(wb, 'ProDon.xlsx');
  }

  ngAfterViewInit(): void {

    this.http.get('assets/template/ProDon- UMB - example file.xlsx', { responseType: 'arraybuffer' }).subscribe(data => {
      this.seperate(data);
    },
      error => {
        this.yangiVaraq();
      });

  }
  onFileChange(evt: any) {


    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */

      const ab: ArrayBuffer = e.target.result;
      this.seperate(ab);

    };
    reader.readAsArrayBuffer(target.files[0]);
  }
  namunaYuklash() {
    window.open('assets/template/ProDon- UMB - example file.xlsx');
  }

  changesheet(sheet: any) {
    this.selectedSheet = sheet;
  }
  yangiVaraq() {
    this.sheets.push({
      name: 'sheet' + (this.sheets.length + 1),
      data: new Array(20).fill(new Array(20).fill('', 0, 20), 0, 20)
    });
    this.selectedSheet = this.sheets[this.sheets.length - 1]
  }

  seperate(ab: any) {
    this.sheets = [];

    this.selectedWB = XLSX.read(ab);

    for (let sh of this.selectedWB.SheetNames) {
      let data = <any>(XLSX.utils.sheet_to_json(this.selectedWB.Sheets[sh], { header: 1, rawNumbers: false }));

      this.sheets.push({
        name: sh,
        data: data
      });
    };
    this.selectedSheet = this.sheets[0];
  }
  ozgarish(changes: any, source: any): any {
    return changes;
  }
  check() {
    if (this.checking) return;
    this.checking = true;

    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./check.worker', import.meta.url));
      worker.onmessage = ({ data }) => {


        let errors = data;
        if (errors.length > 0) {
          this.xatoXabar(errors)
        } else {
          this.setStep(1);
        }
        this.checking = false;

      };
      worker.onerror = (data: any) => {
        this.checking = false;
      };

      worker.postMessage(this.selectedSheet.data)

    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.

    }

  }
  startCalculation() {
    this.progress = true;
    this.progressValue = 0;
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(new URL('./progress.worker', import.meta.url));
      worker.onmessage = (msg) => {

        const data = msg.data;
        switch (data.type) {
          case 'progress': {
            this.progressValue = data.progress;
            this.statusText = data.data;
          } break;
          case 'error': {
            this.progress = false;
            this.statusText = data.data;
          } break;
          case 'success': {
            this.progress = false;
            this.result = data.data;
            this.setStep(2);
          } break;
        }

      };
      worker.onerror = (error) => {

      }
      worker.postMessage(this.selectedSheet.data)
    } else {
      // xatolikk
      this.dialog.open(ShowDialog);
    }





  }
  saqlashNatija(berilgan: boolean) {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(this.result), "Natija");
    if(berilgan)
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(this.selectedSheet.data), "Kiruvchi");
    /* save to file */
    XLSX.writeFile(wb, 'Natija.xlsx');
  }

  xatoXabar(errors: string[]) {
    this.dialog.open(Dialog, {
      data: errors
    });
  }
  numberToMark(num: number) {
    if (1 <= num && num <= 26) {
      return String.fromCharCode(64 + num);
    } else if (num >= 26) {
      return String.fromCharCode(64 + Math.floor(num / 26)) + String.fromCharCode(64 + Math.floor(num % 26))
    }
    return '-';
  }

}

@Component({
  template: `<h2>Sizning brouzeringiz hisob kitob uchun yaroqli emas!<br>
  Ilimos boshqa brauzerdan kiring</h2>`
})
class ShowDialog {
  constructor() { }
}
