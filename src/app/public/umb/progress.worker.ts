/// <reference lib="webworker" />
import { Subject } from "rxjs";
addEventListener('message', ({ data }) => {
  UMB.start(data).subscribe((d) => {
    postMessage(d);
  });
});


interface Record {
  u11: number;
  u12: number;
  u21: number;
  u22: number;
  k: number;
  t: number;
  c0: number;
  c1: number;
  c2: number;
  w: number;
}
interface Record1 {
  t: number;
  k: number;
  r: number;
}
class UMB {
  private static subject$: Subject<{ type: string, data: any }> = new Subject<any>();
  static allWork = 0;
  static sohaNom = '';
  static data: any[];
  static obyektNomlar: any[] = [];
  static alomatNomlar: any[] = [];
  static alomatTur: any[] = [];
  static obyektSinflar: any[] = [];


  static sinfSon = 0;
  // sinf turlar
  static sinfTurlar: any[] = [];
  // har bir sinfdan nechtadan borligi
  static sinfAzoSon = [0, 0, 0];
  // faqat qiymatlar matritsasi
  static a: any[] = [];
  static ax: any[] = [];
  static cc: any[] = [];
  static n = 0;
  static m = 0;

  static R: Record[] | any[] = [];
  static rs: Record1[] | any[] = [];
  static rm: Record1 | any;

  // natijalarni yozib olish uchun
  static result: any[] = [];






  public static start(data: any[]) {
    this.data = data;

    this.allWork += 1;
    setTimeout(() => {
      this.seperate();
    }, 10);

    return this.subject$;
  }
  private static seperate() {
    this.allWork += 1;
    const d = this.data;
    // qatorlar soni
    this.n = d.length;
    // ustunlar soni
    this.m = d[0].length;
    let m = this.m;
    let n = this.n;
    this.sohaNom = d[0][1];
    // birinchi qator
    let mas: any[] = [];
    mas.push([]);
    // alomatlarni o'qib olish
    for (let i = 0; i < m - 3; i++) {
      this.alomatNomlar[i] = d[1][i + 2];
      // a - massivning birinchi qatoriga alaomat turi. 0, yoki 1 o'qib olish
      mas[0][i] = d[0][i + 2];

    }
    this.sinfSon = d[0][m - 1];

    for (let i = 2; i < n; i++) {
      // Har bir qatorda obyekt nomi o'qib olinmoqda 
      this.obyektNomlar[i - 1] = d[i][1];
      // Har bir obyekt miqdorlari o'qib olinmoqda

      mas.push([]);
      for (let j = 2; j < m - 1; j++) {
        mas[i - 1][j - 2] = d[i][j];
      }
      // sinflar o'qib olinmoqdakl
      this.obyektSinflar[i - 2] = (d[i][m - 1] + "").trim();
    }

    // a massiv bo'yicha
    this.m -= 3;
    this.n -= 2;
    this.a = mas;
    this.sinflarniSanash();


    for (let al = 0; al < m; al++) {

      if (mas[0][al] == 1) {
        this.p_miqdory(al);
      } else {
        this.nominal(al);
      }
    }
    this.R.sort((a, b) => b.w - a.w);



    for (let i = 0; i < this.n; i++) {
      this.ax.push([]);
    }
    for (let i = 0; i < 4; i++) {
      this.cc.push([]);
    }
    // hisoblash
    for (let al = 0; al < this.m; al++) {
      if (mas[0][al] == 1) {

        this.miqdoriy(al, [-1, 1][Math.floor(Math.random() * 2)]);
      }
    }


    // natijani yozish

    this.result.push(Array(10).fill('', 0, 10));
    this.result[0][0] = "Natija";
    this.result.push([]);
    this.result.push(["Alomatlar hissasi"]);
    this.result.push(['№', 'Alomat', 'c0', 'c1', 'c2', 'Alomat vazni']);
    for (let i = 0; i < this.m; i++) {
      this.result.push([i + 1, this.alomatNomlar[this.R[i].k], this.R[i].c0, this.R[i].c1, this.R[i].c2, this.R[i].w]);
    }

    // R(S) ni hisoblash
    this.RotS();

    this.subject$.next({
      type: 'success',
      data: this.result
    })





  }

