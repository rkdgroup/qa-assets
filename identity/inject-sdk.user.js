// ==UserScript==
// @name         Inject Identity SDK (QA)
// @namespace    https://gist.githubusercontent.com/rkdgroup/qa-assets
// @version      0.0.1
// @description  Injects latest identity SDK into page head for QA testing
// @author       Alan
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @updateURL    https://github.com/rkdgroup/qa-assets/raw/refs/heads/itzjustalan-patch-1/identity/inject-sdk.user.js
// @downloadURL  https://github.com/rkdgroup/qa-assets/raw/refs/heads/itzjustalan-patch-1/identity/inject-sdk.user.js
// ==/UserScript==

(function() {
    'use strict';

    const sdkUrl = 'https://cdn.an-identity.website/demoorg2/5/js/latest-identity-sdk.js';
    if (!document.head) {
        console.error('[identity-sdk] document.head not found — script not injected');
        return;
    }

    const existing = document.getElementById('cta-qa-test-script');
    if (existing) {
        existing.remove();
    }


    const script = document.createElement('script');
    script.id = 'cta-qa-test-script';
    script.src = sdkUrl;
    script.async = true;

    script.onerror = () => {
        console.error(
            `[identity-sdk] Script "${sdkUrl}" was blocked. ` +
            'This is likely due to the site’s Content Security Policy (CSP).'
        );
    };

    document.head.appendChild(script);
    console.log('[identity-sdk] SDK injection attempted');

    setTimeout(() => {
        if (!window.__identity) {
            console.warn('[identity-sdk] Script loaded but expected global not found');
        } else {
            console.log('[identity-sdk] Loaded successfully!', __identity);
        }
    }, 3000);
})();
