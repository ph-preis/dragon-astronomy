/**
 * Calculate Greenwich Mean Sidereal Time (GMST) from julian day number, using the algorithm described in:
 * Meeus, Jean: Astronomical Algorithms. Second edition. Richmond, Virginia, 1998. Page 87.
 *
 * The julian day number must end with .5 (indicating 00:00 Universal Time).
 *
 * @param julianDayNumber Julian Day Number (JDN).
 *
 * @return Greenwich Mean Sidereal Time in seconds. Note that this value includes also the number of days, so it
 * is necessary to calculate "julianDayNumberToGreenwichMeanSiderealTime(julianDate) % 86400" (that is modulo number of seconds
 * per day) to get the number of seconds that have passed on the current day. For dates before J2000.0 the result is negative,
 * in this case add 86400 after the modulo operation.
 */
export function julianDayNumberToGreenwichMeanSiderealTime(julianDayNumber : number)
{
    // see also
    // http://www.astro.sunysb.edu/metchev/AST443/times.html
    // https://astronomy.stackexchange.com/questions/21002/how-to-find-greenwich-mean-sideral-time

    let tu : number = (julianDayNumber - 2451545.0) / 36525.0; // this is the number of Julian Centuries since J2000.0

    let gmstSeconds : number = 24110.54841 + 8640184.812866 * tu + 0.093104 * tu * tu - 0.0000062 * tu * tu * tu;
    return gmstSeconds;
}