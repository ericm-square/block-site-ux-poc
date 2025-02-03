import { html } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
export const demoFiles = [
    new File(['mock data'], 'test-image.jpg', { type: 'image/jpg' }),
    new File(['mock data'], 'test-file.md', { type: 'text/markdown' }),
    new File(['mock data'], 'test-image.png', { type: 'image/png' }),
    new File(['mock data'], 'test-file.txt', { type: 'text/plain' }),
    new File(['mock data'], 'test-image.gif', { type: 'image/gif' }),
    new File(['mock data'], 'test-spreadsheet.csv', { type: 'text/csv' }),
];
export const MarketFileUploadTemplate = ({ 
// props
accept, 
// value - must be set using JS
disabled, invalid, multiple, compact, fileSubtext, 
// fileMetadata - must be set using JS
deleteButtonAriaLabel, }) => html `
  <market-file-upload
    accept=${ifDefined(accept)}
    ?disabled=${disabled}
    ?invalid=${invalid}
    ?multiple=${multiple}
    ?compact=${compact}
    file-subtext=${ifDefined(fileSubtext)}
    delete-button-aria-label=${ifDefined(deleteButtonAriaLabel)}
  ></market-file-upload>
`;
//# sourceMappingURL=market-file-upload.templates.js.map
