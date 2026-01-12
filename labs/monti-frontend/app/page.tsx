import Link from "next/link";
export default async function Home() {
    return (
        <div>
            <h2 className="text-5xl font-extrabold">Wilkommen zur Monti!</h2>

            <div className="flex justify-center">
                <div className="m-5 px-10">
                    <Link href={"/studies"}>Studien</Link>
                </div>
                <div className="m-5 px-10">
                    <Link href={"/participants"}>Teilnehmer</Link>
                </div>
                <div className="m-5 px-10">
                    <Link href={"/bracelets"}>Armbänder</Link>
                </div>
            </div>
        </div>
    );
}
