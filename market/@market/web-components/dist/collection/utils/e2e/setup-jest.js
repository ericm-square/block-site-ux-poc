const marketControlTags = new Set(['market-checkbox', 'market-radio', 'market-toggle']);
expect.extend({
    async toHaveAriaChecked(el, value) {
        const tagName = (await el.getProperty('tagName')).toLowerCase();
        const toOrNot = this.isNot ? 'NOT to' : 'to';
        const elHasAttr = el.getAttribute('aria-checked') === value;
        const pass = elHasAttr;
        const message = () => `Expected "${tagName}" ${toOrNot} be aria-checked="${value}"`;
        return { pass, message };
    },
    async toHaveReflectedBooleanProperty(el, prop) {
        const tagName = (await el.getProperty('tagName')).toLowerCase();
        const toOrNot = this.isNot ? 'NOT to' : 'to';
        const hasProp = (await el.getProperty(prop)) === true;
        const hasAttr = el.getAttribute(prop) === '';
        const pass = hasProp && hasAttr;
        const message = () => `Expected "${tagName}" ${toOrNot} have reflected boolean property "${prop}"`;
        return { pass, message };
    },
    async toBeMarketControl(el) {
        const tagName = (await el.getProperty('tagName')).toLowerCase();
        const toOrNot = this.isNot ? 'NOT to' : 'to';
        const pass = marketControlTags.has(tagName);
        const message = () => `Expected "${tagName}" ${toOrNot} be a Market control`;
        return { pass, message };
    },
    async toBeSelectedMarketControl(el) {
        const tagName = (await el.getProperty('tagName')).toLowerCase();
        const marketPropName = tagName === 'market-radio' ? 'selected' : 'checked';
        const toOrNot = this.isNot ? 'NOT to' : 'to';
        const input = await el.find('pierce/input');
        await expect(el).toBeMarketControl();
        if (this.isNot) {
            await expect(el).not.toHaveReflectedBooleanProperty(marketPropName);
            const marketProp = await el.getProperty(marketPropName);
            await expect(marketProp).toBe(false);
            const inputProp = await input.getProperty('checked');
            await expect(inputProp).toBe(false);
        }
        else {
            await expect(el).toHaveReflectedBooleanProperty(marketPropName);
            const marketProp = await el.getProperty(marketPropName);
            await expect(marketProp).toBe(true);
            const inputProp = await input.getProperty('checked');
            await expect(inputProp).toBe(true);
        }
        const message = () => `Expected "${tagName}" ${toOrNot} be a selected Market control element`;
        return { pass: !this.isNot, message };
    },
    async toBeIndeterminateMarketControl(el) {
        const tagName = (await el.getProperty('tagName')).toLowerCase();
        const toOrNot = this.isNot ? 'NOT to' : 'to';
        const input = await el.find('pierce/input');
        await expect(el).toBeMarketControl();
        if (this.isNot) {
            const inputProp = await input.getProperty('indeterminate');
            await expect(inputProp).toBe(false);
        }
        else {
            const inputProp = await input.getProperty('indeterminate');
            await expect(inputProp).toBe(true);
        }
        const message = () => `Expected "${tagName}" ${toOrNot} be an indeterminate Market control element`;
        return { pass: !this.isNot, message };
    },
    async toBeVisible(el) {
        expect(el).not.toBeNull();
        const isVisible = await el.callMethod('checkVisibility');
        if (isVisible) {
            return {
                message: () => `Expected element not to be visible`,
                pass: true,
            };
        }
        else {
            return {
                message: () => `Expected element to be visible`,
                pass: false,
            };
        }
    },
});
export {};
//# sourceMappingURL=setup-jest.js.map
