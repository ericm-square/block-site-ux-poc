import { newE2EPage } from "@stencil/core/testing";
describe('market-blade', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent(`
        <market-blade>
        </market-blade>
      `);
        const element = await page.find('market-blade');
        expect(element).toHaveAttribute('hydrated');
    });
    describe('a11y', () => {
        it('allows aria-label to be set', async () => {
            const page = await newE2EPage();
            await page.setContent(`
      <market-blade aria-label="Test hidden label">
      </market-blade>
    `);
            const element = await page.find('market-blade');
            expect(element).toEqualAttribute('aria-label', 'Test hidden label');
        });
        it('allows aria-labelledby to be set', async () => {
            const page = await newE2EPage();
            await page.setContent(`
      <market-blade aria-labelledby="test-label">
        <market-header><h2 id="test-label">Test visible label</h2></market-header>
      </market-blade>
    `);
            const element = await page.find('market-blade');
            expect(element).toEqualAttribute('aria-labelledby', 'test-label');
        });
    });
    describe('when a header and main are present', () => {
        let page;
        let header;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`<market-blade style="height: 200px">
          <market-header show-navigation><h2>A heading</h2></market-header>
          <section class="main">
            <div style="height: 1000px"></div>
          </section>
         </market-blade>`);
            header = await page.find('market-header');
        });
        it('it toggles compact mode on the header when main section is scrolled', async () => {
            expect(header).not.toHaveAttribute('compact');
            // scroll main section down 1px to trigger compact mode
            await page.$eval('section.main', (el) => el.scrollTo({ top: 1 }));
            await page.waitForChanges();
            expect(header).toHaveAttribute('compact');
            // scroll main section back to top to revert compact mode
            await page.$eval('section.main', (el) => el.scrollTo({ top: 0 }));
            await page.waitForChanges();
            expect(header).not.toHaveAttribute('compact');
        });
    });
    describe('when a header is already in compact mode', () => {
        let page;
        let header;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`<market-blade style="height: 200px">
          <market-header show-navigation compact><h2>A heading</h2></market-header>
          <section class="main">
            <div style="height: 1000px"></div>
          </section>
         </market-blade>`);
            header = await page.find('market-header');
        });
        it('it does not toggle compact mode on the header when main section is scrolled', async () => {
            expect(header).toHaveAttribute('compact');
            // scroll main section down 1px should not affect compact mode
            await page.$eval('section.main', (el) => el.scrollTo({ top: 1 }));
            await page.waitForChanges();
            expect(header).toHaveAttribute('compact');
            // scroll main section back to top should not affect compact mode
            await page.$eval('section.main', (el) => el.scrollTo({ top: 0 }));
            await page.waitForChanges();
            expect(header).toHaveAttribute('compact');
        });
    });
    // became flaky with puppeteer v21
    describe.skip('focus trap', () => {
        it('does not trap focus with trap-focus prop disabled', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-blade>
          <market-header show-navigation>
            <market-button
              data-test-id="blade-button-1"
              slot="actions"
            >
              Button
            </market-button>
            <market-button
              data-test-id="blade-button-2"
              slot="actions"
            >
              Button
            </market-button>
          </market-header>
        </market-blade>
        <market-button data-test-id="outside-button">Focusable</market-button>
      `);
            const blade = await page.find('market-blade');
            const header = await blade.find('pierce/market-header');
            const closeButton = await header.find('pierce/market-button[slot="navigation"]');
            const bladeButton1 = await header.find('pierce/market-button[data-test-id="blade-button-1"]');
            const bladeButton2 = await header.find('pierce/market-button[data-test-id="blade-button-2"]');
            const outsideButton = await page.find('market-button[data-test-id="outside-button"]');
            await blade.click();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(closeButton).toHaveAttribute('focused');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(bladeButton1).toHaveAttribute('focused');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(bladeButton2).toHaveAttribute('focused');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(outsideButton).toHaveAttribute('focused');
        });
        it('traps focus within the blade', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-button>Unfocusable</market-button>
        <market-blade trap-focus>
          <market-header show-navigation>
            <market-button
              data-test-id="secondary-button"
              slot="actions"
            >
              Secondary
            </market-button>
            <market-button
              data-test-id="primary-button"
              slot="actions"
            >
              Primary
            </market-button>
          </market-header>
          <section class="main">
            <form>
              <market-field>
                <market-input-text data-test-id="first-name-input">
                  <label>First name</label>
                </market-input-text>
              </market-field>
              <market-field>
                <market-input-text data-test-id="last-name-input">
                  <label>Last name</label>
                </market-input-text>
              </market-field>
            </form>
          </section>
        </market-blade>
        <market-button>Unfocusable</market-button>
      `);
            const blade = await page.find('market-blade');
            const header = await page.find('market-header');
            const closeButton = await header.find('pierce/market-button[slot="navigation"]');
            const secondaryButton = await header.find('market-button[data-test-id="secondary-button"]');
            const primaryButton = await header.find('market-button[data-test-id="primary-button"]');
            const firstNameInput = await blade.find('market-input-text[data-test-id="first-name-input"]');
            const lastNameInput = await blade.find('market-input-text[data-test-id="last-name-input"]');
            // Tab navigation across all tabbable elements...
            await blade.focus();
            await page.waitForChanges();
            expect(closeButton).toHaveAttribute('focused');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(secondaryButton).toHaveAttribute('focused');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(primaryButton).toHaveAttribute('focused');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(firstNameInput).toHaveAttribute('focused');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(lastNameInput).toHaveAttribute('focused');
            // ...and back to the first tabbable element
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(closeButton).toHaveAttribute('focused');
        });
    });
});
//# sourceMappingURL=market-blade.e2e.js.map
