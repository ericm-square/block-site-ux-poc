import { html } from "lit";
import { waitForMarketHydration } from "../../../utils/wait-for-market-hydration";
import { ALL_TOAST_VARIANTS, MarketToastVariantsTemplate } from "../../market-toast/storybook/market-toast.templates";
export default {
    title: 'Components/Toast & Toaster/Toaster/API',
    component: 'market-toaster',
    tags: ['autodocs', '!dev'],
};
export const API = {
    render: () => html `
    <market-toaster></market-toaster>

    <div id="demo-buttons" style="display: flex; gap: var(--core-metrics-spacing-300);">
      ${ALL_TOAST_VARIANTS.map((variant) => html ` <market-button data-toast="${variant}">
            ${variant.charAt(0).toUpperCase() + variant.slice(1)} toast
          </market-button>`)}
      <market-button variant="destructive">Remove all toasts</market-button>
    </div>

    <div id="demo-toast-templates" style="display: none;">${MarketToastVariantsTemplate()}</div>
  `,
    decorators: [
        (Story) => html `<div style="min-height: 480px">${Story()}</div>`,
        (Story, { canvasElement }) => {
            (async () => {
                await waitForMarketHydration(canvasElement);
                const toaster = canvasElement.querySelector('market-toaster');
                const buttons = canvasElement.querySelectorAll('market-button');
                buttons.forEach((button) => {
                    button.addEventListener('click', () => {
                        const variant = button.dataset.toast || 'destructive';
                        if (variant === 'destructive') {
                            toaster.removeAll();
                            return;
                        }
                        const toastTemplate = canvasElement.querySelector(`#demo-toast-templates market-toast[variant=${variant}]`);
                        toaster.show(toastTemplate.cloneNode(true));
                    });
                });
            })();
            return Story();
        },
    ],
};
//# sourceMappingURL=market-toaster.stories.js.map
