"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

export type Study = {
    id: string
    name: string
    description: string
    status: "ANGEHEND" | "LAUFEND" | "ABGESCHLOSSEN"
    startDate: string // ISO 8601
    endDate: string   // ISO 8601
}

const statusStyles: Record<string, string> = {
    ANGEHEND: "bg-blue-100 text-blue-800",
    LAUFEND: "bg-green-100 text-green-800",
    ABGESCHLOSSEN: "bg-gray-200 text-gray-800",
}

export const studyColumns: ColumnDef<Study>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Studie
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const studyName = row.getValue("name") as string
            const studyId = row.original.id
            return (
                <Button
                    variant="ghost"
                >
                    <Link href={`/studies/${studyId}`}>
                        {studyName}
                    </Link>
                </Button>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("status") as string

            return (
                <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statusStyles[status] ?? "bg-gray-100 text-gray-800"
                        }`}
                >
                    {status}
                </span>
            )
        },
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Startdatum
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const value = row.getValue("startDate") as string | null
            if (!value) return "—"

            const formatted = new Date(value).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            })
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "endDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Enddatum
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const value = row.getValue("endDate") as string | null
            if (!value) return "—"

            const formatted = new Date(value).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            })
            return <div className="font-medium">{formatted}</div>
        },
    },
]