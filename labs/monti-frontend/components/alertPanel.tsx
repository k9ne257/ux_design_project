"use client"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Bell, ExternalLink } from "lucide-react"
import { Button } from "./ui/button"

export default function AlertPanel() {
    return (
        <Card className="border-b p-4 m-4">
            <CardHeader>
                <CardTitle className="flex flex-row justify-center gap-2 items-center">
                    <Bell />
                    <span className="text-2xl font-bold gap-1">Teilnehmer Meldungen</span>
                </CardTitle>
                <CardDescription className="flex flex-row justify-center gap-4 border-b">
                    {/* <span className="flex flex-row text-sm text-red-500 gap-1"><TriangleAlert />{highPriorityAlerts} Hohe Priorität</span>
                    <span className="flex flex-row text-sm text-yellow-500 gap-1"><TriangleAlert />{lowPriorityAlerts} Mittellere Priorität</span> */}
                    <span className="flex flex-row text-red-500 gap-1">4 Hohe Priorität</span>
                    <span className="flex flex-row text-yellow-500 gap-1">3 Mittellere Priorität</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <div
                    className="flex items-start justify-between gap-4 rounded-xl border bg-yellow-50 p-4 shadow-sm hover:bg-yellow-100 hover:text-yellow-500"
                >
                    <div className="min-w-0">
                        <div className="text-sm font-medium leading-5">7 Teilnehmer haben den Fragebogen nicht ausgefüllt.</div>
                        <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            7 Teilnehmer haben den Fragebogen nicht ausgefüllt.
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        aria-label="Öffnen"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </div>
                <div
                    className="flex items-start justify-between gap-4 rounded-xl border bg-red-50 p-4 shadow-sm hover:bg-red-100 hover:text-red-500"
                >
                    <div className="min-w-0">
                        <div className="text-sm font-medium leading-5">8 armbänder sind aus seid 4 Tage</div>
                        <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                            7 Teilnehmer haben den Fragebogen nicht ausgefüllt.
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        aria-label="Öffnen"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
