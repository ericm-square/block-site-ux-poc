import { newE2EPage } from "@stencil/core/testing";
import { CORE_ANIMATION_MOVE_TRANSITION_MODERATE_SPEED_DURATION } from "@market/market-theme/js/cjs/index.js";
import { SCROLL_DELAY, SCROLL_STEP_MAX } from "../../../utils/draggable";
describe('market-row: drag enabled', () => {
    describe('initialization', () => {
        let page;
        let row;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent(`
        <market-row drag-enabled>
          <label>Row</label>
        </market-row>
      `);
            row = await page.find('market-row');
        });
        it('displays a drag handle', async () => {
            const handle = await row.find('pierce/market-drag-handle');
            expect(handle).not.toBeNull();
            expect(await handle.isVisible()).toBe(true);
        });
    });
    describe('drag & drop', () => {
        let page;
        let row;
        let marketDragStartSpy;
        let marketDragEndSpy;
        let marketDragCompleteSpy;
        let dragTarget;
        let marketDragEnterSpy;
        let marketDragMoveSpy;
        let marketDragLeaveSpy;
        let marketDragDropSpy;
        beforeEach(async () => {
            page = await newE2EPage();
            // absolutely position elements to simplify mouse manipulation
            await page.setContent(`
        <market-row
          drag-enabled
          drag-handle-position="leading"
          style="position: absolute; left: 0; top: 0; width: 200px; z-index: 2;"
        >
          <label>Row</label>
        </market-row>
        <div
          id="drag-target"
          style="position: absolute; left: 300px; top: 0; width: 200px; height: 200px; z-index: 1;"
        ></div>
      `);
            row = await page.find('market-row');
            marketDragStartSpy = await row.spyOnEvent('marketDragStart');
            marketDragEndSpy = await row.spyOnEvent('marketDragEnd');
            marketDragCompleteSpy = await row.spyOnEvent('marketDragComplete');
            dragTarget = await page.find('div#drag-target');
            marketDragEnterSpy = await dragTarget.spyOnEvent('marketDragEnter');
            marketDragMoveSpy = await dragTarget.spyOnEvent('marketDragMove');
            marketDragLeaveSpy = await dragTarget.spyOnEvent('marketDragLeave');
            marketDragDropSpy = await dragTarget.spyOnEvent('marketDragDrop');
        });
        describe('when the drag starts', () => {
            beforeEach(async () => {
                await page.mouse.move(20, 20); // target drag handle
                await page.waitForChanges();
                await page.mouse.down();
                await page.waitForChanges();
            });
            it('fires the drag start event', () => {
                expect(marketDragStartSpy).toHaveReceivedEventTimes(1);
                expect(marketDragStartSpy.firstEvent.detail.x).toEqual(20);
                expect(marketDragStartSpy.firstEvent.detail.y).toEqual(20);
            });
            it('adds the drag placeholder class to the row', () => {
                expect(row).toHaveClass('market-drag-placeholder');
            });
            it('clones and appends a dummy row', async () => {
                const clone = await page.find('market-row.market-drag-clone');
                expect(clone).not.toBeNull();
                expect(await clone.isVisible()).toBe(true);
                const style = await clone.getComputedStyle();
                expect(style.position).toEqual('fixed');
                expect(style.width).toEqual('240px');
                expect(style.top).toEqual('0px');
                expect(style.left).toEqual('-8px');
                expect(style.zIndex).toEqual('3');
            });
            describe('when the drag enters the target', () => {
                beforeEach(async () => {
                    await page.mouse.move(400, 100); // enter drag target
                    await page.waitForChanges();
                });
                it('moves the dummy row with the mouse', async () => {
                    const clone = await page.find('market-row.market-drag-clone');
                    const style = await clone.getComputedStyle();
                    expect(style.transform).toEqual('matrix(1, 0, 0, 1, 380, 80)');
                });
                it('fires the drag enter event on the drag target', () => {
                    expect(marketDragEnterSpy).toHaveReceivedEventTimes(1);
                    expect(marketDragEnterSpy.firstEvent.detail.x).toEqual(400);
                    expect(marketDragEnterSpy.firstEvent.detail.y).toEqual(100);
                });
                it('fires the drag move event on the drag target', () => {
                    expect(marketDragMoveSpy).toHaveReceivedEventTimes(1);
                    expect(marketDragMoveSpy.firstEvent.detail.x).toEqual(400);
                    expect(marketDragMoveSpy.firstEvent.detail.y).toEqual(100);
                });
                describe('when the drag leaves the target', () => {
                    beforeEach(async () => {
                        await page.mouse.move(0, 0); // leave drag target
                        await page.waitForChanges();
                    });
                    it('moves the dummy row with the mouse', async () => {
                        const clone = await page.find('market-row.market-drag-clone');
                        const style = await clone.getComputedStyle();
                        expect(style.transform).toEqual('matrix(1, 0, 0, 1, -20, -20)');
                    });
                    it('fires the drag leave event on the drag target', () => {
                        expect(marketDragLeaveSpy).toHaveReceivedEventTimes(1);
                        expect(marketDragLeaveSpy.firstEvent.detail.x).toEqual(0);
                        expect(marketDragLeaveSpy.firstEvent.detail.y).toEqual(0);
                    });
                });
                describe('when the drag is released', () => {
                    beforeEach(async () => {
                        await page.mouse.up();
                        await page.waitForChanges();
                    });
                    it('fires the drag end event on the dragged element', () => {
                        expect(marketDragEndSpy).toHaveReceivedEventTimes(1);
                        expect(marketDragEndSpy.firstEvent.detail.x).toEqual(400);
                        expect(marketDragEndSpy.firstEvent.detail.y).toEqual(100);
                    });
                    it('fires the drag drop event on the drag target', () => {
                        expect(marketDragDropSpy).toHaveReceivedEventTimes(1);
                        expect(marketDragDropSpy.firstEvent.detail.x).toEqual(400);
                        expect(marketDragDropSpy.firstEvent.detail.y).toEqual(100);
                    });
                    it('adds a class to the clone for the transition back ', async () => {
                        const clone = await page.find('market-row.market-drag-clone');
                        expect(clone).toHaveClass('market-drag-released');
                    });
                    describe('after the clone transition completes', () => {
                        beforeEach(async () => {
                            // wait for CSS transition to complete
                            await page.waitForTimeout(CORE_ANIMATION_MOVE_TRANSITION_MODERATE_SPEED_DURATION + 1);
                            await page.waitForChanges();
                        });
                        it('fires the drag complete event on the dragged row', () => {
                            expect(marketDragCompleteSpy).toHaveReceivedEventTimes(1);
                            expect(marketDragCompleteSpy.firstEvent.detail.x).toEqual(400);
                            expect(marketDragCompleteSpy.firstEvent.detail.y).toEqual(100);
                        });
                        it('removes the cloned dummy row from the DOM', async () => {
                            const clone = await page.find('market-row.market-drag-clone');
                            expect(clone).toBeNull();
                        });
                        it('removes the drag placeholder class from the row', () => {
                            expect(row).not.toHaveClass('market-drag-placeholder');
                        });
                    });
                });
            });
        });
        describe('when preventDefault() is called on drag start', () => {
            beforeEach(async () => {
                await page.$eval('market-row', (el) => {
                    el.addEventListener('marketDragStart', (e) => e.preventDefault());
                });
                await page.mouse.move(20, 20); // target drag handle
                await page.waitForChanges();
                await page.mouse.down();
                await page.waitForChanges();
            });
            it('fires the drag start event', () => {
                expect(marketDragStartSpy).toHaveReceivedEventTimes(1);
                expect(marketDragStartSpy.firstEvent.detail.x).toEqual(20);
                expect(marketDragStartSpy.firstEvent.detail.y).toEqual(20);
            });
            it('does NOT add the drag placeholder class to the row', () => {
                expect(row).not.toHaveClass('market-drag-placeholder');
            });
            it('does NOT clone and append a dummy row', async () => {
                const clone = await page.find('market-row.market-drag-clone');
                expect(clone).toBeNull();
            });
            describe('when the drag gesture enters a target', () => {
                beforeEach(async () => {
                    await page.mouse.move(400, 100); // enter drag target
                    await page.waitForChanges();
                });
                it('does NOT fire the drag enter event on the drag target', () => {
                    expect(marketDragEnterSpy).not.toHaveReceivedEvent();
                });
                it('does NOT fire the drag move event on the drag target', () => {
                    expect(marketDragMoveSpy).not.toHaveReceivedEvent();
                });
                describe('when the drag gesture leaves the target', () => {
                    beforeEach(async () => {
                        await page.mouse.move(0, 0); // leave drag target
                        await page.waitForChanges();
                    });
                    it('does NOT fire the drag leave event on the drag target', () => {
                        expect(marketDragLeaveSpy).not.toHaveReceivedEvent();
                    });
                });
                describe('when then the drag is released', () => {
                    beforeEach(async () => {
                        await page.mouse.up();
                        await page.waitForChanges();
                    });
                    it('does NOT fire the drag end event on the dragged element', () => {
                        expect(marketDragEndSpy).not.toHaveReceivedEvent();
                    });
                    it('does NOT fire the drag drop event on the drag target', () => {
                        expect(marketDragDropSpy).not.toHaveReceivedEvent();
                    });
                });
            });
        });
        describe('when preventDefault() is called on drag end', () => {
            beforeEach(async () => {
                await page.$eval('market-row', (el) => {
                    el.addEventListener('marketDragEnd', (e) => e.preventDefault());
                });
                await page.mouse.move(20, 20); // target drag handle
                await page.waitForChanges();
                await page.mouse.down();
                await page.waitForChanges();
                await page.mouse.move(400, 100); // enter drag target
                await page.waitForChanges();
                await page.mouse.up();
                await page.waitForChanges();
            });
            it('fires the drag end event on the dragged element', () => {
                expect(marketDragEndSpy).toHaveReceivedEventTimes(1);
                expect(marketDragEndSpy.firstEvent.detail.x).toEqual(400);
                expect(marketDragEndSpy.firstEvent.detail.y).toEqual(100);
            });
            it('does NOT fire the drag drop event on the drag target', () => {
                expect(marketDragDropSpy).not.toHaveReceivedEvent();
            });
            it('adds a class to the clone for the transition back ', async () => {
                const clone = await page.find('market-row.market-drag-clone');
                expect(clone).toHaveClass('market-drag-released');
            });
            describe('after the clone transition completes', () => {
                beforeEach(async () => {
                    // wait for CSS transition to complete
                    await page.waitForTimeout(CORE_ANIMATION_MOVE_TRANSITION_MODERATE_SPEED_DURATION + 1);
                    await page.waitForChanges();
                });
                it('fires the drag complete event on the dragged row', () => {
                    expect(marketDragCompleteSpy).toHaveReceivedEventTimes(1);
                    expect(marketDragCompleteSpy.firstEvent.detail.x).toEqual(400);
                    expect(marketDragCompleteSpy.firstEvent.detail.y).toEqual(100);
                });
                it('removes the cloned dummy row from the DOM', async () => {
                    const clone = await page.find('market-row.market-drag-clone');
                    expect(clone).toBeNull();
                });
                it('removes the drag placeholder class from the row', () => {
                    expect(row).not.toHaveClass('market-drag-placeholder');
                });
            });
        });
    });
    describe('drag & scroll', () => {
        let page;
        let scrollContainer;
        // calculations for scroll logic
        const SCROLL_DISTANCE = 900;
        const SCROLL_TIME = (SCROLL_DISTANCE / SCROLL_STEP_MAX) * SCROLL_DELAY;
        beforeEach(async () => {
            page = await newE2EPage();
            // absolutely position elements to simplify mouse manipulation
            await page.setContent(`
        <div class="scroll-container" style="position: absolute; left: 0; top: 500px; height: 100px; width: 200px; overflow: scroll;">
          <div class="scroll-content" style="height: 1000px;">
            <market-row
              drag-enabled
              drag-handle-position="leading"
            >
              <label>Row</label>
            </market-row>
          </div>
        </div>
      `);
            scrollContainer = await page.find('div.scroll-container');
        });
        describe('when the row is dragged to the bottom of a scrollable container', () => {
            beforeEach(async () => {
                await page.mouse.move(20, 520); // target drag handle
                await page.waitForChanges();
                await page.mouse.down();
                await page.waitForChanges();
                await page.mouse.move(20, 1000); // drag well below the bottom of scroll container
                await page.waitForTimeout(SCROLL_TIME + 1); // wait for scroll to complete
                await page.waitForChanges();
            });
            it('scrolls the container down', async () => {
                expect(await scrollContainer.getProperty('scrollHeight')).toBe(1000);
                expect(await scrollContainer.getProperty('scrollTop')).toBe(SCROLL_DISTANCE);
            });
            describe('when the row is dragged to the top of the scrollable container', () => {
                beforeEach(async () => {
                    await page.mouse.move(0, 0); // drag back well above the top of scroll container
                    await page.waitForChanges();
                    await page.waitForTimeout(SCROLL_TIME + 1); // wait for scroll to complete
                    await page.waitForChanges();
                });
                it('scrolls the container back up', async () => {
                    expect(await scrollContainer.getProperty('scrollHeight')).toBe(1000);
                    expect(await scrollContainer.getProperty('scrollTop')).toBe(0);
                });
            });
        });
    });
});
//# sourceMappingURL=market-row.drag.e2e.js.map
