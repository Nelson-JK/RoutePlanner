function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateDistanceMiles(lat1, lon1, lat2, lon2) {
  const earthRadiusMiles = 3958.8;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusMiles * c;
}

export function groupContacts(contacts, distanceLimit = 1.0) {
  const groups = [];
  const assigned = new Set();

  for (const contact of contacts) {
    if (assigned.has(contact._id.toString())) {
      continue;
    }

    const newGroup = [contact];
    assigned.add(contact._id.toString());

    for (const other of contacts) {
      if (assigned.has(other._id.toString())) {
        continue;
      }

      if (
        contact.latitude == null ||
        contact.longitude == null ||
        other.latitude == null ||
        other.longitude == null
      ) {
        continue;
      }

      const distance = calculateDistanceMiles(
        contact.latitude,
        contact.longitude,
        other.latitude,
        other.longitude
      );

      if (distance <= distanceLimit) {
        newGroup.push(other);
        assigned.add(other._id.toString());
      }
    }

    groups.push(newGroup);
  }

  return groups;
}