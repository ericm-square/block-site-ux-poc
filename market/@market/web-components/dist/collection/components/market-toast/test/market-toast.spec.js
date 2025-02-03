import { newSpecPage } from "@stencil/core/testing";
import { MarketToast } from "../market-toast";
describe('market-toast', () => {
    it('default renders', async () => {
        const page = await newSpecPage({
            components: [MarketToast],
            html: '<market-toast>A brief message.</market-toast>',
        });
        expect(page.root).toEqualHtml(`
      <market-toast class="market-toast" dismiss-button-aria-label="Dismiss" progress="-1" role="alert" variant="info">
        <mock:shadow-root>
          <div class="content">
            <span class="icon-container">
              <market-icon name="info"></market-icon>
            </span>
            <div class="main">
              <section>
                <slot></slot>
              </section>
              <nav aria-label="toast-actions" class="hidden">
                <slot name="action"></slot>
              </nav>
            </div>
            <nav aria-label="dismiss-container" class="dismiss-container">
              <button aria-label="Dismiss" type="button">
                <market-icon name="close"></market-icon>
              </button>
            </nav>
          </div>
        </mock:shadow-root>
        A brief message.
      </market-toast>
    `);
    });
    it('does not hide the actions nav with slotted actions', async () => {
        const page = await newSpecPage({
            components: [MarketToast],
            html: `
        <market-toast class="market-toast">
          A brief message.
          <button slot="action">A button</button>
          <a href="#" slot="action">A Link</a>
        </market-toast>
      `,
        });
        expect(page.root).toEqualHtml(`
      <market-toast class="market-toast" dismiss-button-aria-label="Dismiss" progress="-1" role="alert" variant="info">
        <mock:shadow-root>
          <div class="content">
            <span class="icon-container">
              <market-icon name="info"></market-icon>
            </span>
            <div class="main">
              <section>
                <slot></slot>
              </section>
              <nav aria-label="toast-actions">
                <slot name="action"></slot>
              </nav>
            </div>
            <nav aria-label="dismiss-container" class="dismiss-container">
              <button aria-label="Dismiss" type="button">
                <market-icon name="close"></market-icon>
              </button>
            </nav>
          </div>
        </mock:shadow-root>
        A brief message.
        <button slot="action">A button</button>
        <a href="#" slot="action">A Link</a>
      </market-toast>
    `);
    });
    describe('autodismissal', () => {
        beforeEach(() => {
            jest.useFakeTimers('legacy');
        });
        afterEach(() => {
            jest.useRealTimers();
        });
        it('emits the autodismiss event', async () => {
            const page = await newSpecPage({
                components: [MarketToast],
                html: '<market-toast/>',
            });
            const autodismissSpy = jest.fn();
            page.doc.addEventListener('marketToastAutoDismissed', autodismissSpy);
            await page.root.startAutoDismissTimer();
            expect(autodismissSpy).not.toHaveBeenCalled();
            jest.runAllTimers();
            expect(autodismissSpy).toHaveBeenCalled();
        });
        it('does not emit the autodismiss event when persistent', async () => {
            const page = await newSpecPage({
                components: [MarketToast],
                html: '<market-toast persistent/>',
            });
            const autodismissSpy = jest.fn();
            page.doc.addEventListener('marketToastAutoDismissed', autodismissSpy);
            await page.root.startAutoDismissTimer();
            expect(autodismissSpy).not.toHaveBeenCalled();
            jest.runAllTimers();
            expect(autodismissSpy).not.toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=market-toast.spec.js.map
