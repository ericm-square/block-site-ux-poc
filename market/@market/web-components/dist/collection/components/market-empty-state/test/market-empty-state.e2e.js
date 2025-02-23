import { newE2EPage } from "@stencil/core/testing";
describe('market-empty-state', () => {
    it('renders with media, text, and buttons', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-empty-state>
        <div class="custom">Default slot</div>
        <svg slot="media" class="svg" fill="#000000" height="60" viewBox="0 0 24 24" width="60" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.9918 3H6.00825C5.61324 2.9999 5.22207 3.07762 4.8571 3.22872C4.49213 3.37981 4.16049 3.60133 3.88114 3.88061C3.60179 4.1599 3.38019 4.49147 3.229 4.85641C3.07782 5.22135 3 5.61249 3 6.0075V17.991C3 18.7889 3.31692 19.5541 3.88105 20.1184C4.44519 20.6827 5.21034 20.9998 6.00825 21H17.9918C18.7897 20.9998 19.5548 20.6827 20.119 20.1184C20.6831 19.5541 21 18.7889 21 17.991V6.0075C21 5.61249 20.9222 5.22135 20.771 4.85641C20.6198 4.49147 20.3982 4.1599 20.1189 3.88061C19.8395 3.60133 19.5079 3.37981 19.1429 3.22872C18.7779 3.07762 18.3868 2.9999 17.9918 3ZM17.727 16.7783C17.727 17.0299 17.6271 17.2713 17.4492 17.4494C17.2713 17.6274 17.0299 17.7276 16.7782 17.7278H7.22325C7.0986 17.7278 6.97516 17.7032 6.86001 17.6555C6.74485 17.6077 6.64023 17.5378 6.55212 17.4496C6.46401 17.3614 6.39414 17.2567 6.3465 17.1416C6.29887 17.0264 6.2744 16.9029 6.2745 16.7783V7.2225C6.2744 7.09785 6.29887 6.97439 6.3465 6.8592C6.39414 6.74401 6.46401 6.63933 6.55212 6.55115C6.64023 6.46297 6.74485 6.39302 6.86001 6.34529C6.97516 6.29757 7.0986 6.273 7.22325 6.273H16.7782C17.0299 6.2732 17.2713 6.37332 17.4492 6.55137C17.6271 6.72941 17.727 6.97081 17.727 7.2225V16.7783Z"
          />
          <path
            d="M10.0875 14.442C10.0158 14.442 9.94482 14.4278 9.87861 14.4003C9.8124 14.3728 9.75227 14.3325 9.70168 14.2817C9.65109 14.2309 9.61103 14.1706 9.5838 14.1043C9.55657 14.038 9.5427 13.9669 9.543 13.8953V10.0808C9.5426 10.009 9.55639 9.93787 9.58358 9.87146C9.61077 9.80505 9.65081 9.74467 9.70141 9.69379C9.75202 9.64291 9.81218 9.60253 9.87843 9.57498C9.94469 9.54743 10.0157 9.53325 10.0875 9.53325H13.9125C13.9842 9.53335 14.0552 9.5476 14.1214 9.57518C14.1877 9.60277 14.2478 9.64315 14.2984 9.69401C14.3489 9.74487 14.389 9.80521 14.4162 9.87158C14.4434 9.93794 14.4573 10.009 14.457 10.0808V13.8953C14.4572 13.9669 14.4433 14.0379 14.416 14.1042C14.3887 14.1705 14.3487 14.2307 14.2981 14.2815C14.2475 14.3323 14.1874 14.3726 14.1213 14.4001C14.0551 14.4277 13.9842 14.4419 13.9125 14.442H10.0875Z"
          />
        </svg>
        <h3 slot="primary-text">Primary text</h3>
        <p slot="secondary-text">Secondary text</p>
        <market-button rank="secondary" slot="actions">Primary</market-button>
        <market-button rank="primary" slot="actions">Secondary</market-button>
      </market-empty-state>
    `);
        const el = await page.find('market-empty-state');
        const customEl = await el.find('pierce/.custom');
        const svgEl = await el.find('pierce/.svg');
        const headingEl = await el.find('pierce/h3');
        const paragraphEl = await el.find('pierce/p');
        const primaryButtonEl = await el.find('pierce/.market-button[rank="primary"]');
        const secondaryButtonEl = await el.find('pierce/.market-button[rank="secondary"]');
        expect(el).not.toBeNull();
        expect(el).toHaveAttribute('hydrated');
        expect(await customEl.isVisible()).toStrictEqual(true);
        expect(customEl.textContent).toBe('Default slot');
        expect(await svgEl.isVisible()).toStrictEqual(true);
        expect(await headingEl.isVisible()).toStrictEqual(true);
        expect(headingEl.textContent).toBe('Primary text');
        expect(await paragraphEl.isVisible()).toStrictEqual(true);
        expect(paragraphEl.textContent).toBe('Secondary text');
        expect(await primaryButtonEl.isVisible()).toStrictEqual(true);
        expect(await secondaryButtonEl.isVisible()).toStrictEqual(true);
    });
});
//# sourceMappingURL=market-empty-state.e2e.js.map
