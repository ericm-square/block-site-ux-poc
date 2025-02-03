import { isMarketCheckbox } from "../../market-checkbox/types";
import { isMarketToggle } from "../../market-toggle/types";
export function isMarketTableV2ControlElement(value) {
    return isMarketCheckbox(value) || isMarketToggle(value);
}
//# sourceMappingURL=types.js.map
