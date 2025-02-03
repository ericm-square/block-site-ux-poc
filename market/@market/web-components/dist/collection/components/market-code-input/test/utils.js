export async function expectValueToBe(el, value) {
    // check shadow input values
    await expectInputsToBe(el, value);
    // check value attribute
    expect(el).toEqualAttribute('value', value);
    // check value property
    expect(await el.getProperty('value')).toEqual(value);
}
export async function expectInputsToBe(el, value) {
    const code = [...value];
    const inputs = await el.findAll('pierce/input');
    // pad the code array with empty values
    for (let i = value.length; i < inputs.length; i++) {
        code.push('');
    }
    inputs.forEach(async (input, i) => {
        expect(await input.getProperty('value')).toBe(code[i]);
    });
}
export async function expectInputHasFocus(el, index) {
    const input = await el.find(`pierce/input:nth-of-type(${index + 1}):focus`);
    expect(input).not.toBeNull();
}
//# sourceMappingURL=utils.js.map
