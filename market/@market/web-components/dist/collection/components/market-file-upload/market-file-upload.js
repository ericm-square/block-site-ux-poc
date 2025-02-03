import { Host, h } from "@stencil/core";
import { getReadableFilesize } from "../../utils/filesize";
import { getNamespacedTagFor } from "../../utils/namespace";
/**
 * @slot - Used for drop zone content. Intended for an icon (optional), main text, and secondary text (optional).
 * @slot compact-action - Used for "compact" mode content. Intended for use with a `market-button` or `market-link`. When this
 * slot is used, default slot content must also be provided. Visible when `compact` is true.
 * @slot bottom-accessory - DEPRECATED: Used for the bottom accessory text. We recommend using the default slot
 * to add secondary text to the drop zone content instead.
 * @slot error - DEPRECATED: Used for input-level error text. We recommend using the fileMetadata prop to set error
 * status and messages on the file level instead.
 */
export class MarketFileUpload {
    constructor() {
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
            getNamespacedTagFor('market-button'),
            getNamespacedTagFor('market-link'),
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
        const MarketRowTagName = getNamespacedTagFor('market-row');
        const MarketAccessoryTagName = getNamespacedTagFor('market-accessory');
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        return this.files.map((file, index) => {
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
                default:
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
                default:
                    break;
            }
            // row config custom icon overrides previously set leading icon
            leadingIcon = (rowConfig === null || rowConfig === void 0 ? void 0 : rowConfig.leadingIconName) || leadingIcon;
            return (h(MarketRowTagName, { disabled: this.disabled, interactive: true, transient: true, "data-index": index, "data-status": rowConfig === null || rowConfig === void 0 ? void 0 : rowConfig.status }, h("label", { slot: "label" }, file.name), secondaryText && h("p", { slot: "subtext" }, secondaryText), h(MarketAccessoryTagName, { slot: "leading-accessory", size: "image" }, h(MarketIconTagName, { name: leadingIcon, fidelity: 24 })), h(MarketAccessoryTagName, { slot: "trailing-accessory", size: "icon", tabindex: this.disabled ? -1 : 0, role: "button", "aria-label": this.deleteButtonAriaLabel, onKeyDown: (e) => this.handleDeleteKeydown(e, index), onClick: () => this.removeFile(index) }, h(MarketIconTagName, { name: trailingIcon, fidelity: 24 }))));
        });
    }
    render() {
        const MarketListTagName = getNamespacedTagFor('market-list');
        const MarketAccessoryTagName = getNamespacedTagFor('market-accessory');
        const MarketIconTagName = getNamespacedTagFor('market-icon');
        const MarketFieldTagName = getNamespacedTagFor('market-field');
        const MarketButtonTagName = getNamespacedTagFor('market-button');
        const fileMarketRows = this.renderFilesAsMarketRows();
        const showUploadLabel = this.multiple || fileMarketRows.length === 0;
        const showList = this.multiple && fileMarketRows.length > 0;
        return (h(Host, { key: 'a6387bad3723b23579e4803bc809802dc05bbe80', class: "market-file-upload", ondragenter: (e) => this.draggingOver(e), ondragover: (e) => this.draggingOver(e), ondragleave: (e) => this.endDrag(e), ondrop: (e) => this.endDrag(e) }, h(MarketFieldTagName, { key: '9ddf6b3ef0cc37b4fe171ffde6b1db2dc25a5880', disabled: this.disabled, invalid: this.invalid }, h("div", { key: '5db42c4af01b94ee691e4bfc8c3695f4ff5cfde1', class: `label-container ${this.labelContainerClassNames()}` }, !showUploadLabel && fileMarketRows[0], showUploadLabel && (
        // the input is correctly wrapped inside its label, but eslint gets confused by label > span > slot > text
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        h("label", { key: '6a0554081de2392295a706c220aec4ff890c6581' }, h("slot", { key: 'f8dda6a2fc67c2d25b61ceca30eee030cbdace99' }, h(MarketAccessoryTagName, { key: '01fa720e37c0e4e9a9d3c131c9724ebb0c67db66', size: "image" }, h(MarketIconTagName, { key: '3c00d32e418d48998a82b6659b0e712f02435e27', name: "file", fidelity: 24 })), h("span", { key: 'fd67c239b8a5f91429b36053ece843bfff65c998' }, h("button", { key: '85d595f5a16f5f59e879dadc361e7426d4160fc2', onClick: () => this.handleButtonClick() }, "Choose a file"), " or drag and drop it here")), h("slot", { key: 'c415fc3cc17a5387d4ec8b4353603ae2eb877221', name: "compact-action", onSlotchange: () => this.handleCompactSlotChange() }, h(MarketButtonTagName, { key: '98b94fc6b3a7438d88da13a2cc8cd073d33359c4', rank: "primary", disabled: this.disabled, onClick: () => this.handleButtonClick() }, "Upload file")), h("input", { key: '48c717f8ae9f8846fadf12ff4e0ee7522ba27e90', ref: (el) => (this.fileInputElement = el), onChange: (e) => this.onInputChange(e), type: "file", name: "files[]", multiple: this.multiple, accept: this.accept, hidden: true })))), h("slot", { key: 'e9d47e3973faf4525b19cbfcdd3d75ada36d4fc3', name: "bottom-accessory" }, h("small", { key: '832c55e6dcc9502fb1684455726b9b38040c8311', slot: "bottom-accessory" })), h("slot", { key: 'a11420e7a810512140165124aa659f8e952de3e9', name: "error" }, h("small", { key: '3ac344c99721274c2493afeec18f42c224375a28', slot: "error" }))), showList && (h(MarketListTagName, { key: '542ed5f8cabf72bcf2a61db1875d3b26c9b6373a', interactive: true, transient: true }, fileMarketRows))));
    }
    static get is() { return "market-file-upload"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["market-file-upload.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["market-file-upload.css"]
        };
    }
    static get properties() {
        return {
            "accept": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "String that is a list of file types the uploader should accept. This is\npassed to the internal `<input type=\"file\"/>` tag. For more info, see the\n[MDN docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)."
                },
                "attribute": "accept",
                "reflect": false,
                "defaultValue": "''"
            },
            "value": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Array<File>",
                    "resolved": "File[]",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        },
                        "File": {
                            "location": "global",
                            "id": "global::File"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "An array of File objects that can be passed in. (If using vanilla JS, this must be set using JS and not in the HTML markup.)"
                },
                "defaultValue": "[]"
            },
            "disabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Functionally and visually disables the file picker."
                },
                "attribute": "disabled",
                "reflect": true,
                "defaultValue": "false"
            },
            "invalid": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "DEPRECATED: Represents whether the input is invalid or not. This represents input-level error states.\nWe recommend using the fileMetadata prop to set error status and messages on the file level instead."
                },
                "attribute": "invalid",
                "reflect": true,
                "defaultValue": "false"
            },
            "multiple": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Represents whether the selector allows multiple files\nto be selected."
                },
                "attribute": "multiple",
                "reflect": true,
                "defaultValue": "false"
            },
            "compact": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Used to toggle \"compact mode\" (for use on mobile devices and when space is limited)"
                },
                "attribute": "compact",
                "reflect": true,
                "defaultValue": "false"
            },
            "fileSubtext": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'size' | 'type'",
                    "resolved": "\"size\" | \"type\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "What type of secondary information, if any, to display on all file rows"
                },
                "attribute": "file-subtext",
                "reflect": false
            },
            "fileMetadata": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "Array<TMarketFileUploadFileConfig>",
                    "resolved": "TMarketFileUploadFileConfig[]",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        },
                        "TMarketFileUploadFileConfig": {
                            "location": "import",
                            "path": "./types",
                            "id": "src/components/market-file-upload/types.ts::TMarketFileUploadFileConfig"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "What type of custom information, if any, to display on specified file rows.\nExpects an array of TMarketFileUploadFileConfig objects (must be set using JS and not in the HTML markup), which\nmust include `filename` and can include an optional `status`, `message`, or `leadingIconName`.\nNote that `message` is only shown when `status` is `'error'`, and `leadingIconName` expects the semantic or\ndescriptive name of an existing `market-icon`."
                }
            },
            "deleteButtonAriaLabel": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Optional property passed to the delete icons on selected file\nrows that will function as its aria-label. Defaults to \"Delete\"."
                },
                "attribute": "delete-button-aria-label",
                "reflect": true,
                "defaultValue": "'Delete'"
            }
        };
    }
    static get states() {
        return {
            "isDraggingOver": {},
            "files": {}
        };
    }
    static get events() {
        return [{
                "method": "marketFileUploadValueChange",
                "name": "marketFileUploadValueChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Triggered when the selected files array changes."
                },
                "complexType": {
                    "original": "{ value: Array<File> }",
                    "resolved": "{ value: File[]; }",
                    "references": {
                        "Array": {
                            "location": "global",
                            "id": "global::Array"
                        },
                        "File": {
                            "location": "global",
                            "id": "global::File"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "value",
                "methodName": "watchValueHandler"
            }, {
                "propName": "disabled",
                "methodName": "watchDisabledHandler"
            }];
    }
}
//# sourceMappingURL=market-file-upload.js.map
