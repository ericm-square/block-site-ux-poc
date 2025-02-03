import { html } from "lit";
export const MarketCodeDisplayTemplate = ({ 
// demo
button, code, copyText, link, 
// props
disabled, focused, }) => html `
  <market-code-display ?disabled=${disabled} ?focused=${focused}>
    <p slot="code">${code}</p>
    ${copyText && html `<span slot="copy-text">${copyText}</span>`}
    ${button && html `<button slot="actions">Button</button>`}
    ${link && html ` <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" slot="actions">Link</a> `}
  </market-code-display>
`;
//# sourceMappingURL=market-code-display.templates.js.map
