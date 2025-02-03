import { newE2EPage } from "@stencil/core/testing";
export const setupPage = async (content) => {
    const page = await newE2EPage();
    await page.setContent(content);
    const el = await page.find('market-checkbox');
    const input = await el.find('pierce/input');
    const spy = await el.spyOnEvent('marketCheckboxValueChange');
    return { page, el, input, spy };
};
describe('market-checkbox: methods', () => {
    let page;
    let el;
    let input;
    let spy;
    describe('setActive()', () => {
        describe('false -> true', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-checkbox></market-checkbox>'));
                el.callMethod('setActive', true);
                await page.waitForChanges();
            });
            it('is active', async () => {
                await expect(el).toHaveReflectedBooleanProperty('active');
            });
        });
        describe('true -> false', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-checkbox active></market-checkbox>'));
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
                ({ page, el } = await setupPage('<market-checkbox></market-checkbox>'));
                el.callMethod('setHover', true);
                await page.waitForChanges();
            });
            it('is hovered', async () => {
                await expect(el).toHaveReflectedBooleanProperty('hovered');
            });
        });
        describe('true -> false', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-checkbox hovered></market-checkbox>'));
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
                ({ page, el, input } = await setupPage('<market-checkbox></market-checkbox>'));
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
                ({ page, el, input } = await setupPage('<market-checkbox disabled></market-checkbox>'));
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
                ({ page, el } = await setupPage('<market-checkbox></market-checkbox>'));
                el.callMethod('setFocus', true);
                await page.waitForChanges();
            });
            it('is focused', async () => {
                await expect(el).toHaveReflectedBooleanProperty('focused');
            });
        });
        describe('true -> false', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-checkbox focused></market-checkbox>'));
                el.callMethod('setFocus', false);
                await page.waitForChanges();
            });
            it('is NOT focused', async () => {
                await expect(el).not.toHaveReflectedBooleanProperty('focused');
            });
        });
        describe('when disabled: false -> true', () => {
            beforeEach(async () => {
                ({ page, el } = await setupPage('<market-checkbox disabled></market-checkbox>'));
                el.callMethod('setFocus', true);
                await page.waitForChanges();
            });
            it('is NOT focused', async () => {
                await expect(el).not.toHaveReflectedBooleanProperty('focused');
            });
        });
    });
    describe('setIndeterminate()', () => {
        describe('when unchecked', () => {
            describe('false -> true', () => {
                beforeEach(async () => {
                    ({ page, el, spy } = await setupPage('<market-checkbox></market-checkbox>'));
                    el.callMethod('setIndeterminate', true);
                    await page.waitForChanges();
                });
                it('is indeterminate', async () => {
                    await expect(el).toBeIndeterminateMarketControl();
                });
                // But SHOULD this fire a change event...?
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
            describe('true -> false', () => {
                beforeEach(async () => {
                    ({ page, el, spy } = await setupPage('<market-checkbox indeterminate></market-checkbox>'));
                    el.callMethod('setIndeterminate', false);
                    await page.waitForChanges();
                });
                it('is NOT indeterminate', async () => {
                    await expect(el).not.toBeIndeterminateMarketControl();
                });
                // But SHOULD this fire a change event...?
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
        });
        describe('when checked', () => {
            describe('false -> true', () => {
                beforeEach(async () => {
                    ({ page, el, spy } = await setupPage('<market-checkbox checked></market-checkbox>'));
                    el.callMethod('setIndeterminate', true);
                    await page.waitForChanges();
                });
                it('is indeterminate', async () => {
                    await expect(el).toBeIndeterminateMarketControl();
                });
                // But SHOULD this fire a change event...?
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
            describe('true -> false', () => {
                beforeEach(async () => {
                    ({ page, el, spy } = await setupPage('<market-checkbox checked indeterminate></market-checkbox>'));
                    el.callMethod('setIndeterminate', false);
                    await page.waitForChanges();
                });
                it('is NOT indeterminate', async () => {
                    await expect(el).not.toBeIndeterminateMarketControl();
                });
                // But SHOULD this fire a change event...?
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
        });
    });
    describe('setSelection()', () => {
        describe('when unchecked', () => {
            beforeEach(async () => {
                ({ page, el, spy } = await setupPage('<market-checkbox></market-checkbox>'));
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
                ({ page, el, spy } = await setupPage('<market-checkbox checked></market-checkbox>'));
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
        describe('when indeterminate', () => {
            describe('false -> true', () => {
                beforeEach(async () => {
                    ({ page, el, spy } = await setupPage('<market-checkbox indeterminate></market-checkbox>'));
                    el.callMethod('setSelection', true);
                    await page.waitForChanges();
                });
                it('is checked', async () => {
                    await expect(el).toBeSelectedMarketControl();
                });
                it('is NOT indeterminate', async () => {
                    await expect(el).not.toBeIndeterminateMarketControl();
                });
                it('fires the change event', () => {
                    expect(spy).toHaveReceivedEventTimes(1);
                    expect(spy).toHaveReceivedEventDetail({ current: true, previous: false });
                });
            });
            describe('false -> false', () => {
                beforeEach(async () => {
                    ({ page, el, spy } = await setupPage('<market-checkbox indeterminate></market-checkbox>'));
                    el.callMethod('setSelection', false);
                    await page.waitForChanges();
                });
                it('is NOT checked', async () => {
                    await expect(el).not.toBeIndeterminateMarketControl();
                });
                it('is NOT indeterminate', async () => {
                    await expect(el).not.toHaveReflectedBooleanProperty('indeterminate');
                });
                // But SHOULD this fire a change event...?
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
            describe('true -> false', () => {
                beforeEach(async () => {
                    ({ page, el, spy } = await setupPage('<market-checkbox checked indeterminate></market-checkbox>'));
                    el.callMethod('setSelection', false);
                    await page.waitForChanges();
                });
                it('is NOT checked', async () => {
                    await expect(el).not.toBeSelectedMarketControl();
                });
                it('is NOT indeterminate', async () => {
                    await expect(el).not.toBeIndeterminateMarketControl();
                });
                it('fires the change event', () => {
                    expect(spy).toHaveReceivedEventTimes(1);
                    expect(spy).toHaveReceivedEventDetail({ current: false, previous: true });
                });
            });
            describe('true -> true', () => {
                beforeEach(async () => {
                    ({ page, el, spy } = await setupPage('<market-checkbox checked indeterminate></market-checkbox>'));
                    el.callMethod('setSelection', true);
                    await page.waitForChanges();
                });
                it('is checked', async () => {
                    await expect(el).toBeSelectedMarketControl();
                });
                it('is NOT indeterminate', async () => {
                    await expect(el).not.toBeIndeterminateMarketControl();
                });
                // But SHOULD this fire a change event...?
                it('does NOT fire the change event', () => {
                    expect(spy).not.toHaveReceivedEvent();
                });
            });
        });
    });
});
//# sourceMappingURL=market-checkbox.methods.e2e.js.map
