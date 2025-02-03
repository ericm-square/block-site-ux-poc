interface MarketElement extends Element {
    componentOnReady: () => Promise<unknown>;
}
export default function (node: Node): node is MarketElement;
export {};
