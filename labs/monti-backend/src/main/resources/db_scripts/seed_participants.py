import requests
import random

BASE_URL = "http://localhost:8080"

TOTAL_PARTICIPANTS = 1000
MIN_PER_STUDY = 40

# Endpoints (ggf. anpassen)
STUDIES_ENDPOINT = "/api/studies"
BRACELETS_ENDPOINT = "/api/bracelets"
PARTICIPANTS_ENDPOINT = "/api/participants"

FIRST_NAMES = [
    "Anna", "Max", "Laura", "Paul", "Sophie", "Lukas", "Marie", "Jonas", "Lea", "Tim",
    "Nina", "Felix", "Miriam", "David", "Jana", "Tom", "Sarah", "Ben", "Emilia", "Noah",
]
LAST_NAMES = [
    "Müller", "Schmidt", "Schneider", "Fischer", "Weber", "Meyer", "Wagner", "Becker",
    "Hoffmann", "Koch", "Richter", "Bauer", "Wolf", "Neumann", "Schwarz", "Zimmermann",
]
STREETS = ["Hauptstraße", "Bahnhofstraße", "Gartenweg", "Schillerstraße", "Goethestraße", "Wiesenweg"]
CITIES = ["Düsseldorf", "Köln", "Essen", "Bonn", "Dortmund", "Hamburg", "Berlin", "München"]


def random_address():
    return f"{random.choice(STREETS)} {random.randint(1, 150)}, {random.randint(10000, 99999)} {random.choice(CITIES)}"


def random_phone():
    return f"+49 15{random.randint(1,9)} {random.randint(1000000, 9999999)}"


def get_all_ids(endpoint: str):
    response = requests.get(f"{BASE_URL}{endpoint}", timeout=15)
    response.raise_for_status()
    data = response.json()

    # unterstützt sowohl "direkte Liste" als auch Spring Data REST-artige Strukturen
    if isinstance(data, list):
        items = data
    elif isinstance(data, dict) and "_embedded" in data:
        # falls Spring Data REST: {"_embedded": {"studies":[...]}}
        embedded = next(iter(data["_embedded"].values()))
        items = embedded
    else:
        raise RuntimeError(f"Unerwartetes Response-Format von {endpoint}: {type(data)}")

    return [item["id"] for item in items if item.get("id") is not None]


def build_study_assignment(study_ids, total_participants, min_per_study):
    study_count = len(study_ids)
    if study_count == 0:
        raise RuntimeError("Keine Studien gefunden.")

    required = study_count * min_per_study
    if total_participants < required:
        raise RuntimeError(
            f"TOTAL_PARTICIPANTS ({total_participants}) ist zu klein. "
            f"Mindestens benötigt: {required} (={study_count} Studien × {min_per_study})."
        )

    # Erst: jede Studie bekommt min_per_study
    assignments = []
    for sid in study_ids:
        assignments.extend([sid] * min_per_study)

    # Rest zufällig verteilen
    remaining = total_participants - required
    assignments.extend(random.choices(study_ids, k=remaining))

    random.shuffle(assignments)
    return assignments


def main():
    # 1) IDs live aus dem Backend holen
    study_ids = get_all_ids(STUDIES_ENDPOINT)
    bracelet_ids = get_all_ids(BRACELETS_ENDPOINT)

    print(f"[info] Gefundene Studien: {len(study_ids)}")
    print(f"[info] Gefundene Armbänder: {len(bracelet_ids)}")

    # 2) Sicherheitschecks
    if len(study_ids) < 20:
        print("[warn] Es sind weniger als 20 Studien vorhanden. Ich nutze trotzdem alle gefundenen Studien.")

    if len(bracelet_ids) < TOTAL_PARTICIPANTS:
        raise RuntimeError(
            f"Zu wenige Armbänder ({len(bracelet_ids)}), "
            f"für {TOTAL_PARTICIPANTS} Teilnehmer mit einzigartigen Armbändern."
        )

    # 3) Studienzuweisung erstellen (min. 40 pro Studie)
    study_assignments = build_study_assignment(study_ids, TOTAL_PARTICIPANTS, MIN_PER_STUDY)

    # 4) Einzigartige Armbänder zuweisen (shuffle → dann 1:1)
    random.shuffle(bracelet_ids)
    bracelet_pool = bracelet_ids[:TOTAL_PARTICIPANTS]

    # 5) Teilnehmer erstellen
    for i in range(1, TOTAL_PARTICIPANTS + 1):
        first_name = random.choice(FIRST_NAMES)
        last_name = random.choice(LAST_NAMES)

        payload = {
            "firstName": first_name,
            "lastName": last_name,
            "address": random_address(),
            "email": f"{first_name.lower()}.{last_name.lower()}{i}@example.de",
            "telefonnummer": random_phone(),
            "dailyAdhaerence": f"{random.randint(60, 95)}%",
            "weeklyAdhaerence": f"{random.randint(65, 98)}%",
            "isRegistered": random.random() < 0.9,
            "appId": random.randint(1000, 999999),

            "studyId": study_assignments[i - 1],
            "braceletId": bracelet_pool[i - 1],  # unique
        }

        response = requests.post(f"{BASE_URL}{PARTICIPANTS_ENDPOINT}", json=payload, timeout=20)
        response.raise_for_status()

        if i % 25 == 0 or i == 1 or i == TOTAL_PARTICIPANTS:
            created = response.json()
            print(f"[ok] {i}/{TOTAL_PARTICIPANTS} Teilnehmer erstellt (letztes id={created.get('id')})")

    print("[done] Teilnehmer-Seeding abgeschlossen.")


if __name__ == "__main__":
    main()
