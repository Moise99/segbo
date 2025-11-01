import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import {
    AlertCircle,
    Ban,
    CheckCircle2,
    ChevronRight,
    Clock,
    Cookie,
    Download,
    FileCheck,
    Globe,
    Lock,
    Mail,
    Server,
    Shield,
    Trash2,
    User,
    Users,
} from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <GuestLayout>
            <Head title="Privacy Policy - Segbon" />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    {/* === HEADER === */}
                    <div className="mb-12 text-center">
                        <h1 className="flex items-center justify-center gap-3 text-4xl font-bold text-gray-900 md:text-5xl">
                            <Shield className="h-10 w-10 text-blue-600" />
                            Privacy Policy – Segbon
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Last updated:{' '}
                            <strong className="text-blue-700">
                                November 3, 2025
                            </strong>
                        </p>
                    </div>

                    <Card className="border-0 shadow-xl">
                        <CardHeader className="rounded-t-lg bg-blue-50">
                            <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
                                <Globe className="h-6 w-6" />
                                Website: segbon.com
                            </CardTitle>
                            <CardDescription className="text-blue-700">
                                Operated by <strong>Mogiciel</strong>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-10 pt-8 leading-relaxed text-gray-700">
                            {/* === 1. INTRODUCTION === */}
                            <section>
                                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <span className="font-mono text-blue-600">
                                        1.
                                    </span>
                                    Introduction
                                </h2>
                                <p>
                                    This Privacy Policy explains how Segbon
                                    (operated by Mogiciel) collects, uses, and
                                    protects the personal information of users
                                    (hereinafter referred to as “you”) when
                                    using the website{' '}
                                    <a
                                        href="https://segbon.com"
                                        className="text-blue-600 underline hover:text-blue-800"
                                    >
                                        https://segbon.com
                                    </a>{' '}
                                    (hereinafter referred to as “the
                                    Application” or “the Service”).
                                </p>
                                <p className="mt-3">
                                    Segbon allows journalists, reporters, and
                                    authors to share their publications as
                                    external links, and enables users to
                                    subscribe to their accounts to receive email
                                    notifications about new publications.
                                </p>
                                <p className="mt-3 border-l-4 border-blue-500 pl-4 italic text-gray-600">
                                    By using Segbon, you agree to this Privacy
                                    Policy.
                                </p>
                            </section>

                            <Separator />

                            {/* === 2. DATA CONTROLLER === */}
                            <section className="rounded-lg bg-gray-50 p-6">
                                <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                                    <span className="font-mono text-blue-600">
                                        2.
                                    </span>
                                    Data Controller
                                </h2>
                                <div className="space-y-2 text-gray-700">
                                    <p>
                                        <strong>
                                            The entity responsible for data
                                            collection and processing is:
                                        </strong>
                                    </p>
                                    <p className="font-medium">Segbon</p>
                                    <p className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-blue-600" />
                                        Email:{' '}
                                        <a
                                            href="mailto:support@segbon.com"
                                            className="text-blue-600 underline"
                                        >
                                            support@segbon.com
                                        </a>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-blue-600" />
                                        Website:{' '}
                                        <a
                                            href="https://segbon.com"
                                            className="text-blue-600 underline"
                                        >
                                            https://segbon.com
                                        </a>
                                    </p>
                                </div>
                            </section>

                            <Separator />

                            {/* === 3. DATA COLLECTED - ACCORDION === */}
                            <section>
                                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <span className="font-mono text-blue-600">
                                        3.
                                    </span>
                                    Data Collected
                                </h2>
                                <p className="mb-4 text-sm text-gray-600">
                                    Segbon only collects data strictly necessary
                                    for the operation of the Service.
                                </p>

                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full space-y-3"
                                >
                                    {/* 3.1 Authors */}
                                    <AccordionItem
                                        value="authors"
                                        className="rounded-lg border bg-white px-4 shadow-sm"
                                    >
                                        <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                                            <span className="flex items-center gap-2">
                                                <Users className="h-5 w-5 text-blue-600" />
                                                3.1. For Authors
                                                (journalists/reporters)
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="list-disc space-y-2 pl-6 text-gray-700">
                                                <li>
                                                    Full name (or pseudonym)
                                                </li>
                                                <li>Username</li>
                                                <li>Email address</li>
                                                <li>
                                                    Published links (URLs and
                                                    associated metadata)
                                                </li>
                                                <li>
                                                    Profile picture (optional)
                                                </li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* 3.2 Subscribers */}
                                    <AccordionItem
                                        value="subscribers"
                                        className="rounded-lg border bg-white px-4 shadow-sm"
                                    >
                                        <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                                            <span className="flex items-center gap-2">
                                                <Mail className="h-5 w-5 text-blue-600" />
                                                3.2. For Users/Subscribers
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="list-disc space-y-2 pl-6 text-gray-700">
                                                <li>
                                                    Email address (to receive
                                                    notifications)
                                                </li>
                                                <li>
                                                    Identifier of the followed
                                                    Author(s)
                                                </li>
                                                <li>Subscription cookie</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>

                                    {/* 3.3 Technical */}
                                    <AccordionItem
                                        value="technical"
                                        className="rounded-lg border bg-white px-4 shadow-sm"
                                    >
                                        <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                                            <span className="flex items-center gap-2">
                                                <Server className="h-5 w-5 text-blue-600" />
                                                3.3. Minimal Technical Data
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="list-disc space-y-2 pl-6 text-gray-700">
                                                <li>
                                                    IP address (temporarily
                                                    stored for security
                                                    purposes)
                                                </li>
                                                <li>
                                                    Session data (to manage
                                                    logins and subscriptions)
                                                </li>
                                            </ul>
                                            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                                                <p className="flex items-center gap-2 text-sm font-medium text-red-800">
                                                    <Ban className="h-4 w-4" />
                                                    Segbon does not collect:
                                                </p>
                                                <ul className="mt-2 list-disc pl-6 text-sm text-red-700">
                                                    <li>Geolocation data,</li>
                                                    <li>
                                                        Banking or payment data,
                                                    </li>
                                                    <li>
                                                        Sensitive data (origin,
                                                        opinions, health, etc.).
                                                    </li>
                                                </ul>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </section>

                            <Separator />

                            {/* === 4. PURPOSE === */}
                            <section>
                                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <span className="font-mono text-blue-600">
                                        4.
                                    </span>
                                    Purpose of Data Processing
                                </h2>
                                <p>
                                    Your data is used solely for the following
                                    purposes:
                                </p>
                                <ul className="mt-3 space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                                        Managing Author accounts (publishing,
                                        updating, or deleting links);
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                                        Allowing users to subscribe and receive
                                        notification emails;
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                                        Ensuring the security and proper
                                        functioning of the website;
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                                        Responding to your messages or support
                                        requests.
                                    </li>
                                </ul>
                                <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 font-medium text-amber-800">
                                    No other use (advertising, resale,
                                    behavioral analysis) is performed.
                                </p>
                            </section>

                            <Separator />

                            {/* === 5. COOKIES - ACCORDION === */}
                            <section>
                                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <Cookie className="h-7 w-7 text-amber-600" />
                                    <span className="font-mono text-blue-600">
                                        5.
                                    </span>
                                    Cookies
                                </h2>

                                <Accordion
                                    type="single"
                                    collapsible
                                    className="space-y-3"
                                >
                                    <AccordionItem
                                        value="usage"
                                        className="rounded-lg border bg-amber-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-amber-900">
                                            5.1. Strictly Limited Use
                                        </AccordionTrigger>
                                        <AccordionContent className="text-gray-700">
                                            <p>
                                                Segbon uses a single cookie when
                                                you subscribe to an Author.
                                            </p>
                                            <p className="mt-2">
                                                This cookie is used only to
                                                remember your subscription
                                                (email + Author ID).
                                            </p>
                                            <p className="mt-2 font-medium text-green-700">
                                                No tracking, analytics, or
                                                advertising cookies are used.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="details"
                                        className="rounded-lg border bg-white px-4"
                                    >
                                        <AccordionTrigger className="font-semibold">
                                            5.2. Cookie Details
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-2 text-sm">
                                                <p>
                                                    <strong>
                                                        Cookie name:
                                                    </strong>{' '}
                                                    <code className="rounded bg-gray-100 px-2 py-1 font-mono">
                                                        subscriber_[authorName]
                                                    </code>
                                                </p>
                                                <p>
                                                    <strong>Content:</strong>{' '}
                                                    subscriber’s email address +
                                                    Author ID
                                                </p>
                                                <p>
                                                    <strong>
                                                        Validity period:
                                                    </strong>{' '}
                                                    up to 12 months
                                                </p>
                                                <p>
                                                    <strong>Purpose:</strong>{' '}
                                                    maintain your subscription
                                                    across browsing sessions
                                                </p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="consent"
                                        className="rounded-lg border bg-blue-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-blue-900">
                                            5.3. Consent
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Before the cookie is stored, the
                                                visitor must confirm consent via
                                                a notification displayed during
                                                the subscription process.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="deletion"
                                        className="rounded-lg border bg-red-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-red-900">
                                            5.4. Deleting Cookies
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>You can at any time:</p>
                                            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700">
                                                <li>
                                                    Delete cookies through your
                                                    browser settings;
                                                </li>
                                                <li>
                                                    Contact{' '}
                                                    <a
                                                        href="mailto:support@segbon.com"
                                                        className="text-blue-600 underline"
                                                    >
                                                        support@segbon.com
                                                    </a>
                                                </li>
                                                <li className="pl-2">
                                                    to request deletion of
                                                    related data.
                                                </li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </section>

                            <Separator />

                            {/* === 6. EMAIL SENDING - ACCORDION === */}
                            <section>
                                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <Mail className="h-7 w-7 text-blue-600" />
                                    <span className="font-mono text-blue-600">
                                        6.
                                    </span>
                                    Email Sending
                                </h2>

                                <Accordion
                                    type="single"
                                    collapsible
                                    className="space-y-3"
                                >
                                    <AccordionItem
                                        value="purpose"
                                        className="rounded-lg border bg-white px-4"
                                    >
                                        <AccordionTrigger className="font-semibold">
                                            6.1. Purpose of Emails
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Segbon sends emails only in the
                                                following cases:
                                            </p>
                                            <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700">
                                                <li>
                                                    Notifications when an Author
                                                    you follow publishes a new
                                                    link;
                                                </li>
                                                <li>
                                                    Essential account management
                                                    messages (creation,
                                                    security, policy updates).
                                                </li>
                                            </ul>
                                            <p className="mt-3 rounded border border-red-300 bg-red-100 p-2 font-medium text-red-800">
                                                No advertising or third-party
                                                communications are ever sent.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="frequency"
                                        className="rounded-lg border bg-gray-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold">
                                            6.2. Frequency
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Emails are sent automatically
                                                only when a new publication is
                                                posted.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="unsubscribe"
                                        className="rounded-lg border bg-green-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-green-900">
                                            6.3. Unsubscription
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Each email contains an
                                                unsubscribe link allowing you to
                                                stop receiving notifications.
                                            </p>
                                            <p className="mt-2">
                                                You may also request deletion of
                                                your subscriptions by emailing{' '}
                                                <a
                                                    href="mailto:support@segbon.com"
                                                    className="text-blue-600 underline"
                                                >
                                                    support@segbon.com
                                                </a>
                                                .
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </section>

                            <Separator />

                            {/* === 7. DATA RETENTION === */}
                            <section>
                                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <Clock className="h-7 w-7 text-purple-600" />
                                    <span className="font-mono text-blue-600">
                                        7.
                                    </span>
                                    Data Retention Period
                                </h2>

                                <div className="overflow-x-auto rounded-lg border">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-gray-100 font-semibold text-gray-800">
                                            <tr>
                                                <th className="px-4 py-3">
                                                    Type of Data
                                                </th>
                                                <th className="px-4 py-3">
                                                    Retention Period
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            <tr className="bg-white">
                                                <td className="px-4 py-3">
                                                    Author data
                                                </td>
                                                <td className="px-4 py-3">
                                                    As long as the account
                                                    remains active
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="px-4 py-3">
                                                    Subscriber data (email,
                                                    cookie)
                                                </td>
                                                <td className="px-4 py-3">
                                                    Up to 12 months or until
                                                    unsubscribed
                                                </td>
                                            </tr>
                                            <tr className="bg-white">
                                                <td className="px-4 py-3">
                                                    Technical logs (IP,
                                                    security)
                                                </td>
                                                <td className="px-4 py-3">
                                                    Up to 30 days
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="mt-3 text-sm text-gray-600">
                                    After these periods, the data is permanently
                                    deleted.
                                </p>
                            </section>

                            <Separator />

                            {/* === 8. DATA SHARING === */}
                            <section className="rounded-lg border border-green-200 bg-green-50 p-5">
                                <h2 className="mb-2 flex items-center gap-2 text-xl font-bold text-green-900">
                                    <Lock className="h-6 w-6" />
                                    <span className="font-mono text-blue-600">
                                        8.
                                    </span>
                                    Data Sharing
                                </h2>
                                <p className="text-green-800">
                                    Collected data is never sold, exchanged, or
                                    shared with third parties.
                                </p>
                                <p className="mt-2 text-sm">
                                    However, it may be hosted on third-party
                                    servers (e.g., web hosting providers) under
                                    confidentiality agreements, solely for
                                    technical purposes.
                                </p>
                            </section>

                            <Separator />

                            {/* === 9. DATA SECURITY === */}
                            <section>
                                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <Lock className="h-7 w-7 text-red-600" />
                                    <span className="font-mono text-blue-600">
                                        9.
                                    </span>
                                    Data Security
                                </h2>
                                <p>
                                    Segbon applies reasonable technical and
                                    organizational measures to protect your
                                    data, including:
                                </p>
                                <ul className="mt-3 space-y-2 text-gray-700">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-blue-600" />
                                        Secure HTTPS connections;
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-blue-600" />
                                        Encrypted passwords;
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-blue-600" />
                                        Restricted access to databases;
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-blue-600" />
                                        Monitoring of suspicious logins.
                                    </li>
                                </ul>
                                <p className="mt-4 text-sm italic text-gray-600">
                                    Although no method is entirely foolproof,
                                    Segbon commits to notifying users of any
                                    data breach as soon as possible.
                                </p>
                            </section>

                            <Separator />

                            {/* === 10. YOUR RIGHTS === */}
                            <section>
                                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <FileCheck className="h-7 w-7 text-indigo-600" />
                                    <span className="font-mono text-blue-600">
                                        10.
                                    </span>
                                    Your Rights
                                </h2>
                                <p>
                                    In accordance with applicable data
                                    protection laws, you have the following
                                    rights:
                                </p>
                                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {[
                                        {
                                            icon: User,
                                            label: 'Right of access',
                                        },
                                        {
                                            icon: FileCheck,
                                            label: 'Right of rectification',
                                        },
                                        {
                                            icon: Trash2,
                                            label: 'Right to erasure',
                                        },
                                        { icon: Ban, label: 'Right to object' },
                                        {
                                            icon: Download,
                                            label: 'Right to data portability',
                                        },
                                    ].map((right, i) => (
                                        <Badge
                                            key={i}
                                            variant="outline"
                                            className="justify-center py-3 text-center text-sm font-medium"
                                        >
                                            <right.icon className="mr-2 h-4 w-4" />
                                            {right.label}
                                        </Badge>
                                    ))}
                                </div>
                                <p className="mt-4 text-sm">
                                    To exercise these rights, contact:{' '}
                                    <a
                                        href="mailto:support@segbon.com"
                                        className="font-bold text-blue-600 underline"
                                    >
                                        support@segbon.com
                                    </a>
                                    .
                                </p>
                                <p className="text-sm text-gray-600">
                                    Your request will be processed within a
                                    maximum of 30 days.
                                </p>
                            </section>

                            <Separator />

                            {/* === 11. HOSTING === */}
                            <section>
                                <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                                    <Server className="h-6 w-6 text-gray-600" />
                                    <span className="font-mono text-blue-600">
                                        11.
                                    </span>
                                    Hosting and Data Transfers
                                </h2>
                                <p className="text-gray-700">
                                    Data is hosted on secure servers located in{' '}
                                    <strong>France, the USA, and Canada</strong>{' '}
                                    by our hosting provider.
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    No data transfers outside these regions are
                                    made without appropriate safeguards.
                                </p>
                            </section>

                            <Separator />

                            {/* === 12. POLICY UPDATES === */}
                            <section>
                                <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                                    <AlertCircle className="h-6 w-6 text-amber-600" />
                                    <span className="font-mono text-blue-600">
                                        12.
                                    </span>
                                    Policy Updates
                                </h2>
                                <p className="text-gray-700">
                                    Segbon may update this Privacy Policy at any
                                    time, especially to comply with new
                                    regulations.
                                </p>
                                <p className="mt-3">
                                    The latest version will always be available
                                    at:
                                    <br />
                                    <a
                                        href="https://segbon.com/privacy-policy"
                                        className="font-medium text-blue-600 underline"
                                    >
                                        https://segbon.com/privacy-policy
                                    </a>
                                </p>
                                <p className="mt-2 text-sm italic text-gray-600">
                                    By continuing to use the Service after an
                                    update, you agree to the new terms.
                                </p>
                            </section>

                            <Separator />

                            {/* === 13. CONTACT === */}
                            <section className="rounded-lg bg-blue-50 p-6 text-center">
                                <h2 className="mb-3 flex items-center justify-center gap-2 text-2xl font-bold text-blue-900">
                                    <Mail className="h-7 w-7" />
                                    <span className="font-mono text-blue-600">
                                        13.
                                    </span>
                                    Contact
                                </h2>
                                <p className="text-lg">
                                    For any questions regarding this Privacy
                                    Policy or your personal data:
                                </p>
                                <div className="mt-4 space-y-2 font-medium">
                                    <p>Segbon</p>
                                    <p>
                                        <a
                                            href="mailto:support@segbon.com"
                                            className="text-lg text-blue-600 underline"
                                        >
                                            support@segbon.com
                                        </a>
                                    </p>
                                    <p>
                                        <a
                                            href="https://segbon.com"
                                            className="text-blue-600 underline"
                                        >
                                            https://segbon.com
                                        </a>
                                    </p>
                                </div>
                            </section>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </GuestLayout>
    );
}
