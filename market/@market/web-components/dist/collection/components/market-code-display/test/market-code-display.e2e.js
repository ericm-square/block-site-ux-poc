import { newE2EPage } from "@stencil/core/testing";
describe('market-code-display', () => {
    it('renders with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-code-display>
        <span slot="code">1234</span>
      </market-code-display>
    `);
        const el = await page.find('market-code-display');
        expect(el).not.toBeNull();
        expect(await el.getProperty('disabled')).toBe(false);
        expect(await el.getProperty('focused')).toBe(false);
        expect(await el.find('pierce/.code-container')).not.toBeNull();
        expect(await page.findAll('pierce/.code-char')).toHaveLength(6);
        expect(await el.find('pierce/button')).not.toBeNull();
        expect(await page.findAll('[slot="actions"]')).toHaveLength(1);
    });
    it('strips whitespace from inputted codes', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-code-display>
        <span slot="code">4    3 12   </span>
      </market-code-display>
    `);
        const el = await page.find('market-code-display');
        expect(el).not.toBeNull();
        expect(await page.findAll('pierce/.code-char')).toHaveLength(6);
    });
    describe('codes of different lengths', () => {
        let page;
        beforeEach(async () => {
            page = await newE2EPage();
        });
        it('puts a code of 6 characters into 6 groups of 1', async () => {
            await page.setContent(`
        <market-code-display>
          <span slot="code">6CHARS</span>
        </market-code-display>
      `);
            const el = await page.find('market-code-display');
            expect(el).not.toBeNull();
            expect(await el.find('pierce/.code-container')).not.toBeNull();
            // 6 characters + 2 blanks total (front & back)
            expect(await page.findAll('pierce/.code-char')).toHaveLength(8);
        });
        it('puts a code of 12 characters into 3 groups of 4', async () => {
            await page.setContent(`
        <market-code-display>
          <span slot="code">THISHAS12CHS</span>
        </market-code-display>
      `);
            const el = await page.find('market-code-display');
            expect(el).not.toBeNull();
            expect(await el.find('pierce/.code-container')).not.toBeNull();
            // 12 characters + 4 blanks total (every 4 chars)
            expect(await page.findAll('pierce/.code-char')).toHaveLength(16);
        });
        it('puts a code of 16 characters into 4 groups of 4', async () => {
            await page.setContent(`
        <market-code-display>
          <span slot="code">16ISALOTTACHARAS</span>
        </market-code-display>
      `);
            const el = await page.find('market-code-display');
            expect(el).not.toBeNull();
            expect(await el.find('pierce/.code-container')).not.toBeNull();
            // 16 characters + 5 blanks total (every 4 chars)
            expect(await page.findAll('pierce/.code-char')).toHaveLength(21);
        });
    });
    describe('accepts additional slotted actions', () => {
        let page;
        beforeEach(async () => {
            page = await newE2EPage();
        });
        it('accepts a slotted button', async () => {
            await page.setContent(`
        <market-code-display>
          <span slot="code">A12B</span>
          <button slot="actions">Test</button>
        </market-code-display>
      `);
            const el = await page.find('market-code-display');
            expect(el).not.toBeNull();
            expect(await el.find('pierce/button')).not.toBeNull();
            expect(await page.findAll('[slot="actions"]')).toHaveLength(2);
        });
        it('accepts a slotted link', async () => {
            await page.setContent(`
        <market-code-display>
          <span slot="code">HELLOO</span>
          <a slot="actions">TestLink</a>
        </market-code-display>
      `);
            const el = await page.find('market-code-display');
            expect(el).not.toBeNull();
            expect(await el.find('pierce/button')).not.toBeNull();
            expect(await page.findAll('[slot="actions"]')).toHaveLength(2);
        });
    });
    it('allows user to insert alternative text for the Copy button', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-code-display>
        <span slot="code">1234</span>
        <span slot="copy-text">Copiar</span>
      </market-code-display>
    `);
        const el = await page.find('market-code-display');
        expect(el).not.toBeNull();
        const copyButton = await el.find('[slot="copy-text"]');
        expect(copyButton.textContent).toBe('Copiar');
    });
    describe('accessibility', () => {
        let page;
        let el;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-code-display>
          <span slot="code">1234</span>
        </market-code-display>
      `);
            el = await page.find('market-code-display');
        });
        it('can be tabbed into', async () => {
            await el.focus();
            expect(await page.find(':focus')).toEqual(el);
        });
        it('can be tabbed out of', async () => {
            // Focus on overall component
            await el.focus();
            expect(await page.find(':focus')).toEqual(el);
            // Move focus outside of the component
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(el);
        });
        it('cannot be tabbed into when disabled', async () => {
            el.setProperty('disabled', true);
            await el.focus();
            await page.keyboard.press('Tab');
            await page.waitForChanges();
            expect(await page.find(':focus')).not.toEqual(el);
        });
    });
    describe('when the Copy button is clicked', () => {
        let page;
        let el;
        let copyButton;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-code-display>
          <span slot="code">1234</span>
        </market-code-display>
      `);
            // Allow test DOM to access clipboard
            const context = await page.browserContext();
            await context.clearPermissionOverrides();
            await context.overridePermissions(page.url(), ['clipboard-read', 'clipboard-sanitized-write']);
            el = await page.find('market-code-display');
            copyButton = await el.find('pierce/button');
        });
        it('emits a marketCodeCopied event', async () => {
            const eventSpy = await el.spyOnEvent('marketCodeCopied');
            await copyButton.click();
            await page.waitForChanges();
            expect(eventSpy).toHaveReceivedEventTimes(1);
        });
        it('copies code to clipboard', async () => {
            await copyButton.click();
            expect(await page.evaluate(() => navigator.clipboard.readText())).toEqual('1234');
        });
    });
});
//# sourceMappingURL=market-code-display.e2e.js.map
