import { CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION, CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION, } from "@market/market-theme/js/cjs/index.js";
import { newE2EPage } from "@stencil/core/testing";
describe('market-context-manager', () => {
    describe('scroll blocking behavior', () => {
        /**
         * page scroll blocking implemented using global CSS: src/styles/modals.css
         */
        it('only blocks scrolling if there is a visible veil', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-modal-partial id="modalPartial">
          Displays with veil, blocks scrolling
        </market-modal-partial>
        <market-blade id="blade">
          Does not display with veil, does not block scrolling
        </market-blade>
        <market-context-manager></market-context-manager>
      `);
            const contextManager = await page.find('market-context-manager');
            const contextManagerElemHandle = await page.$('market-context-manager');
            const modalPartialElemHandle = await page.$('#modalPartial');
            const bladeElemHandle = await page.$('#blade');
            const html = await page.find('html');
            let htmlStyle = await html.getComputedStyle();
            const originalOverflowStyle = htmlStyle.getPropertyValue('overflow');
            // open market-modal-partial: scroll blocking
            await page.evaluate((contextManager, modalPartial) => {
                contextManager.open(modalPartial, true);
            }, contextManagerElemHandle, modalPartialElemHandle);
            await page.waitForChanges();
            expect(contextManager).toHaveAttribute('active');
            const context = await page.find('market-context');
            const animationEnterDuration = await context.getProperty('animationEnterDuration');
            const animationExitDuration = await context.getProperty('animationExitDuration');
            await page.waitForTimeout(animationEnterDuration);
            htmlStyle = await html.getComputedStyle();
            expect(htmlStyle.getPropertyValue('overflow')).toBe('hidden');
            // close market-modal-partial: no scroll blocking
            await page.evaluate((contextManager, modalPartial) => {
                contextManager.close(modalPartial.dialogID);
            }, contextManagerElemHandle, modalPartialElemHandle);
            await page.waitForChanges();
            await page.waitForTimeout(animationExitDuration * 2);
            htmlStyle = await html.getComputedStyle();
            expect(htmlStyle.getPropertyValue('overflow')).toBe(originalOverflowStyle);
            // open market-blade: no scroll blocking
            await page.evaluate((contextManager, blade) => {
                contextManager.open(blade, true);
            }, contextManagerElemHandle, bladeElemHandle);
            await page.waitForChanges();
            await page.waitForTimeout(animationEnterDuration);
            htmlStyle = await html.getComputedStyle();
            expect(htmlStyle.getPropertyValue('overflow')).toBe(originalOverflowStyle);
            // open market-modal-partial on top of market-blade: scroll blocking
            await page.evaluate((contextManager, modalPartial) => {
                contextManager.open(modalPartial, true);
            }, contextManagerElemHandle, modalPartialElemHandle);
            await page.waitForChanges();
            await page.waitForTimeout(animationEnterDuration);
            htmlStyle = await html.getComputedStyle();
            expect(htmlStyle.getPropertyValue('overflow')).toBe('hidden');
            // close market-modal-partial: no scroll blocking
            await page.evaluate((contextManager, modalPartial) => {
                contextManager.close(modalPartial.dialogID);
            }, contextManagerElemHandle, modalPartialElemHandle);
            await page.waitForChanges();
            await page.waitForTimeout(animationExitDuration * 2);
            htmlStyle = await html.getComputedStyle();
            expect(htmlStyle.getPropertyValue('overflow')).toBe(originalOverflowStyle);
            // close blade: no scroll blocking
            await page.evaluate((contextManager, blade) => {
                contextManager.close(blade.dialogID);
            }, contextManagerElemHandle, bladeElemHandle);
            await page.waitForChanges();
            await page.waitForTimeout(animationExitDuration * 2);
            htmlStyle = await html.getComputedStyle();
            expect(htmlStyle.getPropertyValue('overflow')).toBe(originalOverflowStyle);
        });
        /**
         * This test recreates the conditions of a bug described in this Slack thread:
         * https://square.slack.com/archives/CTU91JFU0/p1671557416571969
         */
        it('resets page scroll on deactivation', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-dialog id="dialogOne">
          Hello world!
          <market-button>Close</market-button>
        </market-dialog>
        <market-dialog id="dialogTwo">
          Hello world!
          <market-button>Close</market-button>
        </market-dialog>
        <market-context-manager></market-context-manager>
      `);
            const contextManager = await page.find('market-context-manager');
            const contextManagerElemHandle = await page.$('market-context-manager');
            const dialogOneElemHandle = await page.$('#dialogOne');
            const dialogTwoElemHandle = await page.$('#dialogTwo');
            const html = await page.find('html');
            let htmlStyle = await html.getComputedStyle();
            const originalOverflowStyle = htmlStyle.getPropertyValue('overflow');
            await page.evaluate((contextManager, dialog) => {
                contextManager.open(dialog, true);
            }, contextManagerElemHandle, dialogOneElemHandle);
            await page.waitForChanges();
            expect(contextManager).toHaveAttribute('active');
            const context = await page.find('market-context');
            const animationEnterDuration = await context.getProperty('animationEnterDuration');
            const animationExitDuration = await context.getProperty('animationExitDuration');
            await page.waitForTimeout(animationEnterDuration);
            htmlStyle = await html.getComputedStyle();
            expect(htmlStyle.getPropertyValue('overflow')).toBe('hidden');
            await page.evaluate((contextManager, dialog) => {
                contextManager.close(dialog.dialogID);
            }, contextManagerElemHandle, dialogOneElemHandle);
            await page.evaluate((contextManager, dialog) => {
                contextManager.open(dialog, true);
            }, contextManagerElemHandle, dialogTwoElemHandle);
            await page.waitForChanges();
            await page.waitForTimeout(animationEnterDuration);
            htmlStyle = await html.getComputedStyle();
            expect(htmlStyle.getPropertyValue('overflow')).toBe('hidden');
            await page.evaluate((contextManager, dialog) => {
                contextManager.close(dialog.dialogID);
            }, contextManagerElemHandle, dialogTwoElemHandle);
            await page.waitForChanges();
            await page.waitForTimeout(animationExitDuration * 2);
            htmlStyle = await html.getComputedStyle();
            expect(htmlStyle.getPropertyValue('overflow')).toBe(originalOverflowStyle);
        });
    });
    // TODO: figure out why this test doesn't pass and reenable it
    it.skip('dismisses the current modal when the esc key is pressed', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dialog>
        Hello world!
        <market-button>Close</market-button>
      </market-dialog>
      <market-context-manager></market-context-manager>
    `);
        const contextManager = await page.find('market-context-manager');
        expect(contextManager).not.toHaveAttribute('active');
        // We use `page.$` instead of `page.find` because we need an
        // ElementHandle object not an E2EEelement for `page.evaluate`
        const contextManagerElemHandle = await page.$('market-context-manager');
        const dialogElemHandle = await page.$('market-dialog');
        // open dialog in context manager
        await page.evaluate((contextManager, dialog) => {
            contextManager.open(dialog);
        }, contextManagerElemHandle, dialogElemHandle);
        await page.waitForChanges();
        expect(contextManager).toHaveAttribute('active');
        // press esc key
        await page.keyboard.press('Escape');
        await page.waitForChanges();
        expect(contextManager).not.toHaveAttribute('active'); // not sure why this fails...
    });
    // TODO: figure out why this test doesn't pass and reenable it
    it.skip('dismisses the current modal when the veil is clicked', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-dialog>
        Hello world!
        <market-button>Close</market-button>
      </market-dialog>
      <span>other element</span>
      <market-context-manager></market-context-manager>
    `);
        const contextManager = await page.find('market-context-manager');
        expect(contextManager).not.toHaveAttribute('active');
        // We use `page.$` instead of `page.find` because we need an
        // ElementHandle object not an E2EEelement for `page.evaluate`
        const contextManagerElemHandle = await page.$('market-context-manager');
        const dialogElemHandle = await page.$('market-dialog');
        // open dialog in context manager
        await page.evaluate((contextManager, dialog) => {
            contextManager.open(dialog);
        }, contextManagerElemHandle, dialogElemHandle);
        await page.waitForChanges();
        expect(contextManager).toHaveAttribute('active');
        // clicking on "veil" (aka visible market-context)
        const context = await page.find('market-context');
        await context.click();
        await page.waitForChanges();
        expect(contextManager).not.toHaveAttribute('active'); // not sure why this fails...
    });
    // TODO: Make this test not flaky, then reenable it
    it.skip('opens and closes correctly when navigating between modals', async () => {
        const page = await newE2EPage();
        await page.setContent(`
      <market-modal-partial class="modal1">
        <market-header>
          <h2>First Modal</h2>
          <market-button rank="primary" slot="actions">
            Go to the other modal
          </market-button>
        </market-header>
        <section class="main">
          <p>Here's a modal!</p>
        </section>
      </market-modal-partial>
      <market-modal-partial class="modal2">
        <market-header>
          <h2>Second Modal</h2>
        </market-header>
        <section class="main">
          <p>Here's a modal!</p>
        </section>
      </market-modal-partial>
      <market-context-manager></market-context-manager>
    </div>
    `);
        const contextManager = await page.find('market-context-manager');
        expect(contextManager).not.toHaveAttribute('active');
        // We use `page.$` instead of `page.find` because we need an
        // ElementHandle object not an E2EEelement for `page.evaluate`
        const contextManagerElemHandle = await page.$('market-context-manager');
        const modal1ElemHandle = await page.$('.modal1');
        // Open first modal in context manager
        await page.evaluate((contextManager, modal1) => {
            contextManager.open(modal1);
        }, contextManagerElemHandle, modal1ElemHandle);
        const modal1Button = await page.$('.modal1 market-button');
        const modal2ElemHandle = await page.$('.modal2');
        // Attach event listener to button in first modal
        await page.evaluate((modal1Button, contextManager, modal1, modal2) => {
            modal1Button.addEventListener('click', async () => {
                // open second modal
                // NOTE: We're opening before closing here to test that the right
                // modal ends up open at the end, regardless of open/close order
                contextManager.open(modal2);
                // close first modal
                await modal1.dismiss();
            });
        }, modal1Button, contextManagerElemHandle, modal1ElemHandle, modal2ElemHandle);
        await page.waitForChanges();
        const enterAnimationDurationWithDelay = CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION * 1.25;
        await page.waitForTimeout(enterAnimationDurationWithDelay);
        // Test that context manager is active, there is only one modal context
        // and it contains the first modal
        expect(contextManager).toHaveAttribute('active');
        let currentContexts = await contextManager.findAll('market-context');
        expect(currentContexts).toHaveLength(1);
        let currentContext = currentContexts[0];
        let currentModals = await currentContext.findAll('market-modal');
        expect(currentModals).toHaveLength(1);
        let currentModal = currentModals[0];
        expect(currentModal).toEqualAttribute('class', 'modal1');
        const contentsChangedSpy = await page.spyOnEvent('marketContextContentsChanged');
        await modal1Button.click();
        await page.waitForChanges();
        const exitAnimationDurationWithDelay = CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION * 1.25;
        await page.waitForTimeout(exitAnimationDurationWithDelay);
        // Test that context manager is still active, there is only one modal context
        // and it contains the second modal
        expect(contentsChangedSpy).toHaveReceivedEventTimes(2);
        expect(contextManager).toHaveAttribute('active');
        currentContexts = await contextManager.findAll('market-context');
        expect(currentContexts).toHaveLength(1);
        currentContext = currentContexts[0];
        currentModals = await currentContext.findAll('market-modal');
        expect(currentModals).toHaveLength(1);
        currentModal = currentModals[0];
        expect(currentModal).toEqualAttribute('class', 'modal2');
    });
});
//# sourceMappingURL=market-context-manager.e2e.js.map
