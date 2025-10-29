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
    const [showConfirm, setShowConfirm] = useState(false); // for modal

    const handleSubscribe = () => {
        if (!email) return;
        setShowConfirm(true); // open confirmation modal
    };

    const confirmSubscribe = () => {
        setShowConfirm(false);
        setLoading(true);

        router.post(
            `/reporters/${username}/subscribe`,
            { email },
            {
                onSuccess: () => {
                    setSubscribed(true);
                    // Cookie creation to remember subscription
                    document.cookie = `subscriber_${username}=${encodeURIComponent(email)}; max-age=${60 * 60 * 24 * 365}; path=/`;
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
                    // delete the subscription cookie
                    document.cookie = `subscriber_${username}=; max-age=0; path=/`;
                    setEmail('');
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    return (
        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row">
            {/* email */}
            {!subscribed && (
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse e-mail"
                    required
                    className="flex-grow rounded border border-gray-300 p-2"
                    disabled={loading}
                />
            )}

            {/* Buttons */}
            {!subscribed ? (
                <button
                    type="button"
                    disabled={loading || !email}
                    onClick={handleSubscribe}
                    className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Subscription...' : 'Subscribe'}
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

            {/* confirmation modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="mb-3 text-lg font-semibold text-gray-800">
                            Subscription confirmation
                        </h2>
                        <p className="mb-5 text-gray-600">
                            By subscribing, you agree that we may use a{' '}
                            <strong>cookie</strong> to remember your
                            subscription to this Segbo.
                            <br />
                            This cookie is used only for this purpose and
                            expires after 1 year.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmSubscribe}
                                disabled={loading}
                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                {loading ? 'Subscription...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
