import { newE2EPage } from "@stencil/core/testing";
describe('market-link', () => {
    describe('when used with an href (internal <a> tag)', () => {
        it('should render with defaults', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-link href="#"></market-link>');
            const el = await page.find('market-link');
            const link = await el.find('pierce/a');
            expect(el).not.toBeNull();
            expect(el).toHaveAttribute('href');
            expect(el).not.toHaveAttribute('target');
            expect(el).not.toHaveAttribute('rel');
            expect(el).not.toHaveAttribute('disabled');
            expect(el).not.toHaveAttribute('tabindex');
            expect(link).not.toBeNull();
            expect(link).toHaveAttribute('href');
            expect(link).not.toHaveAttribute('rel');
            expect(link).not.toHaveAttribute('target');
            expect(link).not.toHaveAttribute('aria-disabled');
        });
        it('should pass href down to the inner anchor tag', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-link href="https://www.squareup.com">');
            const el = await page.find('market-link');
            const link = await el.find('pierce/a');
            expect(el).toEqualAttribute('href', 'https://www.squareup.com');
            expect(link).toEqualAttribute('href', 'https://www.squareup.com');
        });
        it('should pass target down to the inner anchor tag', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-link href="#" target="_blank">');
            const el = await page.find('market-link');
            const link = await el.find('pierce/a');
            expect(link).toEqualAttribute('target', '_blank');
        });
        it('should pass rel down to the inner anchor tag', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-link href="#" rel="external">');
            const el = await page.find('market-link');
            const link = await el.find('pierce/a');
            expect(link).toEqualAttribute('rel', 'external');
        });
        it('should pass download down to the inner anchor tag', async () => {
            const fileName = 'my-file-name';
            const page = await newE2EPage();
            await page.setContent(`<market-link href="https://www.squareup.com" download="${fileName}"></market-link>`);
            const el = await page.find('market-link');
            const link = await el.find('pierce/a');
            expect(link).toEqualAttribute('download', fileName);
        });
        it('should set correct attributes when disabled', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-link href="#" disabled>');
            const el = await page.find('market-link');
            const link = await el.find('pierce/a');
            expect(el).toHaveAttribute('disabled');
            expect(el).not.toHaveAttribute('aria-disabled');
            expect(el).toHaveAttribute('disabled');
            expect(link).toEqualAttribute('aria-disabled', 'true');
            expect(link).toEqualAttribute('tabindex', '-1');
        });
        it('should not emit click events when disabled', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-link href="#" disabled>');
            const pageClickSpy = await page.spyOnEvent('click');
            // For some reason, `page.click('market-link')` doesn't work here,
            // so we're doing this instead, cool.
            await page.evaluate(() => {
                document.querySelector('market-link').click();
            });
            await page.waitForChanges();
            expect(pageClickSpy).not.toHaveReceivedEvent();
        });
        it('when used with an aria-label (internal <a> tag)', async () => {
            const page = await newE2EPage();
            await page.setContent(`<h2>Attributes</h2>
        <p>ipsum dolor sit amet, consectetur adipiscing elit</p>
        <market-link href="#" aria-label="Read more about Attributes">Read More</market-link>`);
            const el = await page.find('market-link');
            expect(el).not.toBeNull();
            expect(el).toEqualAttribute('aria-label', 'Read more about Attributes');
        });
    });
    describe('when used with no href (internal <button> tag)', () => {
        it('should render with defaults', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-link></market-link>');
            const el = await page.find('market-link');
            const button = await el.find('pierce/button');
            expect(el).not.toBeNull();
            expect(el).not.toHaveAttribute('href');
            expect(el).not.toHaveAttribute('target');
            expect(el).not.toHaveAttribute('disabled');
            expect(el).not.toHaveAttribute('aria-disabled');
            expect(el).not.toHaveAttribute('tabindex');
            expect(button).not.toBeNull();
            expect(button).not.toHaveAttribute('href');
            expect(button).not.toHaveAttribute('target');
            expect(button).not.toHaveAttribute('aria-disabled');
        });
        it('should set correct attributes when disabled', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-link disabled>');
            const el = await page.find('market-link');
            const button = await el.find('pierce/button');
            expect(el).toHaveAttribute('disabled');
            expect(button).toHaveAttribute('disabled');
            expect(button).toEqualAttribute('aria-disabled', 'true');
            expect(button).toEqualAttribute('tabindex', '-1');
        });
        it('should not emit click events when disabled', async () => {
            const page = await newE2EPage();
            await page.setContent('<market-link disabled>');
            const pageClickSpy = await page.spyOnEvent('click');
            // For some reason, `page.click('market-link')` doesn't work here,
            // so we're doing this instead, cool.
            await page.evaluate(() => {
                document.querySelector('market-link').click();
            });
            await page.waitForChanges();
            expect(pageClickSpy).not.toHaveReceivedEvent();
        });
        it('when used with an ariaLabel (internal button tag)', async () => {
            const page = await newE2EPage();
            await page.setContent(`<h2>Attributes</h2>
        <p>ipsum dolor sit amet, consectetur adipiscing elit</p>
        <market-link aria-label="Configure Attributes">Configure</market-link>`);
            const el = await page.find('market-link');
            expect(el).not.toBeNull();
            expect(el).toEqualAttribute('aria-label', 'Configure Attributes');
        });
        it('when nested inside a paragraph as a link', async () => {
            const page = await newE2EPage();
            await page.setContent(`<h2>Nested in paragraph</h2>
        <p>ipsum dolor sit amet, <market-link highlight="underline" href="https://squareup.com/">consectetur</market-link>  adipiscing elit</p>`);
            const el = await page.find('market-link');
            expect(el).not.toBeNull();
            expect(el).toEqualAttribute('highlight', 'underline');
        });
        it('when nested inside a paragraph as a button', async () => {
            const page = await newE2EPage();
            await page.setContent(`<h2>Nested in paragraph</h2>
        <p>ipsum dolor sit amet, <market-link highlight="underline">consectetur</market-link>  adipiscing elit</p>`);
            const el = await page.find('market-link');
            expect(el).not.toBeNull();
            expect(el).toEqualAttribute('highlight', 'underline');
        });
    });
});
//# sourceMappingURL=market-link.e2e.js.map
