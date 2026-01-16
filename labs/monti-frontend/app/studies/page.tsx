import { studyColumns, Study} from "./columns"
import { DataTable } from "./data-table"


export default async function Home() {
    const studyData = await fetch("http://localhost:8080/api/studies")
    .then((res) => res.json())
    .then((data: Study[]) => data)
    .catch(() => [] as Study[]);

    return (
        <div className="m-4">
            <div>
                <h2 className="text-3xl font-black">Studien übersicht</h2>
            </div>

            <div className="flex-col mb-10 mt-5 justify-center">
                <DataTable columns={studyColumns} data={studyData} />
            </div>
        </div>
    );
}
