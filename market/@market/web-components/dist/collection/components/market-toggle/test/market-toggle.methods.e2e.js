import { newE2EPage } from "@stencil/core/testing";
export const setupPage = async (content) => {
    const page = await newE2EPage();
    await page.setContent(content);
    const el = await page.find('market-toggle');
    const input = await el.find('pierce/input');
    const spy = await el.spyOnEvent('marketToggleChange');
    return { page, el, input, spy };
};
describe('market-toggle: methods', () => {
    let page;
    let el;
    let input;
    let spy;
    describe('setActive()', () => {
        describe('false -> true', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-toggle></market-toggle>'));
                el.callMethod('setActive', true);
                await page.waitForChanges();
            });
            it('is active', async () => {
                await expect(el).toHaveReflectedBooleanProperty('active');
            });
        });
        describe('true -> false', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-toggle active></market-toggle>'));
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
                ({ page, el } = await setupPage('<market-toggle></market-toggle>'));
                el.callMethod('setHover', true);
                await page.waitForChanges();
            });
            it('is hovered', async () => {
                await expect(el).toHaveReflectedBooleanProperty('hovered');
            });
        });
        describe('true -> false', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-toggle hovered></market-toggle>'));
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
                ({ page, el, input } = await setupPage('<market-toggle></market-toggle>'));
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
                ({ page, el, input } = await setupPage('<market-toggle disabled></market-toggle>'));
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
                ({ page, el } = await setupPage('<market-toggle></market-toggle>'));
                el.callMethod('setFocus', true);
                await page.waitForChanges();
            });
            it('is focused', async () => {
                await expect(el).toHaveReflectedBooleanProperty('focused');
            });
        });
        describe('true -> false', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-toggle focused></market-toggle>'));
                el.callMethod('setFocus', false);
                await page.waitForChanges();
            });
            it('is NOT focused', async () => {
                await expect(el).not.toHaveReflectedBooleanProperty('focused');
            });
        });
        describe('when disabled: false -> true', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-toggle disabled></market-toggle>'));
                el.callMethod('setFocus', true);
                await page.waitForChanges();
            });
            it('is NOT focused', async () => {
                await expect(el).not.toHaveReflectedBooleanProperty('focused');
            });
        });
        describe('when disabled: true -> false', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-toggle disabled focused></market-toggle>'));
                el.callMethod('setFocus', false);
                await page.waitForChanges();
            });
            it('is NOT focused', async () => {
                await expect(el).not.toHaveReflectedBooleanProperty('focused');
            });
        });
    });
    describe('setSelection()', () => {
        describe('when unchecked', () => {
            beforeEach(async () => {
                ({ page, el, spy } = await setupPage('<market-toggle></market-toggle>'));
            });
            describe('false -> true', () => {
                beforeEach(async () => {
                    el.callMethod('setSelection', true);
                    await page.waitForChanges();
                });
                it('is checked', async () => {
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
                it('is checked', async () => {
                    await expect(el).toBeSelectedMarketControl();
                });
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
        });
        describe('when checked', () => {
            beforeEach(async () => {
                ({ page, el, spy } = await setupPage('<market-toggle checked></market-toggle>'));
            });
            describe('true -> false', () => {
                beforeEach(async () => {
                    el.callMethod('setSelection', false);
                    await page.waitForChanges();
                });
                it('is NOT checked', async () => {
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
                it('is NOT checked', async () => {
                    await expect(el).not.toBeSelectedMarketControl();
                });
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
        });
    });
});
//# sourceMappingURL=market-toggle.methods.e2e.js.map
