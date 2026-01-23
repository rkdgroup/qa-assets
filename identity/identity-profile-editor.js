var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function() {
  "use strict";
  class ConstituteProfileEditor {
    constructor(containerId) {
      __publicField(this, "container");
      __publicField(this, "collapsedArea");
      __publicField(this, "profile");
      __publicField(this, "isPreviewMode");
      var _a;
      this.profile = (_a = window.__identity) == null ? void 0 : _a.profile;
      const url_params = new URLSearchParams(window.location.search);
      this.isPreviewMode = url_params.has("ctaPreview");
      if (containerId) {
        const el = document.getElementById(containerId);
        if (!el) throw new Error(`Container #${containerId} not found`);
        this.container = el;
      } else {
        this.container = document.createElement("div");
        this.container.className = "constitute-profile-editor";
        document.body.appendChild(this.container);
      }
      this.render();
      this.bindEvents();
    }
    render() {
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
            ${this.isPreviewMode ? `<h5>You are currently previewing a CTA, so you cannot edit the constituent profile.</h5>` : `
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
    }
    bindEvents() {
      if (this.isPreviewMode) {
        return;
      }
      const collapseBtn = this.container.querySelector(".cp-collapse");
      const saveBtn = this.container.querySelector("#cp-save");
      collapseBtn.addEventListener(
        "click",
        () => this.collapsedArea.classList.toggle("show")
      );
      saveBtn.addEventListener("click", () => this.save());
    }
    setIdentityProfileData(key, value) {
      if (this.profile && this.profile[key] !== void 0) {
        this.profile[key] = value;
      } else {
        console.error("__identity.profile is not defined");
      }
    }
    clearAllCookies() {
      document.cookie.split(";").forEach((cookie) => {
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        if (name.startsWith("cta")) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
      });
    }
    save() {
      if (this.isPreviewMode) {
        return;
      }
      const getValue = (id) => this.container.querySelector(`#${id}`).value;
      const totalGiftCount = parseInt(getValue("cp-gift-count")) || null;
      const largestGiftAmount = parseInt(getValue("cp-gift-lg")) || null;
      const giftAmount = parseInt(getValue("cp-gift-amt")) || null;
      const giftDate = getValue("cp-gift-date");
      const connector = getValue("cp-connector");
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
      if (getValue("cp-clear-cookies") === "yes") this.clearAllCookies();
      if (getValue("cp-twzi") === "yes") {
        this.setIdentityProfileData("topWealthZipCode", true);
      } else {
        this.setIdentityProfileData("topWealthZipCode", false);
      }
      if (getValue("cp-sustainer") === "yes") {
        this.setIdentityProfileData("isSustainer", true);
      } else {
        this.setIdentityProfileData("isSustainer", false);
      }
      this.rerunCtas();
    }
    // Clear all CTAs from the page
    ctaClearAllCTAs() {
      const ctas = document.querySelectorAll(".r3volution-backdrop");
      ctas.forEach((cta) => {
        cta.remove();
      });
      const banners = document.querySelectorAll(".r3volution-banner");
      banners.forEach((banner) => {
        banner.remove();
      });
      const bugs = document.querySelectorAll(".r3volution-bug");
      bugs.forEach((bug) => {
        bug.remove();
      });
      const modals = document.querySelectorAll(".r3volution-modal-backdrop");
      modals.forEach((modal) => {
        modal.remove();
      });
      const lightboxes = document.querySelectorAll(".r3volution-lightbox-backdrop");
      lightboxes.forEach((lightbox) => {
        lightbox.remove();
      });
      const dynamics = document.querySelectorAll(".r3volution-dynamic");
      dynamics.forEach((dynamictext) => {
        dynamictext.remove();
      });
      const buttons = document.querySelectorAll(".r3volution-button-cta");
      buttons.forEach((button) => {
        button.remove();
      });
      const customDisplays = document.querySelectorAll('[id^="customcode_display_"]');
      customDisplays.forEach((customcode) => {
        customcode.remove();
      });
      document.body.style.marginTop = "0px";
    }
    rerunCtas() {
      this.ctaClearAllCTAs();
      if (this.profile && (window == null ? void 0 : window.__identity)) {
        this.profile.incrementVisits();
        window.__identity.fetchProfileTranslations();
        window.__identity.runCtas();
      }
    }
  }
  new ConstituteProfileEditor();
})();
