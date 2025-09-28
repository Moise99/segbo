'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/ui/RichTextEditor';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
    desc: z.string().min(10, {
        message: '20 character minimum.',
    }),
    title: z.string().min(4, {
        message: '10 character minimum.',
    }),
    link: z.string().min(4, {
        message: '7 character minimum.',
    }),
    cover: z
        .instanceof(File)
        .refine(
            (file) => ['image/jpeg', 'image/png'].includes(file.type),
            'Only .jpeg and .png formats are allowed.',
        )
        .refine(
            (file) => file.size <= 2 * 1024 * 1024, // 2MB max
            'File must be less than 2MB.',
        ),
    elementype: z.number().int().positive({
        message: 'Enter valid element type.',
    }),
    category: z.number().int().positive({
        message: 'Enter valid category.',
    }),
});

interface Elementype {
    id: number;
    et_name: string;
}

interface Category {
    id: number;
    cat_name: string;
}
interface FlashMessages {
    success?: string;
    error?: string;
}

interface Props extends PageProps {
    categories: Category[];
    elementypes: Elementype[];
    flash: FlashMessages;
}

export default function Create() {
    const {
        errors,
        categories,
        elementypes,
        flash = {},
    } = usePage<Props>().props;

    useEffect(() => {
        if (flash.error) {
            toast.error(flash.error);
        }
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.error, flash.success]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            desc: '',
        },
    });

    function onSubmit(values: {
        link: string;
        desc: string;
        title: string;
        cover: File;
        elementype: number;
        category: number;
    }) {
        router.post('/element/store', values);
    }

    return (
        <AuthenticatedLayout>
            <Head title="New publication" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 text-2xl text-blue-900">
                            New publication
                        </div>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                            gutter={8}
                            containerClassName=""
                            containerStyle={{}}
                            toastOptions={{
                                duration: 5000,
                            }}
                        />
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="20 character minimum"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.title && (
                                                <p className="text-red-700">
                                                    {errors.title}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="link"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Publication's link
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="7 character minimum"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.link && (
                                                <p className="text-red-700">
                                                    {errors.link}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cover"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Publication's cover
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    accept="image/jpeg, image/png" // restrict formats
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files?.[0];
                                                        field.onChange(file); // set file in RHF
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.cover && (
                                                <p className="text-red-700">
                                                    {errors.cover}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="elementype"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Publication's type
                                            </FormLabel>
                                            <Select
                                                onValueChange={(value) =>
                                                    field.onChange(
                                                        Number(value),
                                                    )
                                                }
                                                defaultValue={
                                                    field.value
                                                        ? String(field.value)
                                                        : ''
                                                }
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {elementypes.map(
                                                        (elementype) => (
                                                            <SelectItem
                                                                key={
                                                                    elementype.id
                                                                }
                                                                value={String(
                                                                    elementype.id,
                                                                )}
                                                            >
                                                                {
                                                                    elementype.et_name
                                                                }
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            {errors.elementype && (
                                                <p className="text-red-700">
                                                    {errors.elementype}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select
                                                onValueChange={(value) =>
                                                    field.onChange(
                                                        Number(value),
                                                    )
                                                }
                                                defaultValue={
                                                    field.value
                                                        ? String(field.value)
                                                        : ''
                                                }
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {categories.map(
                                                        (category) => (
                                                            <SelectItem
                                                                key={
                                                                    category.id
                                                                }
                                                                value={String(
                                                                    category.id,
                                                                )}
                                                            >
                                                                {
                                                                    category.cat_name
                                                                }
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            {errors.category && (
                                                <p className="text-red-700">
                                                    {errors.category}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="desc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <RichTextEditor
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.desc && (
                                                <p className="text-red-700">
                                                    {errors.desc}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    type="submit"
                                    className="bg-blue-600 text-white hover:bg-orange-600"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
