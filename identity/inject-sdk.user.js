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
            // document.getElementById(id).remove();
            // console.warn('[identity-qa]', id, 'already present. removed element.');
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

    inject('cta-qa-test-script', sdkUrl);
    inject('cta-qa-profile-editor', editorUrl);

    setTimeout(() => {
        if (!window.__identity) {
            console.warn('[identity-sdk] Script loaded but expected global not found');
        } else {
            console.log('[identity-sdk] Loaded successfully!', __identity);
        }
    }, 3000);
})();
