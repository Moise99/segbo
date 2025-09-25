import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import AuthPagesLayout from '@/Layouts/AuthPagesLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Register() {
    const recaptchaRef = useRef<ReCAPTCHA | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        'g-recaptcha-response': '',
    });

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (recaptchaRef.current) {
            try {
                const token = await recaptchaRef.current.executeAsync();

                if (token) {
                    setData('g-recaptcha-response', token);

                    post(route('register'), {
                        onFinish: () =>
                            reset('password', 'password_confirmation'),
                    });
                } else {
                    console.error('reCAPTCHA token null');
                }
            } catch (error) {
                console.error('reCAPTCHA failed:', error);
            }
        } else {
            console.error('reCAPTCHA component not ready.');
        }
    };

    return (
        <AuthPagesLayout>
            <Head title="Register" />

            <div className="mx-2 py-12">
                <div className="mx-auto max-w-md content-center rounded-lg bg-gradient-to-b from-blue-800 to-[#010336] sm:px-2 lg:px-4">
                    <form onSubmit={submit} className="mx-2 py-6">
                        <div>
                            <InputLabel
                                className="text-white"
                                htmlFor="name"
                                value="Name"
                            />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full rounded-md border border-white bg-gray-400 p-3 text-white transition-all duration-300 hover:scale-[1.02] focus:border-orange-500 focus:ring-orange-500"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
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

                        <div>
                            <InputLabel
                                className="text-white"
                                htmlFor="username"
                                value="Username"
                            />
                            <TextInput
                                id="username"
                                name="username"
                                value={data.username}
                                className="mt-1 block w-full rounded-md border border-white bg-gray-400 p-3 text-white transition-all duration-300 hover:scale-[1.02] focus:border-orange-500 focus:ring-orange-500"
                                autoComplete="user"
                                isFocused={true}
                                onChange={(e) => {
                                    const sanitizedValue = e.target.value
                                        .normalize('NFD')
                                        .replace(/[\u0300-\u036f]/g, '')
                                        .replace(/[^a-zA-Z0-9_]/g, '_')
                                        .toLowerCase();
                                    setData('username', sanitizedValue);
                                }}
                                required
                            />
                            <InputError
                                message={errors.username}
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
                                autoComplete="new-password"
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

                        <div className="mt-4">
                            <InputLabel
                                className="text-white"
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full rounded-md border border-white bg-gray-400 p-3 text-white transition-all duration-300 hover:scale-[1.02] focus:border-orange-500 focus:ring-orange-500"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <ReCAPTCHA
                            ref={recaptchaRef}
                            size="invisible"
                            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        />

                        <InputError
                            message={errors['g-recaptcha-response']}
                            className="mt-2"
                        />

                        <div className="mt-4 flex items-center justify-center">
                            <Link
                                href={route('login')}
                                className="rounded-md text-sm text-white underline hover:text-orange-600"
                            >
                                Already registered?
                            </Link>

                            <PrimaryButton
                                className="ms-4 bg-orange-600 transition-all duration-300 hover:scale-[1.02]"
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="flex items-center">
                        <hr className="w-full border-gray-300" />
                        <span className="px-3 text-center text-sm text-white">
                            or
                        </span>
                        <hr className="w-full border-gray-300" />
                    </div>
                    <div className="flex justify-center py-2">
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
