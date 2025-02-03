import { html } from "lit";
export default {
    title: 'Components/Footer/API',
    component: 'market-footer',
    tags: ['autodocs', '!dev'],
};
export const API = {
    render: () => html `
    <market-footer>
      <market-button rank="secondary">Secondary</market-button>
      <market-button rank="primary">Primary</market-button>
    </market-footer>
  `,
};
//# sourceMappingURL=market-footer.stories.js.map
