import { newE2EPage } from "@stencil/core/testing";
describe('market-tag', () => {
    it('renders with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-tag>Tag Text</market-tag>');
        const el = await page.find('market-tag');
        const removeIndicator = await el.find('pierce/svg.remove-indicator');
        expect(el).not.toBeNull();
        expect(removeIndicator).not.toBeNull();
        expect(el).toHaveAttribute('hydrated');
        expect(el).not.toHaveAttribute('disabled');
        expect(el).not.toHaveAttribute('focused');
        expect(el).not.toHaveClass('has-icon');
        expect(el.textContent).toBe('Tag Text');
    });
    it('can be disabled and does not emit dimiss event', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-tag disabled>Tag Text</market-tag>');
        const el = await page.find('market-tag');
        expect(el).not.toBeNull();
        const removeIndicator = await el.find('pierce/svg.remove-indicator');
        expect(removeIndicator).not.toBeNull();
        const elementDismissSpy = await el.spyOnEvent('marketTagDismissed');
        await removeIndicator.click();
        await page.waitForChanges();
        expect(el).toHaveAttribute('disabled');
        expect(elementDismissSpy).not.toHaveReceivedEvent();
    });
    it('should emit click event and can be focused', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-tag>Tag Text</market-tag>');
        const el = await page.find('market-tag');
        expect(el).not.toHaveAttribute('focused');
        const elementClickSpy = await el.spyOnEvent('click');
        await el.click();
        await page.waitForChanges();
        expect(elementClickSpy).toHaveReceivedEvent();
        expect(el).toHaveAttribute('focused');
    });
    it('emits dismiss event and not click event', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-tag>Tag Text</market-tag>');
        const el = await page.find('market-tag');
        const removeIndicator = await el.find('pierce/svg.remove-indicator');
        expect(removeIndicator).not.toBeNull();
        const elementDismissSpy = await el.spyOnEvent('marketTagDismissed');
        const elementClickSpy = await el.spyOnEvent('click');
        await removeIndicator.click();
        await page.waitForChanges();
        expect(elementDismissSpy).toHaveReceivedEvent();
        expect(elementClickSpy).not.toHaveReceivedEvent();
    });
    it('can have slotted icon and class changes', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-tag><svg slot="icon" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"/>Tag Text</market-tag>');
        const el = await page.find('market-tag');
        const iconSlot = await page.find('market-tag svg[slot="icon"]');
        expect(iconSlot).not.toBeNull();
        expect(el).toHaveClass('has-icon');
    });
});
//# sourceMappingURL=market-tag.e2e.js.map
