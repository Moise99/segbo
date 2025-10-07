import { useEffect, useState } from 'react';

export function useOneSignal(appId: string) {
    const [playerId, setPlayerId] = useState<string | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        console.log('useOneSignal: Checking initialization with appId:', appId);
        if (!appId) {
            console.warn('useOneSignal: OneSignal App ID is not defined.');
            return;
        }

        if (window.OneSignal?.init) {
            console.log('useOneSignal: OneSignal already initialized');
            setIsInitialized(true);
            return;
        }

        // Initialize OneSignalDeferred as an array with type assertion
        if (!window.OneSignalDeferred) {
            console.log('useOneSignal: Initializing OneSignalDeferred');
            window.OneSignalDeferred = [] as any[];
            (window.OneSignalDeferred as OneSignalDeferred).push = (
                callback: (OneSignal: OneSignalWindow) => void,
            ) => {
                (window.OneSignalDeferred as any[]).push(callback);
            };
        } else {
            console.log('useOneSignal: OneSignalDeferred already exists');
        }

        window.OneSignalDeferred.push((OneSignal: OneSignalWindow) => {
            console.log(
                'useOneSignal: OneSignalDeferred callback executed, initializing with appId:',
                appId,
            );
            OneSignal.init({
                appId,
                allowLocalhostAsSecureOrigin: true,
                notifyButton: { enable: true },
            })
                .then(() => {
                    console.log('useOneSignal: OneSignal init successful');
                    setIsInitialized(true);

                    // Get initial player ID
                    if (typeof OneSignal.getUserId === 'function') {
                        OneSignal.getUserId()
                            .then((id) => {
                                setPlayerId(id);
                                console.log(
                                    'useOneSignal: Initial playerId:',
                                    id,
                                );
                            })
                            .catch((err) => {
                                console.error(
                                    'useOneSignal: Error fetching initial playerId:',
                                    err,
                                );
                            });
                    } else {
                        console.warn(
                            'useOneSignal: getUserId is not a function',
                        );
                    }

                    // Listen for subscription changes
                    OneSignal.on(
                        'subscriptionChange',
                        async (isSubscribed: boolean) => {
                            try {
                                const id = await OneSignal.getUserId();
                                setPlayerId(id);
                                console.log(
                                    'useOneSignal: Subscription changed, playerId:',
                                    id,
                                    'isSubscribed:',
                                    isSubscribed,
                                );
                            } catch (err) {
                                console.error(
                                    'useOneSignal: Subscription change error:',
                                    err,
                                );
                            }
                        },
                    );
                })
                .catch((err) => {
                    console.error(
                        'useOneSignal: OneSignal initialization error:',
                        err,
                    );
                    setIsInitialized(false);
                });
        });
    }, [appId]);
    useEffect(() => {
        if (isInitialized && 'Notification' in window) {
            console.log(
                'useOneSignal: Notification permission:',
                Notification.permission,
            );
        }
    }, [isInitialized]);

    return {
        playerId,
        isInitialized,
    };
}
