import { newE2EPage } from "@stencil/core/testing";
describe('market-drag-handle', () => {
    let page;
    let el;
    let marketDragHandleDragStartSpy;
    let marketDragHandleDragMoveSpy;
    let marketDragHandleDragEndSpy;
    beforeEach(async () => {
        page = await newE2EPage();
        // position absolute top left to simplify mouse manipulation
        await page.setContent(`
      <market-drag-handle style="position: absolute; left: 0; top: 0"></market-drag-handle>
    `);
        el = await page.find('market-drag-handle');
        marketDragHandleDragStartSpy = await el.spyOnEvent('marketDragHandleDragStart');
        marketDragHandleDragMoveSpy = await el.spyOnEvent('marketDragHandleDragMove');
        marketDragHandleDragEndSpy = await el.spyOnEvent('marketDragHandleDragEnd');
    });
    it('renders', () => {
        expect(el).toHaveAttribute('hydrated');
    });
    describe('mouse events', () => {
        describe('on mousedown', () => {
            beforeEach(async () => {
                await page.mouse.move(1, 1);
                await page.mouse.down();
                await page.waitForChanges();
            });
            it('fires drag start event', () => {
                expect(marketDragHandleDragStartSpy).toHaveReceivedEventTimes(1);
                expect(marketDragHandleDragStartSpy).toHaveReceivedEventDetail({ x: 1, y: 1 });
            });
            it('does not fire the other drag events yet', () => {
                expect(marketDragHandleDragMoveSpy).not.toHaveReceivedEvent();
                expect(marketDragHandleDragEndSpy).not.toHaveReceivedEvent();
            });
            describe('on mousemove', () => {
                beforeEach(async () => {
                    await page.mouse.move(2, 2);
                    await page.waitForChanges();
                });
                it('fires drag move event', () => {
                    expect(marketDragHandleDragMoveSpy).toHaveReceivedEventTimes(1);
                    expect(marketDragHandleDragMoveSpy).toHaveReceivedEventDetail({ x: 2, y: 2 });
                });
                it('does not fire the drag end event yet', () => {
                    expect(marketDragHandleDragEndSpy).not.toHaveReceivedEvent();
                });
                describe('on mouseup', () => {
                    beforeEach(async () => {
                        await page.mouse.up();
                        await page.waitForChanges();
                    });
                    it('fires drag end event', () => {
                        expect(marketDragHandleDragEndSpy).toHaveReceivedEventTimes(1);
                        expect(marketDragHandleDragEndSpy).toHaveReceivedEventDetail({ x: 2, y: 2 });
                    });
                });
            });
        });
        describe('when right mouse button is used', () => {
            beforeEach(async () => {
                await page.mouse.move(1, 1);
                await page.mouse.down({ button: 'right' });
                await page.mouse.move(2, 2);
                await page.mouse.up({ button: 'right' });
                await page.waitForChanges();
            });
            it('does not fire any drag events', () => {
                expect(marketDragHandleDragStartSpy).not.toHaveReceivedEvent();
                expect(marketDragHandleDragMoveSpy).not.toHaveReceivedEvent();
                expect(marketDragHandleDragEndSpy).not.toHaveReceivedEvent();
            });
        });
        describe('when e.preventDefault() is called on a drag start', () => {
            beforeEach(async () => {
                await page.$eval('market-drag-handle', (el) => {
                    el.addEventListener('marketDragHandleDragStart', (e) => {
                        e.preventDefault();
                    });
                });
                await page.mouse.move(1, 1);
                await page.mouse.down();
                await page.mouse.move(2, 2);
                await page.mouse.up();
                await page.waitForChanges();
            });
            it('only fires drag start and no other events', () => {
                expect(marketDragHandleDragStartSpy).toHaveReceivedEventTimes(1);
                expect(marketDragHandleDragMoveSpy).not.toHaveReceivedEvent();
                expect(marketDragHandleDragEndSpy).not.toHaveReceivedEvent();
            });
        });
    });
    describe('touch events', () => {
        it('fires drag start and end events on tap', async () => {
            // couldn't find any utilities for touch events in this version of puppeteer :(
            // best we have is el.tap() so we can't completely test touch support here. boo!
            await el.tap();
            expect(marketDragHandleDragStartSpy).toHaveReceivedEventTimes(1);
            expect(marketDragHandleDragMoveSpy).not.toHaveReceivedEvent();
            expect(marketDragHandleDragEndSpy).toHaveReceivedEventTimes(1);
        });
    });
});
//# sourceMappingURL=market-drag-handle.e2e.js.map
