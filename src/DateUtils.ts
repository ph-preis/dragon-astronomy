/**
 * Given the hours/minutes/seconds, determine which fraction of the day has passed.
 *
 * Example:
 *   17:23:12
 *
 * Result is (17 * 60 * 60 + 23 * 60 + 12) / (60 * 60 * 24) = 0.724
 *
 * @param hours (0..23)
 * @param minutes (0..59)
 * @param seconds (0..59)
 * @return fraction of the day that has passed (0..0.99999)
 */
export function timeToDayFraction(hours : number, minutes : number, seconds : number) : number
{
    let result : number = (hours * 60 * 60 + minutes * 60 + seconds) / (60 * 60 * 24);
    return result;
}