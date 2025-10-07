import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    username: string;
    initialEmail?: string;
    isSubscribed?: boolean;
}

export default function SubscribeForm({
    username,
    initialEmail = '',
    isSubscribed = false,
}: Props) {
    const [email, setEmail] = useState(initialEmail);
    const [loading, setLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(isSubscribed);

    const handleSubscribe = () => {
        if (!email) return;
        setLoading(true);

        router.post(
            `/reporters/${username}/subscribe`,
            { email },
            {
                onSuccess: () => {
                    setSubscribed(true);
                    localStorage.setItem(`subscriber_${username}`, email);
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    const handleUnsubscribe = () => {
        setLoading(true);

        router.post(
            `/reporters/${username}/unsubscribe`,
            { email },
            {
                onSuccess: () => {
                    setSubscribed(false);
                    localStorage.removeItem(`subscriber_${username}`);
                    setEmail('');
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    return (
        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row">
            {!subscribed && (
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-grow rounded border border-gray-300 p-2"
                    disabled={loading}
                />
            )}

            {!subscribed ? (
                <button
                    type="button"
                    disabled={loading || !email}
                    onClick={handleSubscribe}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
            ) : (
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleUnsubscribe}
                    className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Unsubscribe'}
                </button>
            )}
        </div>
    );
}
