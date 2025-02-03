import { newE2EPage } from "@stencil/core/testing";
import { CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION, CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION, } from "@market/market-theme/js/cjs/index.js";
const drag = async (page, distance, release = true) => {
    const sheet = await page.$('market-sheet');
    const box = await sheet.boundingBox();
    const center = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
    await page.mouse.move(center.x, center.y);
    await page.mouse.down();
    await page.mouse.move(center.x, center.y + distance);
    if (release) {
        await page.mouse.up();
    }
};
describe('market-sheet', () => {
    describe('open mode applies correct attribute', () => {
        it('partial (default)', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-sheet>
        </market-sheet>
      `);
            const sheet = await page.find('market-sheet');
            expect(sheet.getAttribute('state')).toBe('partial-open');
        });
        it('full', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-sheet open-mode="full">
        </market-sheet>
      `);
            const sheet = await page.find('market-sheet');
            expect(sheet.getAttribute('state')).toBe('full-open');
        });
        it('dynamic', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-sheet open-mode="dynamic">
        </market-sheet>
      `);
            const sheet = await page.find('market-sheet');
            expect(sheet.getAttribute('state')).toBe('partial-open');
        });
    });
    describe('touch control', () => {
        describe('partial mode', () => {
            let page;
            let sheet;
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setViewport({
                    height: 1000,
                    width: 500,
                });
                await page.setContent(`
          <market-sheet>
            <market-header slot="header">
              <h2>'Partial' Sheet</h2>
              <market-button rank="primary" slot="actions">Action</market-button>
            </market-header>
            <h3>Sheet content</h3>
            <p>
              This is an example of a sheet in its default 'partial' mode, which expands to fit the provided content and can
              be closed by swiping down.
            </p>
          </market-sheet>
        `);
                sheet = await page.find('market-sheet');
                await new Promise((resolve) => setTimeout(resolve, CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION));
            });
            it('remains partially open on swipe up', async () => {
                expect(sheet.getAttribute('state')).toBe('partial-open');
                await drag(page, -200);
                const updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('partial-open');
            });
            it('closes on swipe down', async () => {
                expect(sheet.getAttribute('state')).toBe('partial-open');
                await drag(page, 300);
                await new Promise((resolve) => setTimeout(resolve, CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION));
                const updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('closed');
            });
            it('remains open if down swipe does not trigger', async () => {
                expect(sheet.getAttribute('state')).toBe('partial-open');
                await drag(page, 50);
                const updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('partial-open');
            });
        });
        describe('full mode', () => {
            let page;
            let sheet;
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setViewport({
                    height: 1000,
                    width: 500,
                });
                await page.setContent(`
        <market-sheet open-mode="full">
          <market-header slot="header">
            <h2>'Full' Sheet</h2>
            <market-button rank="primary" slot="actions">Action</market-button>
          </market-header>
          <h3>Sheet content</h3>
          <p>
            This is an example of a sheet in 'full' mode, which expands to fill the screen and can be closed by swiping
            down.
          </p>
        </market-sheet>
        `);
                sheet = await page.find('market-sheet');
                await new Promise((resolve) => setTimeout(resolve, CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION));
            });
            it('closes on swipe down', async () => {
                expect(sheet.getAttribute('state')).toBe('full-open');
                await drag(page, 200);
                await new Promise((resolve) => setTimeout(resolve, CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION));
                const updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('closed');
            });
            it('remains open if down swipe does not trigger', async () => {
                expect(sheet.getAttribute('state')).toBe('full-open');
                await drag(page, 50);
                const updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('full-open');
            });
            it('remains open if up swipe triggers regardless of final position', async () => {
                expect(sheet.getAttribute('state')).toBe('full-open');
                const initialTop = Number.parseInt((await sheet.getComputedStyle()).top, 10);
                await drag(page, 800, false);
                await new Promise((resolve) => setTimeout(resolve, 20));
                await page.mouse.move(10, initialTop + 600);
                await page.mouse.up();
                const updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('full-open');
            });
        });
        describe('dynamic mode', () => {
            let page;
            let sheet;
            beforeEach(async () => {
                page = await newE2EPage();
                await page.setViewport({
                    height: 1000,
                    width: 500,
                });
                await page.setContent(`
        <market-sheet open-mode="dynamic">
          <market-header slot="header">
            <h2>'Full' Sheet</h2>
            <market-button rank="primary" slot="actions">Action</market-button>
          </market-header>
          <h3>Sheet content</h3>
          <p>
            This is an example of a sheet in 'full' mode, which expands to fill the screen and can be closed by swiping
            down.
          </p>
        </market-sheet>
        `);
                sheet = await page.find('market-sheet');
                await new Promise((resolve) => setTimeout(resolve, CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION));
            });
            it('fully opens on swipe up', async () => {
                expect(sheet.getAttribute('state')).toBe('partial-open');
                await drag(page, -200);
                const updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('full-open');
            });
            it('closes on swipe down', async () => {
                expect(sheet.getAttribute('state')).toBe('partial-open');
                await drag(page, 200);
                await new Promise((resolve) => setTimeout(resolve, CORE_ANIMATION_EXIT_TRANSITION_MODERATE_SPEED_DURATION));
                const updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('closed');
            });
            it('remains open if down swipe does not trigger', async () => {
                expect(sheet.getAttribute('state')).toBe('partial-open');
                await drag(page, 60);
                const updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('partial-open');
            });
            it('fully opens if up swipe triggers regardless of final position', async () => {
                expect(sheet.getAttribute('state')).toBe('partial-open');
                const initialTop = Number.parseInt((await sheet.getComputedStyle()).top, 10);
                await drag(page, 300, false);
                await new Promise((resolve) => setTimeout(resolve, 20));
                await page.mouse.move(10, initialTop + 100);
                await page.mouse.up();
                const updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('full-open');
            });
            it('can be dropped in partially open position after fully opened', async () => {
                expect(sheet.getAttribute('state')).toBe('partial-open');
                const initialTop = Number.parseInt((await sheet.getComputedStyle()).top, 10);
                await drag(page, -200);
                await new Promise((resolve) => setTimeout(resolve, CORE_ANIMATION_ENTER_TRANSITION_MODERATE_SPEED_DURATION));
                let updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('full-open');
                const newTop = Number.parseInt((await sheet.getComputedStyle()).top, 10);
                await drag(page, initialTop - newTop, false);
                await new Promise((resolve) => setTimeout(resolve, 300));
                await page.mouse.up();
                updatedSheet = await page.find('market-sheet');
                expect(updatedSheet.getAttribute('state')).toBe('partial-open');
            });
        });
    });
    describe('a11y', () => {
        it('allows aria-label to be set', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-sheet aria-label="Test hidden label">
        </market-sheet>
      `);
            const element = await page.find('market-sheet');
            expect(element).toEqualAttribute('aria-label', 'Test hidden label');
        });
        it('allows aria-labelledby to be set', async () => {
            const page = await newE2EPage();
            await page.setContent(`
        <market-sheet aria-labelledby="test-label">
          <market-header><h2 id="test-label">Test visible label</h2></market-header>
        </market-sheet>
      `);
            const element = await page.find('market-sheet');
            expect(element).toEqualAttribute('aria-labelledby', 'test-label');
        });
    });
});
//# sourceMappingURL=market-sheet.e2e.js.map
