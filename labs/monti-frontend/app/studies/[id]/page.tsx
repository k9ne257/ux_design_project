import { Participant, participantColumns } from "./columns";
import { Study } from "../columns"
import { Button } from "@/components/ui/button";
import ParticipantsCard from "@/components/participantsCard";
import WarningMessageCard from "@/components/alertMessageCard";
import { DataTable } from "@/app/participants/data-table";
import AlertPanel from "@/components/alertPanel";

type Props = {
    params: Promise<{ id: string }>
    triggerLabel?: string
}

export default async function ParticipantPage({ params, triggerLabel = "Ansehen" }: Props) {
    const { id } = await params;
    // const participantData = "";
    const participantData = await fetch(`http://localhost:8080/api/studies/${id}/participants`)
        .then((res) => res.json())
        .then((data: Participant[]) => data)
        .catch(() => [] as Participant[]);

    const studyData = await fetch(`http://localhost:8080/api/studies/${id}`)
        .then((res) => res.json())
        .then((data: Study[]) => data)
        .catch(() => [] as Study[]);

    console.log(participantData)
    return (
        <div className="mx-4 p-4">
            <div>
                <h1 className="text-5xl font-black">Study Overview for {studyData.name}</h1>
            </div>
            <div className="flex flex-row gap-4 mt-4">
                <Button variant="secondary" size="lg" className="shadow shadow-sm shadow-black">
                    Statistik | Daten
                </Button>
                <Button variant="secondary" size="lg" className="shadow shadow-sm shadow-black">
                    Datenexport (CSV)
                </Button>
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-4 my-5 p-4 rounded-lg shadow shadow-sm shadow-black">
                        <ParticipantsCard />
                        <WarningMessageCard />
                    </div>
                    <div >
                        <DataTable columns={participantColumns} data={participantData} />
                    </div>
                </div>
                <div className="mx-4">
                    <AlertPanel />
                </div>
            </div>

        </div>
    );

}
