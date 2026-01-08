import os
import random
from datetime import datetime, timedelta, timezone

import requests

BASE_URL = os.getenv("BASE_URL", "http://localhost:8080")
TIMEOUT = 15

# --- realistic-ish data pools (no external deps like Faker) ---
FIRST_NAMES = [
    "Aaron", "Maria", "Sophie", "Daniel", "Lea", "Noah", "Mia", "Paul", "Lina", "Jonas",
    "Emma", "Ben", "Hannah", "Louis", "Nina", "Elias", "Laura", "Max", "Sarah", "Felix",
]
LAST_NAMES = [
    "Frey", "Hildebrandt", "Schmidt", "Müller", "Klein", "Weber", "Wagner", "Hoffmann",
    "Schäfer", "Koch", "Richter", "Bauer", "Wolf", "Neumann", "Schwarz", "Zimmermann",
]
STREET_NAMES = [
    "Hauptstraße", "Bahnhofstraße", "Schillerstraße", "Goethestraße", "Düsseldorfer Straße",
    "Berliner Allee", "Kölner Straße", "Friedrichstraße", "Ringstraße", "Wiesenweg",
]
CITIES = ["Düsseldorf", "Köln", "Essen", "Dortmund", "Bonn", "Hamburg", "Berlin", "München"]
PRODUCERS = ["Garmin", "Fitbit", "Polar", "Xiaomi", "Samsung", "Withings"]
BRACELET_MODELS = ["Vivosmart 5", "Charge 6", "Ignite 3", "Mi Band 8", "Galaxy Fit 3", "ScanWatch"]
FIRMWARES = ["1.0.3", "1.1.0", "2.0.1", "2.2.5", "3.0.0"]


def iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def rand_phone_de():
    return f"+49 15{random.randint(0,9)} {random.randint(1000000, 9999999)}"


def rand_email(first, last):
    domain = random.choice(["gmail.com", "outlook.com", "web.de", "gmx.de", "proton.me"])
    return f"{first.lower()}.{last.lower()}{random.randint(1,999)}@{domain}"


def rand_address():
    street = random.choice(STREET_NAMES)
    nr = random.randint(1, 199)
    plz = random.randint(10000, 99999)
    city = random.choice(CITIES)
    return f"{street} {nr}, {plz} {city}"


def request_json(method, path, payload=None):
    url = f"{BASE_URL}{path}"
    r = requests.request(method, url, json=payload, timeout=TIMEOUT)
    if r.status_code >= 400:
        raise RuntimeError(f"{method} {url} -> {r.status_code}\n{r.text}")
    if r.text.strip():
        return r.json()
    return None


def create_study(i: int):
    now = datetime.now(timezone.utc)
    start = now - timedelta(days=random.randint(1, 30))
    end = start + timedelta(days=random.randint(30, 180))

    payload = {
        "name": f"Study {i:02d} – Adherence & Wearables",
        "description": random.choice([
            "Longitudinal adherence monitoring using wearable + app check-ins.",
            "Pilot study for wearable-based activity tracking and questionnaire completion.",
            "Study on weekly adherence patterns and device usage stability.",
        ]),
        "status": random.choice(["PLANNED", "RUNNING", "FINISHED"]),
        "startDate": iso(start),
        "endDate": iso(end),
    }
    return request_json("POST", "/api/studies", payload)


def create_bracelet():
    now = datetime.now(timezone.utc)
    assigned = now - timedelta(days=random.randint(1, 60))
    returned = assigned + timedelta(days=random.randint(10, 120)) if random.random() < 0.15 else None

    payload = {
        "model": random.choice(BRACELET_MODELS),
        "producer": random.choice(PRODUCERS),
        "firmware": random.choice(FIRMWARES),
        "assignedAt": iso(assigned),
        "returnedAt": iso(returned) if returned else None,
    }
    return request_json("POST", "/api/bracelets", payload)


def create_participant(study_id, bracelet_id=None):
    first = random.choice(FIRST_NAMES)
    last = random.choice(LAST_NAMES)

    payload = {
        "firstName": first,
        "lastName": last,
        "address": rand_address(),
        "email": rand_email(first, last),
        "telefonnummer": rand_phone_de(),
        "dailyAdhaerence": f"{random.randint(60, 99)}%",
        "weeklyAdhaerence": f"{random.randint(55, 98)}%",
        "isRegistered": (random.random() < 0.85),
        "appId": random.randint(1000, 9999),

        # ✅ IMPORTANT: match your CreateParticipantRequest fields
        "studyId": study_id,

        # Optional
        "braceletId": bracelet_id,
    }

    return request_json("POST", "/api/participants", payload)


