from geopy.distance import geodesic


def group_contacts(contacts, distance_limit=1.0):
    groups = []
    assigned = set()

    for contact in contacts:
        if contact["id"] in assigned:
            continue

        new_group = [contact]
        assigned.add(contact["id"])

        contact_location = (contact["latitude"], contact["longitude"])

        for other in contacts:
            if other["id"] in assigned:
                continue

            other_location = (other["latitude"], other["longitude"])

            distance = geodesic(contact_location, other_location).miles

            if distance <= distance_limit:
                new_group.append(other)
                assigned.add(other["id"])

        groups.append(new_group)

    return groups