import { newE2EPage } from "@stencil/core/testing";
import { findFocusedNode } from "../../../utils/e2e/focus";
describe('market-tabs: accessibility', () => {
    let page;
    let el;
    let tabListEl;
    let tabEls;
    let panelEls;
    beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
      <market-tabs>
        <market-tab-list>
          <market-tab id="tab-1" aria-controls="panel-1" disabled>Tab 1</market-tab>
          <market-tab id="tab-2" aria-controls="panel-2">Tab 2</market-tab>
          <market-tab id="tab-3" aria-controls="panel-3">Tab 3</market-tab>
          <market-tab id="tab-4" aria-controls="panel-4" disabled>Tab 4</market-tab>
          <market-tab id="tab-5" aria-controls="panel-5">Tab 5</market-tab>
          <market-tab id="tab-6" aria-controls="panel-6" disabled>Tab 6</market-tab>
        </market-tab-list>
        <market-tab-panel id="panel-1" aria-labelledby="tab-1">
          <p>Content for tab 1</p>
          <market-button>Button 1</market-button>
        </market-tab-panel>
        <market-tab-panel id="panel-2" aria-labelledby="tab-2">
          <p>Content for tab 2</p>
          <market-button>Button 2</market-button>
        </market-tab-panel>
        <market-tab-panel id="panel-3" aria-labelledby="tab-3">
          <p>Content for tab 3</p>
          <market-button>Button 3</market-button>
        </market-tab-panel>
        <market-tab-panel id="panel-4" aria-labelledby="tab-4">
          <p>Content for tab 4</p>
          <market-button>Button 4</market-button>
        </market-tab-panel>
        <market-tab-panel id="panel-5" aria-labelledby="tab-5">
          <p>Content for tab 5</p>
          <market-button>Button 5</market-button>
        </market-tab-panel>
        <market-tab-panel id="panel-6" aria-labelledby="tab-6">
          <p>Content for tab 6</p>
          <market-button>Button 6</market-button>
        </market-tab-panel>
      </market-tabs>
    `);
        el = await page.find('market-tabs');
        tabListEl = await el.find('market-tab-list');
        tabEls = await el.findAll('market-tab');
        panelEls = await el.findAll('market-tab-panel');
    });
    /**
     * Guide: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/#wai-ariaroles,states,andproperties
     */
    it('has the appropriate a11y attributes', () => {
        expect(tabListEl).toEqualAttribute('role', 'tablist');
        expect(tabEls[0]).toEqualAttribute('role', 'tab');
        expect(tabEls[0]).toEqualAttribute('aria-controls', 'panel-1');
        expect(tabEls[0]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[0]).toEqualAttribute('tabindex', '-1');
        expect(tabEls[1]).toEqualAttribute('role', 'tab');
        expect(tabEls[1]).toEqualAttribute('aria-controls', 'panel-2');
        expect(tabEls[1]).toEqualAttribute('aria-selected', 'true');
        expect(tabEls[1]).toEqualAttribute('tabindex', '0');
        expect(tabEls[2]).toEqualAttribute('role', 'tab');
        expect(tabEls[2]).toEqualAttribute('aria-controls', 'panel-3');
        expect(tabEls[2]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[2]).toEqualAttribute('tabindex', '-1');
        expect(tabEls[3]).toEqualAttribute('role', 'tab');
        expect(tabEls[3]).toEqualAttribute('aria-controls', 'panel-4');
        expect(tabEls[3]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[3]).toEqualAttribute('tabindex', '-1');
        expect(tabEls[4]).toEqualAttribute('role', 'tab');
        expect(tabEls[4]).toEqualAttribute('aria-controls', 'panel-5');
        expect(tabEls[4]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[4]).toEqualAttribute('tabindex', '-1');
        expect(tabEls[5]).toEqualAttribute('role', 'tab');
        expect(tabEls[5]).toEqualAttribute('aria-controls', 'panel-6');
        expect(tabEls[5]).toEqualAttribute('aria-selected', 'false');
        expect(tabEls[5]).toEqualAttribute('tabindex', '-1');
        expect(panelEls[0]).toEqualAttribute('role', 'tabpanel');
        expect(panelEls[0]).toEqualAttribute('aria-labelledby', 'tab-1');
        expect(panelEls[0]).toEqualAttribute('aria-hidden', 'true');
        expect(panelEls[1]).toEqualAttribute('role', 'tabpanel');
        expect(panelEls[1]).toEqualAttribute('aria-labelledby', 'tab-2');
        expect(panelEls[1]).toEqualAttribute('aria-hidden', 'false');
        expect(panelEls[2]).toEqualAttribute('role', 'tabpanel');
        expect(panelEls[2]).toEqualAttribute('aria-labelledby', 'tab-3');
        expect(panelEls[2]).toEqualAttribute('aria-hidden', 'true');
        expect(panelEls[3]).toEqualAttribute('role', 'tabpanel');
        expect(panelEls[3]).toEqualAttribute('aria-labelledby', 'tab-4');
        expect(panelEls[3]).toEqualAttribute('aria-hidden', 'true');
        expect(panelEls[4]).toEqualAttribute('role', 'tabpanel');
        expect(panelEls[4]).toEqualAttribute('aria-labelledby', 'tab-5');
        expect(panelEls[4]).toEqualAttribute('aria-hidden', 'true');
        expect(panelEls[5]).toEqualAttribute('role', 'tabpanel');
        expect(panelEls[5]).toEqualAttribute('aria-labelledby', 'tab-6');
        expect(panelEls[5]).toEqualAttribute('aria-hidden', 'true');
    });
    describe('keyboard interaction', () => {
        describe('focus', () => {
            it('focuses on active tab when Tab is pressed', async () => {
                el.setAttribute('selected-tab', 'tab-3'); // "Tab 2" is selected by default, but make sure it works on a non-default tab
                await page.waitForChanges();
                await page.keyboard.press('Tab');
                const focusedEl = await findFocusedNode(page);
                expect(focusedEl.name).toStrictEqual('Tab 3');
            });
            it('focuses on active panel when currently focused on the active tab and then Tab is pressed', async () => {
                await page.keyboard.press('Tab'); // focuses on the active tab, "Tab 2"
                await page.keyboard.press('Tab');
                const focusedEl = await findFocusedNode(page);
                expect(focusedEl.children[0].name).toStrictEqual('Content for tab 2');
            });
            it('cycles focus through non-disabled tabs when right arrow is pressed', async () => {
                await page.keyboard.press('Tab'); // focuses on the active tab, "Tab 2"
                {
                    await page.keyboard.press('ArrowRight');
                    const focusedEl = await findFocusedNode(page);
                    expect(focusedEl.name).toStrictEqual('Tab 3');
                }
                {
                    await page.keyboard.press('ArrowRight');
                    const focusedEl = await findFocusedNode(page);
                    expect(focusedEl.name).toStrictEqual('Tab 5'); // "Tab 4" is disabled
                }
                {
                    await page.keyboard.press('ArrowRight');
                    const focusedEl = await findFocusedNode(page);
                    expect(focusedEl.name).toStrictEqual('Tab 2'); // "Tab 6" is disabled and is last; "Tab 1" is disabled
                }
                {
                    await page.keyboard.press('ArrowRight');
                    const focusedEl = await findFocusedNode(page);
                    expect(focusedEl.name).toStrictEqual('Tab 3'); // back to "Tab 3"
                }
            });
            it('cycles focus through non-disabled tabs when left arrow is pressed', async () => {
                await page.keyboard.press('Tab'); // focuses on the active tab, "Tab 2"
                {
                    await page.keyboard.press('ArrowLeft');
                    const focusedEl = await findFocusedNode(page);
                    expect(focusedEl.name).toStrictEqual('Tab 5'); // "Tab 1" is disabled and is first; "Tab 6" is disabled
                }
                {
                    await page.keyboard.press('ArrowLeft');
                    const focusedEl = await findFocusedNode(page);
                    expect(focusedEl.name).toStrictEqual('Tab 3'); // "Tab 4" is disabled
                }
                {
                    await page.keyboard.press('ArrowLeft');
                    const focusedEl = await findFocusedNode(page);
                    expect(focusedEl.name).toStrictEqual('Tab 2');
                }
                {
                    await page.keyboard.press('ArrowLeft');
                    const focusedEl = await findFocusedNode(page);
                    expect(focusedEl.name).toStrictEqual('Tab 5'); // back to "Tab 5"
                }
            });
            it('focuses on first non-disabled tab when Home is pressed', async () => {
                await page.keyboard.press('Tab');
                await tabEls[2].focus(); // start focus from "Tab 3"
                await page.keyboard.press('Home');
                const focusedEl = await findFocusedNode(page);
                expect(focusedEl.name).toStrictEqual('Tab 2'); // first non-disabled tab
            });
            it('focuses on last non-disabled tab when Home is pressed', async () => {
                await page.keyboard.press('Tab');
                await tabEls[2].focus(); // start focus from "Tab 3"
                await page.keyboard.press('End');
                const focusedEl = await findFocusedNode(page);
                expect(focusedEl.name).toStrictEqual('Tab 5'); // last non-disabled tab
            });
        });
        describe('tab selection', () => {
            it('can select a tab by pressing the Enter key', async () => {
                await page.keyboard.press('Tab'); // focuses on "Tab 2"
                await page.keyboard.press('ArrowRight'); // focuses on "Tab 3"
                await page.keyboard.press('Enter');
                await page.waitForChanges();
                const focusedEl = await findFocusedNode(page);
                expect(focusedEl.name).toStrictEqual('Tab 3');
                expect(panelEls[1]).toEqualAttribute('aria-hidden', 'true');
                expect(await panelEls[1].isVisible()).toStrictEqual(false);
                expect(panelEls[2]).toEqualAttribute('aria-hidden', 'false');
                expect(await panelEls[2].isVisible()).toStrictEqual(true);
            });
            it('can select a tab by pressing the Space key', async () => {
                await page.keyboard.press('Tab'); // focuses on "Tab 2"
                await page.keyboard.press('ArrowLeft'); // focuses on "Tab 5"
                await page.keyboard.press('Space');
                await page.waitForChanges();
                const focusedEl = await findFocusedNode(page);
                expect(focusedEl.name).toStrictEqual('Tab 5');
                expect(panelEls[2]).toEqualAttribute('aria-hidden', 'true');
                expect(await panelEls[2].isVisible()).toStrictEqual(false);
                expect(panelEls[4]).toEqualAttribute('aria-hidden', 'false');
                expect(await panelEls[4].isVisible()).toStrictEqual(true);
            });
        });
    });
});
//# sourceMappingURL=market-tabs.a11y.e2e.js.map