  // R(S) jadvalini hosil qilish
  static RotS() {
    let c = [];
    for (let i = 0; i < this.n; i++) {
      let s = 0;
      for (let j = 0; j < this.m; j++) {
        s += this.ax[i][j];
      }
      this.ax[i][0] = s;
      c[i] = s;

    }
    console.log(c);

    console.table(this.ax);

  }
  static miqdoriy(al: number, ti: number) {
    this.ax[0][al + 1] = ti;


    let w = ti * this.cc[3][al];
    let p = this.cc[2][al] - this.cc[0][al];

    for (let i = 1; i < this.n; i++) {
      this.ax[i][al + 1] = w * (this.a[i][al] - this.cc[1][al]) / p;
      // console.log(i, ti,  w, p, (this.a[i][al] - this.cc[1][al]), this.ax[i][al]);

    }

  }
  // nominal ustunlarni hisoblahs
  static nominal(al: number) {

  }
  // miqdoriy alomatlarni hisoblash
  static p_miqdory(al: number) {


    let col = [];
    let cd = [];
    for (let i = 1; i < this.n; i++) {
      col[i - 1] = this.a[i][al];
    }


    col.sort((a, b) => b - a);

    cd = [...new Set(col)];


    let x = cd.length - 1;
    // yagonaQiymatlar[0] = tanlanganUstun[0];

    // let x = 0;
    // for(let i = 1; i<this.n; i++){
    //   if(yagonaQiymatlar[x] != tanlanganUstun[i]){
    //     x++;
    //     yagonaQiymatlar[x] = tanlanganUstun[i];
    //   }
    // }


    // Jadvalni to'ldirish
    let natija = this.wmax(al, cd[1]);
    this.R[al] = {};
    this.R[al].u11 = natija.u[1][1];
    this.R[al].u12 = natija.u[1][2];
    this.R[al].u21 = natija.u[2][1];
    this.R[al].u22 = natija.u[2][2];
    let max = natija.wmax;

    let c1 = cd[1];

    for (let i = 2; i < x; i++) {
      let p = this.wmax(al, cd[i]);
      if (max < p.wmax) {
        c1 = cd[i];
        max = p.wmax;

        this.R[al].u11 = p.u[1][1];
        this.R[al].u12 = p.u[1][2];
        this.R[al].u21 = p.u[2][1];
        this.R[al].u22 = p.u[2][2];
      }

    }

    this.R[al].k = al;
    this.R[al].c0 = cd[x];
    this.R[al].c1 = c1;
    this.R[al].c2 = cd[0];
    this.R[al].w = max;

    this.cc[0][al] = this.R[al].c0;
    this.cc[1][al] = this.R[al].c1;
    this.cc[2][al] = this.R[al].c2;
    this.cc[3][al] = this.R[al].w;
  }
  static wmax(al: number, c1: number) {

    let u = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    // U larni hisoblash
    for (let i1 = 0; i1 < this.n - 1; i1++) {
      if (this.obyektSinflar[i1] == this.sinfTurlar[0]) {
        if (this.a[i1 + 1][al] <= c1) {
          u[1][1]++;
        } else {
          u[1][2]++;
        }
      } else if (this.obyektSinflar[i1] == this.sinfTurlar[1]) {
        if (this.a[i1 + 1][al] <= c1) {
          u[2][1]++;
        } else {
          u[2][2]++;
        }
      } else {
        throw new Error('Faqat 2 ta sinf qaralishi kerak')
      }
    }


    // W ni hisoblash
    let s1 = 0, s2 = 0, s3 = 0, s4;
    for (let i1 = 1; i1 <= 2; i1++) {
      s1 += u[i1][1] * (u[i1][1] - 1) + u[i1][2] * (u[i1][2] - 1);
      let k = this.sinfAzoSon[this.sinfTurlar[i1 - 1]];
      s2 += Math.abs(k) * Math.abs(k - 1);
      s4 = 0;
      for (let j1 = 1; j1 <= 2; j1++) {
        s4 += u[j1][i1] * (Math.abs(this.sinfAzoSon[this.sinfTurlar[2 - j1]]) - u[3 - j1][i1])
      }
      s3 += s4;
    }

    let wmax = (s1 / s2) * (s3 / (2 * Math.abs(this.sinfAzoSon[this.sinfTurlar[0]]) * Math.abs(this.sinfAzoSon[this.sinfTurlar[1]])))

    return {
      u: u,
      wmax: wmax
    };
  }



  // k1k2 - sinflarni ajratib obyketlar sonini hisoblash
  static sinflarniSanash() {

    this.sinfTurlar = this.obyektSinflar.filter((value, i, arr) => {
      return arr.indexOf(value) == i;
    });
    this.sinfSon = this.sinfTurlar.length;


    for (let t of this.sinfTurlar) {
      this.sinfAzoSon[t] = 0;
    }

    for (let i = 0; i < this.n; i++) {
      this.sinfAzoSon[this.obyektSinflar[i]]++;
    }

  }

  private static changeProgress(value: number) {
    this.subject$.next({
      type: 'progress',
      data: this.allWork / 100 * value
    });
  }
}