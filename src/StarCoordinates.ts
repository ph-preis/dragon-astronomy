/**
 * Equatorial coordinates of a star. These coordinates are relative to the Sun, independent from the
 * current location of the Earth.
 * This value is more or less a constant, it changes only slowly due to the motion of the stars among
 * themselves and relative to the sun.
 * The equatorial coordinate can be used to calculate the position of a star when viewed from Earth at
 * a given time and place, this is the altitude/azimuth in the Horizontal coordinate system.
 */
export class EquatorialCoordinate
{
    /**
     * Declination of a star in the equatorial coordinate system, in radians.
     *
     * This is comparable to the latitude, but not on earth, instead with the sun as center and
     * the Earth's orbital plane (the ecliptic) as equator.
     */
    public declination : number;

    /**
     * Right ascension of a star in the equatorial coordinate system, in radians.
     *
     * This is comparable to the longitude, but not on earth, instead with the sun as center and
     * the earth's orbital plane (the ecliptic) as equator. The 0-meridian (which is defined as
     * Greenwich on Earth) is defined as the point of the March equinox.
     */
    public rightAscension : number;

    /**
     * Constructor for importing Equatorial coordinates, example usage for the polar star:
     *  declination: 89° 15' 50.8''
     *  right ascension: 02h 31m 49.09s
     * This is fromTimeAndDegree(89, 15, 50.8, 2, 31, 49.09).
     * @param declDegree
     * @param declMinutes
     * @param declSeconds
     * @param raHours
     * @param raMinutes
     * @param raSeconds
     */
    public static fromTimeAndDegree(declDegree, declMinutes, declSeconds, raHours, raMinutes, raSeconds) : EquatorialCoordinate
    {
        return new EquatorialCoordinate(
            (declDegree + declMinutes / 60.0 + declSeconds / (60.0 * 60.0)) / 360.0 * 2.0 * Math.PI,
            (raHours * 3600.0 + raMinutes * 60.0 + raSeconds) / (60.0 * 60.0 * 24.0) * 2.0 * Math.PI);
    }

    /**
     *
     * @param declination in radians
     * @param rightAscension in radians
     */
    constructor(declination: number, rightAscension: number) {
        this.declination = declination;
        this.rightAscension = rightAscension;
    }

    /**
     * Calculate Azimuth of this EquatorialCoordinate. Using the formula from
     * Meeus, Jean: Astronomical Algorithms. Second edition. Richmond, Virginia, 1998. Page 93.
     * @param lmst Local Mean Sidereal Time, in radians(!): 86400 seconds == 2 * PI
     * @param phi observer latitude (on Earth), in radians
     * @return Azimuth in radians
     */
    public calculateAzimuth(lmst : number, phi : number) : number {
        // H hour angle = theta - alpha = local sidereal time - right ascension
        let H = lmst - this.rightAscension;
        let result = Math.atan(Math.sin(H) / (Math.sin(phi) * Math.cos(H) - Math.cos(phi) * Math.tan(this.declination)));
        if (result <0 ) result += 2 * Math.PI;
        return result;
    }

    /**
     * Calculate Altitude of this EquatorialCoordinate. Using the formula from
     * Meeus, Jean: Astronomical Algorithms. Second edition. Richmond, Virginia, 1998. Page 93.
     * @param lmst Local Mean Sidereal Time, in radians(!): 86400 seconds == 2 * PI
     * @param phi observer latitude (on Earth), in radians
     * @return Altitude in radians
     */
    public calculateAltitude(lmst : number, phi : number) : number {
        // H hour angle = theta - alpha = local sidereal time - right ascension
        let H = lmst - this.rightAscension;
        return Math.asin(Math.sin(phi) * Math.sin(this.declination) + Math.cos(phi) * Math.cos(this.declination) * Math.cos(H));
    }
}

/**
 * The horizontal coordinate of a star is the position of a star viewed from Earth at a given place
 * and time. It tells the astronomer the direction to look at in the sky to see the star.
 *
 * This value is not a constant but changes due to the motion and rotation of the Earth.
 *
 * It can be calculated from the Equatorial coordinate and the current place and time.
 *
 */
export class HorizontalCoordinate {

    /**
     * This is the angle (in radians) of the star above or below the Earth's horizon at the location
     * of the observer. It is 0 when the star is at the horizon, and pi/2 when directly above the
     * observer. Sometimes also called elevation.
     *
     * This is comparable to the latitude on Earth.
     */
    public altitude : number;

    /**
     * This is the compass direction of the star, in radians. The True North (approximately the direction
     * of the Polar star) is 0, increasing eastwards from there.
     *
     * This is comparable to the longitude on Earth (with the 0 meridian not going through Greenwich but
     * through the Polar star).
     */
    public azimuth : number;

    /**
     * Calculate HorizontalCoordinate from EquatorialCoordinate. Using the formula from
     * Meeus, Jean: Astronomical Algorithms. Second edition. Richmond, Virginia, 1998. Page 93.
     * @param eq Equatorial coordinate of the star
     * @param lmst Local Mean Sidereal Time, in radians(!): 86400 seconds == 2 * PI
     * @param phi observer latitude (on Earth), in radians
     * @return HorizontalCoordinate
     */
    public static fromEquatorialCoordinate(eq : EquatorialCoordinate, lmst : number, phi : number) : HorizontalCoordinate
    {
        return new HorizontalCoordinate(
            eq.calculateAltitude(lmst, phi),
            eq.calculateAzimuth(lmst, phi)
        )
    }

    /**
     *
     * @param altitude in radians
     * @param azimuth in radians
     */
    constructor(altitude: number, azimuth: number) {
        this.altitude = altitude;
        this.azimuth = azimuth;
    }
}