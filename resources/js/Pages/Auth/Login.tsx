import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    // Explicitly type the useRef hook with the ReCAPTCHA type
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        'g-recaptcha-response': '',
        remember: false,
    });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (recaptchaRef.current) {
            try {
                const token = await recaptchaRef.current.executeAsync();

                // Check if the token is a valid string before proceeding
                if (token) {
                    setData('g-recaptcha-response', token);
                    post(route('login'));
                } else {
                    console.error(
                        'reCAPTCHA token is null. API call failed or was blocked.',
                    );
                    // You could also set a specific error message for the user here
                }
            } catch (error) {
                console.error('reCAPTCHA failed:', error);
            }
        } else {
            console.error('reCAPTCHA component is not ready.');
        }
    };

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, [reset]);

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="mx-4 py-12">
                <div className="mx-auto max-w-md content-center rounded-lg bg-gradient-to-b from-blue-800 to-[#010336] sm:px-2 lg:px-4">
                    {status && (
                        <div className="mt-6 text-center text-sm font-medium text-white">
                            {status} Please, login!
                        </div>
                    )}
                    <form onSubmit={submit} className="mx-2 py-12">
                        <div>
                            <InputLabel
                                className="text-white"
                                htmlFor="email"
                                value="Email"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel
                                className="text-white"
                                htmlFor="password"
                                value="Password"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        />
                        <div className="mx-2 mt-8 flex items-center justify-center">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="rounded-md text-sm text-white underline hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                            <PrimaryButton
                                className="ms-4 bg-orange-600"
                                disabled={processing}
                            >
                                Log in
                            </PrimaryButton>
                        </div>
                    </form>
                    <div className="mx-2 mt-6 flex items-center">
                        <hr className="w-full border-gray-300" />
                        <span className="px-3 text-center text-sm text-white">
                            or continue with
                        </span>
                        <hr className="w-full border-gray-300" />
                    </div>
                    <div className="mb-6 mt-5 flex justify-center">
                        <PrimaryButton
                            type="button"
                            className="bg-orange-600 text-white hover:bg-gray-800"
                            onClick={() => alert('Login with email!')}
                        >
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="h-10 w-10"
                            >
                                <title>Gmail</title>
                                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                            </svg>
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
