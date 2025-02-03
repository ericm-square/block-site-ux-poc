import { proxyCustomElement, HTMLElement as HTMLElement$1, createEvent, h, Host } from '@stencil/core/internal/client';
import { b as getTextInputAriaLabel } from './aria.js';
import { s as submitFormImplicitly } from './forms.js';
import { g as getNamespacedTagFor } from './index2.js';
import { c as classNames } from './classnames.js';
import { g as getMaxZIndex } from './max-z-index.js';
import { v as v4 } from './v4.js';

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const sides = ['top', 'right', 'bottom', 'left'];
const alignments = ['start', 'end'];
const placements = /*#__PURE__*/sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
function getSideAxis(placement) {
  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ['left', 'right'];
  const rl = ['right', 'left'];
  const tb = ['top', 'bottom'];
  const bt = ['bottom', 'top'];
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case 'left':
    case 'right':
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter(placement => getAlignment(placement) === alignment), ...allowedPlacements.filter(placement => getAlignment(placement) !== alignment)] : allowedPlacements.filter(placement => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter(placement => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'autoPlacement',
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== undefined || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)));

      // Make `computeCoords` start from the right place.
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...(((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || []), {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];

      // There are more placements to check.
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map(d => {
        const alignment = getAlignment(d.placement);
        return [d.placement, alignment && crossAxis ?
        // Check along the mainAxis and main crossAxis side.
        d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0) :
        // Check only the mainAxis.
        d.overflows[0], d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter(d => d[2].slice(0,
      // Aligned placements should not check their opposite crossAxis
      // side.
      getAlignment(d[0]) ? 2 : 3).every(v => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          // Try next placement and re-run the lifecycle.
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some(side => overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = 'referenceHidden',
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
        case 'escaped':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
        default:
          {
            return {};
          }
      }
    }
  };
};

function getBoundingRect(rects) {
  const minX = min(...rects.map(rect => rect.left));
  const minY = min(...rects.map(rect => rect.top));
  const maxX = max(...rects.map(rect => rect.right));
  const maxY = max(...rects.map(rect => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map(rect => rectToClientRect(getBoundingRect(rect)));
}
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
const inline = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'inline',
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform,
        strategy
      } = state;
      // A MouseEvent's client{X,Y} coords can be up to 2 pixels off a
      // ClientRect's bounds, despite the event listener being triggered. A
      // padding of 2 seems to handle this issue.
      const {
        padding = 2,
        x,
        y
      } = evaluate(options, state);
      const nativeClientRects = Array.from((await (platform.getClientRects == null ? void 0 : platform.getClientRects(elements.reference))) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getPaddingObject(padding);
      function getBoundingClientRect() {
        // There are two rects and they are disjoined.
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          // Find the first rect in which the point is fully inside.
          return clientRects.find(rect => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }

        // There are 2 or more connected rects.
        if (clientRects.length >= 2) {
          if (getSideAxis(placement) === 'y') {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === 'top';
            const top = firstRect.top;
            const bottom = lastRect.bottom;
            const left = isTop ? firstRect.left : lastRect.left;
            const right = isTop ? firstRect.right : lastRect.right;
            const width = right - left;
            const height = bottom - top;
            return {
              top,
              bottom,
              left,
              right,
              width,
              height,
              x: left,
              y: top
            };
          }
          const isLeftSide = getSide(placement) === 'left';
          const maxRight = max(...clientRects.map(rect => rect.right));
          const minLeft = min(...clientRects.map(rect => rect.left));
          const measureRects = clientRects.filter(rect => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform.getElementRects({
        reference: {
          getBoundingClientRect
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = ['left', 'top'].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset, state);
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = ['top', 'left'].includes(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size$1 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  // Browsers without `ShadowRoot` support.
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
}
function isTableElement(element) {
  return ['table', 'td', 'th'].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [':popover-open', ':modal'].some(selector => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
function isLastTraversableNode(node) {
  return ['html', 'body', '#document'].includes(getNodeName(node));
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

function getCssDimensions(element) {
  const css = getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = offset$1;

/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
const autoPlacement = autoPlacement$1;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = shift$1;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
flip;

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = size$1;

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
hide;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
arrow;

/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
inline;

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
limitShift;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

/**
 * helper functions for managing callback timing (ex. delay, throttle, debounce)
 *
 * these will probably be most useful in situations where we wish to respond to
 * user input events (particularly ones that happen in "streams" like scrolling,
 * window resizing, or typing) in a performant way.
 *
 * if this file ends up larger than a few functions, we should consider bringing
 * in lodash as a dependency instead: https://lodash.com/docs
 *
 * recommended pattern for using these functions in your stencil components:
 * myEventHandler = debounce(() => {
 *   // your code
 * }, timeout)
 */
/**
 * returns a function that will not be triggered until it stops being called for
 * N milliseconds, adapted from https://davidwalsh.name/javascript-debounce-function
 *
 * @param callback - callback to be executed after the wait
 * @param {number} wait - wait in milliseconds
 */
const debounce = (callback, wait) => {
    let timeout;
    return (...args) => {
        const later = () => {
            timeout = null;
            callback.apply(undefined, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const marketSelectCss = ":host,::slotted(*),*{box-sizing:border-box}:host([disabled]){cursor:not-allowed !important;}:host([disabled]) *,:host([disabled]) ::slotted(*){cursor:not-allowed !important;pointer-events:none !important;}:host{position:relative;outline:none;font-weight:var(--field-input-weight);font-size:var(--field-input-size);line-height:var(--field-input-leading);cursor:text}:host input,:host ::slotted(input),:host textarea,:host ::slotted(textarea){width:100%;margin:0;padding:0;border:none;background-color:transparent;color:inherit;font-weight:inherit;font-size:inherit;font-family:inherit;line-height:inherit;letter-spacing:inherit;cursor:inherit}:host ::slotted(label){cursor:inherit}:host input:focus,:host ::slotted(input:focus),:host textarea:focus,:host ::slotted(textarea:focus){outline:none}:host input::-moz-placeholder,:host textarea::-moz-placeholder{color:var(--field-placeholder-text-color)}:host input::placeholder,:host textarea::placeholder{color:var(--field-placeholder-text-color)}:host ::slotted(input)::-moz-placeholder,:host ::slotted(textarea)::-moz-placeholder{color:var(--field-placeholder-text-color)}:host ::slotted(input)::placeholder,:host ::slotted(textarea)::placeholder{color:var(--field-placeholder-text-color)}:host([size='small']){font-size:var(--core-type-paragraph-20-size);line-height:var(--core-type-paragraph-20-leading)}:host{border-radius:var(--field-border-radius);background-color:var(--field-normal-state-background-color);color:var(--field-normal-state-input-color)}:host::after{content:\"\";position:absolute;inset:0;border-radius:var(--field-border-radius);box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-normal-validity-border-color);pointer-events:none}:host([invalid])::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-invalid-validity-border-color)}:host(:hover){background-color:var(--field-hover-state-background-color);color:var(--field-hover-state-input-color)}:host(:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-hover-state-normal-validity-border-color)}:host([invalid]:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-hover-state-invalid-validity-border-color)}:host([focused]){color:var(--field-focus-state-input-color)}:host([focused])::after{box-shadow:inset 0 0 0 var(--field-focus-state-border-size)\n        var(--field-focus-state-normal-validity-border-color)}:host([focused][invalid])::after{box-shadow:inset 0 0 0 var(--field-focus-state-border-size) var(--field-focus-state-invalid-validity-border-color)}:host([readonly]:hover)::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-normal-state-normal-validity-border-color)}:host([disabled]){background-color:var(--field-disabled-state-background-color) !important;color:var(--field-disabled-state-input-color) !important;cursor:not-allowed !important}:host([disabled])::after{box-shadow:inset 0 0 0 var(--field-border-size) var(--field-disabled-state-border-color) !important}:host([disabled]) ::slotted(.market-accessory),:host([disabled]) ::slotted(img[slot*=\"accessory\"]),:host([disabled]) ::slotted(svg[slot*=\"accessory\"]),:host([disabled]) ::slotted(div[slot*=\"accessory\"]){--field-disabled-state-accessory-opacity:var(--row-disabled-state-leading-accessory-opacity);opacity:var(--field-disabled-state-accessory-opacity)}:host([value=\"\"]) ::slotted(label){color:var(--field-normal-state-empty-phase-label-color)}:host(:not([value=\"\"])) ::slotted(label),:host([value=\"\"][autofilled]) ::slotted(label){color:var(--field-normal-state-float-phase-label-color)}:host(:hover) ::slotted(label){color:var(--field-hover-state-empty-phase-label-color)}:host(:not([value=\"\"]):hover) ::slotted(label),:host([value=\"\"][autofilled]:hover) ::slotted(label){color:var(--field-hover-state-float-phase-label-color)}:host([focused]) ::slotted(label){color:var(--field-focus-state-float-phase-label-color)}:host([value=\"\"][disabled]) ::slotted(label){color:var(--field-disabled-state-empty-phase-label-color)}:host(:not([value=\"\"])[disabled]) ::slotted(label),:host([value=\"\"][autofilled][disabled]) ::slotted(label){color:var(--field-disabled-state-float-phase-label-color)}:host{--field-accessory-horizontal-spacing-size:16px;--field-size-small-accessory-horizontal-spacing-size:12px;--field-size-large-image-accessory-outer-spacing-size:12px;--field-size-medium-image-accessory-outer-spacing-size:4px;--field-size-large-button-accessory-outer-spacing-size:12px;--field-size-medium-button-accessory-outer-spacing-size:4px;--field-size-large-tooltip-accessory-horizontal-spacing-size:5px;--field-size-large-tooltip-accessory-vertical-spacing-size:-1px;--field-size-small-tooltip-accessory-horizontal-spacing-size:1px}:host ::slotted([slot=\"leading-accessory\"]){flex-shrink:0;margin-right:var(--field-accessory-horizontal-spacing-size);margin-left:var(--field-accessory-horizontal-spacing-size)}:host ::slotted(.market-accessory[slot=\"leading-accessory\"][size=\"image\"]){margin-left:var(--field-size-large-image-accessory-outer-spacing-size)}:host ::slotted(.market-tooltip[slot=\"leading-accessory\"]){margin:var(--field-size-large-tooltip-accessory-vertical-spacing-size)\n      var(--field-size-large-tooltip-accessory-horizontal-spacing-size)}:host ::slotted(.market-button[slot=\"leading-accessory\"][size=\"small\"]){margin-left:var(--field-size-large-button-accessory-outer-spacing-size)}:host ::slotted([slot=\"trailing-accessory\"]){flex-shrink:0;margin-right:var(--field-accessory-horizontal-spacing-size);margin-left:var(--field-accessory-horizontal-spacing-size)}:host ::slotted(.market-accessory[slot=\"trailing-accessory\"][size=\"image\"]){margin-right:var(--field-size-large-image-accessory-outer-spacing-size)}:host ::slotted(.market-tooltip[slot=\"trailing-accessory\"]){margin:var(--field-size-large-tooltip-accessory-vertical-spacing-size)\n      var(--field-size-large-tooltip-accessory-horizontal-spacing-size)}:host ::slotted(.market-button[slot=\"trailing-accessory\"][size=\"small\"]){margin-right:var(--field-size-large-button-accessory-outer-spacing-size)}:host([size='medium']) ::slotted(.market-accessory[slot=\"leading-accessory\"][size=\"image\"]){margin-left:var(--field-size-medium-image-accessory-outer-spacing-size)}:host([size='medium']) ::slotted(.market-button[slot=\"leading-accessory\"][size=\"small\"]){margin-left:var(--field-size-medium-button-accessory-outer-spacing-size)}:host([size='medium']) ::slotted(.market-accessory[slot=\"trailing-accessory\"][size=\"image\"]){margin-right:var(--field-size-medium-image-accessory-outer-spacing-size)}:host([size='medium']) ::slotted(.market-button[slot=\"trailing-accessory\"][size=\"small\"]){margin-right:var(--field-size-medium-button-accessory-outer-spacing-size)}:host([size='small']) ::slotted([slot=\"leading-accessory\"]),:host([size='small']) ::slotted([slot=\"trailing-accessory\"]){margin-right:var(--field-size-small-accessory-horizontal-spacing-size);margin-left:var(--field-size-small-accessory-horizontal-spacing-size)}:host([size='small']) ::slotted(.market-tooltip[slot=\"leading-accessory\"]),:host([size='small']) ::slotted(.market-tooltip[slot=\"trailing-accessory\"]){margin-right:var(--field-size-small-tooltip-accessory-horizontal-spacing-size);margin-left:var(--field-size-small-tooltip-accessory-horizontal-spacing-size)}:host .label-input-container.has-leading-accessory{padding-left:0 !important;}:host .label-input-container.has-trailing-accessory{padding-right:0 !important;}:host{--field-input-animation-speed:0.2s;--field-input-label-translate:12px;--field-empty-phase-label-text-size-unitless:16;--field-float-phase-label-text-size-unitless:14;--field-size-medium-float-phase-vertical-padding-size:12px;--field-size-medium-float-phase-horizontal-padding-size:16px;--field-size-small-float-phase-vertical-padding-size:9px;--field-size-small-float-phase-horizontal-padding-size:12px;display:flex;align-items:center}:host .label-input-container,:host([value='']:not([focused]):not([autofilled])) .label-input-container{flex-grow:1;padding:var(--field-float-phase-vertical-padding-size) var(--field-float-phase-horizontal-padding-size)}:host([size='medium']) .label-input-container,:host([size='medium'][value='']:not([focused]):not([autofilled])) .label-input-container{padding:var(--field-size-medium-float-phase-vertical-padding-size)\n      var(--field-size-medium-float-phase-horizontal-padding-size)}:host([size='small']) .label-input-container,:host([size='small'][value='']:not([focused]):not([autofilled])) .label-input-container{padding:var(--field-size-small-float-phase-vertical-padding-size)\n      var(--field-size-small-float-phase-horizontal-padding-size)}:host ::slotted(label){display:block;min-height:var(--field-empty-phase-label-text-leading);font-weight:var(--field-empty-phase-label-text-weight);font-size:var(--field-empty-phase-label-text-size);line-height:var(--field-empty-phase-label-text-leading);letter-spacing:var(--field-empty-phase-label-text-tracking);transition:all var(--field-input-animation-speed);transform:translateY(var(--field-input-label-translate));transform-origin:0 0}:host(:not([value=\"\"])) ::slotted(label),:host([value=\"\"]:not([focused])[autofilled]) ::slotted(label),:host([focused]) ::slotted(label){font-weight:var(--field-float-phase-label-text-weight);transform:scale(\n        calc(var(--field-float-phase-label-text-size-unitless) / var(--field-empty-phase-label-text-size-unitless))\n      )}:host input,:host ::slotted(input),:host textarea,:host ::slotted(textarea){opacity:0%}:host([focused]) input,:host([focused]) ::slotted(input),:host([focused]) textarea,:host([focused]) ::slotted(textarea),:host(:not([value=''])) input,:host(:not([value=''])) ::slotted(input),:host(:not([value=''])) textarea,:host(:not([value=''])) ::slotted(textarea){opacity:100%}:host([size='small']) ::slotted(label),:host([size='medium']) ::slotted(label){position:absolute;overflow:hidden;clip:rect(0 0 0 0);width:1px;height:1px;white-space:nowrap;-webkit-clip-path:inset(50%);clip-path:inset(50%)}:host([size='small']) input,:host([size='small']) ::slotted(input),:host([size='small']) textarea,:host([size='small']) ::slotted(textarea),:host([size='medium']) input,:host([size='medium']) ::slotted(input),:host([size='medium']) textarea,:host([size='medium']) ::slotted(textarea){opacity:100%}:host{cursor:pointer}.label-input-container{overflow:hidden}.caret{flex-shrink:0;margin-right:var(--field-float-phase-horizontal-padding-size);pointer-events:none;transition:transform var(--field-input-animation-speed)}.caret path{fill:var(--select-caret-color)}:host([aria-expanded=\"true\"]) .caret{transform:rotate(180deg)}.placeholder{overflow:hidden;height:var(--field-input-leading);color:var(--field-placeholder-text-color);font-size:var(--field-input-size);line-height:var(--field-input-leading);text-overflow:ellipsis;white-space:nowrap;visibility:hidden}:host([focused]) .placeholder,:host([size=\"small\"]) .placeholder,:host([size=\"medium\"]) .placeholder{visibility:visible}:host([size=\"small\"]) .placeholder{height:var(--core-type-paragraph-20-leading);font-size:var(--core-type-paragraph-20-size);line-height:var(--core-type-paragraph-20-leading)}::slotted(label){cursor:pointer}::slotted([slot=\"displayed-selection\"]){min-height:0;margin:0}::slotted([slot=\"displayed-selection\"])::before,::slotted([slot=\"displayed-selection\"])::after{display:none}::slotted([slot=\"list\"]){display:none}";
const MarketSelectStyle0 = marketSelectCss;

const UP_DIRECTION = -1;
const DOWN_DIRECTION = 1;
const MarketSelect$1 = /*@__PURE__*/ proxyCustomElement(class MarketSelect extends HTMLElement$1 {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.marketSelectValueDidChange = createEvent(this, "marketSelectValueDidChange", 7);
        this.marketSelectOpened = createEvent(this, "marketSelectOpened", 7);
        this.marketSelectClosed = createEvent(this, "marketSelectClosed", 7);
        /* TYPEAHEAD FUNCTIONALITY
        - https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
        - type a character: focus moves to the next item with a name that starts with
          the typed character
        - type multiple characters in rapid succession: focus moves to the next item
          with a name that starts with the string of characters typed
        - if no match is found, focus remains where it was
        - search wraps around end of list
        */
        this.rowsInnerText = [];
        this.keypresses = [];
        this.debounceDelay = 250;
        this.setFocusOnMatch = debounce(() => {
            const searchString = this.keypresses.join('');
            // array slicing is so we start the search from the currently focused row
            const nextMatch = [
                ...this.rowsInnerText.slice(this.focusedRowIndex + 1),
                ...this.rowsInnerText.slice(0, this.focusedRowIndex + 1),
            ].find((innerText) => innerText.startsWith(searchString));
            const matchIndex = this.rowsInnerText.findIndex((innerText) => {
                return innerText.startsWith(nextMatch);
            });
            const matchingRow = this.rows[matchIndex];
            // if matching row exists and is not disabled, focus it
            if (matchingRow && !matchingRow.disabled) {
                this.focusedRowIndex = matchIndex;
                // if list is closed and single select, set the value
                if (!this.listIsActive && !this.multiselect) {
                    // row is not in the DOM, so matchingRow.click() doesn't bubble
                    // instead we manually set the value to the row's value
                    this.value = matchingRow.value;
                    // since we're bypassing marketListSelectionsDidChange event here,
                    // we also need to manually emit marketSelectValueDidChange event
                    this.marketSelectValueDidChange.emit({
                        value: this.value,
                        newSelectedOption: matchingRow,
                        newDeselectedOption: null,
                        currentSelectedOptions: [matchingRow],
                    });
                }
            }
            this.keypresses = []; // reset keypress array
        }, this.debounceDelay);
        this.list = null;
        this.rows = null;
        this.popoverElement = null;
        this.name = undefined;
        this.value = '';
        this.size = 'large';
        this.placeholder = undefined;
        this.readonly = false;
        this.disabled = false;
        this.focused = false;
        this.invalid = false;
        this.required = false;
        this.multiselect = false;
        this.popoverContainer = undefined;
        this.popoverStrategy = 'absolute';
        this.listIsActive = false;
        this.focusedRowIndex = -1;
        this.hasLeadingAccessory = false;
        this.hasTrailingAccessory = false;
    }
    valueWatcher() {
        this.propagateValue();
    }
    multiselectWatcher() {
        this.list.multiselect = this.multiselect;
    }
    focusedRowIndexWatcher() {
        var _a;
        if (this.rows) {
            this.rows.forEach((r) => r.classList.remove('pseudo-focus'));
            (_a = this.rows[this.focusedRowIndex]) === null || _a === void 0 ? void 0 : _a.classList.add('pseudo-focus');
        }
    }
    // Listener for the change event emitted by `market-list`
    handleListSelection({ detail: { currentSelectionValues, currentSelections, newDeselection, newSelection } }) {
        const value = currentSelectionValues.join(',');
        this.value = value;
        if (this.multiselect) {
            this.setFocusedRow(newDeselection || newSelection);
        }
        else {
            this.setFocusedRow(newSelection);
        }
        this.marketSelectValueDidChange.emit({
            value,
            newSelectedOption: newSelection,
            newDeselectedOption: newDeselection,
            currentSelectedOptions: currentSelections,
        });
    }
    handleListItemsFiltered() {
        window.requestAnimationFrame(() => {
            if (this.listIsActive) {
                this.updatePopper();
            }
        });
    }
    windowClick(e) {
        var _a;
        if (this.el.contains(e.target) || ((_a = this.popoverElement) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
            return;
        }
        this.focused = false;
        if (this.listIsActive) {
            this.closeList();
        }
    }
    getValues() {
        if (Array.isArray(this.value)) {
            return new Set(this.value);
        }
        return new Set(this.multiselect ? this.value.split(',') : [this.value]);
    }
    getValuesCount() {
        return this.getValues().size;
    }
    /**
     * We search based on the `value` property rather than using querySelector and the `value`
     * attribute (i.e. `market-row[value=${this.value}]`) due to rendering issues we've seen
     * with Ember/Handlebars, where the property may be set before attribute is present.
     * See here for details: https://github.com/squareup/market/issues/2635
     */
    getMatchingRows() {
        if (this.rows === null) {
            return [];
        }
        else {
            const values = this.getValues();
            return [...this.rows].filter((row) => values.has(row.value));
        }
    }
    get hasMultipleSelections() {
        return this.multiselect && this.getValues().size > 1;
    }
    getMultiselectDisplayValue() {
        const values = this.getValues();
        return values.size > 1 ? `${values.size} selected` : '';
    }
    getDisplayedSelectionRow() {
        return this.el.querySelector(`${getNamespacedTagFor('market-row')}[slot="displayed-selection"]`);
    }
    /**
     * Ensure the passed `value` is reflected in the selected list item and the displayed selection row.
     */
    propagateValue() {
        if (!this.list || !this.rows)
            return;
        const matchingRows = this.getMatchingRows();
        if (matchingRows.length === 0) {
            // there were no matching rows, so sanitize & reset the value
            this.list.value = this.value = '';
            this.focusedRowIndex = -1;
        }
        else {
            // set the list value so the correct list row will be selected
            this.list.value = this.value;
            this.setFocusedRow(matchingRows[0]);
        }
        this.displaySelection(matchingRows);
    }
    /**
     * Renders the passed row into the displayed selection slot, so it's visible
     * as the current selection in the main "input" area of the select.
     */
    displaySelection(selectedRows = []) {
        var _a, _b, _c;
        // Remove existing selected row from the DOM
        (_b = (_a = this.getDisplayedSelectionRow()) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
        if (selectedRows.length === 1) {
            /**
             * For single select, we need to clone the row from the list so we can place a
             * duplicate into the field area. If we don't clone it, the row
             * will be removed from the list when we append it to the selection area
             */
            const clonedRow = selectedRows[0].cloneNode(true);
            // Row was cloned from the list, so we need to remove its interactive attribute + reset its role
            clonedRow.interactive = false;
            clonedRow.removeAttribute('tabindex');
            clonedRow.setAttribute('role', 'listitem'); // needed after Stencil 4 upgrade
            // don't duplicate cloned element IDs!
            clonedRow.removeAttribute('id');
            clonedRow.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
            // We don't want the row to show as "focused" inside the select box
            clonedRow.classList.remove('pseudo-focus');
            /**
             * Set slot='displayed-selection' so this shows up within the slotted area.
             * We use a slot instead of appending this directly into the shadowDOM
             * because we want to keep whatever styling cascaded from the Light DOM
             * on the row because market - row can accept any markup.
             */
            clonedRow.setAttribute('slot', 'displayed-selection');
            // if the select size is small, the selected row needs to be small too
            clonedRow.size = this.size === 'small' ? 'small' : 'medium';
            // Append the cloned node after the first slot element (label).
            this.el.append(clonedRow);
        }
        else if (selectedRows.length > 1) {
            /**
             * For multiselect, we need to create a `market-row` element to display "n selected"
             * and possibly clone the "selected-translation" slot, if provided
             */
            const multiselectDisplayRow = document.createElement(`${getNamespacedTagFor('market-row')}`);
            multiselectDisplayRow.setAttribute('slot', 'displayed-selection');
            multiselectDisplayRow.innerText = `${this.getValuesCount().toLocaleString()} `;
            // if the select size is small, the selected row needs to be small too
            multiselectDisplayRow.size = this.size === 'small' ? 'small' : 'medium';
            // Add slot for "selected"
            const selectedTranslationSlot = document.createElement('slot');
            selectedTranslationSlot.setAttribute('name', 'selected-translation');
            // Clone the contents of the "selected-translation"
            const selectedTranslation = this.el.querySelector('[slot="selected-translation"]');
            selectedTranslationSlot.innerHTML = (_c = selectedTranslation === null || selectedTranslation === void 0 ? void 0 : selectedTranslation.innerHTML) !== null && _c !== void 0 ? _c : 'selected';
            multiselectDisplayRow.appendChild(selectedTranslationSlot);
            // Observe for changes on the "selected-translation" slot
            if (selectedTranslation) {
                const observer = new MutationObserver(() => {
                    selectedTranslationSlot.innerHTML = selectedTranslation === null || selectedTranslation === void 0 ? void 0 : selectedTranslation.innerHTML;
                });
                observer.observe(selectedTranslation, { characterData: true, subtree: true });
            }
            this.el.append(multiselectDisplayRow);
        }
    }
    /**
     * Listens to changes in list content to ensure that if the content is dynamically updated,
     * those changes will be copied to the popover and the displayed-selection row.
     */
    initListObserver() {
        const observer = new MutationObserver(this.onListChange.bind(this));
        observer.observe(this.list, { childList: true, characterData: true, subtree: true });
    }
    onListChange() {
        this.initRows();
        this.propagateValue();
        this.updatePopper();
    }
    /**
     * Record the index of the new selected row for keyboard navigation
     */
    setFocusedRow(row) {
        this.focusedRowIndex = Array.prototype.indexOf.call(this.rows, row);
    }
    /**
     * Opens the select.
     */
    async openList() {
        if (this.listIsActive || !this.popoverElement) {
            return Promise.resolve();
        }
        const container = this.el.closest(this.popoverContainer) || document.body;
        Object.assign(this.popoverElement.style, {
            zIndex: `${getMaxZIndex(container) + 1}`,
            visibility: 'hidden',
        });
        this.moveListToPopover();
        container.append(this.popoverElement);
        this.initPopperListeners();
        return new Promise((resolve) => {
            // hack: ensure initial position is correctly set before visible
            setTimeout(() => {
                this.updatePopper();
                this.popoverElement.style.visibility = 'visible';
                this.listIsActive = true;
                this.marketSelectOpened.emit();
                resolve();
            }, 50);
        });
    }
    /**
     * Closes the select.
     */
    closeList() {
        if (!this.listIsActive) {
            return Promise.resolve();
        }
        this.popoverElement.remove();
        this.cleanupPopperListeners();
        this.moveListToSelect();
        this.listIsActive = false;
        this.marketSelectClosed.emit();
        return Promise.resolve();
    }
    /**
     * Toggles the select open and closed.
     */
    async toggleList() {
        this.listIsActive ? await this.closeList() : await this.openList();
    }
    /* KEYBOARD ACCESSIBILITY */
    // keyboard handler on the trigger (separate from the list)
    handleTriggerKeyDown(ev) {
        switch (ev.key) {
            case 'ArrowDown':
                this.handleArrowKey(ev, DOWN_DIRECTION);
                break;
            case 'ArrowUp':
                this.handleArrowKey(ev, UP_DIRECTION);
                break;
            case ' ':
                this.handleSpacebar(ev);
                break;
            case 'Enter':
                this.handleEnterKey();
                break;
            case 'Escape':
                this.handleEscape();
                break;
            case 'Tab':
                this.handleTab(ev);
                break;
            case 'Home':
                this.handleHomeKey(ev);
                break;
            case 'End':
                this.handleEndKey(ev);
                break;
            default:
                this.typeaheadHandler(ev);
                break;
        }
        ev.stopPropagation();
    }
    /**
     * NOTE: market-list has its own internal keyboard functionality,
     * so we only handle the key presses while the parent select is focused.
     *
     * - if the list is open:
     *   - update the selected row to the next or previous row depending on the arrow direction
     * - if the list is closed:
     *   - open the list
     */
    async handleArrowKey(ev, direction) {
        ev.preventDefault(); // do not scroll page while select has focus
        if (this.listIsActive) {
            for (let i = this.focusedRowIndex + direction; i >= 0 && i < this.rows.length; i += direction) {
                if (!this.rows[i].disabled) {
                    this.focusedRowIndex = i;
                    break;
                }
            }
        }
        else {
            await this.openList();
        }
    }
    /**
     * - if the list is open:
     *   - close it
     * - if the list is closed:
     *   - open the list
     *   - if there is a current selection, focus it
     */
    async handleSpacebar(ev) {
        var _a;
        ev.preventDefault(); // do not scroll page while select has focus
        if (this.listIsActive) {
            (_a = this.rows[this.focusedRowIndex]) === null || _a === void 0 ? void 0 : _a.toggle();
        }
        else {
            await this.openList();
        }
    }
    /**
     * when the list is closed, invoke implicit submission
     */
    handleEnterKey() {
        var _a;
        if (this.listIsActive) {
            (_a = this.rows[this.focusedRowIndex]) === null || _a === void 0 ? void 0 : _a.select();
            this.closeList();
        }
        else {
            submitFormImplicitly(this.el);
        }
    }
    /*
    - when the list is open, close it
    */
    handleEscape() {
        if (this.listIsActive) {
            this.closeList();
        }
    }
    /*
    - when the list is open, suppress tab navigation
    - when the list is closed, allow tab navigation and remove focus
    */
    handleTab(ev) {
        if (this.listIsActive) {
            ev.preventDefault();
        }
        else {
            this.focused = false;
        }
    }
    // On Mac, use Fn-Left as "Home"
    handleHomeKey(ev) {
        if (this.listIsActive) {
            ev.preventDefault();
            this.focusedRowIndex = 0;
        }
    }
    // On Mac, use Fn-Right as "End"
    handleEndKey(ev) {
        if (this.listIsActive) {
            ev.preventDefault();
            this.focusedRowIndex = this.rows.length - 1;
        }
    }
    // keyboard handler on the list (separate from the trigger)
    handleListKeyDown(ev) {
        switch (ev.key) {
            case 'Enter':
                this.handleListEnter();
                break;
            case 'Escape':
                this.handleEscape();
                break;
            case 'Tab':
                this.handleTab(ev);
                break;
            case ' ':
                this.handleListSpacebar(ev);
                break;
            default:
                this.typeaheadHandler(ev);
                break;
        }
        ev.stopPropagation();
    }
    /**
     * market-list handles selection functionality internally
     * just need to close the list if single select
     */
    handleListSpacebar(ev) {
        // do nothing if list is multiselect or keydown event is emitted by typing into a slotted search input
        if (this.multiselect || ev.target.hasAttribute('slot', 'search')) {
            return;
        }
        ev.preventDefault(); // do not scroll page while select has focus
        this.closeList();
        this.el.focus();
    }
    /**
     * market-list handles selection functionality internally
     * just need to close the list if single select
     */
    handleListEnter() {
        if (!this.multiselect) {
            this.closeList();
            this.el.focus();
        }
    }
    typeaheadHandler(ev) {
        var _a;
        // if list has a search, that will be used instead of a typeahead
        if ((_a = this.list) === null || _a === void 0 ? void 0 : _a.hasAttribute('has-search')) {
            // TODO: Proxy key events to the search input
            return;
        }
        // because this is the default keydown event handler, we're ignoring
        // "special" keys, numbers, and punctuation for typeahead functionality
        // note that this check will also ignore characters from languages that have
        // no concept of upper/lowercase (ex. japanese)
        // TODO: revisit if localization requires it
        if (ev.key.length > 1 || ev.key.toUpperCase() === ev.key.toLowerCase()) {
            return;
        }
        this.storeKeypresses(ev);
        this.setFocusOnMatch();
    }
    storeKeypresses(ev) {
        this.keypresses = [...this.keypresses, ev.key];
    }
    /* EVENT HANDLING */
    handleFocus() {
        if (this.readonly || this.disabled) {
            return;
        }
        this.focused = true;
    }
    handleTriggerClick(ev) {
        if (ev.target.tagName.toLowerCase() === getNamespacedTagFor('market-tooltip')) {
            return;
        }
        if (this.readonly || this.disabled) {
            return;
        }
        this.toggleList();
    }
    handleListClick() {
        if (!this.multiselect) {
            this.closeList();
            this.el.focus();
        }
    }
    initPopperListeners() {
        const { el, popoverElement, updatePopper } = this;
        this.cleanupPopperListeners = autoUpdate(el, popoverElement, updatePopper.bind(this), {
            elementResize: false,
        });
    }
    updatePopper() {
        const { el, popoverElement, popoverStrategy } = this;
        // TODO: use design tokens
        const MARGIN_OFFSET = 8;
        const MAX_HEIGHT = 464;
        computePosition(el, popoverElement, {
            strategy: popoverStrategy,
            middleware: [
                offset(MARGIN_OFFSET),
                autoPlacement({
                    allowedPlacements: ['top', 'bottom'],
                }),
                size({
                    apply({ rects, availableHeight }) {
                        Object.assign(popoverElement.style, {
                            width: `${rects.reference.width}px`,
                            maxHeight: `${Math.min(availableHeight - MARGIN_OFFSET, MAX_HEIGHT)}px`,
                        });
                    },
                }),
                shift({ padding: MARGIN_OFFSET }),
            ],
        }).then(({ x, y }) => {
            Object.assign(popoverElement.style, {
                left: `${x}px`,
                top: `${y}px`,
            });
        });
    }
    initPopover() {
        this.popoverElement =
            this.popoverElement ||
                document.createElement(getNamespacedTagFor('market-popover'));
        this.popoverElement.id = this.popoverId;
        this.popoverElement.style.position = this.popoverStrategy;
    }
    initList() {
        this.list = this.el.querySelector('[slot="list"]');
        this.list.interactive = true;
        this.list.multiselect = this.multiselect;
        this.list.addEventListener('marketListSelectionsDidChange', this.handleListSelection.bind(this));
        this.list.addEventListener('marketListItemsFiltered', this.handleListItemsFiltered.bind(this));
        this.list.addEventListener('keydown', this.handleListKeyDown.bind(this));
        this.list.addEventListener('click', this.handleListClick.bind(this));
    }
    initRows() {
        this.rows = this.list.querySelectorAll(`${getNamespacedTagFor('market-row')}`);
        this.rows.forEach((row) => {
            // Set an ID for the row if it doesn't have one (we need this for aria-activedescendant)
            if (!row.id) {
                row.id = `market-row-${v4()}`;
            }
        });
        // used for typeahead functionality
        this.rowsInnerText = [...this.rows]
            .filter((row) => {
            /**
             * Addresses an issue in test environments where the innerText of
             * market-rows isn't set before componentWillLoad of the parent market-select (this file)
             * is executed.
             */
            return row && row.innerText;
        })
            .map((row) => row.innerText.trim().toLowerCase());
    }
    moveListToPopover() {
        this.list.removeAttribute('slot');
        this.popoverElement.append(this.list);
    }
    moveListToSelect() {
        this.list.setAttribute('slot', 'list');
        this.el.append(this.list);
    }
    /* COMPONENT LIFECYCLE EVENTS AND HELPERS */
    registerSlottedAccessories() {
        const leadingAccessory = [...this.el.children].filter(function (child) {
            return child.matches('[slot="leading-accessory"]');
        });
        const trailingAccessory = [...this.el.children].filter(function (child) {
            return child.matches('[slot="trailing-accessory"]');
        });
        this.hasLeadingAccessory = leadingAccessory.length > 0;
        this.hasTrailingAccessory = trailingAccessory.length > 0;
    }
    componentWillLoad() {
        this.registerSlottedAccessories();
        this.popoverId = this.popoverId || `popover-${v4()}`;
    }
    componentDidLoad() {
        this.initList();
        this.initRows();
        this.initPopover();
        this.initListObserver();
        this.propagateValue();
    }
    componentWillRender() {
        const { listIsActive, list } = this;
        if (list && listIsActive) {
            list.removeAttribute('slot');
        }
    }
    disconnectedCallback() {
        this.closeList();
    }
    render() {
        const tabindex = this.disabled ? null : '0';
        return (h(Host, { key: '9dc67f571060f9c4d9fc02684f5a1e6a4aeaf1ab', class: "market-select", role: "combobox", "aria-label": getTextInputAriaLabel(this.el), "aria-expanded": this.listIsActive.toString(), "aria-controls": this.popoverId, "aria-activedescendant": this.focusedRowIndex > -1 ? this.rows[this.focusedRowIndex].id : null, "aria-required": this.required.toString(), tabindex: tabindex, onClick: (e) => {
                this.handleTriggerClick(e);
            }, onFocus: () => {
                this.handleFocus();
            }, onKeyDown: (e) => {
                this.handleTriggerKeyDown(e);
            } }, h("slot", { key: '4b32c361f91a9e3ec8d602cf1f876008f5faca75', name: "leading-accessory", onSlotchange: () => this.registerSlottedAccessories() }), h("div", { key: '2f0a75e0c406f2b1e84c0c050505109f2f6707dc', class: classNames('label-input-container', {
                'has-leading-accessory': this.hasLeadingAccessory,
                'has-trailing-accessory': this.hasTrailingAccessory,
            }) }, h("slot", { key: '01e62bf7c3d22901f05ba0d050e5acb2a40fca34' }), h("slot", { key: '6e3f1047cda70d511eb140be503f536991002af0', name: "displayed-selection" }, h("div", { key: 'f82cb1204a14479df042296bcdf038a5050b10eb', class: "placeholder" }, this.placeholder))), h("slot", { key: 'c101691da11b4a75af72cafa91f42fc7bb8da3b1', name: "list" }), h("slot", { key: 'a156419f608e21bec5ea1d6075fc07f7638dfe96', name: "trailing-accessory", onSlotchange: () => this.registerSlottedAccessories() }), h("svg", { key: '7fa3d353a90501483e0e5adb804af1b51a1b5593', class: "caret", width: "14", height: "8", viewBox: "0 0 14 8", xmlns: "http://www.w3.org/2000/svg" }, h("path", { key: '4e3ff52b7499db8f87bfae74ef7757378858891b', "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.70715 7.70711C7.31663 8.09763 6.68346 8.09763 6.29294 7.70711L0.29294 1.70711L1.70715 0.292892L7.00005 5.58579L12.2929 0.292893L13.7072 1.70711L7.70715 7.70711Z", fill: "black" }))));
    }
    get el() { return this; }
    static get watchers() { return {
        "value": ["valueWatcher"],
        "multiselect": ["multiselectWatcher"],
        "focusedRowIndex": ["focusedRowIndexWatcher"]
    }; }
    static get style() { return MarketSelectStyle0; }
}, [1, "market-select", {
        "name": [1],
        "value": [1537],
        "size": [513],
        "placeholder": [1],
        "readonly": [516],
        "disabled": [516],
        "focused": [1540],
        "invalid": [516],
        "required": [516],
        "multiselect": [516],
        "popoverContainer": [1, "popover-container"],
        "popoverStrategy": [1, "popover-strategy"],
        "listIsActive": [32],
        "focusedRowIndex": [32],
        "hasLeadingAccessory": [32],
        "hasTrailingAccessory": [32],
        "openList": [64],
        "closeList": [64],
        "toggleList": [64]
    }, [[8, "click", "windowClick"]], {
        "value": ["valueWatcher"],
        "multiselect": ["multiselectWatcher"],
        "focusedRowIndex": ["focusedRowIndexWatcher"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["market-select"];
    components.forEach(tagName => { switch (tagName) {
        case "market-select":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, MarketSelect$1);
            }
            break;
    } });
}

const MarketSelect = MarketSelect$1;
const defineCustomElement = defineCustomElement$1;

export { MarketSelect, defineCustomElement };

//# sourceMappingURL=market-select.js.map