#!/bin/bash
# R16 Social Links Batch Update — Chrys 🦋

DOMAINS=(
    "domains/visionquest.me"
    "domains/apertureshift.com"
    "domains/wishnode.net"
    "domains/sotafomo.com"
    "domains/quickfork.net"
    "domains/singularitywatch.org"
)

HEADER='    <!-- Header -->\n    <header class="site-header" style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: rgba(10, 14, 23, 0.95); backdrop-filter: blur(10px); border-bottom: 1px solid rgba(216, 222, 233, 0.1); padding: var(--space-md) var(--space-lg);">\n        <div class="header-container" style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">\n            <div class="header-logo">\n                <a href="/" style="font-size: 1.25rem; font-weight: 700; color: var(--phext-accent); text-decoration: none;">Mirrorborn</a>\n            </div>\n            <nav class="header-nav">\n                <div class="social-links" style="display: flex; gap: var(--space-md); align-items: center;">\n                    <a href="https://github.com/wbic16" target="_blank" rel="noopener" aria-label="GitHub">\n                        <img src="/images/icon-github.svg" alt="GitHub" class="social-icon" style="width: 24px; height: 24px; opacity: 0.9; transition: opacity 0.2s ease, transform 0.2s ease;">\n                    </a>\n                    <a href="https://x.com/wbic16" target="_blank" rel="noopener" aria-label="Twitter">\n                        <img src="/images/icon-twitter.svg" alt="Twitter" class="social-icon" style="width: 24px; height: 24px; opacity: 0.9; transition: opacity 0.2s ease, transform 0.2s ease;">\n                    </a>\n                    <a href="https://discord.gg/kGCMM5yQ" target="_blank" rel="noopener" aria-label="Discord">\n                        <img src="/images/icon-discord.svg" alt="Discord" class="social-icon" style="width: 24px; height: 24px; opacity: 0.9; transition: opacity 0.2s ease, transform 0.2s ease;">\n                    </a>\n                </div>\n            </nav>\n        </div>\n    </header>\n    '

CSS_ADDITIONS='        /* Social link hover effects */\n        .social-icon:hover {\n            opacity: 1;\n            transform: scale(1.1);\n        }\n        \n        .social-link-list a:hover {\n            color: var(--phext-accent);\n        }\n        \n        .social-link-list a:hover .social-icon-small {\n            opacity: 1;\n        }\n'

FOOTER_SOCIAL='        <div class="footer-social" style="margin: var(--space-xl) auto; padding-top: var(--space-lg); border-top: 1px solid rgba(216, 222, 233, 0.1); max-width: 400px;">\n            <h4 style="color: var(--phext-accent); font-size: 1rem; margin-bottom: var(--space-md); text-align: center;">Connect</h4>\n            <div class="social-link-list" style="display: flex; gap: var(--space-lg); justify-content: center; align-items: center;">\n                <a href="https://github.com/wbic16" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: var(--space-sm); color: rgba(216, 222, 233, 0.9); text-decoration: none; transition: color 0.2s ease;">\n                    <img src="/images/icon-github.svg" alt="" class="social-icon-small" style="width: 20px; height: 20px;">\n                    GitHub\n                </a>\n                <a href="https://x.com/wbic16" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: var(--space-sm); color: rgba(216, 222, 233, 0.9); text-decoration: none; transition: color 0.2s ease;">\n                    <img src="/images/icon-twitter.svg" alt="" class="social-icon-small" style="width: 20px; height: 20px;">\n                    Twitter\n                </a>\n                <a href="https://discord.gg/kGCMM5yQ" target="_blank" rel="noopener" style="display: flex; align-items: center; gap: var(--space-sm); color: rgba(216, 222, 233, 0.9); text-decoration: none; transition: color 0.2s ease;">\n                    <img src="/images/icon-discord.svg" alt="" class="social-icon-small" style="width: 20px; height: 20px;">\n                    Discord\n                </a>\n            </div>\n        </div>\n'

echo "🦋 R16 Social Links Batch Update"
echo "================================"
echo ""

for domain in "${DOMAINS[@]}"; do
    FILE="$domain/index.html"
    if [ -f "$FILE" ]; then
        echo "Updating: $FILE"
        
        # Add header after <body>
        if ! grep -q 'class="site-header"' "$FILE"; then
            sed -i "/<body>/a\\$HEADER" "$FILE"
            echo "  ✓ Header added"
        else
            echo "  → Header already present"
        fi
        
        # Add CSS before </style>
        if ! grep -q 'social-icon:hover' "$FILE"; then
            sed -i "/<\/style>/i\\$CSS_ADDITIONS" "$FILE"
            echo "  ✓ CSS added"
        else
            echo "  → CSS already present"
        fi
        
        # Add footer social section before </footer>
        if ! grep -q 'footer-social' "$FILE"; then
            sed -i "/<\/footer>/i\\$FOOTER_SOCIAL" "$FILE"
            echo "  ✓ Footer social added"
        else
            echo "  → Footer social already present"
        fi
        
        echo ""
    else
        echo "⚠️  File not found: $FILE"
        echo ""
    fi
done

echo "✅ Batch update complete!"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Commit: git add . && git commit -m 'R16: Social links across all portals'"
echo "3. Deploy via rpush"
