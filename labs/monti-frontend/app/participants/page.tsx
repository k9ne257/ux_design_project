import { use } from "react";
import { Participant, participantColumns} from "./columns"
import { DataTable } from "./data-table";

export default async function ParticipantOverview() {
    const router = use
    const participantData = await fetch(`http://localhost:8080/api/participants`)
    .then((res) => res.json())
    .then((data: Participant[]) => data)
    .catch(() => [] as Participant[]);

    return (
        <div>
            <div>
                <h2>Welcome to Participants Overview</h2>
            </div>
            <div>
                <DataTable columns={participantColumns} data={participantData} />
            </div>
        </div>
    );
}
