var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : obj[key] = value;
var __publicField = (obj, key, value) =>
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

console.debug('[profile-editor] bundle evaluated');

(function() {
  "use strict";

  console.debug('[profile-editor] IIFE entered');

  class ConstituteProfileEditor {
    constructor(containerId) {
      console.debug('[profile-editor] constructor called', { containerId });

      __publicField(this, "container");
      __publicField(this, "collapsedArea");
      __publicField(this, "profile");
      __publicField(this, "isPreviewMode");

      var _a;
      this.profile = (_a = window.__identity) == null ? void 0 : _a.profile;

      console.debug('[profile-editor] __identity present:', !!window.__identity);
      console.debug('[profile-editor] profile present:', !!this.profile);

      const url_params = new URLSearchParams(window.location.search);
      this.isPreviewMode = url_params.has("ctaPreview");

      console.debug('[profile-editor] preview mode:', this.isPreviewMode);

      if (containerId) {
        const el = document.getElementById(containerId);
        if (!el) {
          console.error(`[profile-editor] container #${containerId} not found`);
          throw new Error(`Container #${containerId} not found`);
        }
        this.container = el;
      } else {
        console.debug('[profile-editor] creating default container');
        this.container = document.createElement("div");
        this.container.className = "constitute-profile-editor";
        document.body.appendChild(this.container);
      }

      this.render();
      this.bindEvents();

      console.debug('[profile-editor] constructor completed');
    }

    render() {
      console.debug('[profile-editor] render() called');

      this.container.innerHTML = `
        <style>
            .cp-editor {
              background-color: #f0f0f0;
              border: 2px solid red;
              border-radius: 8px;
              margin: 20px;
              padding: 20px;
              left: 10px;
              bottom: 10px;
              position: fixed;
              z-index: 1000;
            }
            .cp-collapse { cursor: pointer; font-weight: bold; }
            .collapsed-area { display: none; margin-top: 10px; }
            .collapsed-area.show { display: block; }
            .cp-editor label { display:block; margin-top:8px; }
        </style>

        <div class="cp-editor">
            <div class="cp-collapse">+/- &nbsp; Constituent Profile Editor</div>
            ${this.isPreviewMode
              ? `<h5>You are currently previewing a CTA, so you cannot edit the constituent profile.</h5>`
              : `
                <div class="collapsed-area">
                  <label>Total number of gifts: <input type="number" id="cp-gift-count"></label>
                  <label>Largest gift amount: <input type="number" id="cp-gift-lg"></label>
                  <label>Most recent gift amount: <input type="number" id="cp-gift-amt"></label>
                  <label>Most recent gift date: <input type="date" id="cp-gift-date"></label>
                  <label>Clear all CTA cookies?
                    <select id="cp-clear-cookies">
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </label>
                  <label>Set top wealth zip code
                    <select id="cp-twzi">
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </label>
                  <label>Set sustainer
                    <select id="cp-sustainer">
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </label>
                  <label>Add connector data
                    <select id="cp-connector">
                      <option value="">Don't add connector data</option>
                      <option value="raisers-edge-nxt">Raiser's Edge NXT</option>
                      <option value="salesforce">Salesforce</option>
                      <option value="donorperfect">DonorPerfect</option>
                      <option value="virtuous">Virtuous</option>
                    </select>
                  </label>
                  <button id="cp-save">Save &amp; Re-run CTAs</button>
                </div>
              `}
        </div>
      `;

      this.collapsedArea = this.container.querySelector(".collapsed-area");

      console.debug('[profile-editor] render complete', {
        collapsedAreaFound: !!this.collapsedArea
      });
    }

    bindEvents() {
      console.debug('[profile-editor] bindEvents() called');

      if (this.isPreviewMode) {
        console.debug('[profile-editor] preview mode – events not bound');
        return;
      }

      const collapseBtn = this.container.querySelector(".cp-collapse");
      const saveBtn = this.container.querySelector("#cp-save");

      if (!collapseBtn || !saveBtn) {
        console.error('[profile-editor] missing controls', {
          collapseBtn,
          saveBtn
        });
        return;
      }

      collapseBtn.addEventListener("click", () => {
        console.debug('[profile-editor] collapse toggled');
        this.collapsedArea.classList.toggle("show");
      });

      saveBtn.addEventListener("click", () => {
        console.debug('[profile-editor] save clicked');
        this.save();
      });

      console.debug('[profile-editor] events bound');
    }

    setIdentityProfileData(key, value) {
      console.debug('[profile-editor] setIdentityProfileData', { key, value });

      if (this.profile && this.profile[key] !== void 0) {
        this.profile[key] = value;
      } else {
        console.error('[profile-editor] __identity.profile missing or invalid', {
          profile: this.profile,
          key
        });
      }
    }

    clearAllCookies() {
      console.debug('[profile-editor] clearing CTA cookies');

      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        if (name.startsWith("cta")) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      });
    }

    save() {
      console.debug('[profile-editor] save() started');

      if (this.isPreviewMode) {
        console.debug('[profile-editor] save aborted – preview mode');
        return;
      }

      const getValue = (id) => this.container.querySelector(`#${id}`).value;

      const totalGiftCount = parseInt(getValue("cp-gift-count")) || null;
      const largestGiftAmount = parseInt(getValue("cp-gift-lg")) || null;
      const giftAmount = parseInt(getValue("cp-gift-amt")) || null;
      const giftDate = getValue("cp-gift-date");
      const connector = getValue("cp-connector");

      console.debug('[profile-editor] form values', {
        totalGiftCount,
        largestGiftAmount,
        giftAmount,
        giftDate,
        connector
      });

      this.setIdentityProfileData("totalGiftCount", totalGiftCount);
      this.setIdentityProfileData("lastGiftAmount", giftAmount);
      this.setIdentityProfileData("largestGiftAmount", largestGiftAmount);
      this.setIdentityProfileData("lastGiftDate", giftDate);

      if (connector) {
        this.setIdentityProfileData("gifts", [
          { source: connector, date: "2023-07-13", amount: "75.00" },
          { source: connector, date: "2022-01-21", amount: "50.00" },
          { source: connector, date: "2021-11-11", amount: "50.00" }
        ]);
      } else {
        this.setIdentityProfileData("gifts", []);
      }

      if (getValue("cp-clear-cookies") === "yes") {
        this.clearAllCookies();
      }

      this.setIdentityProfileData("topWealthZipCode", getValue("cp-twzi") === "yes");
      this.setIdentityProfileData("isSustainer", getValue("cp-sustainer") === "yes");

      this.rerunCtas();
    }

    ctaClearAllCTAs() {
      console.debug('[profile-editor] clearing existing CTAs');

      [
        ".r3volution-backdrop",
        ".r3volution-banner",
        ".r3volution-bug",
        ".r3volution-modal-backdrop",
        ".r3volution-lightbox-backdrop",
        ".r3volution-dynamic",
        ".r3volution-button-cta",
        '[id^="customcode_display_"]'
      ].forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
      });

      document.body.style.marginTop = "0px";
    }

    rerunCtas() {
      console.debug('[profile-editor] rerunCtas() called');

      this.ctaClearAllCTAs();

      if (this.profile && window.__identity) {
        console.debug('[profile-editor] rerunning CTAs');
        this.profile.incrementVisits();
        window.__identity.fetchProfileTranslations();
        window.__identity.runCtas();
      } else {
        console.error('[profile-editor] cannot rerun CTAs – identity missing');
      }
    }
  }

  console.debug('[profile-editor] instantiating editor');
  new ConstituteProfileEditor();
  console.debug('[profile-editor] instantiation complete');
})();
