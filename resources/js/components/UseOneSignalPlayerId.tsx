import { useOneSignal } from '@/components/UseOneSignal';

export function useOneSignalPlayerId() {
    const { playerId, isInitialized } = useOneSignal(
        import.meta.env.VITE_ONESIGNAL_APP_ID || '',
    );

    return { playerId, isInitialized };
}
