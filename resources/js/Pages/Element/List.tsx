'use client';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import * as Dialog from '@radix-ui/react-dialog';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@radix-ui/react-tooltip';
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
} from '@tanstack/react-table';
import {
    ArrowUpDown,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Eye,
    Pencil,
    X,
} from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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
    etate: number;
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
    cat_name: 'Category',
    title: 'Title',
    link: 'Link',
    desc: 'Desc',
    cover: 'Cover',
    et_name: 'Type',
    updated_at: 'registered',
};
const columns: ColumnDef<Element>[] = [
    {
        accessorKey: 'cat_name',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Category <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.cat_name}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: 'et_name',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Type <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.et_name}</div>,
        enableColumnFilter: true,
    },
    {
        accessorKey: 'title',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Title <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const maxLength = 10;
            const obs = row.original.title;

            if (!obs) {
                return <div className="tiptap italic text-gray-400">—</div>;
            }
            const textOnly = row.original.title.replace(/<[^>]+>/g, '');
            const displayText =
                textOnly.length > maxLength
                    ? textOnly.substring(0, maxLength) + ' (…) '
                    : textOnly;
            return <div className="tiptap">{displayText}</div>;
        },
        enableColumnFilter: true,
    },
    {
        accessorKey: 'link',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Link <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const link = row.original.link;
            return (
                <div>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        The link
                    </a>
                </div>
            );
        },
        enableColumnFilter: true,
    },

    {
        accessorKey: 'cover',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Cover <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const cover = row.original.cover;
            return (
                <div className="flex items-center">
                    <img
                        src={cover}
                        alt="Cover"
                        className="h-10 w-10 rounded-full object-cover"
                    />
                </div>
            );
        },
        enableColumnFilter: true,
    },

    {
        accessorKey: 'desc',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Desc <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const maxLength = 15;
            const obs = row.original.desc;

            if (!obs) {
                return <div className="tiptap italic text-gray-400">—</div>;
            }
            const textOnly = row.original.desc.replace(/<[^>]+>/g, '');
            const displayText =
                textOnly.length > maxLength
                    ? textOnly.substring(0, maxLength) + ' (…) '
                    : textOnly;
            return <div className="tiptap">{displayText}</div>;
        },
        enableColumnFilter: true,
    },

    {
        accessorKey: 'updated_at',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Published <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const date = new Date(row.original.updated_at);
            const options: Intl.DateTimeFormatOptions = {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };
            const formattedDate = date.toLocaleDateString('en-EN', options);
            return <div>{formattedDate}</div>;
        },
        enableColumnFilter: true,
    },

    {
        id: 'actions',
        enableHiding: false,
        header: () => <Button variant="ghost">Actions</Button>,
        cell: ({ row }) => {
            const elements = row.original;

            return (
                <div className="flex gap-2">
                    {elements.etate == 1 ? (
                        <TooltipProvider>
                            <Tooltip>
                                <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 hover:bg-gray-300"
                                            >
                                                <Eye className="h-5 w-5 text-white" />
                                            </Button>
                                        </TooltipTrigger>
                                    </Dialog.Trigger>
                                    <TooltipContent side="top">
                                        Disable
                                    </TooltipContent>
                                    <Dialog.Portal>
                                        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                                        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
                                            <Dialog.Title className="text-lg font-semibold">
                                                Disable confimation
                                            </Dialog.Title>
                                            <Dialog.Description className="mb-4 mt-2 text-sm text-gray-600">
                                                Are you sure to disable this
                                                publication?
                                            </Dialog.Description>
                                            <div className="flex justify-end gap-4">
                                                <Dialog.Close asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="bg-green-700 text-white"
                                                    >
                                                        No
                                                    </Button>
                                                </Dialog.Close>
                                                <Dialog.Close asChild>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() =>
                                                            router.get(
                                                                `/element/${elements.id}/endesable`,
                                                            )
                                                        }
                                                    >
                                                        Yes
                                                    </Button>
                                                </Dialog.Close>
                                            </div>
                                        </Dialog.Content>
                                    </Dialog.Portal>
                                </Dialog.Root>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <TooltipProvider>
                            <Tooltip>
                                <Dialog.Root>
                                    <Dialog.Trigger asChild>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-700 hover:bg-gray-300"
                                            >
                                                <X className="h-5 w-5 text-white" />
                                            </Button>
                                        </TooltipTrigger>
                                    </Dialog.Trigger>
                                    <TooltipContent side="top">
                                        Enable
                                    </TooltipContent>
                                    <Dialog.Portal>
                                        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                                        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg">
                                            <Dialog.Title className="text-lg font-semibold">
                                                Enable Confirmation
                                            </Dialog.Title>
                                            <Dialog.Description className="mb-4 mt-2 text-sm text-gray-600">
                                                Are you sure to enable this
                                                publication?
                                            </Dialog.Description>
                                            <div className="flex justify-end gap-4">
                                                <Dialog.Close asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="bg-green-700 text-white"
                                                    >
                                                        No
                                                    </Button>
                                                </Dialog.Close>
                                                <Dialog.Close asChild>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() =>
                                                            router.get(
                                                                `/element/${elements.id}/endesable`,
                                                            )
                                                        }
                                                    >
                                                        Yes
                                                    </Button>
                                                </Dialog.Close>
                                            </div>
                                        </Dialog.Content>
                                    </Dialog.Portal>
                                </Dialog.Root>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 hover:bg-gray-300"
                                    onClick={() =>
                                        router.get(
                                            `/element/${elements.id}/edit`,
                                        )
                                    }
                                >
                                    <Pencil className="h-5 w-5 text-white" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">Edit</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            );
        },
    },
];

export default function List() {
    const { elements, flash = {} } = usePage<Props>().props;
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
        data: elements,
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
        <AuthenticatedLayout>
            <Head title="Publications list" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 text-2xl text-blue-900">
                            List of your publications
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
                        <div className="mb-4 flex items-center justify-between gap-x-8">
                            <Input
                                placeholder="Search by date, title ...."
                                value={
                                    (table.getState().globalFilter as string) ??
                                    ''
                                }
                                onChange={(event) =>
                                    table.setGlobalFilter(event.target.value)
                                }
                                className="max-w-sm"
                            />
                            <Button
                                variant="default"
                                className="bg-orange-600"
                                onClick={() => router.get('/element/create')}
                            >
                                + New publication
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="ml-auto"
                                    >
                                        Columns <ChevronDown />
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
                                                            !!value,
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
                                                                      header.getContext(),
                                                                  )}
                                                        </TableHead>
                                                    ),
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
                                                    'selected'
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
                                                                cell.getContext(),
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
                                Page {table.getState().pagination.pageIndex + 1}{' '}
                                / {table.getPageCount()}
                            </div>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        table.setPageIndex(
                                            table.getPageCount() - 1,
                                        )
                                    }
                                    disabled={!table.getCanNextPage()}
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
