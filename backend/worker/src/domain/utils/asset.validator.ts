export class AssetValidator {
  /**
   * Validates the geospatial logic of a Bounding Box
   * @param bbox - Object containing minLat, maxLat, minLon, maxLon
   * @throws Error if coordinates are invalid or out of range
   */
  static validate(bbox: any): void {
    const { minLat, maxLat, minLon, maxLon } = bbox;

    // 1. Coordinate Range Validation
    // Latitude must be between -90 and 90. Longitude must be between -180 and 180.
    if (minLat < -90 || maxLat > 90 || minLon < -180 || maxLon > 180) {
      throw new Error('Coordinates out of range: Lat [-90, 90], Lon [-180, 180]');
    }

    // 2. Logical Consistency Validation
    // Minimum values must strictly be less than maximum values to form a valid area
    if (minLat >= maxLat || minLon >= maxLon) {
      throw new Error('Invalid Bounding Box: minimum values must be less than maximum values');
    }
  }
}