
export function gregorianToJulianDate(year : number, month : number, day : number) : number {
  let y : number = month > 2 ? year : year -1;
  let m : number = month > 2 ? month : month + 12;
  let d : number = day;
  let b : number = 2- Math.floor(y / 100) + Math.floor(y / 400);
  let js : number = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m+1)) + d + b - 1524.5;
  return js;
}