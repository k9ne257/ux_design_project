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

type Bracelet = {
    id: number
    producer: string
    model: string
    firmware: string
    assignedAt: string
    returnedAt: string | null
}

type Study = {
    id: number
    name: string
    description: string
    status: "ANGEHEND" | "LAUFEND" | "ABGESCHLOSSEN"
    startDate: string
    endDate: string
}

export type ParticipantDetails = {
    id: string
    firstName: string
    lastName: string
    address: string
    email: string
    telefonnummer: string
    dailyAdhaerence: string // e.g. "70%"
    weeklyAdhaerence: string // e.g. "76%"
    isRegistered: boolean
    bracelet?: Bracelet | null
    study?: Study | null
}

function statusBadge(status?: Study["status"]) {
    switch (status) {
        case "LAUFEND":
            return "bg-amber-100 text-amber-800"
        case "ABGESCHLOSSEN":
            return "bg-emerald-100 text-emerald-800"
        case "ANGEHEND":
            return "bg-sky-100 text-sky-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

function percentNumber(value: string) {
    const n = Number(String(value).replace("%", ""))
    return Number.isFinite(n) ? n : 0
}

function adherenceBadgeClass(pct: number) {
    if (pct >= 85) return "bg-emerald-100 text-emerald-800"
    if (pct >= 70) return "bg-amber-100 text-amber-800"
    return "bg-rose-100 text-rose-800"
}

type Props = {
    participant: ParticipantDetails
    /**
     * Optional: call your API here later.
     * Must include participant.id as required.
     */
    onSave?: (updated: ParticipantDetails) => Promise<void> | void
    // onSave?: () => string
    triggerLabel?: string
}

// export function ParticipantSheet({ participant, onSave, triggerLabel = "Ansehen" }: Props) {
export function ParticipantSheet({ participant, onSave, triggerLabel = "Ansehen" }: Props) {

    const [open, setOpen] = React.useState(false)
    const [isEditing, setIsEditing] = React.useState(false)
    const [draft, setDraft] = React.useState<ParticipantDetails>(participant)
    const [saving, setSaving] = React.useState(false)

    useEffect(() => {
        // reset when opening / changing participant
        setDraft(participant)
        setIsEditing(false)
    }, [participant, open])

    const dailyPct = percentNumber(draft.dailyAdhaerence)
    const weeklyPct = percentNumber(draft.weeklyAdhaerence)

    async function handleSave() {
        // id is required
        if (!draft.id) return

        try {
            setSaving(true)
            await onSave?.(draft)

            setIsEditing(false)
            setOpen(false)
        } finally {
            setSaving(false)
        }
    }

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
                                        {participant.firstName} {participant.lastName}
                                    </SheetTitle>
                                    <SheetDescription className="mt-1">
                                        Teilnehmer-ID: <span className="font-mono">{participant.id}</span>
                                    </SheetDescription>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Label className="text-sm">Bearbeiten</Label>
                                    <Switch checked={isEditing} onCheckedChange={setIsEditing} />
                                </div>
                            </div>
                        </SheetHeader>
                    </div>

                    {/* <div className="mt-6 space-y-6"> */}
                    <div className="flex-1 overflow-y-auto space-y-6 mt-6 pb-10">
                        {/* Participant */}
                        <section className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold">Teilnehmer</h3>
                                <div className="flex items-center gap-2">
                                    <Badge className={adherenceBadgeClass(dailyPct)} variant="secondary">
                                        Täglich: {draft.dailyAdhaerence}
                                    </Badge>
                                    <Badge className={adherenceBadgeClass(weeklyPct)} variant="secondary">
                                        Wöchentlich: {draft.weeklyAdhaerence}
                                    </Badge>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Vorname</Label>
                                    <Input
                                        value={draft.firstName}
                                        disabled={!isEditing}
                                        onChange={(e) => setDraft((d) => ({ ...d, firstName: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Nachname</Label>
                                    <Input
                                        value={draft.lastName}
                                        disabled={!isEditing}
                                        onChange={(e) => setDraft((d) => ({ ...d, lastName: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2 sm:col-span-2">
                                    <Label>Adresse</Label>
                                    <Input
                                        value={draft.address}
                                        disabled={!isEditing}
                                        onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>E-Mail</Label>
                                    <Input
                                        value={draft.email}
                                        disabled={!isEditing}
                                        onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Telefonnummer</Label>
                                    <Input
                                        value={draft.telefonnummer}
                                        disabled={!isEditing}
                                        onChange={(e) => setDraft((d) => ({ ...d, telefonnummer: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Tägliche Adhärenz</Label>
                                    <Input
                                        value={draft.dailyAdhaerence}
                                        disabled={!isEditing}
                                        placeholder="z.B. 70%"
                                        onChange={(e) => setDraft((d) => ({ ...d, dailyAdhaerence: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Wöchentliche Adhärenz</Label>
                                    <Input
                                        value={draft.weeklyAdhaerence}
                                        disabled={!isEditing}
                                        placeholder="z.B. 76%"
                                        onChange={(e) => setDraft((d) => ({ ...d, weeklyAdhaerence: e.target.value }))}
                                    />
                                </div>

                                <div className="flex items-center justify-between rounded-lg border p-3 sm:col-span-2">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">Registriert</p>
                                        <p className="text-xs text-muted-foreground">
                                            Gibt an, ob der/die Teilnehmer:in die App-Registrierung abgeschlossen hat.
                                        </p>
                                    </div>
                                    <Switch
                                        checked={draft.isRegistered}
                                        disabled={!isEditing}
                                        onCheckedChange={(v) => setDraft((d) => ({ ...d, isRegistered: v }))}
                                    />
                                </div>
                            </div>
                        </section>

                        <Separator />

                        {/* Study */}
                        <section className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold">Studie</h3>
                                <Badge className={statusBadge(draft.study?.status)} variant="secondary">
                                    {draft.study?.status ?? "—"}
                                </Badge>
                            </div>

                            {draft.study ? (
                                <div className="rounded-lg border p-4 space-y-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate">{draft.study.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Studien-ID: <span className="font-mono">{draft.study.id}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Start</p>
                                            <p className="text-sm">{formatGermanDate(draft.study.startDate)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Ende</p>
                                            <p className="text-sm">{formatGermanDate(draft.study.endDate)}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Beschreibung</Label>
                                        <Textarea
                                            value={draft.study.description}
                                            disabled={!isEditing}
                                            onChange={(e) =>
                                                setDraft((d) => ({
                                                    ...d,
                                                    study: d.study ? { ...d.study, description: e.target.value } : d.study,
                                                }))
                                            }
                                        />
                                    </div>

                                    {/* If you later support changing study relation by id */}
                                    <div className="space-y-2">
                                        <Label>Studien-ID (Relation)</Label>
                                        <Input
                                            value={String(draft.study.id)}
                                            disabled
                                            className="font-mono"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            (Später) Studie wechseln: hier würdest du per Dropdown/Autocomplete eine neue Studie auswählen.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                                    Keine Studie verknüpft.
                                </div>
                            )}
                        </section>

                        <Separator />

                        {/* Bracelet */}
                        <section className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold">Armband</h3>
                                <Badge
                                    variant="secondary"
                                    className={
                                        draft.bracelet?.returnedAt
                                            ? "bg-emerald-100 text-emerald-800"
                                            : "bg-amber-100 text-amber-800"
                                    }
                                >
                                    {draft.bracelet?.returnedAt ? "Verfügbar (zurückgegeben)" : "Vergeben"}
                                </Badge>
                            </div>

                            {draft.bracelet ? (
                                <div className="rounded-lg border p-4 space-y-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate">
                                                {draft.bracelet.producer} — {draft.bracelet.model}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Armband-ID: <span className="font-mono">{draft.bracelet.id}</span>
                                            </p>
                                        </div>
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                                            FW {draft.bracelet.firmware}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Ausgegeben am</p>
                                            <p className="text-sm">{formatGermanDate(draft.bracelet.assignedAt)}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs text-muted-foreground">Zurückgegeben am</p>
                                            {draft.bracelet.returnedAt && <p className="text-sm">{formatGermanDate(draft.bracelet.returnedAt)}</p>}
                                        </div>
                                    </div>

                                    {/* If you later support changing bracelet relation by id */}
                                    <div className="space-y-2">
                                        <Label>Armband-ID (Relation)</Label>
                                        <Input
                                            value={String(draft.bracelet.id)}
                                            disabled
                                            className="font-mono"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            (Später) Armband neu zuweisen: hier würdest du per Dropdown/Autocomplete ein anderes Armband auswählen.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                                    Kein Armband verknüpft.
                                </div>
                            )}
                        </section>
                    </div>

                    <SheetFooter className="mt-6">
                        <div className="flex w-full items-center justify-between gap-3">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setDraft(participant)
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
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}



export default ParticipantSheet