def update_bracelet_link(bracelet_obj, participant_obj):
    """
    Only needed if your API requires bracelet.participant to be set too.
    """
    bracelet_id = bracelet_obj["id"]
    payload = dict(bracelet_obj)
    payload["participant"] = {"id": participant_obj["id"]}

    try:
        return request_json("PUT", "/api/bracelets", payload)
    except Exception as e:
        print(f"[warn] Could not back-link bracelet {bracelet_id} -> participant {participant_obj.get('id')}: {e}")
        return None


def main():
    studies_count = int(os.getenv("STUDIES", "2"))
    participants_per_study = int(os.getenv("PARTICIPANTS_PER_STUDY", "6"))

    total_participants = studies_count * participants_per_study

    # 1) Bracelets first (pool)
    bracelets = [create_bracelet() for _ in range(total_participants)]
    bracelet_idx = 0

    # 2) Studies second
    studies = [create_study(i) for i in range(1, studies_count + 1)]

    created = {"studies": studies, "participants": [], "bracelets": bracelets}

    # 3) Participants last (linked to studyId + optional braceletId)
    for study in studies:
        study_id = study["id"]

        for _ in range(participants_per_study):
            use_bracelet = random.random() < 0.9  # most participants get one
            bracelet_id = None
            bracelet_obj = None

            if use_bracelet and bracelet_idx < len(bracelets):
                bracelet_obj = bracelets[bracelet_idx]
                bracelet_id = bracelet_obj["id"]
                bracelet_idx += 1

            participant = create_participant(study_id, bracelet_id=bracelet_id)
            created["participants"].append(participant)

            if bracelet_obj is not None:
                update_bracelet_link(bracelet_obj, participant)

        print(f"[ok] Seeded Study {study_id} with {participants_per_study} participants")

    print("\nDone.")
    print(f"Created: {len(created['studies'])} studies, {len(created['participants'])} participants, {len(created['bracelets'])} bracelets")


if __name__ == "__main__":
    main()




