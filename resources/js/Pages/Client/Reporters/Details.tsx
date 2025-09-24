// src/Pages/ReporterProfile.tsx

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { Head, Link, usePage } from '@inertiajs/react';
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
import DOMPurify from 'dompurify';
import {
    ArrowUpDown,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import * as React from 'react';

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

// Type definitions for the data
type Category = {
    name: string;
    pub_count: number;
};

type Reporter = {
    name: string;
    username: string;
    present: string; // Biography/About section
    photo: string | null;
    categories: Category[];
};

// Define the component's props, expecting a single reporter object
interface Props extends PageProps {
    reporter: Reporter;
    elements: Element[];
}

const columnLabels: Record<string, string> = {
    cat_name: 'Category',
    title: 'Title',
    link: 'Link',
    desc: 'Desc',
    cover: 'Cover',
    et_name: 'Type',
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
                        src={`/storage/${cover}`}
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
];

export default function ReporterProfile() {
    const { reporter, elements } = usePage<Props>().props;

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

    // A fallback image path
    const photoUrl = reporter.photo
        ? `/storage/${reporter.photo}`
        : '/storage/becomesegbo_images/default.png';

    return (
        <GuestLayout>
            <Head title={reporter.name} />
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
                <Link href={route('find.reporter')} className="mb-8">
                    <Button
                        variant="outline"
                        className="bg-orange-600 text-white hover:text-indigo-600"
                    >
                        Back to Segbo list
                    </Button>
                </Link>
                <Card className="w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg">
                    <CardContent className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                        {/* Photo Section */}
                        <div className="flex-shrink-0">
                            <img
                                src={photoUrl}
                                alt={`Photo de ${reporter.name}`}
                                className="h-48 w-48 rounded-full border-4 border-white object-cover shadow-md sm:h-64 sm:w-64"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="flex-grow text-center md:text-left">
                            <h1 className="mb-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                {reporter.name}
                            </h1>
                            <p className="mb-4 text-xl text-gray-600">
                                @{reporter.username}
                            </p>
                            <p className="mb-4 text-xl text-gray-600">
                                {reporter.categories.map((cat, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20"
                                    >
                                        {cat.name} ({cat.pub_count})
                                    </span>
                                ))}
                            </p>

                            {/* Bio */}
                            <div className="mb-6 mt-6">
                                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                                    About me
                                </h2>
                                <p
                                    className="whitespace-pre-wrap leading-relaxed text-gray-700"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            reporter.present || '',
                                        ),
                                    }}
                                ></p>
                            </div>

                            {/* Categories/Expertise */}
                            <div className="mt-6">
                                <h2 className="mb-3 text-2xl font-semibold text-gray-800">
                                    Expertise domain(s)
                                </h2>
                                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                                    {reporter.categories.map((cat, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-600/20"
                                        >
                                            {cat.name} ({cat.pub_count})
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 text-2xl text-blue-900">
                            List of articles
                        </div>
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
