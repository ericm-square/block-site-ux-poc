import { newSpecPage } from "@stencil/core/testing";
jest.mock('uuid', () => ({ v4: () => 'image-icon-id' }));
// uuid mock has to come before the component import
// eslint-disable-next-line import/first
import { MarketBanner } from "../market-banner";
describe('market-banner', () => {
    it('default renders', async () => {
        const page = await newSpecPage({
            components: [MarketBanner],
            html: '<market-banner>A brief message.</market-banner>',
        });
        expect(page.root).toEqualHtml(`
      <market-banner aria-label="Announcement" class="market-banner" dismiss-button-aria-label="Dismiss" role="region" variant="info">
        <mock:shadow-root>
          <span class="icon-container">
            <slot name="icon">
              <market-accessory>
                <svg role="img" aria-labelledby="image-icon-id" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title id="image-icon-id">Info</title>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19ZM11 10.5V17H13V10.5H11ZM13.25 8.25C13.25 8.94036 12.6904 9.5 12 9.5C11.3096 9.5 10.75 8.94036 10.75 8.25C10.75 7.55964 11.3096 7 12 7C12.6904 7 13.25 7.55964 13.25 8.25Z" />
                </svg>
              </market-accessory>
            </slot>
          </span>
          <div class="main">
            <section>
              <header class="title">
                <slot name="title"></slot>
              </header>
              <slot></slot>
            </section>
            <nav class="actions hidden">
              <slot name="action"></slot>
            </nav>
          </div>
        </mock:shadow-root>
        A brief message.
      </market-banner>
    `);
    });
    it('renders with a dismissable button', async () => {
        const page = await newSpecPage({
            components: [MarketBanner],
            html: '<market-banner class="market-banner" dismissable>A brief message.</market-banner>',
        });
        expect(page.root).toEqualHtml(`
      <market-banner aria-label="Announcement" class="market-banner" dismiss-button-aria-label="Dismiss" dismissable="" role="region" variant="info">
        <mock:shadow-root>
          <span class="icon-container">
            <slot name="icon">
              <market-accessory>
                <svg role="img" aria-labelledby="image-icon-id" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title id="image-icon-id">Info</title>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19ZM11 10.5V17H13V10.5H11ZM13.25 8.25C13.25 8.94036 12.6904 9.5 12 9.5C11.3096 9.5 10.75 8.94036 10.75 8.25C10.75 7.55964 11.3096 7 12 7C12.6904 7 13.25 7.55964 13.25 8.25Z" />
                </svg>
              </market-accessory>
            </slot>
          </span>
          <div class="main">
            <section>
              <header class="title">
                <slot name="title"></slot>
              </header>
              <slot></slot>
            </section>
            <nav class="actions hidden">
              <slot name="action"></slot>
            </nav>
          </div>
          <nav class="dismiss-container">
            <button aria-label="Dismiss" type="button">
              <svg role="presentation" aria-hidden="true" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.71004 18.71L12 13.41L17.29 18.71L18.71 17.29L13.41 12L18.71 6.71004L17.29 5.29004L12 10.59L6.71004 5.29004L5.29004 6.71004L10.59 12L5.29004 17.29L6.71004 18.71Z"></path>
              </svg>
            </button>
          </nav>
        </mock:shadow-root>
        A brief message.
      </market-banner>
    `);
    });
    it('does not hide the actions nav with slotted actions', async () => {
        const page = await newSpecPage({
            components: [MarketBanner],
            html: `
        <market-banner class="market-banner">
          A brief message.
          <button slot="action">A button</button>
          <a href="#" slot="action">A Link</a>
        </market-banner>
      `,
        });
        expect(page.root).toEqualHtml(`
      <market-banner aria-label="Announcement" class="market-banner" dismiss-button-aria-label="Dismiss" role="region" variant="info">
        <mock:shadow-root>
          <span class="icon-container">
            <slot name="icon">
              <market-accessory>
                <svg role="img" aria-labelledby="image-icon-id" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <title id="image-icon-id">Info</title>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19ZM11 10.5V17H13V10.5H11ZM13.25 8.25C13.25 8.94036 12.6904 9.5 12 9.5C11.3096 9.5 10.75 8.94036 10.75 8.25C10.75 7.55964 11.3096 7 12 7C12.6904 7 13.25 7.55964 13.25 8.25Z" />
                </svg>
              </market-accessory>
            </slot>
          </span>
          <div class="main">
            <section>
              <header class="title">
                <slot name="title"></slot>
              </header>
              <slot></slot>
            </section>
            <nav class="actions">
              <slot name="action"></slot>
            </nav>
          </div>
        </mock:shadow-root>
        A brief message.
        <button slot="action">A button</button>
        <a href="#" slot="action">A Link</a>
      </market-banner>
    `);
    });
});
//# sourceMappingURL=market-banner.spec.js.map
