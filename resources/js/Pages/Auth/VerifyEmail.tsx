import PrimaryButton from '@/components/PrimaryButton';
import AuthPagesLayout from '@/Layouts/AuthPagesLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthPagesLayout>
            <Head title="Email Verification" />
            <div className="mx-2 py-24">
                <div className="mx-auto max-w-xl content-center rounded-lg bg-gradient-to-b from-blue-800 to-[#010336] sm:px-2 lg:px-4">
                    <div className="mx-2 my-4 text-sm text-white">
                        Before continuing, please verify your email address by
                        clicking on the link we just sent to you. If you didn't
                        receive the email even in your spam, we will gladly send
                        you another.
                        {status === 'verification-link-sent' && (
                            <div className="mx-2 my-4 bg-white text-sm font-medium text-green-600">
                                A new verification link has been sent to the
                                email address you provided during registration.
                            </div>
                        )}
                    </div>

                    <form onSubmit={submit} className="mx-2 my-2">
                        <div className="mt-4 flex items-center justify-between">
                            <PrimaryButton
                                disabled={processing}
                                className="bg-orange-600"
                            >
                                Resend Verification Email
                            </PrimaryButton>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-white underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthPagesLayout>
    );
}
