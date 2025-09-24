// src/Pages/ReporterProfile.tsx
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
    link: string;
    title: string;
    desc: string;
    updated_at: Date;
    cat_name: string;
    et_name: string;
    cover: string;
    name: string;
}

type Article = {
    link: string;
    title: string;
    desc: string;
    updated_at: Date;
    cat_name: string;
    et_name: string;
    name: string;
    username: string;
    photo: string;
    cover: string;
};

// Define the component's props, expecting a single reporter object
interface Props extends PageProps {
    article: Article;
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
    const { article, elements } = usePage<Props>().props;

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
    const coverUrl = article.cover
        ? `/storage/${article.cover}`
        : '/storage/becomesegbo_images/default_cover.png';

    // Format the date to a more readable format
    const formattedDate = new Date(article.updated_at).toLocaleDateString(
        'en-EN',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        },
    );

    return (
        <GuestLayout>
            <Head title={article.title} />
            <div className="bg-gray-50 py-12 sm:py-24">
                <div className="container mx-auto max-w-5xl px-4">
                    {/* Back button */}
                    <Link
                        href={route('find.article')}
                        className="mb-8 inline-block"
                    >
                        <Button
                            variant="default"
                            className="flex items-center space-x-2 bg-orange-600 text-white"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-4 w-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                />
                            </svg>
                            <span>Back to publications</span>
                        </Button>
                    </Link>

                    {/* Contenu de l'article */}
                    <div className="rounded-lg bg-white p-6 shadow-xl lg:p-12">
                        {/* Hero Image */}
                        <div className="mb-8 h-96 w-full overflow-hidden rounded-lg shadow-md">
                            <img
                                src={coverUrl}
                                alt={article.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Titre et métadonnées */}
                        <div className="mb-8">
                            <span className="text-sm font-medium uppercase tracking-widest text-gray-500">
                                {article.cat_name} Topic in {article.et_name}{' '}
                                format
                            </span>
                            <h1 className="mt-2 text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
                                {article.title}
                            </h1>
                            <p className="mt-4 text-gray-600">
                                By{' '}
                                <Button
                                    variant="secondary"
                                    className="border-2 border-gray-200 bg-white text-black"
                                    onClick={() =>
                                        router.get(`/segbo/${article.username}`)
                                    }
                                >
                                    <span className="text-lg font-semibold text-gray-600">
                                        {article.name}
                                    </span>
                                    <div className="flex items-center">
                                        <img
                                            src={
                                                article.photo
                                                    ? `/storage/${article.photo}`
                                                    : '/storage/becomesegbo_images/default.png'
                                            }
                                            alt="Cover"
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    </div>
                                </Button>{' '}
                                on{' '}
                                <span className="text-gray-500">
                                    {formattedDate}
                                </span>
                            </p>
                        </div>

                        {/* Corps de l'article */}
                        <div
                            className="prose max-w-none text-lg leading-relaxed text-gray-700"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(article.desc || ''),
                            }}
                        ></div>

                        {/* Bouton pour lire l'article complet */}
                        <div className="mt-12 flex justify-center">
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="default"
                                    className="bg-[#010336] px-8 py-3 text-lg text-white transition duration-300 ease-in-out hover:bg-gray-700"
                                >
                                    Read full article
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 text-2xl text-blue-900">
                            Same publications of this Segbo ( {article.name} @
                            {article.username})
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
