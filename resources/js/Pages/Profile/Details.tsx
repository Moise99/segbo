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
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

const formSchema = z.object({
    present: z.string().nullable().optional(),
    linkedin: z.string().nullable().optional(),
    x: z.string().nullable().optional(),
    instagram: z.string().nullable().optional(),
    facebook: z.string().nullable().optional(),
    photo: z
        .any() // start with any type
        .optional()
        .refine((file) => !file || file instanceof File, 'Invalid file')
        .refine(
            (file) =>
                !file ||
                ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
            'Only .jpeg, .jpg and .png formats are allowed.',
        )
        .refine(
            (file) => !file || file.size <= 2 * 1024 * 1024,
            'File must be less than 2MB',
        ),
});

interface Acdetail {
    id: number;
    present: string;
    linkedin: string;
    photo: File;
    x: string;
    instagram: string;
    facebook: string;
}
interface FlashMessages {
    success?: string;
    error?: string;
}

interface Props extends PageProps {
    acdetail: Acdetail;
    flash: FlashMessages;
}

export default function Create() {
    const { errors, acdetail, flash = {} } = usePage<Props>().props;

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
            present: acdetail.present || null,
            photo: undefined,
            linkedin: acdetail.linkedin || null,
            x: acdetail.x || null,
            facebook: acdetail.facebook || null,
            instagram: acdetail.instagram || null,
        },
    });

    function onSubmit(values: {
        present?: string | null;
        x: string | null;
        facebook: string | null;
        cover?: File | null | undefined;
        instagram: number | null;
        linkedin: number | null;
    }) {
        router.post(
            `/acdetail/${acdetail.id}/update`,
            {
                ...values,
                _method: 'PUT',
            },
            {
                forceFormData: true,
                preserveScroll: true,
            },
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Edit profile" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-4 text-2xl text-blue-900">
                            Edit profile
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
                                    name="x"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>X</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="X link"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.x && (
                                                <p className="text-red-700">
                                                    {errors.x}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="instagram"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Instagram</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Instagram link"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.instagram && (
                                                <p className="text-red-700">
                                                    {errors.instagram}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="linkedin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>LinkedIn</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="linkedIn link"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.linkedin && (
                                                <p className="text-red-700">
                                                    {errors.linkedin}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="facebook"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Facebook</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Facebook link"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.facebook && (
                                                <p className="text-red-700">
                                                    {errors.facebook}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="photo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Profile image</FormLabel>
                                            {acdetail.photo && (
                                                <img
                                                    src={`/storage/${acdetail.photo}`}
                                                    alt="current cover"
                                                    className="mb-2 h-24 w-24 rounded-md object-cover"
                                                />
                                            )}
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
                                            {errors.photo && (
                                                <p className="text-red-700">
                                                    {errors.photo}
                                                </p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="present"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Your Brief presentation
                                            </FormLabel>
                                            <FormControl>
                                                <RichTextEditor
                                                    value={field.value || ''}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            {errors.present && (
                                                <p className="text-red-700">
                                                    {errors.present}
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
