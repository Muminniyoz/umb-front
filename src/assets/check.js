self.onmessage = function (e) {


  check(e.data);
}


function check(d) {
  let errors = [];
  // 1-maydonni tekshirish

  const qatorSon = d.length;
  const ustunSon = d[0].length;
  if ((d[0][0] + '').toUpperCase() != 'TJF') {
    errors.push(`A1 (${d[0][0]}) - 'TJF' bo'lishi shart: `);
  }
  if ((d[1][0] + '').toUpperCase() != 'TON') {
    errors.push(`A2 (${d[1][0]}) - 'TON' bo'lishi shart`);
  }
  if ((d[1][ustunSon - 1] + '').toUpperCase() != 'SINF') {
    errors.push(`${numberToMark(ustunSon)}2 (${d[1][ustunSon - 1]}) - 'SINF' bo'lishi shart`);
  }
  for (let i = 2; i < ustunSon - 1; i++) {
    if (!(+d[0][i] == 0 || +d[0][i] == 1)) {
      errors.push(`${numberToMark(i + 1)}1 (${d[0][i]}) - 0(nominal) yoki 1(miqdoriy) sonlaridan biri bo'lishi shart`);
    }
  }




  const kodlar = new Set()
  for (let i = 2; i < qatorSon; i++) {
    kodlar.add(d[i][0]);
    if (!(d[i][0])) {
      errors.push(`${numberToMark(1)}${i + 1} (${d[i][0]}) - Obyekt kodi berilish shart`);
    }
  }
  if (kodlar.size < qatorSon - 2) {
    errors.push(`Obyekt kodilarini tekshiring ular bir xil bo'lmasligi zarur`);
  }


  if (!(+d[0][ustunSon - 1] > 0)) {
    errors.push(`${numberToMark(ustunSon)}1 (${d[0][ustunSon - 1]}) - sinflar soni 0 dan katta bo'lishi shart`);
  }

  for (let i = 2; i < ustunSon; i++) {
    if (d[0][i] == 1) {
      for (let j = 2; j < qatorSon; j++) {
        if (!d[j][i] || isNaN(+d[j][i])) {
          errors.push(`${numberToMark(i + 1)}${j + 1} (${d[j][i]}) - son bo'lishi shart`);
        }
      }
    } else {
      for (let j = 2; j < qatorSon; j++) {
        if (!d[j][i]) {
          errors.push(`${numberToMark(i + 1)}${j + 1} (${d[j][i]}) - bo'sh bo'lmasligi shart`);
        }
      }
    }

  }

 let i = 1;
 while(i<1000000) Math.pow(i, 3)*Math.sin(i);

  self.postMessage(errors);
}
function numberToMark(num) {
  if (1 <= num && num <= 26) {
    return String.fromCharCode(64 + num);
  } else if (num >= 26) {
    return String.fromCharCode(64 + Math.floor(num / 26)) + String.fromCharCode(64 + Math.floor(num % 26))
  }
  return '-';
}