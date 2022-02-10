import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Handsontable from 'handsontable';
import { createSpreadsheetData } from 'handsontable/helpers';
import { Subject, SubjectSubscriber } from 'rxjs/internal/Subject';
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
  checking: boolean = false;
  ;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }




  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    this.http.get('assets/template/ProDon- UMB - example file.xlsx', { responseType: 'arraybuffer' }).subscribe(data => {
      this.seperate(data);
    },
      error => {
        this.yangiVaraq();
      })
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


  }
  onFileChange(evt: any) {
    console.log(evt);

    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      console.log(e);
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
      this.sheets.push({
        name: sh,
        data: <any>(XLSX.utils.sheet_to_json(this.selectedWB.Sheets[sh], { header: 1 }))
      })
    };

    this.selectedSheet = this.sheets[0];
  }


  ozgarish(changes: any, source: any): any {

    console.log(source);


    return changes;
  }
  check() {
    if (this.checking) return;
    this.checking = true;
    let errors: string[] = [];
    // 1-maydonni tekshirish
    const d = this.selectedSheet?.data;
    const qatorSon = d.length;
    const ustunSon = d[0].length;
    if ((d[0][0] + '').toUpperCase() != 'TJF') {
      errors.push(`A1 (${d[0][0]}) - 'TJF' bo'lishi shart: `);
    }
    if ((d[1][0] + '').toUpperCase() != 'TON') {
      errors.push(`A2 (${d[1][0]}) - 'TON' bo'lishi shart`);
    }
    if ((d[1][ustunSon - 1] + '').toUpperCase() != 'SINF') {
      errors.push(`${this.numberToMark(ustunSon)}2 (${d[1][ustunSon - 1]}) - 'SINF' bo'lishi shart`);
    }
    for (let i = 2; i < ustunSon - 1; i++) {
      if (!(+d[0][i] == 0 || +d[0][i] == 1)) {
        errors.push(`${this.numberToMark(i + 1)}1 (${d[0][i]}) - 0(nominal) yoki 1(miqdoriy) sonlaridan biri bo'lishi shart`);
      }
    }


    if (!(+d[0][ustunSon - 1] > 0)) {
      errors.push(`${this.numberToMark(ustunSon)}1 (${d[0][ustunSon - 1]}) - sinflar soni 0 dan katta bo'lishi shart`);
    }

    for (let i = 2; i < ustunSon; i++) {
      if (d[0][i] == 1) {
        for (let j = 2; j < qatorSon; j++) {
          if (!d[j][i] ||  isNaN(+d[j][i])) {
            errors.push(`${this.numberToMark(i + 1)}${j + 1} (${d[j][i]}) - son bo'lishi shart`);
          }
        }
      } else {
        for (let j = 2; j < qatorSon; j++) {
          if (!d[j][i]) {
            errors.push(`${this.numberToMark(i + 1)}${j + 1} (${d[j][i]}) - bo'sh bo'lmasligi shart`);
          }
        }
      }

    }




    if (errors.length > 0) {
      this.xatoXabar(errors)
    } else {
      this.setStep(1);
    }
    this.checking = false;

  }
  startCalculation() {

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
