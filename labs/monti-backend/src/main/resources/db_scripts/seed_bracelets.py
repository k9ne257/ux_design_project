import requests
import random
from datetime import datetime, timedelta, timezone

BASE_URL = "http://localhost:8080"
COUNT = 1200

PRODUCERS = [
    "Garmin",
    "Fitbit",
    "Polar",
    "Samsung",
    "Xiaomi",
    "Withings",
]

MODELS = [
    "Vivosmart 5",
    "Charge 6",
    "Ignite 3",
    "Galaxy Fit 3",
    "Mi Band 8",
    "ScanWatch",
]

FIRMWARES = [
    "1.0.3",
    "1.1.0",
    "2.0.1",
    "2.2.5",
    "3.0.0",
]


def iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def main():
    now = datetime.now(timezone.utc)

    for i in range(1, COUNT + 1):
        assigned_at = now - timedelta(days=random.randint(1, 120))

        # Nur ein Teil der Armbänder wurde bereits zurückgegeben
        returned_at = (
            assigned_at + timedelta(days=random.randint(7, 90))
            if random.random() < 0.4
            else None
        )

        payload = {
            "producer": random.choice(PRODUCERS),
            "model": random.choice(MODELS),
            "firmware": random.choice(FIRMWARES),
            "assignedAt": iso(assigned_at),
            "returnedAt": iso(returned_at) if returned_at else None,
        }

        response = requests.post(
            f"{BASE_URL}/api/bracelets",
            json=payload,
            timeout=10,
        )
        response.raise_for_status()

        created = response.json()
        print(
            f"[ok] Armband erstellt: "
            f"id={created.get('id')} "
            f"model={created.get('model')} "
            f"producer={created.get('producer')}"
        )


if __name__ == "__main__":
    main()
