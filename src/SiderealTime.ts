/**
 * Calculate Greenwich Mean Sidereal Time (GMST) from julian date, using the algorithm described in:
 * Meeus, Jean: Astronomical Algorithms. Second edition. Richmond, Virginia, 1998. Page 87.
 *
 * The julian date need not be an integer (which would indicate 0:00 Universal Time) but
 * can also contain an additional fraction of the day to specify a different UT.
 *
 * @param julianDate Julian Day Number (JDN) + fraction of the day that has passed (to indicate a
 * different Universal Time than 0:00)
 *
 * @return Greenwich Mean Sidereal Time in seconds. Note that this value includes also the number of days, so it
 * is necessary to calculate "julianDateToGreenwichMeanSiderealTime(julianDate) % 86400" (that is modulo number of seconds
 * per day) to get the number of seconds that have passed on the current day.
 */
export function julianDateToGreenwichMeanSiderealTime(julianDate : number)
{
    // see also
    // http://www.astro.sunysb.edu/metchev/AST443/times.html
    // https://astronomy.stackexchange.com/questions/21002/how-to-find-greenwich-mean-sideral-time

    let tu : number = (julianDate - 2451545.0) / 36525.0; // this is the number of Julian Centuries since J2000.0

    let gmstSeconds : number = 24110.54841 + 8640184.812866 * tu + 0.093104 * tu * tu - 0.0000062 * tu * tu * tu;
    return gmstSeconds;
}