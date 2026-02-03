// ==UserScript==
// @name         Inject Identity SDK (QA)
// @namespace    https://gist.githubusercontent.com/rkdgroup/qa-assets
// @version      0.0.1
// @description  Injects latest identity SDK into page head for QA testing
// @author       Alan
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @updateURL    https://github.com/rkdgroup/qa-assets/raw/refs/heads/main/identity/inject-sdk.user.js
// @downloadURL  https://github.com/rkdgroup/qa-assets/raw/refs/heads/main/identity/inject-sdk.user.js
// ==/UserScript==

(function() {
    'use strict';

    const sdkUrl = 'https://cdn.an-identity.website/demoorg2/5/js/latest-identity-sdk.js';
    const editorUrl = 'https://rkdgroup.github.io/qa-assets/identity/identity-profile-editor.js';

    const inject = (id, src) => {
        if (document.getElementById(id)) {
            console.warn('[identity-qa]', id, 'already present. skipping inject.');
            return;
        }

        if (!document.head) {
            console.error('[identity-qa] document.head not found');
            return;
        }

        const script = document.createElement('script');
        script.id = id;
        script.src = src;
        script.async = true;

        script.onerror = () => {
            console.error(`[identity-qa] Failed to load ${src}`);
        };

        document.head.appendChild(script);
        console.log('[identity-qa] injected', id, src);
    };

    const waitForIdentity = (onReady) => {
        const startTime = Date.now();
        const maxWaitMs = 10000;
        const intervalMs = 100;

        const check = () => {
            if (
                window.__identity &&
                typeof window.__identity === 'object' &&
                window.__identity.profile &&
                window.__identity.ctasLoaded === true
            ) {
                console.log('[identity-qa] identity ready');
                onReady();
                return;
            }

            if (Date.now() - startTime > maxWaitMs) {
                console.error('[identity-qa] identity not ready after timeout', window.__identity);
                return;
            }

            setTimeout(check, intervalMs);
        };

        check();
    };

    inject('cta-qa-test-script', sdkUrl);

    waitForIdentity(() => {
        inject('cta-qa-profile-editor', editorUrl);
    });

})();
