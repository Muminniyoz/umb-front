import {Component, ViewChild, ViewEncapsulation, OnInit, OnDestroy} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';

// TODO KERAK BO'LGANDA QO'SHILSIN
@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit, OnDestroy {
    public result: string = '';

  constructor() { }
   
  @ViewChild(QrScannerComponent, { static: false })
  qrScannerComponent!: QrScannerComponent;
    title = 'angular-qrscanner';
  ngOnInit(): void {
  }
  ngAfterViewInit():void{
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
              videoDevices.push(device);
          }
      }
      if (videoDevices.length > 0){
          let choosenDev;
          for (const dev of videoDevices){
              if (dev.label.includes('back')){
                  choosenDev = dev;
                  break;
              }
          }
          if (choosenDev) {
              this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else {
              this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
      }
  });

  this.qrScannerComponent.capturedQr.subscribe(result => {
      console.log(result);
      this.result = result;
  });
  }
  ngOnDestroy(): void {
        this.qrScannerComponent.stopScanning();
}
}
