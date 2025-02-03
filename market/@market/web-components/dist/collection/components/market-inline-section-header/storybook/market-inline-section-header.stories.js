import { MarketInlineSectionHeaderHeading30Template, MarketInlineSectionHeaderHeading20Template, MarketInlineSectionHeaderHeading10Template, MarketInlineSectionHeaderLinkTemplate, MarketInlineSectionHeaderButtonDropdownTemplate, } from "./market-inline-section-header.templates";
export default {
    title: 'Components/Inline Section Header/API',
    component: 'market-inline-section-header',
    tags: ['autodocs', '!dev'],
};
export const API = {
    render: () => MarketInlineSectionHeaderHeading30Template(),
};
export const Heading30 = {
    render: () => MarketInlineSectionHeaderHeading30Template(),
};
export const Heading20 = {
    render: () => MarketInlineSectionHeaderHeading20Template(),
};
export const Heading10 = {
    render: () => MarketInlineSectionHeaderHeading10Template(),
};
export const WithLink = {
    render: () => MarketInlineSectionHeaderLinkTemplate(),
};
export const WithButtonDropdown = {
    render: () => MarketInlineSectionHeaderButtonDropdownTemplate(),
};
//# sourceMappingURL=market-inline-section-header.stories.js.map
