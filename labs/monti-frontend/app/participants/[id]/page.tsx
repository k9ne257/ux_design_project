import { Participant} from "../columns"
// import { useRouter } from "next/router";

export default async function ParticipantPage({params}: { params: Promise<{ id: string }> }){
    // const router = useRouter();
    const { id } = await params; 
    const participantData = await fetch(`http://localhost:8080/api/participants/${id}`)
    .then((res) => res.json())
    .then((data: Participant[]) => data)
    .catch(() => [] as Participant[]);

    console.log("Participant Data:", participantData);

    return (
        <div>
            <div>
                <h2>Welcome to participant {id}</h2>
            </div>
        </div>
    );
}
