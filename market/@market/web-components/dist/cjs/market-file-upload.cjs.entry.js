'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-37364565.js');
const index$1 = require('./index-254d04f0.js');

/**
 * Returns byte size as a human-readable string.
 * Cribbed from https://stackoverflow.com/a/18650828
 *
 * @param bytes File size in bytes
 * @param decimals Decimal precision
 */
const getReadableFilesize = (bytes, decimals = 2) => {
    if (!Number(bytes))
        return '0 bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['bytes', 'kB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const marketFileUploadCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}button,.market-button,::slotted(button),::slotted(.market-button),::slotted(.market-link){font-weight:var(--core-type-semibold-30-weight);font-size:var(--core-type-semibold-30-size);font-family:var(--core-type-semibold-30-font-family);line-height:var(--core-type-semibold-30-leading);letter-spacing:var(--core-type-semibold-30-tracking);text-transform:var(--core-type-semibold-30-case)}.label-container{border-width:var(--file-upload-border-width, 1px);border-style:var(--file-upload-normal-state-border-style, dashed);border-color:var(--file-upload-normal-state-border-color, var(--core-fill-30-color));border-radius:var(--file-upload-border-radius, 6px);transition:background-color border-color 0.2s}.label-container>label{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:var(--file-upload-dropzone-vertical-padding, var(--core-metrics-spacing-400))\n      var(--file-upload-dropzone-horizontal-padding, var(--core-metrics-spacing-400));text-align:center;cursor:pointer}.label-container>label .market-icon{color:var(--file-upload-label-fill-color, var(--core-text-10-color))}.label-container>.market-row{margin:0}button,.market-button,::slotted(button),::slotted(.market-button),::slotted(.market-link){padding:0}slot:not([name=\"compact\"]) button,slot:not([name=\"compact\"]) .market-button,slot:not([name=\"compact\"]) ::slotted(button),slot:not([name=\"compact\"]) ::slotted(.market-button),slot:not([name=\"compact\"]) ::slotted(.market-link){border:none;background-color:inherit;color:var(--file-upload-button-label-color, var(--button-normal-variant-tertiary-rank-normal-state-label-color));font-family:inherit;text-align:right;cursor:pointer}.has-file-selected{border-style:var(--file-upload-file-selected-state-border-style, solid) !important;border-color:var(--file-upload-file-selected-state-border-color, var(--core-fill-30-color))}@media (hover: hover){:host(:hover) .label-container{border-style:var(--file-upload-hover-state-border-style, dashed);border-color:var(--file-upload-hover-state-border-color, var(--core-emphasis-fill-color));background-color:var(--file-upload-hover-state-background-color, var(--core-emphasis-40-color))}}:host(:active) .label-container,:host(:active) .is-dragging-over{border-style:var(--file-upload-active-state-border-style, dashed);border-color:var(--file-upload-active-state-border-color, var(--core-emphasis-fill-color));background-color:var(--file-upload-active-state-background-color, var(--core-emphasis-30-color))}:host([disabled]) .label-container{border-style:var(--file-upload-disabled-state-border-style, dashed);border-color:var(--file-upload-disabled-state-border-color, var(--field-disabled-state-border-color));background-color:var(--file-upload-disabled-state-background-color, var(--field-disabled-state-background-color));color:var(--file-upload-disabled-state-label-color, var(--field-disabled-state-empty-phase-label-color))}:host([disabled]) button,:host([disabled]) ::slotted(button),:host([disabled]) ::slotted(.market-button),:host([disabled]) ::slotted(.market-icon),:host([disabled]) ::slotted(.market-link),:host([disabled]) label .market-icon,:host([disabled]) label ::slotted(.market-icon){opacity:30%}slot[name=\"compact-action\"]{display:none}:host([compact]) slot[name=\"compact-action\"]{display:block;width:100%}:host([compact]) slot:not([name=\"compact-action\"]){display:none}:host([compact]) .label-container{border-style:unset;border-color:unset;background-color:unset}:host([compact]) .label-container>label{padding:0}:host([compact]) .market-button,:host([compact]) .market-link,:host([compact]) ::slotted(.market-button),:host([compact]) ::slotted(.market-link){width:100%}.market-list{margin-top:var(--file-upload-dropzone-vertical-margin, var(--core-metrics-spacing-100))}.market-accessory[slot=\"leading-accessory\"]{border-radius:var(--file-upload-border-radius, 6px);background-color:var(--file-upload-leading-accessory-background-color, var(--core-fill-40-color))}.market-accessory[slot=\"trailing-accessory\"]{cursor:pointer}.market-accessory[slot=\"trailing-accessory\"] .market-icon{color:var(--file-upload-delete-fill-color, var(--core-fill-20-color))}[data-status]:not([data-status=\"\"]) .market-accessory[slot=\"leading-accessory\"]{background-color:unset}[data-status=\"error\"] [slot=\"subtext\"],[data-status=\"error\"] .market-accessory[slot=\"leading-accessory\"]{color:var(--file-upload-leading-accessory-error-color, var(--core-critical-fill-color))}:host([disabled]) [data-status=\"error\"] [slot=\"subtext\"]{opacity:30%}[data-status=\"success\"] .market-accessory[slot=\"leading-accessory\"]{color:var(--file-upload-leading-accessory-success-color, var(--core-success-fill-color))}[data-status=\"loading\"] .market-accessory[slot=\"leading-accessory\"]{animation:market-file-upload-loading-rotation 1s infinite linear}@keyframes market-file-upload-loading-rotation{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}:host([invalid]) .label-container{border-color:var(--field-normal-state-invalid-validity-border-color)}::slotted([slot=\"bottom-accessory\"]){color:var(--core-text-20-color)}";
const MarketFileUploadStyle0 = marketFileUploadCss;

const MarketFileUpload = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.marketFileUploadValueChange = index.createEvent(this, "marketFileUploadValueChange", 7);
        this.accept = '';
        this.value = [];
        this.disabled = false;
        this.invalid = false;
        this.multiple = false;
        this.compact = false;
        this.fileSubtext = undefined;
        this.fileMetadata = undefined;
        this.deleteButtonAriaLabel = 'Delete';
        this.isDraggingOver = false;
        this.files = undefined;
    }
    watchValueHandler(newValue) {
        if (Array.isArray(newValue)) {
            this.files = this.multiple ? [...newValue] : [newValue[0]];
        }
    }
    watchDisabledHandler() {
        this.slottedCompactButtons.forEach((el) => (el.disabled = this.disabled));
    }
    /**
     * We want to disable certain functions if multiple is false and a file has been selected
     */
    get hasSingleFileSelected() {
        return !this.multiple && this.files.length === 1;
    }
    /* returns `market-button` or `market-link` elements in the "compact" slot */
    get slottedCompactButtons() {
        const interactiveElementTagnames = new Set([
            index$1.getNamespacedTagFor('market-button'),
            index$1.getNamespacedTagFor('market-link'),
        ]);
        return [...this.el.querySelector('[slot="compact-action"]').children].filter((el) => interactiveElementTagnames.has(el.tagName.toLowerCase()));
    }
    draggingOver(e) {
        if (this.disabled || this.hasSingleFileSelected) {
            return;
        }
        this.isDraggingOver = true;
        e.preventDefault();
    }
    endDrag(e) {
        e.preventDefault();
        if (this.disabled || this.hasSingleFileSelected) {
            return;
        }
        this.isDraggingOver = false;
        if (e.type === 'drop' && e.dataTransfer) {
            this.addFiles(e.dataTransfer.files);
        }
    }
    handleButtonClick() {
        this.fileInputElement.click();
    }
    handleDeleteKeydown(e, index) {
        if (e.key === 'Enter' && !this.disabled) {
            this.removeFile(index);
        }
    }
    removeFile(index) {
        this.files.splice(index, 1);
        this.files = [...this.files];
        this.emitFileChange();
    }
    labelContainerClassNames() {
        const classNames = [];
        if (this.isDraggingOver) {
            classNames.push('is-dragging-over');
        }
        if (this.hasSingleFileSelected) {
            classNames.push('has-file-selected');
        }
        return classNames;
    }
    onInputChange(e) {
        this.addFiles(e.target.files);
        // unset the file input value so that we can re-add files
        // if they are removed by the user
        this.fileInputElement.value = '';
    }
    addFiles(files) {
        if (files) {
            if (!this.multiple) {
                this.files = [files[0]];
            }
            else {
                this.files = [...files, ...this.files];
            }
        }
        this.emitFileChange();
    }
    emitFileChange() {
        this.marketFileUploadValueChange.emit({ value: this.files });
    }
    handleCompactSlotChange() {
        this.slottedCompactButtons.forEach((el) => {
            el.removeEventListener('click', this.handleButtonClick.bind(this));
            if (!this.disabled) {
                el.addEventListener('click', this.handleButtonClick.bind(this));
            }
            el.disabled = this.disabled;
        });
    }
    componentWillLoad() {
        if (this.value) {
            this.files = [...this.value];
        }
        else {
            this.files = [];
        }
    }
    componentDidLoad() {
        this.handleCompactSlotChange();
    }
    renderFilesAsMarketRows() {
        const MarketRowTagName = index$1.getNamespacedTagFor('market-row');
        const MarketAccessoryTagName = index$1.getNamespacedTagFor('market-accessory');
        const MarketIconTagName = index$1.getNamespacedTagFor('market-icon');
        return this.files.map((file, index$1) => {
            var _a;
            const rowConfig = (_a = this.fileMetadata) === null || _a === void 0 ? void 0 : _a.find((row) => row.filename === file.name);
            // set default icons
            let leadingIcon = file.type.startsWith('image/') ? 'picture' : 'file';
            let trailingIcon = 'delete';
            // set default secondary text
            let secondaryText;
            switch (this.fileSubtext) {
                case 'size':
                    secondaryText = getReadableFilesize(file[this.fileSubtext]);
                    break;
                case 'type':
                    secondaryText = file[this.fileSubtext];
                    break;
            }
            // row config status overrides default row appearance
            switch (rowConfig === null || rowConfig === void 0 ? void 0 : rowConfig.status) {
                case 'error':
                    leadingIcon = 'warning';
                    trailingIcon = 'clear';
                    // message only displayed if status = error
                    secondaryText = rowConfig === null || rowConfig === void 0 ? void 0 : rowConfig.message;
                    break;
                case 'loading':
                    leadingIcon = 'loading';
                    trailingIcon = 'clear';
                    break;
                case 'success':
                    leadingIcon = 'success';
                    break;
            }
            // row config custom icon overrides previously set leading icon
            leadingIcon = (rowConfig === null || rowConfig === void 0 ? void 0 : rowConfig.leadingIconName) || leadingIcon;
            return (index.h(MarketRowTagName, { disabled: this.disabled, interactive: true, transient: true, "data-index": index$1, "data-status": rowConfig === null || rowConfig === void 0 ? void 0 : rowConfig.status }, index.h("label", { slot: "label" }, file.name), secondaryText && index.h("p", { slot: "subtext" }, secondaryText), index.h(MarketAccessoryTagName, { slot: "leading-accessory", size: "image" }, index.h(MarketIconTagName, { name: leadingIcon, fidelity: 24 })), index.h(MarketAccessoryTagName, { slot: "trailing-accessory", size: "icon", tabindex: this.disabled ? -1 : 0, role: "button", "aria-label": this.deleteButtonAriaLabel, onKeyDown: (e) => this.handleDeleteKeydown(e, index$1), onClick: () => this.removeFile(index$1) }, index.h(MarketIconTagName, { name: trailingIcon, fidelity: 24 }))));
        });
    }
    render() {
        const MarketListTagName = index$1.getNamespacedTagFor('market-list');
        const MarketAccessoryTagName = index$1.getNamespacedTagFor('market-accessory');
        const MarketIconTagName = index$1.getNamespacedTagFor('market-icon');
        const MarketFieldTagName = index$1.getNamespacedTagFor('market-field');
        const MarketButtonTagName = index$1.getNamespacedTagFor('market-button');
        const fileMarketRows = this.renderFilesAsMarketRows();
        const showUploadLabel = this.multiple || fileMarketRows.length === 0;
        const showList = this.multiple && fileMarketRows.length > 0;
        return (index.h(index.Host, { key: 'a6387bad3723b23579e4803bc809802dc05bbe80', class: "market-file-upload", ondragenter: (e) => this.draggingOver(e), ondragover: (e) => this.draggingOver(e), ondragleave: (e) => this.endDrag(e), ondrop: (e) => this.endDrag(e) }, index.h(MarketFieldTagName, { key: '9ddf6b3ef0cc37b4fe171ffde6b1db2dc25a5880', disabled: this.disabled, invalid: this.invalid }, index.h("div", { key: '5db42c4af01b94ee691e4bfc8c3695f4ff5cfde1', class: `label-container ${this.labelContainerClassNames()}` }, !showUploadLabel && fileMarketRows[0], showUploadLabel && (
        // the input is correctly wrapped inside its label, but eslint gets confused by label > span > slot > text
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        index.h("label", { key: '6a0554081de2392295a706c220aec4ff890c6581' }, index.h("slot", { key: 'f8dda6a2fc67c2d25b61ceca30eee030cbdace99' }, index.h(MarketAccessoryTagName, { key: '01fa720e37c0e4e9a9d3c131c9724ebb0c67db66', size: "image" }, index.h(MarketIconTagName, { key: '3c00d32e418d48998a82b6659b0e712f02435e27', name: "file", fidelity: 24 })), index.h("span", { key: 'fd67c239b8a5f91429b36053ece843bfff65c998' }, index.h("button", { key: '85d595f5a16f5f59e879dadc361e7426d4160fc2', onClick: () => this.handleButtonClick() }, "Choose a file"), " or drag and drop it here")), index.h("slot", { key: 'c415fc3cc17a5387d4ec8b4353603ae2eb877221', name: "compact-action", onSlotchange: () => this.handleCompactSlotChange() }, index.h(MarketButtonTagName, { key: '98b94fc6b3a7438d88da13a2cc8cd073d33359c4', rank: "primary", disabled: this.disabled, onClick: () => this.handleButtonClick() }, "Upload file")), index.h("input", { key: '48c717f8ae9f8846fadf12ff4e0ee7522ba27e90', ref: (el) => (this.fileInputElement = el), onChange: (e) => this.onInputChange(e), type: "file", name: "files[]", multiple: this.multiple, accept: this.accept, hidden: true })))), index.h("slot", { key: 'e9d47e3973faf4525b19cbfcdd3d75ada36d4fc3', name: "bottom-accessory" }, index.h("small", { key: '832c55e6dcc9502fb1684455726b9b38040c8311', slot: "bottom-accessory" })), index.h("slot", { key: 'a11420e7a810512140165124aa659f8e952de3e9', name: "error" }, index.h("small", { key: '3ac344c99721274c2493afeec18f42c224375a28', slot: "error" }))), showList && (index.h(MarketListTagName, { key: '542ed5f8cabf72bcf2a61db1875d3b26c9b6373a', interactive: true, transient: true }, fileMarketRows))));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "value": ["watchValueHandler"],
        "disabled": ["watchDisabledHandler"]
    }; }
};
MarketFileUpload.style = MarketFileUploadStyle0;

exports.market_file_upload = MarketFileUpload;

//# sourceMappingURL=market-file-upload.cjs.entry.js.map