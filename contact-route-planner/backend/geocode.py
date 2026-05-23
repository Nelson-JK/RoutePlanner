from geopy.geocoders import Nominatim

geolocator = Nominatim(user_agent="contact_route_planner")

def geocode_address(street, city, state, zip_code):
    full_address = f"{street}, {city}, {state} {zip_code}"

    location = geolocator.geocode(full_address)

    if location:
        return location.latitude, location.longitude

    return None, None