import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
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
        <GuestLayout>
            <Head title="Register" />

            <div className="mx-2 py-12">
                <div className="mx-auto max-w-md content-center rounded-lg bg-gradient-to-b from-blue-800 to-[#010336] sm:px-2 lg:px-4">
                    <form onSubmit={submit} className="mx-2 py-12">
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
                                className="mt-1 block w-full"
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
                                className="mt-1 block w-full"
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
                                className="mt-1 block w-full"
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
                                className="mt-1 block w-full"
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
                                className="mt-1 block w-full"
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
                                className="ms-4 bg-orange-600"
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>
                    </form>

                    <div className="mx-2 mt-2 flex items-center">
                        <hr className="w-full border-gray-300" />
                        <span className="px-3 text-center text-sm text-white">
                            or register with
                        </span>
                        <hr className="w-full border-gray-300" />
                    </div>
                    <div className="flex justify-center py-2">
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
