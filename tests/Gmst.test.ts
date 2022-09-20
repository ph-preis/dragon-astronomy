
import {gregorianDateToJulianDayNumber,
    julianDayNumberToGreenwichMeanSiderealTime,
    timeToDayFraction} from "../src";

describe('timeToDayFraction', () => {
    test('00:00:00', () => {
        expect(timeToDayFraction(0,0,0)).toBe(0);
    });

    test('06:00:00', () => {
        expect(timeToDayFraction(6,0,0)).toBe(0.25);
    });

    test('17:56:13', () => {
        expect(timeToDayFraction(17,56,13)).toBe(0.7473726851851852);
    });
});

describe('gregorianDateToJulianDayNumber', () => {

    test('recent date', () => {
        expect(gregorianDateToJulianDayNumber(2022, 9, 20)).toBe(2459842.5);
    });

    test('another recent date', () => {
        expect(gregorianDateToJulianDayNumber(2022, 1, 20)).toBe(2459599.5);
    });

    test('example 12.a from book', () => {
        expect(gregorianDateToJulianDayNumber(1987, 4, 10)).toBe(2446895.5);
    });

    test('example 12.b from book', () => {
        expect(gregorianDateToJulianDayNumber(1987, 4, 10 + timeToDayFraction(19, 21, 0))).toBe(2446896.30625);
    });
});

describe('julianDateToGreenwichMeanSiderealTime', () => {

    test('recent date 1', () => {
        expect(julianDayNumberToGreenwichMeanSiderealTime(2459842.5) % 86400).toBe(86128.71843741066);
    });

    test('example 12.a from book', () => {
        expect(julianDayNumberToGreenwichMeanSiderealTime(2446895.5) % 86400 + 86400).toBe(13*60*60 + 10*60 + 46.366827110294);
    });
});