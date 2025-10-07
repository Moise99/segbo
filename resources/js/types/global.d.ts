import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import { PageProps as AppPageProps } from './';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    /* eslint-disable no-var */
    var route: typeof ziggyRoute;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {}
}

interface OneSignalNotifyButtonOptions {
    enable: boolean;
}

interface OneSignalInitOptions {
    appId: string;
    allowLocalhostAsSecureOrigin?: boolean;
    notifyButton?: OneSignalNotifyButtonOptions;
}

interface OneSignalWindow {
    init: (options: OneSignalInitOptions) => Promise<void>;
    registerForPushNotifications: () => Promise<void>;
    getUserId: () => Promise<string | null>;
    push: (callback: () => void) => void;
    on: (event: string, callback: (data: any) => void) => void;
}

interface OneSignalDeferred {
    push: (callback: (OneSignal: OneSignalWindow) => void) => void;
}

declare global {
    interface Window {
        OneSignal?: OneSignalWindow;
        OneSignalDeferred?: OneSignalDeferred;
    }
}
