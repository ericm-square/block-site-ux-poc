import { newE2EPage } from "@stencil/core/testing";
describe('market-context', () => {
    it('renders', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-context></market-context>');
        const element = await page.find('market-context');
        expect(element).toHaveAttribute('hydrated');
    });
    describe('internal methods for use by market-context-manager', () => {
        it('context can be opened and closed', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-context></market-context>
        <market-blade>Content</market-blade>
      `);
            const context = await page.find('market-context');
            const contextElemHandle = await page.$('market-context');
            const bladeElemHandle = await page.$('market-blade');
            const marketContextContentsChanged = await page.spyOnEvent('marketContextContentsChanged');
            const marketContextEmptied = await page.spyOnEvent('marketContextEmptied');
            const animationEnterDuration = await context.getProperty('animationEnterDuration');
            const animationExitDuration = await context.getProperty('animationExitDuration');
            expect(marketContextContentsChanged).toHaveReceivedEventTimes(0);
            expect(marketContextEmptied).toHaveReceivedEventTimes(0);
            // using context.open(el) method
            await page.evaluate((context, dialog) => {
                context.open(dialog);
            }, contextElemHandle, bladeElemHandle);
            await page.waitForChanges();
            await page.waitForTimeout(animationEnterDuration);
            expect(context).toHaveClass('no-veil'); // expected bc we opened a blade
            expect(context).not.toHaveAttribute('hidden');
            expect(marketContextContentsChanged).toHaveReceivedEventTimes(1);
            expect(marketContextEmptied).toHaveReceivedEventTimes(0);
            // using context.close() method
            await page.evaluate((context) => {
                context.close();
            }, contextElemHandle);
            await page.waitForTimeout(animationExitDuration * 2); // idk why the exit animation time isn't enough here
            await page.waitForChanges();
            expect(context).toHaveAttribute('hidden');
            expect(marketContextContentsChanged).toHaveReceivedEventTimes(2);
            expect(marketContextEmptied).toHaveReceivedEventTimes(1);
        });
        it('context opened with persistent dialog cannot be closed', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-context></market-context>
        <market-dialog persistent>Content</market-blade>
      `);
            const context = await page.find('market-context');
            const contextElemHandle = await page.$('market-context');
            const dialogElemHandle = await page.$('market-dialog');
            const animationEnterDuration = await context.getProperty('animationEnterDuration');
            const animationExitDuration = await context.getProperty('animationExitDuration');
            // using context.open(el) method
            await page.evaluate((context, dialog) => {
                context.open(dialog);
            }, contextElemHandle, dialogElemHandle);
            await page.waitForChanges();
            await page.waitForTimeout(animationEnterDuration);
            expect(context).not.toHaveClass('no-veil');
            expect(context).not.toHaveAttribute('hidden');
            // using context.close() method
            await page.evaluate((context) => {
                context.close();
            }, contextElemHandle);
            await page.waitForTimeout(animationExitDuration);
            await page.waitForChanges();
            expect(context).not.toHaveAttribute('hidden');
        });
    });
});
//# sourceMappingURL=market-context.e2e.js.map
