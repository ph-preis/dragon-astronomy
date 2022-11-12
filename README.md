# dragon-astronomy
Typescript library for astronomy calculations.

Based on formulas from:
Meeus, Jean: Astronomical Algorithms. Second edition. Richmond, Virginia, 1998.

#### Content

The main purpose of this library is the transformation of equatorial star coordinates to horizontal star coordinates.

This allows to calculate the position of a star in the sky at a given observation time and place (on Earth).

The library is not meant to be a precise tool for professional purposes, only as a sufficiently accurate approximation for amateur astronomy. Test results were in the range of < 0.5° deviation from https://stellarium.org/ (which is using more precise formulas for this calculation). 

#### Usage

Usage example for getting the azimuth and altitude of Polaris. Observation in Berlin (52.52°N, 13.41°E) at 2022-11-06 19:00:29.

Get the Local Mean Sidereal Time

``let lmst = getLocalMeanSiderealTime(2022, 11, 6, 19, 0, 29, 13.41);``

Create an EquatorialCoordinate object for the observed star, the equatorial coordinates (declination and right ascension) are constant and available e.g. in Wikipedia. In case of Polaris (Aa) the declination is 89° 15' 50.8'' and the right ascension is 2h 31m 49.09s.  

``let polaris = EquatorialCoordinate.fromTimeAndDegree(89, 15, 50.8, 2, 31, 49.09);``

Then the horizontal coordinates (azimuth and altitude) can be calculated from the LMST, the equatorial coordinate of Polaris, and the latitude of Berlin. 
 
``let polarisHorizontalCoordinates =
              HorizontalCoordinate.fromEquatorialCoordinateDegree(polaris, lmst, 52.52);``

For more details and intermediate calculation steps see the coordinateConversion test in Gmst.test.ts.


#### Background info about the calculation 

##### Calculating Greenwich Mean Sidereal Time (GMST)

Get the julian day number (JDN) at 00:00:00 UT (Universal Time) by using:

``let jdn : number = gregorianDateToJulianDayNumber(newDate.getUTCFullYear(), newDate.getUTCMonth()+1, newDate.getUTCDate())``

Get GMST (in seconds) at 00:00:00 UT by using the JDN:

``let gmst : number = julianDayNumberToGreenwichMeanSiderealTime(jdn)``

Get GMST at another time (e.g. 16:15:27) of the day by adding the sidereal seconds (a sidereal second is 1.00273790935 times a calendar second):

``let gmst_at_16_15_27 = gmst + 1.00273790935(16+60*60 + 15+60 + 27)``

The result can contain several days and can be negative. Thus:

``gmst_at_16_15_27 %= 60*60*24``

``if (gmst_at_16_15_27 < 0) {gmst_at_16_15_27 += 60*60*24}``

The result is the number of seconds that has passed on the current day, these need to be converted to hours/minutes/seconds to get the time of the day (which is the GMST).

##### Calculating Local Mean Sidereal Time (LMST)

Get the GMST as above.

Then use the geographical longitude of the current location to determine how many seconds need to be added to it.
 
``360° == 24h == 24*60*60s == 86400s``

For example, for the longitude of Berlin (13.41°E) at 16:15:27 the local MST is

``let lmst_berlin = gmst_at_16_15_27 + 13.41 / 360 * 86400 ``

##### Calculate Horizontal coordinates of a given star

Get the geographical latitude (in radians):

``let berlinLatitudeRad = 52.52 * 2 * Math.PI / 360;``

Look up the Equatorial coordinates of the star (declination and right ascension), for example in Wikipedia. Then create an EquatorialCoordinate object for them, e.g.

``let polaris = EquatorialCoordinate.fromTimeAndDegree(89, 15, 50.8, 2, 31, 49.09);``

Then use the conversion function to obtain a Horizontal coordinate (altitude and azimuth). The LMST must be converted to radians before.

``let polarisHorizontalCoordinates = HorizontalCoordinate.fromEquatorialCoordinate(polaris, lmst / 86400 * 2 * Math.PI, berlinLatitudeRad);``

The result is in polarisHorizontalCoordinates.altitude and polarisHorizontalCoordinates.azimuth - it is in radians.