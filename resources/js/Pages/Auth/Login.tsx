import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import AuthPagesLayout from '@/Layouts/AuthPagesLayout';
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
        <AuthPagesLayout>
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
                                className="mt-1 block w-full rounded-md border border-white bg-gray-400 p-3 text-white transition-all duration-300 hover:scale-[1.02] focus:border-orange-500 focus:ring-orange-500"
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
                                className="mt-1 block w-full rounded-md border border-white bg-gray-400 p-3 text-white transition-all duration-300 hover:scale-[1.02] focus:border-orange-500 focus:ring-orange-500"
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
                                className="bg-orange-600 transition-all duration-300 hover:scale-[1.02]"
                                disabled={processing || isSubmitting}
                            >
                                {isSubmitting ? 'Processing...' : 'Log in'}
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mx-2 mt-6 flex items-center">
                        <hr className="w-full border-gray-300" />
                        <span className="px-3 text-center text-sm text-white">
                            or
                        </span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    <div className="mb-6 mt-5 flex justify-center">
                        <PrimaryButton
                            type="button"
                            className="flex items-center space-x-3 rounded-full bg-orange-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800"
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
                                className="h-8 w-8"
                            >
                                <title>Google</title>
                                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-8.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                            </svg>
                            <span>Continue with Google</span>
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AuthPagesLayout>
    );
}
