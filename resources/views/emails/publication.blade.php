<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #e8eaf0;
            margin: 0;
            padding: 0;
        }

        .email-wrapper {
            background-color: #e8eaf0;
            padding: 40px 20px;
        }

        .container {
            background: #ffffff;
            padding: 0;
            border-radius: 12px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
            padding: 30px;
            text-align: center;
        }

        .header-icon {
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            font-size: 24px;
        }

        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }

        .logo {
            max-width: 120px;
            margin-bottom: 15px;
        }

        .content {
            padding: 40px 35px;
        }

        .author-badge {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .publication-title {
            color: #1e293b;
            font-size: 20px;
            font-weight: 700;
            margin: 20px 0 15px 0;
            line-height: 1.4;
        }

        .preview-text {
            color: #475569;
            font-size: 15px;
            line-height: 1.6;
            margin: 15px 0 30px 0;
        }

        .button-container {
            text-align: center;
            margin: 35px 0;
        }

        a.button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
            transition: transform 0.2s, box-shadow 0.2s;
        }

        a.button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
        }

        .divider {
            border: none;
            border-top: 2px solid #e2e8f0;
            margin: 30px 0;
        }

        .footer {
            background-color: #f8fafc;
            padding: 25px 35px;
            text-align: center;
        }

        .footer-text {
            font-size: 13px;
            color: #64748b;
            line-height: 1.6;
            margin: 0;
        }

        .footer-text a {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
        }

        .footer-text a:hover {
            text-decoration: underline;
        }

        @media only screen and (max-width: 600px) {
            .email-wrapper {
                padding: 20px 10px;
            }

            .content {
                padding: 30px 25px;
            }

            .header h1 {
                font-size: 20px;
            }

            .publication-title {
                font-size: 18px;
            }
        }
    </style>
</head>

<body>
    <div class="header">
        <img src="https://segbon.com/images/logo.png" alt="Segbon Logo" class="logo" />
    </div>
    <div class="email-wrapper">
        <div class="container">
            <div class="header">
                <div class="header-icon">📢</div>
                <h1>New Publication</h1>
            </div>

            <div class="content">
                <div class="author-badge">
                    {{ $author_name }}
                </div>

                <h2 class="publication-title">{{ $publication_title }}</h2>

                <p class="preview-text">{{ $preview_text }}</p>

                <div class="button-container">
                    <a href="{{ $publication_url }}" class="button">
                        📖 Read
                    </a>
                </div>
            </div>

            <div class="footer">
                <p class="footer-text">
                    You are receiving this email because you subscribed to this Segbon.<br>
                    If you wish to unsubscribe,
                    <a href="{{ $unsubscribe_url }}">click here</a>.
                </p>
                <p class="footer-text">
                    &copy; {{ date('Y') }} Segbon. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</body>

</html>
