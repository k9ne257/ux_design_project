import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Bell, TriangleAlert } from "lucide-react";
import { Separator } from "./ui/separator";

export default function WarningMessageCard() {
  const alertNumber = 7;
  const highPriorityAlerts = 3;
  const lowPriorityAlerts = 4;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meldungen</CardTitle>
        <CardDescription>Alerts die deine Studie betreffen</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 font-medium">
        <span className="flex flex-row text-2xl font-bold gap-1 items-center"><Bell />{alertNumber} Meldungen</span>
        <span className="flex flex-row text-xl text-red-500 gap-1 items-center"><TriangleAlert />{highPriorityAlerts} Hohe Priorität</span>
        <span className="flex flex-row text-xl text-yellow-500 gap-1 items-center"><TriangleAlert />{lowPriorityAlerts} Mittellere Priorität</span>
      </CardContent>
      
    </Card>
  )
}
