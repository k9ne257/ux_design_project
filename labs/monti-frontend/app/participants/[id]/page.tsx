import { Participant } from "../columns"
import {ParticipantSheet} from "@/components/participantSheet"

type Props = {
    params: Promise<{ id: string }>
    triggerLabel?: string
}

export default async function ParticipantPage({params, triggerLabel = "Ansehen" }: Props) {
    const { id } = await params;
        const participantData = await fetch(`http://localhost:8080/api/participants/${id}`)
            .then((res) => res.json())
            .then((data: Participant[]) => data)
            .catch(() => [] as Participant[]);

    return (
        <div>
            {/* <h1>{participantData.firstName} {participantData.lastName}</h1> */}
            {/* <ParticipantSheet participant={participantData}  triggerLabel={triggerLabel} /> */}
        </div>
    )

}
