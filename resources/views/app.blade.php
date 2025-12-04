<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @if (isset($seo))
        {{--  SEO METAS for profile pages --}}
        {{-- DYNAMIQUE TITLE --}}
        <title inertia>{{ $seo['title'] ?? 'Segbon' }} - {{ config('app.name', 'Laravel') }}</title>

        {{-- DESCRIPTION --}}
        <meta name="description" content="{{ $seo['description'] ?? 'Empower Your Stories, Amplify Your Voice, The premier platform for independent journalists, web writers, authors, and content
                                creators to publish, connect, and inspire millions of readers globally.' }}">

        {{-- OPEN GRAPH (WhatsApp, Facebook) --}}
        <meta property="og:type" content="website">
        <meta property="og:title" content="{{ $seo['title'] ?? 'Segbon' }}">
        <meta property="og:description" content="{{ $seo['description'] ?? 'Empower Your Stories, Amplify Your Voice, The premier platform for independent journalists, web writers, authors, and content
                                creators to publish, connect, and inspire millions of readers globally.' }}">
        <meta property="og:url" content="{{ $seo['url'] ?? url()->current() }}">
        <meta property="og:author" >
        <meta property="og:publisher" >
        <meta property="og:publish_date" >
        <meta property="og:image" content="{{ $seo['image'] ?? asset('images/logo.png') }}">
        <meta property="og:site_name" content="Segbon">


        {{-- TWITTER --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $seo['title'] ?? 'Segbon' }}">
        <meta name="twitter:description" content="{{ $seo['description'] ?? '' }}">
        <meta name="twitter:image" content="{{ $seo['image'] ?? asset('images/logo.png') }}">

    @elseif(isset($pubseo))
        <title inertia>{{ $pubseo['title'] ?? 'Publication'}} - {{ config('app.name', 'Laravel') }}</title>
        <meta name="description" content="{{ $pubseo['description'] ?? 'Empower Your Stories, Amplify Your Voice, The premier platform for independent journalists, web writers, authors, and content
                                creators to publish, connect, and inspire millions of readers globally.' }}">
        {{-- Open Graph (Article) --}}
        <meta property="og:type" content="article">
        <meta property="og:title" content="{{ $pubseo['title'] }}">
        <meta property="og:description" content="{{ $pubseo['description'] }}">
        <meta property="og:url" content="{{ $pubseo['url'] }}">
        <meta property="og:image" content="{{ $pubseo['image'] }}">
        <meta property="og:site_name" content="Segbon">

        {{-- articles metadata --}}
        <meta property="article:published_time" content="{{ $pubseo['published_at'] }}">
        <meta property="article:author" content="{{ $pubseo['author'] }}">

        {{-- Twitter --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $pubseo['title'] }}">
        <meta name="twitter:description" content="{{ $pubseo['description'] }}">
        <meta name="twitter:image" content="{{ $pubseo['image'] }}">
    @else
        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <meta name="description" content="Empower Your Stories, Amplify Your Voice, The premier platform for independent journalists, web writers, authors, and content
                                creators to publish, connect, and inspire millions of readers globally.">
        <meta property="og:type" content="website">
        <meta property="og:title" content="Segbon">
        <meta property="og:description" content="Empower Your Stories, Amplify Your Voice, The premier platform for independent journalists, web writers, authors, and content
                                creators to publish, connect, and inspire millions of readers globally.">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('images/logo.png') }}">
        <meta property="og:site_name" content="Segbon">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Segbon">
        <meta name="twitter:description" content="Empower Your Stories, Amplify Your Voice, The premier platform for independent journalists, web writers, authors, and content
                                creators to publish, connect, and inspire millions of readers globally.">
        <meta name="twitter:image" content="{{ asset('images/logo.png') }}">
    @endif
    <!-- Fonts -->
    {{-- <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=alexandria:400,500,600&display=swap" rel="stylesheet" /> --}}

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
