import { newE2EPage } from "@stencil/core/testing";
export const setupPage = async (content) => {
    const page = await newE2EPage();
    await page.setContent(content);
    const el = await page.find('market-radio');
    const input = await el.find('pierce/input');
    const spy = await el.spyOnEvent('marketRadioValueChange');
    return { page, el, input, spy };
};
describe('market-radio: methods', () => {
    let page;
    let el;
    let input;
    let spy;
    describe('setActive()', () => {
        describe('false -> true', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-radio></market-radio>'));
                el.callMethod('setActive', true);
                await page.waitForChanges();
            });
            it('is active', async () => {
                await expect(el).toHaveReflectedBooleanProperty('active');
            });
        });
        describe('true -> false', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-radio active></market-radio>'));
                el.callMethod('setActive', false);
                await page.waitForChanges();
            });
            it('is NOT active', async () => {
                await expect(el).not.toHaveReflectedBooleanProperty('active');
            });
        });
    });
    describe('setHover()', () => {
        describe('false -> true', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-radio></market-radio>'));
                el.callMethod('setHover', true);
                await page.waitForChanges();
            });
            it('is hovered', async () => {
                await expect(el).toHaveReflectedBooleanProperty('hovered');
            });
        });
        describe('true -> false', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-radio hovered></market-radio>'));
                el.callMethod('setHover', false);
                await page.waitForChanges();
            });
            it('is NOT hovered', async () => {
                await expect(el).not.toHaveReflectedBooleanProperty('hovered');
            });
        });
    });
    describe('setDisabled()', () => {
        describe('false -> true', () => {
            beforeEach(async () => {
                ({ page, el, input } = await setupPage('<market-radio></market-radio>'));
                el.callMethod('setDisabled', true);
                await page.waitForChanges();
            });
            it('is disabled', async () => {
                await expect(el).toHaveReflectedBooleanProperty('disabled');
                await expect(input).toHaveReflectedBooleanProperty('disabled');
            });
        });
        describe('true -> false', () => {
            beforeEach(async () => {
                ({ page, el, input } = await setupPage('<market-radio disabled></market-radio>'));
                el.callMethod('setDisabled', false);
                await page.waitForChanges();
            });
            it('is NOT disabled', async () => {
                await expect(el).not.toHaveReflectedBooleanProperty('disabled');
                await expect(input).not.toHaveReflectedBooleanProperty('disabled');
            });
        });
    });
    describe('setFocus()', () => {
        describe('false -> true', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-radio></market-radio>'));
                el.callMethod('setFocus', true);
                await page.waitForChanges();
            });
            it('is focused', async () => {
                await expect(el).toHaveReflectedBooleanProperty('focused');
            });
        });
        describe('true -> false', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-radio focused></market-radio>'));
                el.callMethod('setFocus', false);
                await page.waitForChanges();
            });
            it('is NOT focused', async () => {
                await expect(el).not.toHaveReflectedBooleanProperty('focused');
            });
        });
        describe('when disabled: false -> true', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-radio disabled></market-radio>'));
                el.callMethod('setFocus', true);
                await page.waitForChanges();
            });
            it('is NOT focused', async () => {
                await expect(el).not.toHaveReflectedBooleanProperty('focused');
            });
        });
    });
    describe('setSelection()', () => {
        describe('when unselected', () => {
            beforeEach(async () => {
                ({ page, el, spy } = await setupPage('<market-radio></market-radio>'));
            });
            describe('false -> true', () => {
                beforeEach(async () => {
                    el.callMethod('setSelection', true);
                    await page.waitForChanges();
                });
                it('is selected', async () => {
                    await expect(el).toBeSelectedMarketControl();
                });
                it('fires the change event', () => {
                    expect(spy).toHaveReceivedEventTimes(1);
                    expect(spy).toHaveReceivedEventDetail({ current: true, previous: false });
                });
            });
            describe('false -> false', () => {
                beforeEach(async () => {
                    el.callMethod('setSelection', false);
                    await page.waitForChanges();
                });
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
            describe('false -> true, silently', () => {
                beforeEach(async () => {
                    el.callMethod('setSelection', true, { silent: true });
                    await page.waitForChanges();
                });
                it('is selected', async () => {
                    await expect(el).toBeSelectedMarketControl();
                });
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
        });
        describe('when selected', () => {
            beforeEach(async () => {
                ({ page, el, spy } = await setupPage('<market-radio selected></market-radio>'));
            });
            describe('true -> false', () => {
                beforeEach(async () => {
                    el.callMethod('setSelection', false);
                    await page.waitForChanges();
                });
                it('is NOT selected', async () => {
                    await expect(el).not.toBeSelectedMarketControl();
                });
                it('fires the change event', () => {
                    expect(spy).toHaveReceivedEventTimes(1);
                    expect(spy).toHaveReceivedEventDetail({ current: false, previous: true });
                });
            });
            describe('true -> true', () => {
                beforeEach(async () => {
                    el.callMethod('setSelection', true);
                    await page.waitForChanges();
                });
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
            describe('true -> false, silently', () => {
                beforeEach(async () => {
                    el.callMethod('setSelection', false, { silent: true });
                    await page.waitForChanges();
                });
                it('is NOT selected', async () => {
                    await expect(el).not.toBeSelectedMarketControl();
                });
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
        });
    });
});
//# sourceMappingURL=market-radio.methods.e2e.js.map
