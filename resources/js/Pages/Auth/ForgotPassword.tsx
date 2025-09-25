import InputError from '@/components/InputError';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import AuthPagesLayout from '@/Layouts/AuthPagesLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthPagesLayout>
            <Head title="Forgot Password" />
            <div className="mx-2 py-24">
                <div className="mx-auto max-w-md content-center rounded-lg bg-gradient-to-b from-blue-800 to-[#010336] sm:px-2 lg:px-4">
                    <div className="mx-2 my-6 text-sm text-white">
                        Forgot your password? Please, put your acount email
                        address below and we will email you a password reset
                        link.
                        {status && (
                            <div className="mx-4 my-4 bg-white text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                    </div>

                    <form onSubmit={submit} className="mx-2">
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-md border border-white bg-gray-400 p-3 text-white transition-all duration-300 hover:scale-[1.02] focus:border-orange-500 focus:ring-orange-500"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="my-6 flex items-center justify-end">
                            <PrimaryButton
                                className="ms-4 bg-orange-600"
                                disabled={processing}
                            >
                                Send me Password Reset Link
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthPagesLayout>
    );
}
