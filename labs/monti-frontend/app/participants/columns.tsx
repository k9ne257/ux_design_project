"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export type Participant = {
    id: string
    firstName: string
    lastName: string
    address: string
    email: string
    telefonnummer: string
    dailyAdhaerence: string
    weeklyAdhaerence: string
    isRegistered: boolean
    appId: string
    studyId: string
    braceletId: string | null
}

const registrationStyles: Record<string, string> = {
    true: "bg-emerald-100 text-emerald-800",
    false: "bg-rose-100 text-rose-800",
}

const adherenceStyles = (value: number) => {
    if (value >= 85) return "bg-green-100 text-green-800"
    if (value >= 70) return "bg-emerald-100 text-emerald-800"
    if (value >= 60) return "bg-yellow-100 text-yellow-800"
    if (value >= 40) return "bg-amber-100 text-amber-800"
    if (value < 20) return "bg-red-100 text-red-800"
    //   return "bg-rose-100 text-rose-800"
}

const progressStyles = (value: number) => {
    if (value >= 85) return "bg-green-900"
    if (value >= 70) return "bg-emerald-700"
    if (value >= 60) return "bg-yellow-400"
    if (value >= 40) return "bg-amber-400"
    if (value < 20) return "bg-red-700"
    //   return "bg-rose-100 text-rose-800"
}

const formatPercent = (raw: unknown): { label: string; numeric: number | null } => {
    if (raw == null) return { label: "-", numeric: null }
    const s = String(raw).trim()
    // supports "85%" or "85"
    const n = Number(s.replace("%", ""))
    if (Number.isNaN(n)) return { label: s, numeric: null }
    return { label: s.includes("%") ? s : `${n}%`, numeric: n }
}

export const participantColumns: ColumnDef<Participant>[] = [


    {
        accessorKey: "firstName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Vorname
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "lastName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nachname
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    E-Mail
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "isRegistered",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Registriert
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const isRegistered = Boolean(row.getValue("isRegistered"))
            const styleKey = String(isRegistered) // "true" | "false"
            const label = isRegistered ? "Ja" : "Nein"

            return (
                <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium shadow shadow-xs shadow-black ${registrationStyles[styleKey] ?? "bg-gray-100 text-gray-800"
                        }`}
                >
                    {label}
                </span>
            )
        },
    },
    {
        accessorKey: "dailyAdhaerence",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tägliche Adhärenz
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const { label, numeric } = formatPercent(row.getValue("dailyAdhaerence"))
            const styles = numeric == null ? "bg-gray-100 text-gray-800" : adherenceStyles(numeric)
            const progressBarStyles = numeric == null ? "bg-gray-900" : progressStyles(numeric)

            const da = row.getValue("dailyAdhaerence") as number
            const [progress, setProgress] = useState(13)
            useEffect(() => {
                const timer = setTimeout(() => setProgress(66), 500)
                return () => clearTimeout(timer)
            }, [])

            return (
                <div className={`flex row gap-2 items-center rounded-full ${styles} shadow shadow-xs shadow-black `}>
                    <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium`}
                    >
                        {label}
                    </span>
                    <Progress value={parseFloat(da.toString())} className={"h-2 w-[70%]"} indicatorClassName={`${progressBarStyles}`} />
                </div>
            )
        },
    },
    {
        accessorKey: "weeklyAdhaerence",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Wöchentliche Adhärenz
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const { label, numeric } = formatPercent(row.getValue("weeklyAdhaerence"))
            const styles = numeric == null ? "bg-gray-100 text-gray-800" : adherenceStyles(numeric)
            const progressBarStyles = numeric == null ? "bg-gray-900" : progressStyles(numeric)

            const da = row.getValue("weeklyAdhaerence") as number
            const [progress, setProgress] = useState(13)
            useEffect(() => {
                const timer = setTimeout(() => setProgress(66), 500)
                return () => clearTimeout(timer)
            }, [])

            return (
                <div className={`flex row gap-2 items-center rounded-full ${styles} shadow shadow-xs shadow-black `}>

                    <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium`}
                    >
                        {label}
                    </span>
                    <Progress value={parseFloat(da.toString())} className={"h-2 w-[70%]"} indicatorClassName={`${progressBarStyles}`} />
                </div>
            )
        },
    },
    {
        accessorKey: "Fragebogen Erstellen",
        header: ({ column }) => {
            return (
                <span className="inline-flex items-center rounded-full px-3 py-1 text-l font-bold">
                    Fragebogen Erstellen
                </span>
            )
        },
        cell: ({ row }) => {

            return (
                <Button variant="outline" className="ml-2 shadow shadow-xs shadow-black">

                    <Link
                        href={`/participants/${row.original.id}`}
                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium`}
                    >
                        Fragebogen Erstellen
                    </Link>
                </Button>
            )
        },
    },
]