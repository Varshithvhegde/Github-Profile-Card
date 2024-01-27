export function nFormatter(value: number): string | number {
    if (!(value >= 1000)) return value;
  
    let newValue: number | string = value;
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    let suffixNum = 0;
  
    while (newValue >= 1000) {
      newValue /= 1000;
      suffixNum += 1;
    }
  
    newValue = newValue.toPrecision(3);
  
    newValue += suffixes[suffixNum];
    return newValue;
  }
  