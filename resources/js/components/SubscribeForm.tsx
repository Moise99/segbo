import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    username: string;
}

export default function SubscribeForm({ username }: Props) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        router.post(
            `/reporters/${username}/subscribe`,
            { email },
            {
                onFinish: () => setLoading(false),
                onSuccess: () =>
                    alert('You have been successfully subscribed!'),
                onError: () => alert('Error : Please try again'),
            },
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col gap-2 sm:flex-row"
        >
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="flex-grow rounded border border-gray-300 p-2"
                disabled={loading}
            />
            <button
                type="submit"
                disabled={loading}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Abonnement...' : 'S’abonner'}
            </button>
        </form>
    );
}
