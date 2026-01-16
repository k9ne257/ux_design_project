import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "./ui/button";
import { UserRoundPlus, Users } from "lucide-react";


export default function ParticipantsCard() {
  const teilnehmerAnzahl = 150;
    return (
    <Card>
      <CardHeader>
        <CardTitle><Users /> Teilnehmer</CardTitle>
        <CardDescription>Teilnehmer info</CardDescription>
      </CardHeader>
      <CardContent className="font-black text-5xl">
        {teilnehmerAnzahl}
      </CardContent>
      <CardFooter>
        <Button>Teilnehmer erstellen <UserRoundPlus /></Button>
      </CardFooter>
    </Card>
  )
}
