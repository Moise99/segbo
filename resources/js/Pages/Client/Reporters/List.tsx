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
import { Head, router, usePage } from '@inertiajs/react';
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

type Category = {
    name: string;
    count: number;
};

type Reporter = {
    name: string;
    username: string;
    photo: string | null;
    categories: Category[];
};

interface Props extends PageProps {
    reporters: Reporter[];
}

// Définition des colonnes pour le tableau
const columnLabels: Record<string, string> = {
    photo: 'Image',
    name: 'Name',
    username: 'Username',
    category: 'Top category',
};
const columns: ColumnDef<Reporter>[] = [
    {
        accessorKey: 'photo',
        header: () => (
            <Button
                variant="ghost"
                // onClick={() =>
                //     column.toggleSorting(column.getIsSorted() === 'asc')
                // }
            >
                Image
                {/* <ArrowUpDown className="ml-2" /> */}
            </Button>
        ),
        cell: ({ row }) => {
            const cover =
                row.original.photo ?? 'becomesegbo_images/default.png';
            return (
                <div className="flex items-center">
                    <img
                        src={`/storage/${cover}`}
                        alt="Cover"
                        className="h-12 w-12 rounded-full object-cover"
                    />
                </div>
            );
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
                Name <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.name}</div>,
        enableColumnFilter: true,
    },

    {
        accessorKey: 'username',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Username <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => <div>{row.original.username}</div>,
        enableColumnFilter: true,
    },

    {
        id: 'category',
        // Use accessorFn to create a string for filtering
        accessorFn: (row) => row.categories.map((cat) => cat.name).join(', '),
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === 'asc')
                }
            >
                Top Category <ArrowUpDown className="ml-2" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex flex-wrap gap-2">
                {row.original.categories.map((cat, index) => (
                    <span
                        key={index}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700"
                    >
                        {cat.name} ({cat.count})
                    </span>
                ))}
            </div>
        ),
    },

    {
        id: 'actions',
        enableHiding: false,
        header: () => <Button variant="ghost">Actions</Button>,
        cell: ({ row }) => {
            const reporters = row.original;

            return (
                <Button
                    variant="default"
                    className="bg-orange-600"
                    onClick={() =>
                        router.get(`/reporter/${reporters.username}/findmore`)
                    }
                >
                    See more
                </Button>
            );
        },
    },
];

export default function Reporters() {
    const { reporters } = usePage<Props>().props;
    const total_reporters = reporters.length;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([] as ColumnFiltersState);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    // Configuration de la table
    const table = useReactTable({
        data: reporters,
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
            <Head title="Reporters" />
            <div className="mb-8 text-center">
                <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
                    Our {total_reporters} Segbo
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                    Discover our talented journalists and their areas of
                    expertise
                </p>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 flex items-center justify-between gap-x-8">
                            <Input
                                placeholder="Search by name, categories ...."
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
