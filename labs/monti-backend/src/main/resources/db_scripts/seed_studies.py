import requests
import random
from datetime import datetime, timedelta, timezone

BASE_URL = "http://localhost:8080"
COUNT = 20

STATUSES = ["LAUFEND", "ABGESCHLOSSEN", "ANGEHEND"]


def iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def main():
    now = datetime.now(timezone.utc)

    for i in range(1, COUNT + 1):
        start = now - timedelta(days=i * 3)
        end = start + timedelta(days=90)

        payload = {
            "name": f"Studie {i:02d}",
            "description": (
                f"Diese Studie untersucht das Nutzungsverhalten von Teilnehmerinnen "
                f"und Teilnehmern im Rahmen einer digitalen Langzeitbeobachtung "
                f"(automatisch generierte Studie Nr. {i})."
            ),
            "status": random.choice(STATUSES),
            "startDate": iso(start),
            "endDate": iso(end),
        }

        response = requests.post(
            f"{BASE_URL}/api/studies",
            json=payload,
            timeout=10,
        )
        response.raise_for_status()

        created = response.json()
        print(f"[ok] Studie erstellt: id={created.get('id')} status={created.get('status')}")


if __name__ == "__main__":
    main()
