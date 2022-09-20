# dragon-astronomy
Typescript library for astronomy calculations.

Based on formulas from:
Meeus, Jean: Astronomical Algorithms. Second edition. Richmond, Virginia, 1998.

#### Calculating Greenwich Mean Sidereal Time (GMST)

Get the julian date number (JDN) at 00:00:00 UT (Universal Time) by using:

``let jdn : number = gregorianDateToJulianDayNumber(newDate.getUTCFullYear(), newDate.getUTCMonth()+1, newDate.getUTCDate())``

Get GMST (in seconds) at 00:00:00 UT by using the JDN:

``let gmst : number = julianDayNumberToGreenwichMeanSiderealTime(jdn)``

Get GMST at another time (e.g. 16:15:27) of the day by adding the sidereal seconds (a sidereal second is 1.00273790935 times a calendar second):

``let gmst_at_16_15_27 = gmst + 1.00273790935(16+60*60 + 15+60 + 27)``

The result can contain several days and can be negative. Thus:

``gmst_at_16_15_27 %= 60*60*24``

``if (gmst_at_16_15_27 < 0) {gmst_at_16_15_27 += 60*60*24}``

The result is the number of seconds that has passed on the current day, these need to be converted to hours/minutes/seconds to get the time of the day (which is the GMST).

#### Calculating Local Mean Sidereal Time

Get the GMST as above.

Then use the geographical longitude of the current location to determine how many seconds need to be added to it.
 
``360° == 24h == 24*60*60s = 86400s``

For example, for the longitude of Berlin (13.41°E) at 16:15:27 the local MST is

``let lmst_berlin = gmst_at_16_15_27 + 13.41 / 360 * 86400 ``