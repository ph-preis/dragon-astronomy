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

/**
 * Convert a time of the day to the number of sidereal seconds that have passed on the day.
 * A sidereal second is 1.00273790935 times a normal second.
 * This is necessary for determining the Mean Sidereal Time at an arbitrary time of the day (which is not 0 UTC).
 * The resulting number of sidereal seconds is simply added to the MST at 0 UTC, to get the MST at the current time.
 */
export function timeOfDayToSiderealSeconds(utcHours : number, utcMinutes : number, utcSeconds : number)
{
    return (60.0 * 60.0 * utcHours + 60.0 * utcMinutes + utcSeconds) * 1.00273790935;
}

/**
 * Calculate Local Mean Sidereal Time from GMST and local longitude (in degree).
 * For example, for Berlin (longitude 13.41°), use:
 *   greenwichMeanSiderealTimeToLocalMeanSiderealTime(gmstSeconds, 13.41).
 * @param gmstSeconds
 * @param longitudeDegree
 * @return Local Mean Sidereal Time in seconds.
 */
export function greenwichMeanSiderealTimeToLocalMeanSiderealTime(gmstSeconds : number, longitudeDegree : number)
{
    // todo - is it sufficiently precise to simply "mod 86400" when the next day is reached?
    return (gmstSeconds + longitudeDegree / 360.0 * (60.0 * 60.0 * 24.0)) % (60.0 * 60.0 * 24.0);
}