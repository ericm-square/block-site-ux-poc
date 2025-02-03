declare type TransformTagName = (tagName: string) => string;
export declare function getNamespacedTagFor<TTagName extends keyof HTMLElementTagNameMap>(tagName: TTagName): TTagName;
export declare const setTransformTagName: (transform: TransformTagName) => void;
export declare function isElementWithTagName<TTagName extends keyof HTMLElementTagNameMap>(el: Element, tagName: TTagName): el is HTMLElementTagNameMap[TTagName];
export {};
