import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
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
    Cookie,
    FileText,
    Gavel,
    Globe,
    Link2,
    Lock,
    Mail,
    Shield,
    Users,
} from 'lucide-react';

export default function TermsOfUse() {
    return (
        <GuestLayout>
            <Head title="Terms of Use - Segbo" />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    {/* === HEADER === */}
                    <div className="mb-12 text-center">
                        <h1 className="flex items-center justify-center gap-3 text-4xl font-bold text-gray-900 md:text-5xl">
                            <FileText className="h-10 w-10 text-blue-600" />
                            Terms of Use – Segbo
                        </h1>
                        <p className="mt-4 text-lg text-gray-600">
                            Last updated:{' '}
                            <strong className="text-blue-700">
                                October 8, 2025
                            </strong>
                        </p>
                    </div>

                    <Card className="border-0 shadow-xl">
                        <CardHeader className="rounded-t-lg bg-blue-50">
                            <CardTitle className="flex items-center gap-2 text-2xl text-blue-900">
                                <Globe className="h-6 w-6" />
                                Website: segbo.mogiciel.com
                            </CardTitle>
                            <CardDescription className="text-blue-700">
                                Operated by <strong>Mogiciel</strong>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-10 pt-8 leading-relaxed text-gray-700">
                            {/* === 1. PURPOSE === */}
                            <section>
                                <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <span className="font-mono text-blue-600">
                                        1.
                                    </span>
                                    Purpose
                                </h2>
                                <p>
                                    These Terms of Use (hereinafter referred to
                                    as “the Terms”) govern access to and use of
                                    the Segbo web platform, available at{' '}
                                    <a
                                        href="https://segbo.mogiciel.com"
                                        className="text-blue-600 underline hover:text-blue-800"
                                    >
                                        https://segbo.mogiciel.com
                                    </a>{' '}
                                    (hereinafter referred to as “the Service”).
                                </p>
                                <p className="mt-3">
                                    Segbo allows journalists, reporters, and
                                    authors (“Authors”) to share external links
                                    redirecting to their publications hosted on
                                    third-party websites.
                                </p>
                                <p className="mt-3">
                                    Visitors (“Users”) can view these profiles
                                    and subscribe to receive notifications or
                                    emails regarding new publications.
                                </p>
                                <p className="mt-3 border-l-4 border-blue-500 pl-4 italic text-gray-600">
                                    By accessing or using the Service, you agree
                                    to these Terms without reservation. If you
                                    do not agree, you must not use the Service.
                                </p>
                            </section>

                            <Separator />

                            {/* === 2. REGISTRATION & ACCESS - ACCORDION === */}
                            <section>
                                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <span className="font-mono text-blue-600">
                                        2.
                                    </span>
                                    Registration and Access
                                </h2>

                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full space-y-3"
                                >
                                    <AccordionItem
                                        value="authors"
                                        className="rounded-lg border bg-white px-4 shadow-sm"
                                    >
                                        <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                                            <span className="flex items-center gap-2">
                                                <Users className="h-5 w-5 text-blue-600" />
                                                2.1. Author Accounts
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Authors must create an account
                                                to publish links.
                                            </p>
                                            <p className="mt-2">
                                                They agree to provide accurate
                                                information and keep their
                                                account details up to date.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="subscriptions"
                                        className="rounded-lg border bg-white px-4 shadow-sm"
                                    >
                                        <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                                            <span className="flex items-center gap-2">
                                                <Mail className="h-5 w-5 text-blue-600" />
                                                2.2. User Subscriptions
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Users may subscribe to an Author
                                                by providing a valid email
                                                address to follow their
                                                publications.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="credentials"
                                        className="rounded-lg border bg-amber-50 px-4"
                                    >
                                        <AccordionTrigger className="text-lg font-semibold hover:text-amber-700">
                                            <span className="flex items-center gap-2">
                                                <Lock className="h-5 w-5 text-amber-700" />
                                                2.3. Account Credentials
                                                Responsibility
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Each User or Author is
                                                responsible for maintaining the
                                                confidentiality of their login
                                                credentials and for all
                                                activities conducted under their
                                                account.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </section>

                            <Separator />

                            {/* === 3. CONTENT & LINKS - ACCORDION === */}
                            <section>
                                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <span className="font-mono text-blue-600">
                                        3.
                                    </span>
                                    Content and Link Publication
                                </h2>

                                <Accordion
                                    type="single"
                                    collapsible
                                    className="space-y-3"
                                >
                                    <AccordionItem
                                        value="nature"
                                        className="rounded-lg border bg-white px-4"
                                    >
                                        <AccordionTrigger className="font-semibold">
                                            <span className="flex items-center gap-2">
                                                <Link2 className="h-5 w-5 text-blue-600" />
                                                3.1. Nature of Content
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Authors may publish links
                                                directing to their articles,
                                                videos, or other works hosted on
                                                third-party websites.
                                            </p>
                                            <p className="mt-2 font-medium text-gray-600">
                                                Segbo does not host this
                                                content; it merely displays the
                                                links and associated metadata.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="prohibited"
                                        className="rounded-lg border bg-red-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-red-900">
                                            <span className="flex items-center gap-2">
                                                <Ban className="h-5 w-5 text-red-600" />
                                                3.2. Prohibited Content
                                            </span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Authors are strictly prohibited
                                                from publishing links to content
                                                that:
                                            </p>
                                            <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-red-800">
                                                <li>
                                                    Violates applicable laws
                                                    (e.g., hate speech,
                                                    defamation, fraud, privacy
                                                    breaches, etc.);
                                                </li>
                                                <li>
                                                    Infringes on the rights of
                                                    others (e.g., copyright,
                                                    trademarks);
                                                </li>
                                                <li>
                                                    Contains pornographic,
                                                    violent, or discriminatory
                                                    material.
                                                </li>
                                            </ul>
                                            <p className="mt-3 rounded border border-red-300 bg-red-100 p-2 text-sm font-medium text-red-800">
                                                Segbo reserves the right to
                                                remove any link or account found
                                                to be in violation of these
                                                rules.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="responsibility"
                                        className="rounded-lg border bg-gray-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold">
                                            3.3. Author Responsibility
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Each Author is solely
                                                responsible for the content of
                                                the links they publish and the
                                                information they provide.
                                            </p>
                                            <p className="mt-2 italic text-gray-600">
                                                Segbo has no control over
                                                external websites and cannot be
                                                held responsible for their
                                                content.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </section>

                            <Separator />

                            {/* === 4. EMAIL COMMUNICATIONS - ACCORDION === */}
                            <section>
                                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <Mail className="h-7 w-7 text-blue-600" />
                                    <span className="font-mono text-blue-600">
                                        4.
                                    </span>
                                    Email Communications
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
                                            would 4.1. Purpose
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                By subscribing to an Author, you
                                                agree to receive email
                                                notifications whenever that
                                                Author publishes a new link.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="frequency"
                                        className="rounded-lg border bg-gray-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold">
                                            4.2. Frequency
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                These emails are sent solely for
                                                informational purposes related
                                                to your subscription.
                                            </p>
                                            <p className="mt-2 font-medium text-green-700">
                                                No promotional or third-party
                                                messages are sent without your
                                                explicit consent.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="unsubscribe"
                                        className="rounded-lg border bg-green-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-green-900">
                                            4.3. Unsubscription
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Each email contains an
                                                unsubscribe link (specific to
                                                the Author) allowing you to stop
                                                receiving notifications at any
                                                time.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </section>

                            <Separator />

                            {/* === 5. COOKIES - ACCORDION === */}
                            <section>
                                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <Cookie className="h-7 w-7 text-amber-600" />
                                    <span className="font-mono text-blue-600">
                                        5.
                                    </span>
                                    Use of Cookies
                                </h2>

                                <Accordion
                                    type="single"
                                    collapsible
                                    className="space-y-3"
                                >
                                    <AccordionItem
                                        value="purpose"
                                        className="rounded-lg border bg-amber-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-amber-900">
                                            5.1. Purpose
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Segbo uses cookies exclusively
                                                to allow a visitor (“User”) to
                                                subscribe to an Author and
                                                retain that subscription between
                                                browsing sessions.
                                            </p>
                                            <p className="mt-2 font-medium text-green-700">
                                                No other form of tracking
                                                (analytics, advertising,
                                                profiling) is carried out.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="type"
                                        className="rounded-lg border bg-white px-4"
                                    >
                                        <AccordionTrigger className="font-semibold">
                                            5.2. Type of Cookie
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>Each cookie contains only:</p>
                                            <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                                                <li>
                                                    The email address used for
                                                    subscription;
                                                </li>
                                                <li>
                                                    The identifier of the
                                                    followed Author;
                                                </li>
                                                <li>
                                                    A validity period of 12
                                                    months.
                                                </li>
                                            </ul>
                                            <p className="mt-2 font-medium">
                                                These cookies are strictly
                                                necessary for the subscription
                                                feature to function.
                                            </p>
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
                                                When a non-registered visitor
                                                chooses to subscribe to an
                                                Author, they are informed that
                                                their email and subscription
                                                details will be stored via a
                                                cookie.
                                            </p>
                                            <p className="mt-2">
                                                This consent is obtained before
                                                the cookie is saved.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="management"
                                        className="rounded-lg border bg-red-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-red-900">
                                            5.4. Cookie Management
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>Users may at any time:</p>
                                            <ul className="mt-2 list-disc space-y-1 pl-6">
                                                <li>
                                                    Delete cookies through their
                                                    browser settings;
                                                </li>
                                                <li>
                                                    Contact Segbo to request
                                                    deletion of any data
                                                    associated with a
                                                    subscription cookie.
                                                </li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </section>

                            <Separator />

                            {/* === 6. PERSONAL DATA - ACCORDION === */}
                            <section>
                                <h2 className="mb-5 flex items-center gap-2 text-2xl font-bold text-gray-900">
                                    <Shield className="h-7 w-7 text-indigo-600" />
                                    <span className="font-mono text-blue-600">
                                        6.
                                    </span>
                                    Personal Data
                                </h2>

                                <Accordion
                                    type="single"
                                    collapsible
                                    className="space-y-3"
                                >
                                    <AccordionItem
                                        value="collection"
                                        className="rounded-lg border bg-white px-4"
                                    >
                                        <AccordionTrigger className="font-semibold">
                                            6.1. Data Collection
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Segbo collects only the
                                                information necessary for the
                                                operation of the service:
                                            </p>
                                            <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                                                <li>
                                                    <strong>
                                                        For Authors:
                                                    </strong>{' '}
                                                    name, email, username, and
                                                    published content details;
                                                </li>
                                                <li>
                                                    <strong>
                                                        For Subscribers:
                                                    </strong>{' '}
                                                    email address and
                                                    identifiers of followed
                                                    Authors.
                                                </li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="retention"
                                        className="rounded-lg border bg-gray-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold">
                                            6.2. Data Retention
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Data is retained only for the
                                                period necessary to provide the
                                                subscription service.
                                            </p>
                                            <p className="mt-2">
                                                Subscribers may request deletion
                                                of their email address at any
                                                time.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem
                                        value="confidentiality"
                                        className="rounded-lg border bg-green-50 px-4"
                                    >
                                        <AccordionTrigger className="font-semibold text-green-900">
                                            6.3. Confidentiality
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <p>
                                                Data is never sold or shared
                                                with third parties.
                                            </p>
                                            <p className="mt-2 font-medium text-green-800">
                                                Segbo takes all reasonable
                                                measures to ensure data security
                                                and confidentiality.
                                            </p>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </section>

                            <Separator />

                            {/* === 7. ACCOUNT SUSPENSION === */}
                            <section className="rounded-lg border border-red-200 bg-red-50 p-5">
                                <h2 className="mb-2 flex items-center gap-2 text-xl font-bold text-red-900">
                                    <AlertCircle className="h-6 w-6" />
                                    <span className="font-mono text-blue-600">
                                        7.
                                    </span>
                                    Account Suspension and Deletion
                                </h2>
                                <p className="text-red-800">
                                    Segbo reserves the right to suspend or
                                    delete any account (Author or User) in the
                                    event of a breach of these Terms or abusive
                                    behavior.
                                </p>
                            </section>

                            <Separator />

                            {/* === 8. INTELLECTUAL PROPERTY === */}
                            <section>
                                <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                                    <Shield className="h-6 w-6 text-gray-600" />
                                    <span className="font-mono text-blue-600">
                                        8.
                                    </span>
                                    Intellectual Property
                                </h2>
                                <p>
                                    The Segbo name, logo, and design are the
                                    exclusive property of{' '}
                                    <strong>Mogiciel</strong>.
                                </p>
                                <p className="mt-2">
                                    Authors retain ownership of their content
                                    and external links.
                                </p>
                            </section>

                            <Separator />

                            {/* === 9. LIMITATION OF LIABILITY === */}
                            <section>
                                <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                                    <Ban className="h-6 w-6 text-amber-600" />
                                    <span className="font-mono text-blue-600">
                                        9.
                                    </span>
                                    Limitation of Liability
                                </h2>
                                <p>
                                    Segbo acts solely as a technical
                                    intermediary facilitating connections
                                    between Authors and Users.
                                </p>
                                <p className="mt-2 text-sm italic text-gray-600">
                                    It does not guarantee the continuous
                                    availability of the Service or the accuracy
                                    of the information published by Authors.
                                </p>
                                <p className="mt-2 font-medium text-amber-800">
                                    Segbo shall not be held liable for any
                                    direct or indirect damages resulting from
                                    the use of the Service.
                                </p>
                            </section>

                            <Separator />

                            {/* === 10. CHANGES TO TERMS === */}
                            <section>
                                <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                                    <AlertCircle className="h-6 w-6 text-amber-600" />
                                    <span className="font-mono text-blue-600">
                                        10.
                                    </span>
                                    Changes to the Terms
                                </h2>
                                <p>Segbo may modify these Terms at any time.</p>
                                <p className="mt-2">
                                    Any modification takes effect upon
                                    publication, and Users will be notified
                                    through the Application or by email.
                                </p>
                                <p className="mt-2 text-sm italic text-gray-600">
                                    Continued use of the Service after
                                    modification constitutes acceptance of the
                                    updated Terms.
                                </p>
                            </section>

                            <Separator />

                            {/* === 11. GOVERNING LAW === */}
                            <section className="rounded-lg bg-gray-100 p-5">
                                <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-gray-900">
                                    <Gavel className="h-6 w-6 text-gray-700" />
                                    <span className="font-mono text-blue-600">
                                        11.
                                    </span>
                                    Governing Law and Jurisdiction
                                </h2>
                                <p>
                                    These Terms are governed by{' '}
                                    <strong>Togolese law</strong>.
                                </p>
                                <p className="mt-2">
                                    Any dispute relating to the use of{' '}
                                    <a
                                        href="https://segbo.mogiciel.com"
                                        className="text-blue-600 underline"
                                    >
                                        https://segbo.mogiciel.com
                                    </a>{' '}
                                    shall be submitted to the competent courts
                                    of Togo.
                                </p>
                            </section>

                            <Separator />

                            {/* === 12. CONTACT === */}
                            <section className="rounded-lg bg-blue-50 p-6 text-center">
                                <h2 className="mb-3 flex items-center justify-center gap-2 text-2xl font-bold text-blue-900">
                                    <Mail className="h-7 w-7" />
                                    <span className="font-mono text-blue-600">
                                        12.
                                    </span>
                                    Contact
                                </h2>
                                <p className="text-lg">
                                    For any questions regarding these Terms or
                                    your data, please contact:
                                </p>
                                <div className="mt-4 space-y-2 font-medium">
                                    <p>Mogiciel – Segbo</p>
                                    <p>
                                        <a
                                            href="mailto:support.segbo@mogiciel.com"
                                            className="text-lg text-blue-600 underline"
                                        >
                                            support.segbo@mogiciel.com
                                        </a>
                                    </p>
                                    <p>
                                        <a
                                            href="https://segbo.mogiciel.com"
                                            className="text-blue-600 underline"
                                        >
                                            https://segbo.mogiciel.com
                                        </a>
                                    </p>
                                </div>
                            </section>
                        </CardContent>
                    </Card>

                    <footer className="mt-12 text-center text-xs text-gray-500">
                        © {new Date().getFullYear()} Mogiciel. All rights
                        reserved.
                    </footer>
                </div>
            </div>
        </GuestLayout>
    );
}
