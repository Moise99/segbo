import InputError from '@/components/InputError';
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
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, processing, errors, reset } = useForm({
        email: '',
        password: '',
        recaptcha_token: '',
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
                    recaptcha_token: token,
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
                        if (errors['recaptcha_token']) {
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

                    <form onSubmit={submit} className="space-y-6">
                        {/* EMAIL INPUT */}
                        <div className="mx-2 space-y-2">
                            <label className="block text-sm font-medium text-white/90">
                                Email
                            </label>

                            <div className="group relative">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 blur transition-opacity group-hover:opacity-30"></div>

                                <div className="relative flex items-center">
                                    <svg
                                        className="absolute left-4 h-5 w-5 text-gray-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>

                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        className="w-full rounded-xl border border-white/20 bg-white/5 py-3.5 pl-12 pr-4 text-white placeholder-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        placeholder="votre@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <InputError
                                className="text-pink-300"
                                message={errors.email}
                            />
                        </div>

                        {/* PASSWORD INPUT */}
                        <div className="mx-2 space-y-2">
                            <label className="block text-sm font-medium text-white/90">
                                Password
                            </label>

                            <div className="group relative">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 blur transition-opacity group-hover:opacity-30"></div>

                                <div className="relative flex items-center">
                                    <svg
                                        className="absolute left-4 h-5 w-5 text-gray-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>

                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className="w-full rounded-xl border border-white/20 bg-white/5 py-3.5 pl-12 pr-12 text-white placeholder-gray-400 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                        placeholder="••••••••"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 text-gray-300 transition-colors hover:text-white"
                                    >
                                        {showPassword ? (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <InputError
                                className="text-pink-300"
                                message={errors.password}
                            />
                        </div>

                        {/* HIDDEN RECAPTCHA */}
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        />

                        {/* REMEMBER & FORGOT */}
                        <div className="mx-2 flex items-center justify-between text-sm">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="font-medium text-orange-400 transition-colors hover:text-orange-300"
                                >
                                    Forgot your password? ?
                                </Link>
                            )}
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            className="group relative w-full"
                            disabled={processing || isSubmitting}
                        >
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 blur transition-all group-hover:blur-md"></div>

                            <div className="relative flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3.5 font-semibold text-white shadow-lg transition-all active:scale-[0.98] group-hover:scale-[1.02] group-hover:shadow-orange-500/50">
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="h-5 w-5 animate-spin"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Login</span>
                                        <svg
                                            className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </>
                                )}
                            </div>
                        </button>
                    </form>

                    <div className="mx-2 mb-6 mt-6 flex items-center">
                        <hr className="w-full border-gray-300" />
                        <span className="px-3 text-center text-sm text-white">
                            or
                        </span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    {/* GOOGLE BUTTON */}
                    <button
                        className="group relative w-full"
                        type="button"
                        onClick={() =>
                            (window.location.href = route('google.redirect'))
                        }
                    >
                        {/* <div className="absolute inset-0 bg-white/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div> */}

                        <div className="relative flex items-center justify-center space-x-3 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition-all active:scale-[0.98] group-hover:scale-[1.02] group-hover:bg-white/10">
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
                        </div>
                    </button>
                </div>
            </div>
        </AuthPagesLayout>
    );
}
