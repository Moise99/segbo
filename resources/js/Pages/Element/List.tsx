"use client";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, usePage, router } from "@inertiajs/react";
import * as React from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ArrowUpDown,
    MoreHorizontal,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@radix-ui/react-tooltip";
import * as Dialog from "@radix-ui/react-dialog";

// Interface Element
interface Element {
    id: number;
    link: string;
    title: string;
    desc: string;
    updated_at: Date;
    cat_name: string;
    et_name: string;
    cover: string;
}

interface FlashMessages {
    success?: string;
    error?: string;
}

// Props pour la page
interface Props extends PageProps {
    elements: Element[];
    flash: FlashMessages;
}

// Définition des colonnes pour le tableau
const columnLabels: Record<string, string> = {
    cat_name: "Category",
    title: "Title",
    link: "Link",
    desc: "Desc",
    cover: "Cover",
    et_name: "Type",
    updated_at: "registered",
};
const columns: ColumnDef<Element>[] = [
    {
        accessorKey: "nom_ccat",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Con / Prae <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.nom_ccat}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "nom",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Vocable <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.nom}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: "prenom",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Territoire <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.prenom}</div>,
        enableColumnFilter: true,
    },

    {
        accessorKey: "cont",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Montant <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const value = row.original.cont;
            const formattedValue = new Intl.NumberFormat("fr-FR", {
                style: "decimal",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
            return <div>{formattedValue}</div>;
        },
        enableColumnFilter: true,
    },

    {
        accessorKey: "periode",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Période <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.periode}</div>,
        enableColumnFilter: true,
    },

    {
        accessorKey: "moisde",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Reçu en <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.moisde);
            const options: Intl.DateTimeFormatOptions = {
                month: "long",
                year: "numeric",
            };
            const formattedDate = date.toLocaleDateString("fr-FR", options);
            return <div>{formattedDate}</div>;
        },
        enableColumnFilter: true,
    },

    {
        accessorKey: "updated_at",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Modifié le <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.updated_at);
            const options: Intl.DateTimeFormatOptions = {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            };
            const formattedDate = date.toLocaleDateString("fr-FR", options);
            return <div>{formattedDate}</div>;
        },
        enableColumnFilter: true,
    },

    {
        id: "actions",
        enableHiding: false,
        header: () => <Button variant="ghost">Actions</Button>,
        cell: ({ row }) => {
            const conmen = row.original;

            return (
                <div className="flex gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-700 hover:bg-gray-300"
                                    onClick={() =>
                                        router.get(`/conmens/${conmen.id}/edit`)
                                    }
                                >
                                    <Pencil className="w-5 h-5 text-white" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">Modifier</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <Dialog.Root>
                                <Dialog.Trigger asChild>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-10 w-10 rounded-full flex items-center justify-center bg-red-700 hover:bg-gray-300"
                                        >
                                            <Trash className="w-5 h-5 text-white" />
                                        </Button>
                                    </TooltipTrigger>
                                </Dialog.Trigger>
                                <TooltipContent side="top">
                                    Supprimer
                                </TooltipContent>
                                <Dialog.Portal>
                                    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                                    <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
                                        <Dialog.Title className="text-lg font-semibold">
                                            Confirmation de suppression
                                        </Dialog.Title>
                                        <Dialog.Description className="mt-2 mb-4 text-sm text-gray-600">
                                            Êtes-vous sûr de vouloir supprimer
                                            cette contribution ?
                                        </Dialog.Description>
                                        <div className="flex justify-end gap-4">
                                            <Dialog.Close asChild>
                                                <Button variant="outline" className="bg-green-700 text-white">
                                                    Annuler
                                                </Button>
                                            </Dialog.Close>
                                            <Dialog.Close asChild>
                                                <Button
                                                    variant="destructive"
                                                    onClick={() =>
                                                        router.delete(
                                                            `/conmens/${conmen.id}/destroy`
                                                        )
                                                    }
                                                >
                                                    Oui
                                                </Button>
                                            </Dialog.Close>
                                        </div>
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        },
    },
];

export default function List() {
    const { conmens, flash = {} } = usePage<Props>().props;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([] as ColumnFiltersState);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Configuration de la table
    const table = useReactTable({
        data: conmens,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Contributions Mensuelles
                </h2>
            }
        >
            <Head title="Cont Mens" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="text-2xl text-blue-900 mb-4">
                            Liste des Contributions Mensuelles
                        </div>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                            gutter={8}
                            containerClassName=""
                            containerStyle={{}}
                            toastOptions={{
                                // Définit la durée par défaut
                                duration: 5000,
                            }}
                        />
                        <div className="flex justify-between gap-x-8 items-center mb-4">
                            <Input
                                placeholder="Rechercher par date, conseil ...."
                                value={
                                    (table.getState().globalFilter as string) ??
                                    ""
                                }
                                onChange={(event) =>
                                    table.setGlobalFilter(event.target.value)
                                }
                                className="max-w-sm"
                            />
                            <Button
                                variant="default"
                                onClick={() => router.get("/conmens/create")}
                            >
                                + Nouvelle Contribution
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="ml-auto"
                                    >
                                        Colonnes <ChevronDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {table
                                        .getAllColumns()
                                        .filter((column) => column.getCanHide())
                                        .map((column) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                    onCheckedChange={(value) =>
                                                        column.toggleVisibility(
                                                            !!value
                                                        )
                                                    }
                                                >
                                                    {columnLabels[column.id] ||
                                                        column.id}
                                                </DropdownMenuCheckboxItem>
                                            );
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Table des villes */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table
                                        .getHeaderGroups()
                                        .map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                {headerGroup.headers.map(
                                                    (header) => (
                                                        <TableHead
                                                            key={header.id}
                                                        >
                                                            {header.isPlaceholder
                                                                ? null
                                                                : flexRender(
                                                                      header
                                                                          .column
                                                                          .columnDef
                                                                          .header,
                                                                      header.getContext()
                                                                  )}
                                                        </TableHead>
                                                    )
                                                )}
                                            </TableRow>
                                        ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={
                                                    row.getIsSelected() &&
                                                    "selected"
                                                }
                                            >
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                Aucun résultat trouvé.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-between py-4">
                            <div className="text-sm text-muted-foreground">
                                Page {table.getState().pagination.pageIndex + 1}{" "}
                                / {table.getPageCount()}
                            </div>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <ChevronsLeft className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        table.setPageIndex(
                                            table.getPageCount() - 1
                                        )
                                    }
                                    disabled={!table.getCanNextPage()}
                                >
                                    <ChevronsRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
