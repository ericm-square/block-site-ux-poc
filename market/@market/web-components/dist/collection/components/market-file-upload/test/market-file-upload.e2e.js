import { resolve } from "path";
import { newE2EPage } from "@stencil/core/testing";
async function verifySelectedFileRows(page, expectedFiles) {
    for (const [i, value] of expectedFiles.entries()) {
        const uploadElement = await page.find('market-file-upload');
        const fileLabel = await uploadElement.find(`pierce/market-row[data-index="${i}"] > label`);
        expect(fileLabel.innerHTML).toBe(value);
    }
}
describe('market-file-upload', () => {
    it('renders with defaults', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-file-upload></market-file-upload>');
        const element = await page.find('market-file-upload');
        expect(element).not.toBeNull();
        const input = element.shadowRoot.querySelector('input');
        expect(input).not.toBeNull();
        expect(input).toEqualAttribute('accept', '');
        expect(input).toEqualAttribute('multiple', null);
    });
    it('watches and re-renders file updates', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-file-upload></market-file-upload>');
        await page.$eval('market-file-upload', (elm) => {
            const files = [new File([''], 'test.jpg', { type: 'image/jpeg' })];
            elm.value = files;
        });
        await page.waitForChanges();
        await verifySelectedFileRows(page, ['test.jpg']);
        // verify aria-label default is being set on file row deletes
        const uploadElement = await page.find('market-file-upload');
        const fileDeleteIcon = await uploadElement.find('pierce/market-row > market-accessory[slot="trailing-accessory"]');
        expect(fileDeleteIcon).toEqualAttribute('aria-label', 'Delete');
    });
    it('renders multiple files when multiple is true', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-file-upload multiple></market-file-upload>');
        await page.$eval('market-file-upload', (elm) => {
            const files = [
                new File([''], 'test.jpg', { type: 'image/jpeg' }),
                new File([''], 'test2.jpg', { type: 'image/jpeg' }),
            ];
            elm.value = files;
        });
        await page.waitForChanges();
        await verifySelectedFileRows(page, ['test.jpg', 'test2.jpg']);
    });
    it('only renders one file when multiple is false', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-file-upload></market-file-upload>');
        await page.$eval('market-file-upload', (elm) => {
            const files = [
                new File([''], 'test.jpg', { type: 'image/jpeg' }),
                new File([''], 'test2.jpg', { type: 'image/jpeg' }),
            ];
            elm.value = files;
        });
        await page.waitForChanges();
        await verifySelectedFileRows(page, ['test.jpg']);
        const uploadElement = await page.find('market-file-upload');
        const secondFile = await uploadElement.find('pierce/market-row[data-index="1"] > label');
        expect(secondFile).toBeNull();
    });
    it('renders files on initial render', async () => {
        const page = await newE2EPage();
        await page.setContent('<div></div>');
        await page.$eval('div', (container) => {
            // since we can't inject objects on the template, via `setContent`...
            const newFileUploadEl = document.createElement('market-file-upload');
            newFileUploadEl.multiple = true;
            newFileUploadEl.value = [
                new File([''], 'test.jpg', { type: 'image/jpeg' }),
                new File([''], 'test2.jpg', { type: 'image/jpeg' }),
            ];
            container.appendChild(newFileUploadEl);
        });
        await page.waitForChanges();
        await page.waitForSelector('market-file-upload[hydrated]');
        await verifySelectedFileRows(page, ['test.jpg', 'test2.jpg']);
    });
    it('slotted button opens file chooser', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-file-upload>Drag and drop <button>here</button></market-file-upload>');
        const futureFileChooser = page.waitForFileChooser();
        const button = await page.find('market-file-upload > button');
        button.click();
        const fileChooser = await futureFileChooser;
        await fileChooser.accept([resolve(__dirname, 'test-image.png')]);
        await page.waitForChanges();
        await verifySelectedFileRows(page, ['test-image.png']);
    });
    it('clicking delete button removes file', async () => {
        const page = await newE2EPage();
        await page.setContent('<market-file-upload>Drag and drop <button>here</button></market-file-upload>');
        await page.$eval('market-file-upload', (elm) => {
            const files = [new File([''], 'test.jpg', { type: 'image/jpeg' })];
            elm.value = files;
        });
        await page.waitForChanges();
        await verifySelectedFileRows(page, ['test.jpg']);
        const uploadElement = await page.find('market-file-upload');
        const deleteButton = await uploadElement.find('pierce/market-row[data-index="0"] > market-accessory[slot="trailing-accessory"]');
        deleteButton.click();
        await page.waitForChanges();
        const row = await uploadElement.find('pierce/market-row[data-index="0"]');
        expect(row).toBeNull();
    });
    describe('when the fileMetadata config prop is used', () => {
        let page;
        let uploadElement;
        beforeEach(async () => {
            page = await newE2EPage();
            await page.setContent('<market-file-upload multiple></market-file-upload>');
            uploadElement = await page.find('market-file-upload');
            await page.$eval('market-file-upload', (el) => {
                el.value = [
                    new File([''], 'file1.txt', { type: 'text/plain' }),
                    new File([''], 'file2.csv', { type: 'text/csv' }),
                    new File([''], 'file3.jpg', { type: 'image/jpg' }),
                    new File([''], 'file4.png', { type: 'image/png' }),
                ];
            });
            await page.waitForChanges();
        });
        it('to set row status', async () => {
            await page.$eval('market-file-upload', (el) => {
                el.fileMetadata = [
                    { filename: 'file1.txt', status: 'loading' },
                    { filename: 'file3.jpg', status: 'error' },
                    { filename: 'file4.png', status: 'success' },
                ];
            });
            await page.waitForChanges();
            const loadingRow = await uploadElement.find(`pierce/market-row[data-index="0"]`); // file1.txt
            const errorRow = await uploadElement.find(`pierce/market-row[data-index="2"]`); // file3.jpg
            const successRow = await uploadElement.find(`pierce/market-row[data-index="3"]`); // file4.png
            expect(loadingRow).toEqualAttribute('data-status', 'loading');
            expect(errorRow).toEqualAttribute('data-status', 'error');
            expect(successRow).toEqualAttribute('data-status', 'success');
        });
        it('to set row message (secondary text)', async () => {
            await page.$eval('market-file-upload', (el) => {
                el.fileMetadata = [
                    { filename: 'file3.jpg', status: 'error', message: 'error message should display' },
                    { filename: 'file4.png', message: 'other messages should not' },
                ];
            });
            await page.waitForChanges();
            const errorRowSubtext = await uploadElement.find(`pierce/market-row[data-index="2"] [slot="subtext"]`); // file3.jpg
            const regularRowSubtext = await uploadElement.find(`pierce/market-row[data-index="3"] [slot="subtext"]`); // file4.png
            expect(errorRowSubtext).not.toBeNull();
            expect(regularRowSubtext).toBeNull();
        });
        it('to set custom row icon (leading accessory)', async () => {
            await page.$eval('market-file-upload', (el) => {
                el.fileMetadata = [
                    { filename: 'file2.csv', leadingIconName: 'recommend' }, // semantic icon name
                    { filename: 'file4.png', leadingIconName: 'eye-slash' }, // descriptive icon name
                ];
            });
            await page.waitForChanges();
            const defaultFileRowIcon = await uploadElement.find(`pierce/market-row[data-index="0"] [slot="leading-accessory"] market-icon`);
            const customizedFileRowIcon = await uploadElement.find(`pierce/market-row[data-index="1"] [slot="leading-accessory"] market-icon`);
            const defaultImageRowIcon = await uploadElement.find(`pierce/market-row[data-index="2"] [slot="leading-accessory"] market-icon`);
            const customizedImageRowIcon = await uploadElement.find(`pierce/market-row[data-index="3"] [slot="leading-accessory"] market-icon`);
            expect(defaultFileRowIcon).toEqualAttribute('name', 'file');
            expect(customizedFileRowIcon).toEqualAttribute('name', 'recommend');
            expect(defaultImageRowIcon).toEqualAttribute('name', 'picture');
            expect(customizedImageRowIcon).toEqualAttribute('name', 'eye-slash');
        });
    });
});
//# sourceMappingURL=market-file-upload.e2e.js.map
