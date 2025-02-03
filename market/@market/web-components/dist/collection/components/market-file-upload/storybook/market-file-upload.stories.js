import { html } from "lit";
import { waitForMarketHydration } from "../../../utils/wait-for-market-hydration";
import { demoFiles, MarketFileUploadTemplate } from "./market-file-upload.templates";
export default {
    title: 'Components/File Upload/API',
    component: 'market-file-upload',
    tags: ['autodocs', '!dev'],
    args: {},
};
const addFilesAndMetadataDecorator = (files = demoFiles, metadata = []) => (Story, { canvasElement }) => {
    (async () => {
        await waitForMarketHydration(canvasElement);
        const fileUpload = canvasElement.querySelector('market-file-upload');
        fileUpload.value = [...files];
        fileUpload.fileMetadata = [...metadata];
    })();
    return Story();
};
export const API = {
    render: (args) => MarketFileUploadTemplate(args),
};
export const SingleFileSelected = {
    render: (args) => MarketFileUploadTemplate(args),
    decorators: [addFilesAndMetadataDecorator()],
};
export const MultipleFilesSelected = {
    render: () => MarketFileUploadTemplate({ multiple: true }),
    decorators: [addFilesAndMetadataDecorator([...demoFiles.slice(0, 2)])],
};
export const CompactMode = {
    render: () => html `
      <div style="width: 400px; margin: 0 auto;">
        <market-file-upload compact multiple></market-file-upload>
      </div>
    `,
};
export const CustomDropZoneContent = {
    render: () => html `
    <market-file-upload>
      <market-accessory size="image">
        <market-icon name="binoculars"></market-icon>
      </market-accessory>
      <span class="paragraph-30"><market-link>Call to action</market-link> and other custom text</span>
      <p class="paragraph-20">You can replace the default drop zone content with your own custom icon and text</p>
    </market-file-upload>
  `,
};
export const CustomCompactContent = {
    render: () => html `
    <div style="width: 400px; margin: 0 auto;">
      <market-file-upload compact>
        <market-button rank="secondary" slot="compact">Custom button text</market-button>
      </market-file-upload>
    </div>
  `,
};
export const FileSubtextSize = {
    render: () => MarketFileUploadTemplate({ fileSubtext: 'size' }),
    decorators: [
        addFilesAndMetadataDecorator([new File(['mock data'], 'test-image-with-size-metadata.jpg', { type: 'image/jpg' })]),
    ],
};
export const FileSubtextType = {
    render: () => MarketFileUploadTemplate({ fileSubtext: 'type' }),
    decorators: [
        addFilesAndMetadataDecorator([new File(['mock data'], 'test-image-with-type-metadata.jpg', { type: 'image/jpg' })]),
    ],
};
export const FileMetadataCustomIcon = {
    render: () => MarketFileUploadTemplate({ multiple: true }),
    decorators: [
        addFilesAndMetadataDecorator([
            new File(['mock data'], 'test-file.txt', { type: 'text/plain' }),
            new File(['mock data'], 'test-image.jpg', { type: 'image/jpg' }),
            new File(['mock data'], 'test-image-with-custom-icon.jpg', { type: 'image/jpg' }),
        ], [{ filename: 'test-image-with-custom-icon.jpg', leadingIconName: 'binoculars' }]),
    ],
};
export const FileMetadataCustomRowStatus = {
    render: () => MarketFileUploadTemplate({ multiple: true }),
    parameters: {
        // setting a higher diff threshold because internal icon is animated
        chromatic: { diffThreshold: 0.9 },
    },
    decorators: [
        addFilesAndMetadataDecorator([...demoFiles.slice(3, 6)], [
            { filename: 'test-file.txt', status: 'loading' },
            { filename: 'test-image.gif', status: 'success', message: 'Messages do not display unless status = error' },
            {
                filename: 'test-spreadsheet.csv',
                status: 'error',
                message: 'Error message overrides existing secondary text',
            },
        ]),
    ],
};
export const AcceptPNG = {
    render: () => MarketFileUploadTemplate({ accept: 'PNG' }),
};
//# sourceMappingURL=market-file-upload.stories.js.map
