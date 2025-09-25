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
    encrypted_id: number;
    title: string;
    desc: string;
    updated_at: Date;
    cat_name: string;
    et_name: string;
    cover: string;
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
    x: string | null;
    instagram: string | null;
    linkedin: string | null;
    facebook: string | null;
    website: string | null;
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
                            router.get(`/segbopub/${elements.encrypted_id}`)
                        }
                    >
                        See pub
                    </Button>
                </div>
            );
        },
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
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
                <Link href={route('find.reporter')} className="mb-8">
                    <Button
                        variant="default"
                        className="bg-orange-600 text-white"
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
                            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                                {reporter.website && (
                                    <a
                                        href={reporter.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white">
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 512 512"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                            >
                                                <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M418.275,146h-46.667 c-5.365-22.513-12.324-43.213-20.587-61.514c15.786,8.776,30.449,19.797,43.572,32.921C403.463,126.277,411.367,135.854,418.275,146 z M452,256c0,17.108-2.191,33.877-6.414,50h-64.034c1.601-16.172,2.448-32.887,2.448-50s-0.847-33.828-2.448-50h64.034 C449.809,222.123,452,238.892,452,256z M256,452c-5.2,0-21.048-10.221-36.844-41.813c-6.543-13.087-12.158-27.994-16.752-44.187 h107.191c-4.594,16.192-10.208,31.1-16.752,44.187C277.048,441.779,261.2,452,256,452z M190.813,306 c-1.847-16.247-2.813-33.029-2.813-50s0.966-33.753,2.813-50h130.374c1.847,16.247,2.813,33.029,2.813,50s-0.966,33.753-2.813,50 H190.813z M60,256c0-17.108,2.191-33.877,6.414-50h64.034c-1.601,16.172-2.448,32.887-2.448,50s0.847,33.828,2.448,50H66.414 C62.191,289.877,60,273.108,60,256z M256,60c5.2,0,21.048,10.221,36.844,41.813c6.543,13.087,12.158,27.994,16.752,44.187H202.404 c4.594-16.192,10.208-31.1,16.752-44.187C234.952,70.221,250.8,60,256,60z M160.979,84.486c-8.264,18.301-15.222,39-20.587,61.514 H93.725c6.909-10.146,14.812-19.723,23.682-28.593C130.531,104.283,145.193,93.262,160.979,84.486z M93.725,366h46.667 c5.365,22.513,12.324,43.213,20.587,61.514c-15.786-8.776-30.449-19.797-43.572-32.921C108.537,385.723,100.633,376.146,93.725,366z M351.021,427.514c8.264-18.301,15.222-39,20.587-61.514h46.667c-6.909,10.146-14.812,19.723-23.682,28.593 C381.469,407.717,366.807,418.738,351.021,427.514z"></path>
                                            </svg>
                                        </div>
                                    </a>
                                )}

                                {reporter.x && (
                                    <a
                                        href={reporter.x}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white">
                                            <svg
                                                role="img"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="h-5 w-5"
                                            >
                                                <title>X</title>
                                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                            </svg>
                                        </div>
                                    </a>
                                )}

                                {reporter.facebook && (
                                    <a
                                        href={reporter.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white">
                                            <svg
                                                role="img"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="h-5 w-5"
                                            >
                                                <title>Facebook</title>
                                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                                            </svg>
                                        </div>
                                    </a>
                                )}

                                {reporter.linkedin && (
                                    <a
                                        href={reporter.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white">
                                            <svg
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                            >
                                                <path d="M1 6h4v13H1V6zm2-5C1.8 1 1 2 1 3.1 1 4.1 1.8 5 3 5c1.3 0 2-.9 2-2s-.8-2-2-2zm11.6 5.2c-2.1 0-3.3 1.2-3.8 2h-.1l-.2-1.7H6.9c0 1.1.1 2.4.1 3.9V19h4v-7.1c0-.4 0-.7.1-1 .3-.7.8-1.6 1.9-1.6 1.4 0 2 1.2 2 2.8V19h4v-7.4c0-3.7-1.9-5.4-4.4-5.4z"></path>
                                            </svg>
                                        </div>
                                    </a>
                                )}

                                {reporter.instagram && (
                                    <a
                                        href={reporter.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white">
                                            <svg
                                                role="img"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                className="h-5 w-5"
                                            >
                                                <title>Instagram</title>
                                                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
                                            </svg>
                                        </div>
                                    </a>
                                )}
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

                            {/* Bio */}
                            <div className="mb-6 mt-6">
                                <h2 className="mb-2 text-2xl font-semibold text-gray-800">
                                    About me
                                </h2>
                                <p
                                    className="whitespace-pre-wrap text-justify leading-relaxed text-gray-700"
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(
                                            reporter.present || '',
                                        ),
                                    }}
                                ></p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
