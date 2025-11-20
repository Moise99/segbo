import { router } from '@inertiajs/react';
import { CheckCheck, Mail } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';

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
                    //document.cookie = `subscriber_${username}=${encodeURIComponent(email)}; max-age=${60 * 60 * 24 * 365}; path=/`;
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
                    //document.cookie = `subscriber_${username}=; max-age=0; path=/`;
                    setEmail('');
                },
                onFinish: () => setLoading(false),
            },
        );
    };

    return (
        <div className="space-y-2">
            {/* email */}
            {!subscribed && (
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl border-2"
                    disabled={isSubscribed}
                />
            )}

            {/* Buttons */}
            {!subscribed ? (
                <Button
                    type="button"
                    disabled={loading || !email}
                    onClick={handleSubscribe}
                    className={`w-full rounded-xl ${
                        isSubscribed
                            ? 'bg-gray-600 hover:bg-gray-700'
                            : 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600'
                    } text-white`}
                >
                    <Mail className="mr-2 h-4 w-4" />
                    {loading ? 'Subscription...' : 'Subscribe'}
                </Button>
            ) : (
                <Button
                    type="button"
                    disabled={loading}
                    onClick={handleUnsubscribe}
                    className={`w-full rounded-xl ${
                        isSubscribed
                            ? 'bg-gray-600 hover:bg-gray-700'
                            : 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600'
                    } text-white`}
                >
                    <CheckCheck className="mr-2 h-4 w-4" />

                    {loading ? 'Processing...' : 'Unsubscribe'}
                </Button>
            )}

            {/* confirmation modal */}
            {showConfirm &&
                createPortal(
                    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
                        <div className="w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
                            <h2 className="mb-3 text-lg font-semibold text-gray-800">
                                Subscription confirmation
                            </h2>
                            <p className="mb-5 text-gray-600">
                                By subscribing, you agree that we may use a{' '}
                                <strong>cookie</strong> to remember your
                                subscription to this Segbon.
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
                    </div>,
                    // Rendre le contenu de la modale directement dans le body du document
                    document.body,
                )}
        </div>
    );
}
