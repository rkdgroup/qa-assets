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
      var _a, _b;
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
      const initialPos = ((_b = this.container.querySelector("input[name='pos']:checked")) == null ? void 0 : _b.value) || "default";
      this.applyPosition(initialPos);
    }
    render() {
      this.container.innerHTML = `
    <style>
.r3volution-cp-editor {
    position: fixed;
    left: 10px;
    bottom: 10px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    padding: 1%;
    width: 48vw;
    z-index: 10000;
    font-family: Inter, sans-serif;
    border: 1px solid #e7e7e7;
}

.r3volution-cp-collapse {
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.r3volution-cp-title {
    font-size: 18px;
    font-weight: 700;
    margin: 10px 0 20px;
}

.r3volution-cp-section-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #000;
}

.r3volution-cp-row {
    display: flex;
    gap: 16px;
    margin-bottom: 14px;
}

.r3volution-cp-row .item label {
    display: block;
    margin-bottom: 6px;
    font-size: 12px;
    font-weight: 500;
    width:100%;
}

input.r3volution-cp-field, select.r3volution-cp-field {
    width: -webkit-fill-available;
    width: -moz-available;
    width: fill-available;
    padding: 9px 10px;
    border: 1px solid #d0d0d0;
    border-radius: 6px;
    font-size: 12px;
    transition: border-color 0.2s;
}

.r3volution-cp-field:focus {
    border-color: #3B82F6;
    outline: none;
}

.r3volution-cp-radio-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 10px;
    align-items: center;
    font-size: 12px;
    width:100%;
}

.r3volution-cp-radio-row label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    white-space:nowrap;
}

button.r3volution-cp-save-btn {
    background: #3B82F6;
    color: white;
    padding: 10px 22px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    font-size: 12px;
}

button.r3volution-cp-save-btn:hover {
    background: #2563EB;
}

button.r3volution-cp-reset-btn {
    background: #f4f4f4;
    padding: 10px 22px;
    border-radius: 6px;
    font-weight: 600;
    margin-right: 12px;
    cursor: pointer;
    font-size: 12px;
    border: 1px solid #ddd;
}

button.r3volution-cp-reset-btn:hover {
    background: #e9e9e9;
}

.r3volution-cp-editor.default-pos {
    left: 10px;
    bottom: 10px;
    width: 48vw;
}

.r3volution-cp-editor.vertical-left {
    left: 0;
    top: 0;
    width: 33vw;
    height: 97vh;
    overflow-y: auto;
    padding: 1%;
    border-radius: 12px;
}

.r3volution-cp-editor.horizontal-bottom {
    left: 0;
    bottom: 0;
    width: 97vw;
    height: 245px;
    padding: 1%;
    border-radius: 12px;
}
.r3volution-cp-divider {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

.r3volution-cp-actions {
    display: flex;
    gap: 10px;
    align-items: center;
    align-self: flex-start;
    margin-top: 6px;
}

.r3volution-cp-editor.default-pos .r3volution-cp-divider {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}
.r3volution-cp-editor.default-pos .r3volution-cp-actions {
    align-self: flex-start;
}
.r3volution-cp-editor.default-pos .r3volution-cp-divider .r3volution-cp-gift-info .r3volution-cp-row .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    width: 100%;
}
.r3volution-cp-editor .r3volution-cp-divider .r3volution-cp-gift-info .r3volution-cp-row .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    width: 100%;
}
.r3volution-cp-editor.default-pos .r3volution-cp-collapsed-area{
    margin-top:1.5%;
}
.r3volution-cp-editor.default-pos .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-setting-radio {
    display: flex;
}
.r3volution-cp-editor.default-pos .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-radio-row {
    margin-bottom: 8%;
}
.r3volution-cp-editor .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-radio-row {
    margin-bottom: 8%;
}
.r3volution-cp-setting-radio {
    display: flex;
}
.r3volution-cp-connector-select {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}
/* VERTICAL-LEFT: r3volution-cp-divider behaves like block (sections stack), actions bottom-left */
.r3volution-cp-editor.vertical-left .r3volution-cp-divider {
    display: block;
}
.r3volution-cp-editor.vertical-left .r3volution-cp-divider .r3volution-cp-section {
    margin-bottom: 18px;
}
.r3volution-cp-editor.vertical-left .r3volution-cp-actions {
    display: flex;
    align-self: flex-start;
    margin-top: 18px;
}
.r3volution-cp-editor.vertical-left .r3volution-cp-divider .r3volution-cp-gift-info .r3volution-cp-row .item{
    display: block;
}
.r3volution-cp-editor.vertical-left .r3volution-cp-divider .r3volution-cp-gift-info .r3volution-cp-gift-criteria {
    display: block;
}
.r3volution-cp-editor.vertical-left .r3volution-cp-divider .r3volution-cp-gift-info .r3volution-cp-gift-criteria .r3volution-cp-radio-row { 
    display: flex;
}
.r3volution-cp-editor.vertical-left .r3volution-cp-divider .r3volution-cp-gift-info .r3volution-cp-gift-criteria label  {
    width: auto;
    margin-top: 2%;
} 
.r3volution-cp-editor.vertical-left .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-setting-radio  {
    width: auto;
    margin-top: 2%;
} 
.r3volution-cp-editor.vertical-left .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-radio-row{
    display: block;
    margin-bottom: 5%;
}   
.r3volution-cp-editor.vertical-left .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-connector-select {
    display: block;
    width: 100%;
} 


/* HORIZONTAL-BOTTOM: r3volution-cp-divider becomes a horizontal bar (row) with inline children;
   actions sit at the right end of r3volution-cp-divider */
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-gift-info .r3volution-cp-row .item{
    display: block;
}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-radio-row{
    display: block;
}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-connector-select {
    display: block;}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-gift-info .r3volution-cp-gift-criteria .r3volution-cp-radio-row {
    margin-top: 6%;
}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-radio-row{
    margin-bottom: 0px;
}

.r3volution-cp-editor.horizontal-bottom .r3volution-cp-collapsed-area {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-gift-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 12px 0 0 0;
    margin-top: auto;
}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-row {
    margin-bottom: 0px;
}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-title{
    margin: 10px 0 9px;
}
.r3volution-cp-editor.vertical-left .r3volution-cp-title{
    margin: -5px 0 9px 0px;
}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-settings {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 8px;
    padding: 12px 0;
    margin-top: auto;
}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-gift-info .r3volution-cp-gift-criteria {
    display: block;
    font-size: 12px;
    font-weight: 500;
}
.r3volution-cp-gift-criteria label {
    font-size: 12px;
    font-weight: 500;
    width: 100%;
}
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-setting-radio {
    margin-top: 8%;
    display: flex;
    font-size: 12px;
    font-weight: 500;

}
/* make each section able to shrink/grow inline */
.r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-section {
    flex: 0 1 auto;
    min-width: 0;
}

/* push actions to far right in horizontal mode */

#r3volution-cp-position-options{
    display: flex;
}
.r3volution-cp-field input,
.r3volution-cp-field select {
    flex: 1;
    width: auto;
}
.r3volution-cp-editor.horizontal-bottom #r3volution-cp-sustainer{
    margin-top: 20%;
}

.r3volution-cp-collapse {
    cursor: pointer;
    user-select: none;
}

.r3volution-cp-collapse .r3volution-cp-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
}

.r3volution-cp-collapse-icon {
    transition: transform 0.25s ease;
}

.r3volution-cp-editor.collapsed .r3volution-cp-collapse-icon {
    transform: rotate(180deg);
}

.r3volution-cp-editor.collapsed .r3volution-cp-collapse .r3volution-cp-title,
.r3volution-cp-editor.preview-mode .r3volution-cp-collapse .r3volution-cp-title {
    display: inline;
}

.r3volution-cp-editor.collapsed .r3volution-cp-collapsed-area {
    display: none !important;
}

.r3volution-cp-editor.vertical-left.collapsed {
    height: 35px;
    padding-bottom: 10px;
    bottom:0;
    top:unset;
    overflow: hidden;
    border-radius: 12px;
}
.r3volution-cp-editor.horizontal-bottom.collapsed {
    height: 35px;
    padding-bottom: 10px;
    bottom:0;
    top:unset;
    overflow: hidden;
    border-radius: 12px;
}


@media (min-width: 1600px) {

    .r3volution-cp-editor.default-pos{
        width: 40vw;
    }
    .r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider {
        gap: 20px !important;
    }

    .r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-gift-info,
    .r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-settings {
        gap: 20px !important;
    }
    .r3volution-cp-radio-row{
        width: auto;
    }
    .r3volution-cp-editor.horizontal-bottom .r3volution-cp-divider .r3volution-cp-settings .r3volution-cp-setting-radio{
        margin-top: 16%;
    }

}

    </style>

  <div class="r3volution-cp-editor ${this.isPreviewMode ? "preview-mode" : ""}">
    <div class="r3volution-cp-collapse" title="Toggle editor">
        <div class="r3volution-cp-title">Constituent Profile Editor</div>
        <div>
        <svg class="r3volution-cp-collapse-icon" width="16" height="16" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-width="2" d="M6 9l6 6 6-6"/>
        </svg>
        </div>
    </div>

  ${this.isPreviewMode ? `
      <h5>You are currently previewing a CTA, so you cannot edit the constituent profile.</h5>
  ` : `
      <div class="r3volution-cp-collapsed-area">

            <!-- Position -->
            <div class="r3volution-cp-section">
                <div class="r3volution-cp-section-title">Position</div>

                <div class="r3volution-cp-radio-row" id="r3volution-cp-position-options">
                    <label><input class="r3volution-cp-field" type="radio" name="pos" value="default" checked> Default</label>
                    <label><input class="r3volution-cp-field" type="radio" name="pos" value="vertical-left"> Vertical - Left</label>
                    <label><input class="r3volution-cp-field" type="radio" name="pos" value="horizontal-bottom"> Horizontal - Bottom</label>
                </div>
            </div>
            <div class="r3volution-cp-divider">
            <!-- Gift Information -->
            <div class="r3volution-cp-section gift-info-section">
                <div class="r3volution-cp-section-title">Gift Information</div>
                <div class="r3volution-cp-gift-info">
                <div class="r3volution-cp-row">
                    <div class="item">
                        <label>Total number of gifts</label>
                        <input class="r3volution-cp-field" type="number" id="r3volution-cp-gift-count">
                    </div>
                </div>

                <div class="r3volution-cp-row r3volution-cp-gift-criteria">
                    <label>Select gift criteria:</label>
                
                <div class="r3volution-cp-radio-row">
                    <label><input class="r3volution-cp-field" type="radio" name="giftcrit" value="largest" id="r3volution-cp-giftcrit-largest"> Largest</label>
                    <label><input class="r3volution-cp-field" type="radio" name="giftcrit" value="recent" id="r3volution-cp-giftcrit-recent" checked> Recent</label>
                </div>
                </div>

                <div class="r3volution-cp-row">
                    <div class="item">
                        <label>Gift amount</label>
                        <input class="r3volution-cp-field" type="number" id="r3volution-cp-gift-amt" placeholder="$">
                    </div>
                </div>

                <div class="r3volution-cp-row">
                    <div class="item">
                        <label>Gift date & time</label>
                        <input class="r3volution-cp-field" type="datetime-local" id="r3volution-cp-gift-date">
                    </div>
                </div>
                </div>
            </div>

            <!-- Settings -->
            <div class="r3volution-cp-section settings-section">
                <div class="r3volution-cp-section-title">Settings</div>
                <div class="r3volution-cp-settings">
                <div class="r3volution-cp-radio-row">
                    <label>Clear all CTA cookies</label>
                    <div class="r3volution-cp-setting-radio">
                    <label><input class="r3volution-cp-field" type="radio" name="r3volution-cp-clear-cookies" value="yes"> Yes</label>
                    <label><input class="r3volution-cp-field" type="radio" name="r3volution-cp-clear-cookies" value="no" checked> No</label>
                    </div>
                </div>

                <div class="r3volution-cp-radio-row">
                    <label>Top wealth zip code</label>
                    <div class="r3volution-cp-setting-radio">
                    <label><input class="r3volution-cp-field" type="radio" name="r3volution-cp-twzi" value="yes"> Yes</label>
                    <label><input class="r3volution-cp-field" type="radio" name="r3volution-cp-twzi" value="no" checked> No</label>
                    </div>
                </div>

                <div class="r3volution-cp-radio-row">
                    <label>Set sustainer</label>
                    <div class="r3volution-cp-setting-radio" id="r3volution-cp-sustainer">
                    <label><input class="r3volution-cp-field" type="radio" name="r3volution-cp-sustainer" value="yes"> Yes</label>
                    <label><input class="r3volution-cp-field" type="radio" name="r3volution-cp-sustainer" value="no" checked> No</label>
                    </div>
                </div>

                <div class="r3volution-cp-row">
                    <div class="item r3volution-cp-connector-select">
                        <label>Add connector data</label>
                        <select class="r3volution-cp-field" id="r3volution-cp-connector">
                            <option value="">Don't add connector data</option>
                            <option value="raisers-edge-nxt">Raiser's Edge NXT</option>
                            <option value="salesforce">Salesforce</option>
                            <option value="donorperfect">DonorPerfect</option>
                            <option value="virtuous">Virtuous</option>
                        </select>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="r3volution-cp-actions">
            <button class="r3volution-cp-reset-btn">Reset Details</button>
            <button id="r3volution-cp-save" class="r3volution-cp-save-btn">Save & Refresh</button>
            </div>
        </div>
        `}
    </div>
    `;
      this.collapsedArea = this.container.querySelector(".r3volution-cp-collapsed-area");
    }
    bindEvents() {
      if (this.isPreviewMode) return;
      const collapseBtn = this.container.querySelector(".r3volution-cp-collapse");
      collapseBtn.addEventListener("click", () => {
        const editor = this.container.querySelector(".r3volution-cp-editor");
        editor.classList.toggle("collapsed");
      });
      const saveBtn = this.container.querySelector("#r3volution-cp-save");
      if (saveBtn) saveBtn.addEventListener("click", () => this.save());
      const posRadios = Array.from(this.container.querySelectorAll("input[name='pos']"));
      posRadios.forEach((r) => r.addEventListener("change", (e) => {
        const val = e.target.value;
        this.applyPosition(val);
      }));
      const resetBtn = this.container.querySelector(".r3volution-cp-reset-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => this.resetDetails());
      }
    }
    setIdentityProfileData(key, value) {
      if (!this.profile) return;
      if (key in this.profile) {
        this.profile[key] = value;
      } else {
        console.warn(`Profile field “${key}” does not exist.`);
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
      var _a, _b;
      if (this.isPreviewMode) {
        return;
      }
      const getValue = (id) => {
        const el = this.container.querySelector(`#${id}`);
        return (el == null ? void 0 : el.value) ?? null;
      };
      const getRadioValue = (name) => {
        const el = this.container.querySelector(
          `input[name="${name}"]:checked`
        );
        return (el == null ? void 0 : el.value) ?? null;
      };
      const parseNum = (id) => {
        const v = Number(getValue(id));
        return isNaN(v) ? null : v;
      };
      const totalGiftCount = parseNum("r3volution-cp-gift-count");
      const giftAmount = parseNum("r3volution-cp-gift-amt");
      const giftDate = getValue("r3volution-cp-gift-date");
      const connector = getValue("r3volution-cp-connector");
      const giftCritEl = this.container.querySelector("input[name='giftcrit']:checked");
      const giftCrit = giftCritEl ? (_b = (_a = giftCritEl.parentElement) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim().toLowerCase() : "recent";
      if (giftCrit === "largest") {
        this.setIdentityProfileData("largestGiftAmount", giftAmount);
        this.setIdentityProfileData("lastGiftAmount", null);
      } else {
        this.setIdentityProfileData("lastGiftAmount", giftAmount);
        this.setIdentityProfileData("largestGiftAmount", null);
      }
      this.setIdentityProfileData("totalGiftCount", totalGiftCount);
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
      if (getValue("r3volution-cp-clear-cookies") === "yes") this.clearAllCookies();
      const topWealth = getRadioValue("r3volution-cp-twzi");
      this.setIdentityProfileData("topWealthZipCode", topWealth === "yes");
      const sustainer = getRadioValue("r3volution-cp-sustainer");
      this.setIdentityProfileData("isSustainer", sustainer === "yes");
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
        if (this.profile && typeof this.profile.incrementVisits === "function") {
          this.profile.incrementVisits();
        }
        window.__identity.fetchProfileTranslations();
        window.__identity.runCtas();
      }
    }
    applyPosition(position) {
      const editor = this.container.querySelector(".r3volution-cp-editor");
      editor.classList.remove("default-pos", "vertical-left", "horizontal-bottom");
      switch (position) {
        case "vertical-left":
          editor.classList.add("vertical-left");
          break;
        case "horizontal-bottom":
          editor.classList.add("horizontal-bottom");
          break;
        default:
          editor.classList.add("default-pos");
          break;
      }
    }
    resetDetails() {
      const inputs = this.container.querySelectorAll("input, select");
      inputs.forEach((el) => {
        if (el instanceof HTMLInputElement) {
          if (el.type === "radio") {
            el.checked = el.value === "default" || el.value === "recent" || el.value === "no";
          } else {
            el.value = "";
          }
        }
        if (el instanceof HTMLSelectElement) {
          el.value = "";
        }
      });
      const defaultPos = this.container.querySelector("input[name='pos'][value='default']");
      if (defaultPos) defaultPos.checked = true;
      this.applyPosition("default");
      if (this.profile) {
        this.profile.totalGiftCount = 0;
        this.profile.lastGiftAmount = null;
        this.profile.largestGiftAmount = null;
        this.profile.lastGiftDate = null;
        this.profile.gifts = [];
        this.profile.topWealthZipCode = false;
        this.profile.isSustainer = false;
      }
      this.clearAllCookies();
      this.rerunCtas();
    }
  }
  new ConstituteProfileEditor();
})();
