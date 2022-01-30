import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Handsontable from 'handsontable';
import { createSpreadsheetData } from 'handsontable/helpers';
import { Subject, SubjectSubscriber } from 'rxjs/internal/Subject';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-umb',
  templateUrl: './umb.component.html',
  styleUrls: ['./umb.component.scss']
})
export class UmbComponent implements OnInit, AfterViewInit {

  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  ready = false;


  selectedWB!: XLSX.WorkBook;
  selectedSheet: any;
  sheets: any = [];

  columns!: Array<any>;
  displayedColumns!: Array<any>;
  shablon: any = [
    [
      "tjf",
      "<soha nomi>",
      "<1-alomat tur>",
      "<2-alomat tur>",
      "<3-alomat tur>",
      "…",
      "<sinflar soni>",
      null,
      null
    ],
    [
      "ton",
      "<obyekt nomi>",
      "<1-alomat nom>",
      "<2-alomat nom>",
      "<3-alomat nom>",
      "…",
      "sinf"
    ],
    [],
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "<soha nom> bu o'rganilayotgan sohadir. Masalan: talabalar xarakteri\r\n<obyekt nomi> - real tajraba obyekti: Masalan: Sardor Jo'rayev\r\n<alomat tur> - obyekt xususiyatining tur: Masalan: NOMINAL, BINARY, NUMERIC\r\n<alomat nom> berilgan obyekt alamoatining nomi: Masalan: Soch rangi.\r\n2-varaqda namuna ko'rsatilgan"
    ],
    [], [], [], [], [],
    [], [], [], [], [],
    [], [], [], [], []
  ];
  dataSource = this.shablon;
  observabele = new Subject<boolean>();
  hotSettings: Handsontable.GridSettings = {
    colHeaders: true,
    rowHeaders: true,
    contextMenu: true,
    height: 'auto',
    licenseKey: 'non-commercial-and-evaluation',
    afterChange: this.ozgarish,
    afterChangesObserved: this.check
  };;




  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });


  }
  yuklash() {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.dataSource);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  ngAfterViewInit(): void {


  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      console.log(e);

      const ab: ArrayBuffer = e.target.result;
      this.selectedWB = XLSX.read(ab);
      this.sheets = this.selectedWB.SheetNames;
      console.log(this.sheets);
      
      this.changesheet(this.sheets[0])


    };
    reader.readAsArrayBuffer(target.files[0]);
  }
  namunaYuklash() {
    window.open('assets/template/UMB - shablon.xlsx')
  }
  reset() {

    this.dataSource = this.shablon;
  }
  changesheet(name: string) {
    const ws: XLSX.WorkSheet = this.selectedWB.Sheets[name];


    this.selectedSheet = 0;
    /* save data */
    let data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    if (typeof data == "object") {
      this.seperate(data);

    }
  }

  seperate(data: any[]) {

    this.displayedColumns = data[1];
    // data.splice(0, 2);
    this.dataSource = data;
  }
  ozgarish(changes: any, source: any): any {
    this.ready = false;


    return changes;
  }
  check() {
    console.log(this.dataSource)
  }

}



