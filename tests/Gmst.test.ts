
import {
    EquatorialCoordinate, greenwichMeanSiderealTimeToLocalMeanSiderealTime, gregorianDateToJulianDayNumber,
    julianDayNumberToGreenwichMeanSiderealTime,
    timeToDayFraction
} from "../src";
import {timeOfDayToSiderealSeconds} from "../src/SiderealTime";

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

describe('starCoordinates', () => {

    test('polaris', () => {
        let polaris = EquatorialCoordinate.fromTimeAndDegree(89, 15, 50.8, 2, 31, 49.09);

        expect(polaris.rightAscension).toBe(0.6624317181687095);
        expect(polaris.declination).toBe(1.5579526427549426);
    });

});

/* data for the next test:
Current date (local): 2022-11-06 20:00:29
Current date (UTC): 2022-11-06 19:00:29
Julian date (current UTC): 2459890.2920023147
Julian date (0h UTC): 2459889.5
GMST (0h UTC): 10846.820783706382s = 03:00:46
GMST (current UTC): 79463.17318261741s = 22:04:23
Berlin Longitude: 13.41°E = 3218.3999999999996s
Berlin MST (current UTC): 82681.57318261731s = 22:58:01
Berlin stardate (current UTC): 344.50655492757215° = 6.012773678188829rad
Berlin latitude: 52.52°N = 0.9166469231474219rad
Polaris right ascension: 2h 31m 49s = 0.6626142505196472rad
Polaris declination: +89° 15' 51'' = 1.557953612382305rad
Polaris azimuth: 0.017127232361280796rad = 0.9813181290412728° =0°58'0.8790877424763677''
Polaris altitude: 0.9242232902032961rad = 52.95409385634355°
Mizar azimuth: 5.906936254323217rad = 338.44251722553537° =338°26'0.5510335321221183''
Mizar altitude: 0.37716758735416495rad = 21.61011092452545°
 */
describe('localMST', () => {

    test('local mst', () => {

        let jdnUtc0 = gregorianDateToJulianDayNumber(2022, 11, 6);
        expect(jdnUtc0).toBe(2459889.5);

        let gmstUtc0 = julianDayNumberToGreenwichMeanSiderealTime(jdnUtc0);
        expect(gmstUtc0 % 86400).toBe(10846.820783706382); // GMST 0 UTC

        let gmst = gmstUtc0 + timeOfDayToSiderealSeconds(19, 0, 29);
        expect(gmst % 86400).toBe(79463.17318261741); // GMST at 19:00:29 UTC

        let lmst = greenwichMeanSiderealTimeToLocalMeanSiderealTime(gmst, 13.41 /* Berlin longitude*/);
        expect(lmst).toBe(82681.57318261731); // LMST Berlin is 22:58:01 at 19:00:29 UTC

    });

});