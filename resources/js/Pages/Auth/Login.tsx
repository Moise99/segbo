import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { data, setData, processing, errors, reset } = useForm({
        email: '',
        password: '',
        'g-recaptcha-response': '',
        remember: false,
    });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent double submission
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (!recaptchaRef.current) {
            console.error('reCAPTCHA not ready');
            setIsSubmitting(false);
            return;
        }

        try {
            const token = await recaptchaRef.current.executeAsync();
            //console.log('reCAPTCHA token received:', token ? 'YES' : 'NO');

            if (!token) {
                console.error('reCAPTCHA token null');
                setIsSubmitting(false);
                return;
            }

            // console.log(
            //     'Submitting login with token:',
            //     token.substring(0, 20) + '...',
            // );

            // Use router.post directly - this GUARANTEES the token is sent
            router.post(
                route('login'),
                {
                    email: data.email,
                    password: data.password,
                    'g-recaptcha-response': token,
                    remember: data.remember,
                },
                {
                    onSuccess: () => {
                        // console.log('Login successful!');
                        setIsSubmitting(false);
                    },
                    onError: (errors) => {
                        console.error('Login errors:', errors);
                        setIsSubmitting(false);

                        // Check if reCAPTCHA error still exists
                        if (errors['g-recaptcha-response']) {
                            console.error(
                                'reCAPTCHA validation failed on server side',
                            );
                        }
                    },
                    onFinish: () => {
                        reset('password');
                        setIsSubmitting(false);
                    },
                },
            );
        } catch (error) {
            console.error('reCAPTCHA execution failed:', error);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        return () => reset('password');
    }, [reset]);

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mx-4 py-12">
                <div className="mx-auto max-w-md rounded-lg bg-gradient-to-b from-blue-800 to-[#010336] py-12 sm:px-2 lg:px-4">
                    {status && (
                        <div className="mt-6 text-center text-sm font-medium text-white">
                            {status} Please, login!
                        </div>
                    )}

                    <form onSubmit={submit} className="mx-2">
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
                                required
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
                                required
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

                        <div className="mx-2 mt-8 flex items-center justify-between">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-white underline hover:text-orange-600"
                                >
                                    Forgot your password?
                                </Link>
                            )}
                            <PrimaryButton
                                className="bg-orange-600"
                                disabled={processing || isSubmitting}
                            >
                                {isSubmitting ? 'Processing...' : 'Log in'}
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
                            onClick={() =>
                                (window.location.href =
                                    route('google.redirect'))
                            }
                        >
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="h-10 w-10"
                            >
                                <title>Google</title>
                                <path d="M24 12.272c0-.82-.073-1.605-.209-2.364H12v4.48h6.765c-.293 1.494-1.18 2.757-2.52 3.61v3.004h4.065c2.38-2.19 3.69-5.418 3.69-8.73z" />
                                <path d="M12 24c3.24 0 5.952-1.07 7.936-2.902l-4.065-3.004c-1.132.758-2.58 1.204-3.871 1.204-2.976 0-5.493-2.01-6.392-4.71H1.435v2.96A11.998 11.998 0 0012 24z" />
                                <path d="M5.608 14.588a7.19 7.19 0 01-.375-2.271c0-.79.137-1.55.375-2.271v-2.96H1.435A11.998 11.998 0 000 12.317c0 1.986.482 3.864 1.435 5.504l4.173-3.233z" />
                                <path d="M12 4.807c1.77 0 3.357.61 4.61 1.81l3.44-3.44C17.952 1.071 15.24 0 12 0 7.31 0 3.21 2.69 1.435 6.813l4.173 3.233C6.507 6.817 9.024 4.807 12 4.807z" />
                            </svg>
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
