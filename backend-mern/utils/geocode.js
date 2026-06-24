import NodeGeocoder from "node-geocoder";

const options = {
  provider: "openstreetmap"
};

const geocoder = NodeGeocoder(options);

export async function geocodeAddress(
  street,
  city,
  state,
  zip
) {
  try {
    const address = `${street}, ${city}, ${state} ${zip}`;

    const results = await geocoder.geocode(address);

    if (results.length === 0) {
      return {
        latitude: null,
        longitude: null
      };
    }

    return {
      latitude: results[0].latitude,
      longitude: results[0].longitude
    };
  } catch (error) {
    console.error("Geocoding error:", error);

    return {
      latitude: null,
      longitude: null
    };
  }
}