# import os
# import random
# import string
# from datetime import datetime, timedelta, timezone
#
# import requests
#
# BASE_URL = os.getenv("BASE_URL", "http://localhost:8080")
# TIMEOUT = 15
#
# # --- realistic-ish data pools (no external deps like Faker) ---
# FIRST_NAMES = [
#     "Aaron", "Maria", "Sophie", "Daniel", "Lea", "Noah", "Mia", "Paul", "Lina", "Jonas",
#     "Emma", "Ben", "Hannah", "Louis", "Nina", "Elias", "Laura", "Max", "Sarah", "Felix",
# ]
# LAST_NAMES = [
#     "Frey", "Hildebrandt", "Schmidt", "Müller", "Klein", "Weber", "Wagner", "Hoffmann",
#     "Schäfer", "Koch", "Richter", "Bauer", "Wolf", "Neumann", "Schwarz", "Zimmermann",
# ]
# STREET_NAMES = [
#     "Hauptstraße", "Bahnhofstraße", "Schillerstraße", "Goethestraße", "Düsseldorfer Straße",
#     "Berliner Allee", "Kölner Straße", "Friedrichstraße", "Ringstraße", "Wiesenweg",
# ]
# CITIES = ["Düsseldorf", "Köln", "Essen", "Dortmund", "Bonn", "Hamburg", "Berlin", "München"]
# PRODUCERS = ["Garmin", "Fitbit", "Polar", "Xiaomi", "Samsung", "Withings"]
# BRACELET_MODELS = ["Vivosmart 5", "Charge 6", "Ignite 3", "Mi Band 8", "Galaxy Fit 3", "ScanWatch"]
# FIRMWARES = ["1.0.3", "1.1.0", "2.0.1", "2.2.5", "3.0.0"]
#
#
# def iso(dt: datetime) -> str:
#     # Spring usually accepts ISO 8601; keep timezone-aware.
#     return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
#
#
# def rand_phone_de():
#     # not perfect, but plausible format
#     return f"+49 15{random.randint(0,9)} {random.randint(1000000, 9999999)}"
#
#
# def rand_email(first, last):
#     domain = random.choice(["gmail.com", "outlook.com", "web.de", "gmx.de", "proton.me"])
#     return f"{first.lower()}.{last.lower()}{random.randint(1,999)}@{domain}"
#
#
# def rand_address():
#     street = random.choice(STREET_NAMES)
#     nr = random.randint(1, 199)
#     plz = random.randint(10000, 99999)
#     city = random.choice(CITIES)
#     return f"{street} {nr}, {plz} {city}"
#
#
# def request_json(method, path, payload=None):
#     url = f"{BASE_URL}{path}"
#     r = requests.request(method, url, json=payload, timeout=TIMEOUT)
#     # helpful error output
#     if r.status_code >= 400:
#         raise RuntimeError(f"{method} {url} -> {r.status_code}\n{r.text}")
#     if r.text.strip():
#         return r.json()
#     return None
#
#
# def create_study(i: int):
#     now = datetime.now(timezone.utc)
#     start = now - timedelta(days=random.randint(1, 30))
#     end = start + timedelta(days=random.randint(30, 180))
#
#     payload = {
#         "name": f"Study {i:02d} – Adherence & Wearables",
#         "description": random.choice([
#             "Longitudinal adherence monitoring using wearable + app check-ins.",
#             "Pilot study for wearable-based activity tracking and questionnaire completion.",
#             "Study on weekly adherence patterns and device usage stability.",
#         ]),
#         "status": random.choice(["PLANNED", "RUNNING", "FINISHED"]),
#         "startDate": iso(start),
#         "endDate": iso(end),
#         # don’t send participants list on create; we link later via participant.study
#     }
#     return request_json("POST", "/api/studies", payload)
#
#
# def create_bracelet():
#     now = datetime.now(timezone.utc)
#     assigned = now - timedelta(days=random.randint(1, 60))
#     returned = assigned + timedelta(days=random.randint(10, 120)) if random.random() < 0.15 else None
#
#     payload = {
#         "model": random.choice(BRACELET_MODELS),
#         "producer": random.choice(PRODUCERS),
#         "firmware": random.choice(FIRMWARES),
#         "assignedAt": iso(assigned),
#         "returnedAt": iso(returned) if returned else None,
#         # don’t link participant yet; we’ll do it after participant exists
#     }
#     return request_json("POST", "/api/bracelets", payload)
#
#
# def create_participant(study_id, bracelet_id=None):
#     first = random.choice(FIRST_NAMES)
#     last = random.choice(LAST_NAMES)
#
#     daily = f"{random.randint(60, 99)}%"
#     weekly = f"{random.randint(55, 98)}%"
#
#     payload = {
#         "firstName": first,
#         "lastName": last,
#         "address": rand_address(),
#         "email": rand_email(first, last),
#         "telefonnummer": rand_phone_de(),
#         "dailyAdhaerence": daily,
#         "weeklyAdhaerence": weekly,
#         "registered": random.random() < 0.85,   # note: your field is `isRegistered`; Jackson usually maps "registered" too
#         "isRegistered": random.random() < 0.85, # send both to be safe if naming is strict
#         "appId": random.randint(1000, 9999),
#         "braceletId": bracelet_id if bracelet_id else None,
#         "study": {"id": study_id},
#     }
#
#     if bracelet_id is not None:
#         payload["bracelet"] = {"id": bracelet_id}
#
#     return request_json("POST", "/api/participants", payload)
#
#
# def update_bracelet_link(bracelet_obj, participant_obj):
#     """
#     Because you have OneToOne on both sides, some APIs want bracelet.participant set too.
#     We try a PUT /api/bracelets with the full object including participant id.
#     """
#     bracelet_id = bracelet_obj["id"]
#     payload = dict(bracelet_obj)  # start from server response to keep required fields
#     payload["participant"] = {"id": participant_obj["id"]}
#
#     try:
#         return request_json("PUT", "/api/bracelets", payload)
#     except Exception as e:
#         # Not fatal—many setups only store the FK on Participant side.
#         print(f"[warn] Could not back-link bracelet {bracelet_id} -> participant {participant_obj.get('id')}: {e}")
#         return None
#
#
# def main():
#     studies_count = int(os.getenv("STUDIES", "2"))
#     participants_per_study = int(os.getenv("PARTICIPANTS_PER_STUDY", "6"))
#
#     # Create enough bracelets for all participants (some participants may have none)
#     bracelets_needed = studies_count * participants_per_study
#     bracelets = [create_bracelet() for _ in range(bracelets_needed)]
#     bracelet_idx = 0
#
#     created = {"studies": [], "participants": [], "bracelets": bracelets}
#
#     for i in range(1, studies_count + 1):
#         study = create_study(i)
#         created["studies"].append(study)
#         study_id = study["id"]
#
#         for _ in range(participants_per_study):
#             use_bracelet = random.random() < 0.9  # most participants get one
#             bracelet_id = None
#             bracelet_obj = None
#
#             if use_bracelet and bracelet_idx < len(bracelets):
#                 bracelet_obj = bracelets[bracelet_idx]
#                 bracelet_id = bracelet_obj["id"]
#                 bracelet_idx += 1
#
#             participant = create_participant(study_id, bracelet_id=bracelet_id)
#             created["participants"].append(participant)
#
#             if bracelet_obj is not None:
#                 update_bracelet_link(bracelet_obj, participant)
#
#         print(f"[ok] Seeded Study {study_id} with {participants_per_study} participants")
#
#     print("\nDone.")
#     print(f"Created: {len(created['studies'])} studies, {len(created['participants'])} participants, {len(created['bracelets'])} bracelets")
#
#
# if __name__ == "__main__":
#     main()
