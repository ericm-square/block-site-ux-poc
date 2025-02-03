import { html } from "lit";
export const MarketInlineSectionHeaderHeading30Template = () => html `
  <market-inline-section-header>
    <h2>Inline section header</h2>
  </market-inline-section-header>
`;
export const MarketInlineSectionHeaderHeading20Template = () => html `
  <market-inline-section-header>
    <h3>Inline section header</h3>
  </market-inline-section-header>
`;
export const MarketInlineSectionHeaderHeading10Template = () => html `
  <market-inline-section-header>
    <h4>Inline section header</h4>
  </market-inline-section-header>
`;
export const MarketInlineSectionHeaderLinkTemplate = () => html `
  <market-inline-section-header>
    <h2>Inline section header</h2>
    <market-link slot="trailing-accessory">Header link</market-link>
  </market-inline-section-header>
`;
export const MarketInlineSectionHeaderButtonDropdownTemplate = () => html `
  <market-inline-section-header>
    <h2>Inline section header</h2>
    <market-button-dropdown slot="trailing-accessory">
      <market-button slot="trigger">Trigger</market-button>
      <market-list transient slot="content">
        <market-row>Apple</market-row>
        <market-row>Orange</market-row>
        <market-row>Banana</market-row>
      </market-list>
    </market-button-dropdown>
  </market-inline-section-header>
`;
//# sourceMappingURL=market-inline-section-header.templates.js.map
