"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useEffect } from "react"
import { formatGermanDate } from "@/lib/utils"
import Link from "next/link"
import { ExternalLink } from "lucide-react";


export type QuestionaireDetails = {
    id: string
    name: string
    description: string
    dateCreated: string
}


type Props = {
    participantQuestionaires: QuestionaireDetails[]
    participantId: string
    onOpen?: (id: string) => void
    triggerLabel?: string
}

// export function QuestionaireSheet({ participant, onSave, triggerLabel = "Ansehen" }: Props) {
export function QuestionaireSheet({ participantQuestionaires, participantId, onOpen, triggerLabel = "Fragebögen" }: Props) {

    // const questionaires = await fetch(`http://localhost:8080/api/quistionaire/participantId`)
    //     .then((res) => res.json())
    //     .then((data: Participant[]) => data)
    //     .catch(() => [] as Participant[]);

    const [open, setOpen] = React.useState(false)

    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="secondary" className="ml-2 border-0 shadow shadow-sm shadow-black p-4">
                        {triggerLabel}
                    </Button>
                </SheetTrigger>

                <SheetContent className="w-full sm:max-w-3xl p-3">
                    {/* <SheetContent className="p-4"> */}
                    <div className="border-b">
                        <SheetHeader>
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <SheetTitle className="truncate">
                                        Fragebögen für Teilnehmer {participantId}
                                    </SheetTitle>
                                    <SheetDescription className="gap-3 flex flex-row justify-between mt-1">
                                        <span>Übersicht aller Fragebögen.</span>
                                        <Link className="font-bold italic text-gray-900 flex gap-1" href="#">Seite Öffnen <ExternalLink /></Link>
                                    </SheetDescription>
                                </div>
                            </div>
                        </SheetHeader>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 pb-6">
                        <div className="space-y-3">
                            {participantQuestionaires.map((q) => (
                                <div
                                    key={q.id}
                                    className="flex items-start justify-between gap-4 rounded-xl border bg-background p-4 shadow-sm transition-colors hover:bg-muted/40"
                                >
                                    <div className="min-w-0">
                                        <div className="text-sm font-medium leading-5">{q.name}</div>
                                        <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                                            {q.description}
                                        </div>
                                        <div className="mt-2 text-xs text-muted-foreground">
                                            Erstellt am {formatGermanDate(q.dateCreated)}
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="shrink-0"
                                        onClick={() => onOpen?.(q.id)}
                                        aria-label="Öffnen"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}

                            {participantQuestionaires.length === 0 && (
                                <div className="flex flex-col rounded-xl border bg-muted/20 p-4 text-sm text-muted-foreground mt-4 gap-4">
                                    <span>Keine Fragebögen vorhanden.</span>

                                    <Button variant="outline" className="ml-2 shadow shadow-sm shadow-black">
                                        <Link
                                            href={`/participants/`}
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium`}
                                        >
                                            Fragebogen Erstellen
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>



                    {/* <SheetFooter className="mt-6">
                        <div className="flex w-full items-center justify-between gap-3">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setDraft(questionaire)
                                    setIsEditing(false)
                                }}
                                disabled={saving}
                            >
                                Zurücksetzen
                            </Button>

                            <div className="flex items-center gap-2">
                                <Button variant="ghost" onClick={() => setOpen(false)} disabled={saving}>
                                    Schließen
                                </Button>
                                <Button onClick={handleSave} disabled={!isEditing || saving || !draft.id}>
                                    {saving ? "Speichern..." : "Speichern"}
                                </Button>
                            </div>
                        </div>
                    </SheetFooter> */}
                </SheetContent>
            </Sheet>
        </div >
    )
}



export default QuestionaireSheet
