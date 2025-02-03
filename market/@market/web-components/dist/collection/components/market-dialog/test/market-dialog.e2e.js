import { newE2EPage } from "@stencil/core/testing";
describe('market-dialog', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-dialog></market-dialog>');
        const element = await page.find('market-dialog');
        expect(element).toHaveAttribute('hydrated');
        expect(element).not.toHaveAttribute('is-loading');
    });
    describe('a11y', () => {
        it('allows aria-label to be set', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-dialog aria-label="Test hidden label">
        </market-dialog>
      `);
            const element = await page.find('market-dialog');
            expect(element).toEqualAttribute('aria-label', 'Test hidden label');
        });
        it('allows aria-labelledby to be set', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-dialog aria-labelledby="test-label">
          <section class="main"><h2 id="test-label">Test visible label</h2></section>
        </market-dialog>
      `);
            const element = await page.find('market-dialog');
            expect(element).toEqualAttribute('aria-labelledby', 'test-label');
        });
    });
    describe('accessibility', () => {
        it('does not trap focus with trap-focus prop disabled', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-dialog>
          <market-footer>
            <market-button-group>
              <market-button data-test-id="agree">Agree</market-button>
              <market-button data-test-id="disagree">Disagree</market-button>
            </market-button-group>
          </market-footer>
        </market-dialog>
        <market-button data-test-id="outside-button">Focusable</market-button>
      `);
            const dialog = await page.find('market-dialog');
            const agreeButton = await dialog.find('market-button[data-test-id="agree"]');
            const disagreeButton = await dialog.find('market-button[data-test-id="disagree"]');
            const outsideButton = await page.find('market-button[data-test-id="outside-button"]');
            await page.click('body');
            await page.waitForChanges();
            expect(agreeButton).toHaveAttribute('focused');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(disagreeButton).toHaveAttribute('focused');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(outsideButton).toHaveAttribute('focused');
        });
        it('traps focus within the dialog', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-button>Unfocusable</market-button>
        <market-dialog trap-focus>
          <market-footer>
            <market-button-group>
              <market-button data-test-id="agree">Agree</market-button>
              <market-button data-test-id="disagree">Disagree</market-button>
            </market-button-group>
          </market-footer>
        </market-dialog>
        <market-button>Unfocusable</market-button>
      `);
            await page.waitForChanges();
            const dialog = await page.find('market-dialog');
            const agreeButton = await dialog.find('market-button[data-test-id="agree"]');
            const disagreeButton = await dialog.find('market-button[data-test-id="disagree"]');
            // Tab navigation across all tabbable elements...
            await dialog.focus();
            await page.waitForChanges();
            expect(agreeButton).toHaveAttribute('focused');
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(disagreeButton).toHaveAttribute('focused');
            // ...and back to the first tabbable element
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(agreeButton).toHaveAttribute('focused');
        });
    });
});
//# sourceMappingURL=market-dialog.e2e.js.map
