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
import GuestLayout from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
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
} from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

// Interface Element
interface Element {
    encrypted_id: number;
    title: string;
    desc: string;
    updated_at: Date;
    cat_name: string;
    et_name: string;
    cover: string;
    username: string;
    name: string;
    photo: string;
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
    updated_at: 'Published',
    name: 'Author',
};
const columns: ColumnDef<Element>[] = [
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
        accessorKey: 'name',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Author <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => {
            const username = row.original.username;
            const name = row.original.name;
            const photo = row.original.photo;

            return (
                <div>
                    <Button
                        variant="secondary"
                        className="border-2 border-gray-200 bg-white text-black"
                        onClick={() => router.get(`/sg/${username}`)}
                    >
                        {name}
                        <div className="flex items-center">
                            <img
                                src={photo}
                                alt="Cover"
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        </div>
                    </Button>
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
        cell: ({ row }) => {
            const elements = row.original;

            return (
                <div className="flex gap-2">
                    <Button
                        variant="default"
                        className="bg-orange-600"
                        onClick={() =>
                            router.get(`/pub/${elements.encrypted_id}`)
                        }
                    >
                        See pub
                    </Button>
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
        <GuestLayout>
            <Head title="Publications" />
            <div className="mb-8 text-center">
                <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Our Segbon's publications
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    <Link href={route('find.reporter')} className="mb-8">
                        <Button
                            variant="default"
                            className="bg-orange-600 text-white"
                        >
                            Discover our talented journalists and their areas of
                            expertise
                        </Button>
                    </Link>
                </p>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 text-2xl text-blue-900">
                            List of publications
                        </div>

                        <div className="mb-4 flex items-center justify-between gap-x-8">
                            <Input
                                placeholder="Search by category, title ...."
                                value={
                                    (table.getState().globalFilter as string) ??
                                    ''
                                }
                                onChange={(event) =>
                                    table.setGlobalFilter(event.target.value)
                                }
                                className="max-w-sm"
                            />
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
        </GuestLayout>
    );
}
