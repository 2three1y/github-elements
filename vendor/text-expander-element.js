// node_modules/@github/combobox-nav/dist/index.js
var Combobox = class {
  constructor(input, list, { tabInsertsSuggestions, defaultFirstOption, scrollIntoViewOptions } = {}) {
    this.input = input;
    this.list = list;
    this.tabInsertsSuggestions = tabInsertsSuggestions !== null && tabInsertsSuggestions !== void 0 ? tabInsertsSuggestions : true;
    this.defaultFirstOption = defaultFirstOption !== null && defaultFirstOption !== void 0 ? defaultFirstOption : false;
    this.scrollIntoViewOptions = scrollIntoViewOptions !== null && scrollIntoViewOptions !== void 0 ? scrollIntoViewOptions : { block: "nearest", inline: "nearest" };
    this.isComposing = false;
    if (!list.id) {
      list.id = `combobox-${Math.random().toString().slice(2, 6)}`;
    }
    this.ctrlBindings = !!navigator.userAgent.match(/Macintosh/);
    this.keyboardEventHandler = (event) => keyboardBindings(event, this);
    this.compositionEventHandler = (event) => trackComposition(event, this);
    this.inputHandler = this.clearSelection.bind(this);
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-controls", list.id);
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-haspopup", "listbox");
  }
  destroy() {
    this.clearSelection();
    this.stop();
    this.input.removeAttribute("role");
    this.input.removeAttribute("aria-controls");
    this.input.removeAttribute("aria-expanded");
    this.input.removeAttribute("aria-autocomplete");
    this.input.removeAttribute("aria-haspopup");
  }
  start() {
    this.input.setAttribute("aria-expanded", "true");
    this.input.addEventListener("compositionstart", this.compositionEventHandler);
    this.input.addEventListener("compositionend", this.compositionEventHandler);
    this.input.addEventListener("input", this.inputHandler);
    this.input.addEventListener("keydown", this.keyboardEventHandler);
    this.list.addEventListener("click", commitWithElement);
    this.indicateDefaultOption();
  }
  stop() {
    this.clearSelection();
    this.input.setAttribute("aria-expanded", "false");
    this.input.removeEventListener("compositionstart", this.compositionEventHandler);
    this.input.removeEventListener("compositionend", this.compositionEventHandler);
    this.input.removeEventListener("input", this.inputHandler);
    this.input.removeEventListener("keydown", this.keyboardEventHandler);
    this.list.removeEventListener("click", commitWithElement);
  }
  indicateDefaultOption() {
    var _a;
    if (this.defaultFirstOption) {
      (_a = Array.from(this.list.querySelectorAll('[role="option"]:not([aria-disabled="true"])')).filter(visible)[0]) === null || _a === void 0 ? void 0 : _a.setAttribute("data-combobox-option-default", "true");
    }
  }
  navigate(indexDiff = 1) {
    const focusEl = Array.from(this.list.querySelectorAll('[aria-selected="true"]')).filter(visible)[0];
    const els = Array.from(this.list.querySelectorAll('[role="option"]')).filter(visible);
    const focusIndex = els.indexOf(focusEl);
    if (focusIndex === els.length - 1 && indexDiff === 1 || focusIndex === 0 && indexDiff === -1) {
      this.clearSelection();
      this.input.focus();
      return;
    }
    let indexOfItem = indexDiff === 1 ? 0 : els.length - 1;
    if (focusEl && focusIndex >= 0) {
      const newIndex = focusIndex + indexDiff;
      if (newIndex >= 0 && newIndex < els.length)
        indexOfItem = newIndex;
    }
    const target = els[indexOfItem];
    if (!target)
      return;
    for (const el of els) {
      el.removeAttribute("data-combobox-option-default");
      if (target === el) {
        this.input.setAttribute("aria-activedescendant", target.id);
        target.setAttribute("aria-selected", "true");
        fireSelectEvent(target);
        target.scrollIntoView(this.scrollIntoViewOptions);
      } else {
        el.removeAttribute("aria-selected");
      }
    }
  }
  clearSelection() {
    this.input.removeAttribute("aria-activedescendant");
    for (const el of this.list.querySelectorAll('[aria-selected="true"]')) {
      el.removeAttribute("aria-selected");
    }
    this.indicateDefaultOption();
  }
};
function keyboardBindings(event, combobox) {
  if (event.shiftKey || event.metaKey || event.altKey)
    return;
  if (!combobox.ctrlBindings && event.ctrlKey)
    return;
  if (combobox.isComposing)
    return;
  switch (event.key) {
    case "Enter":
      if (commit(combobox.input, combobox.list)) {
        event.preventDefault();
      }
      break;
    case "Tab":
      if (combobox.tabInsertsSuggestions && commit(combobox.input, combobox.list)) {
        event.preventDefault();
      }
      break;
    case "Escape":
      combobox.clearSelection();
      break;
    case "ArrowDown":
      combobox.navigate(1);
      event.preventDefault();
      break;
    case "ArrowUp":
      combobox.navigate(-1);
      event.preventDefault();
      break;
    case "n":
      if (combobox.ctrlBindings && event.ctrlKey) {
        combobox.navigate(1);
        event.preventDefault();
      }
      break;
    case "p":
      if (combobox.ctrlBindings && event.ctrlKey) {
        combobox.navigate(-1);
        event.preventDefault();
      }
      break;
    default:
      if (event.ctrlKey)
        break;
      combobox.clearSelection();
  }
}
function commitWithElement(event) {
  if (!(event.target instanceof Element))
    return;
  const target = event.target.closest('[role="option"]');
  if (!target)
    return;
  if (target.getAttribute("aria-disabled") === "true")
    return;
  fireCommitEvent(target, { event });
}
function commit(input, list) {
  const target = list.querySelector('[aria-selected="true"], [data-combobox-option-default="true"]');
  if (!target)
    return false;
  if (target.getAttribute("aria-disabled") === "true")
    return true;
  target.click();
  return true;
}
function fireCommitEvent(target, detail) {
  target.dispatchEvent(new CustomEvent("combobox-commit", { bubbles: true, detail }));
}
function fireSelectEvent(target) {
  target.dispatchEvent(new Event("combobox-select", { bubbles: true }));
}
function visible(el) {
  return !el.hidden && !(el instanceof HTMLInputElement && el.type === "hidden") && (el.offsetWidth > 0 || el.offsetHeight > 0);
}
function trackComposition(event, combobox) {
  combobox.isComposing = event.type === "compositionstart";
  const list = document.getElementById(combobox.input.getAttribute("aria-controls") || "");
  if (!list)
    return;
  combobox.clearSelection();
}

// node_modules/@github/text-expander-element/dist/index.js
var boundary = /\s|\(|\[/;
function query(text, key, cursor, { multiWord, lookBackIndex, lastMatchPosition } = {
  multiWord: false,
  lookBackIndex: 0,
  lastMatchPosition: null
}) {
  let keyIndex = text.lastIndexOf(key, cursor - 1);
  if (keyIndex === -1)
    return;
  if (keyIndex < lookBackIndex)
    return;
  if (multiWord) {
    if (lastMatchPosition != null) {
      if (lastMatchPosition === keyIndex)
        return;
      keyIndex = lastMatchPosition - key.length;
    }
    const charAfterKey = text[keyIndex + 1];
    if (charAfterKey === " " && cursor >= keyIndex + key.length + 1)
      return;
    const newLineIndex = text.lastIndexOf("\n", cursor - 1);
    if (newLineIndex > keyIndex)
      return;
    const dotIndex = text.lastIndexOf(".", cursor - 1);
    if (dotIndex > keyIndex)
      return;
  } else {
    const spaceIndex = text.lastIndexOf(" ", cursor - 1);
    if (spaceIndex > keyIndex)
      return;
  }
  const pre = text[keyIndex - 1];
  if (pre && !boundary.test(pre))
    return;
  const queryString = text.substring(keyIndex + key.length, cursor);
  return {
    text: queryString,
    position: keyIndex + key.length
  };
}
var InputStyleCloneUpdateEvent = class extends Event {
  constructor() {
    super("update");
  }
};
var CloneRegistry = /* @__PURE__ */ new WeakMap();
var InputStyleClone = class _InputStyleClone extends EventTarget {
  #styleObserver = new MutationObserver(() => this.#updateStyles());
  #resizeObserver = new ResizeObserver(() => this.#requestUpdateLayout());
  // This class is unique in that it will prevent itself from getting garbage collected because of the subscribed
  // observers (if never detached). Because of this, we want to avoid preventing the existence of this class from also
  // preventing the garbage collection of the associated input. This also allows us to automatically detach if the
  // input gets collected.
  #inputRef;
  #container = document.createElement("div");
  #cloneElement = document.createElement("div");
  /**
   * Get the clone for an input, reusing an existing one if available. This avoids creating unecessary clones, which
   * have a performance cost due to their high-frequency event-based updates. Because these elements are shared, they
   * should be mutated with caution. If you're planning to mutate the clone, consider constructing a new one instead.
   *
   * Upon initial creation the clone element will automatically be inserted into the DOM and begin observing the
   * linked input.
   * @param input The target input to clone.
   */
  static for(input) {
    let clone = CloneRegistry.get(input);
    if (!clone) {
      clone = new _InputStyleClone(input);
      CloneRegistry.set(input, clone);
    }
    return clone;
  }
  /**
   * Connect this instance to a target input element and insert this instance into the DOM in the correct location.
   *
   * NOTE: calling the static `for` method is usually preferable as it will reuse an existing clone if available.
   * However, if reusing clones is problematic (ie, if the clone needs to be mutated), a clone can be constructed
   * directly with `new InputStyleClone(target)`.
   */
  constructor(input) {
    super();
    this.#inputRef = new WeakRef(input);
    this.#container.style.position = "absolute";
    this.#container.style.pointerEvents = "none";
    this.#container.setAttribute("aria-hidden", "true");
    this.#container.appendChild(this.#cloneElement);
    this.#cloneElement.style.pointerEvents = "none";
    this.#cloneElement.style.userSelect = "none";
    this.#cloneElement.style.overflow = "hidden";
    this.#cloneElement.style.display = "block";
    this.#cloneElement.style.visibility = "hidden";
    if (input instanceof HTMLTextAreaElement) {
      this.#cloneElement.style.whiteSpace = "pre-wrap";
      this.#cloneElement.style.wordWrap = "break-word";
    } else {
      this.#cloneElement.style.whiteSpace = "nowrap";
      this.#cloneElement.style.display = "table-cell";
      this.#cloneElement.style.verticalAlign = "middle";
    }
    input.after(this.#container);
    this.#updateStyles();
    this.#updateText();
    this.#styleObserver.observe(input, {
      attributeFilter: [
        "style",
        "dir"
        // users can right-click in some browsers to change the text direction dynamically
      ]
    });
    this.#resizeObserver.observe(input);
    document.addEventListener("scroll", this.#onDocumentScrollOrResize, { capture: true });
    window.addEventListener("resize", this.#onDocumentScrollOrResize, { capture: true });
    input.addEventListener("input", this.#onInput, { capture: true });
  }
  /** Get the clone element. */
  get element() {
    return this.#cloneElement;
  }
  /**
   * Force a recalculation. Will emit an `update` event. This is typically not needed unless the input has changed in
   * an unobservable way, eg by directly writing to the `value` property.
   */
  forceUpdate() {
    this.#updateStyles();
    this.#updateText();
  }
  disconnect() {
    this.#container?.remove();
    this.#styleObserver.disconnect();
    this.#resizeObserver.disconnect();
    document.removeEventListener("scroll", this.#onDocumentScrollOrResize, { capture: true });
    window.removeEventListener("resize", this.#onDocumentScrollOrResize, { capture: true });
    const input = this.#input;
    if (input) {
      input.removeEventListener("input", this.#onInput, { capture: true });
      CloneRegistry.delete(input);
    }
  }
  // --- private ---
  get #input() {
    return this.#inputRef?.deref();
  }
  /** Perform `fn` using the `input` if it is still available. If not, clean up the clone instead. */
  #usingInput(fn) {
    const input = this.#input;
    if (!input)
      return this.disconnect();
    return fn(input);
  }
  /** Current relative x-adjustment in pixels, executed via CSS transform. */
  #xOffset = 0;
  /** Current relative y-adjustment in pixels, executed via CSS transform. */
  #yOffset = 0;
  /**
   * Update only geometric properties without recalculating styles. Typically call `#requestUpdateLayout` instead to
   * only update once per animation frame.
   */
  #updateLayout() {
    this.#usingInput((input) => {
      const inputStyle = window.getComputedStyle(input);
      this.#cloneElement.style.height = inputStyle.height;
      this.#cloneElement.style.width = inputStyle.width;
      if (input.clientHeight !== this.#cloneElement.clientHeight)
        this.#cloneElement.style.height = `calc(${inputStyle.height} + ${input.clientHeight - this.#cloneElement.clientHeight}px)`;
      if (input.clientWidth !== this.#cloneElement.clientWidth)
        this.#cloneElement.style.width = `calc(${inputStyle.width} + ${input.clientWidth - this.#cloneElement.clientWidth}px)`;
      const inputRect = input.getBoundingClientRect();
      const cloneRect = this.#cloneElement.getBoundingClientRect();
      this.#xOffset = this.#xOffset + inputRect.left - cloneRect.left;
      this.#yOffset = this.#yOffset + inputRect.top - cloneRect.top;
      this.#cloneElement.style.transform = `translate(${this.#xOffset}px, ${this.#yOffset}px)`;
      this.#cloneElement.scrollTop = input.scrollTop;
      this.#cloneElement.scrollLeft = input.scrollLeft;
      this.dispatchEvent(new InputStyleCloneUpdateEvent());
    });
  }
  #isLayoutUpdating = false;
  /** Request a layout update. Will only happen once per animation frame, to avoid unecessary updates. */
  #requestUpdateLayout() {
    if (this.#isLayoutUpdating)
      return;
    this.#isLayoutUpdating = true;
    requestAnimationFrame(() => {
      this.#updateLayout();
      this.#isLayoutUpdating = false;
    });
  }
  /** Update the styles of the clone based on the styles of the input, then request a layout update. */
  #updateStyles() {
    this.#usingInput((input) => {
      const inputStyle = window.getComputedStyle(input);
      for (const prop of propertiesToCopy)
        this.#cloneElement.style[prop] = inputStyle[prop];
      this.#requestUpdateLayout();
    });
  }
  /**
   * Update the text content of the clone based on the text content of the input. Triggers a layout update in case the
   * text update caused scrolling.
   */
  #updateText() {
    this.#usingInput((input) => {
      this.#cloneElement.textContent = input.value;
      this.#updateLayout();
    });
  }
  #onInput = () => this.#updateText();
  #onDocumentScrollOrResize = (event) => {
    this.#usingInput((input) => {
      if (event.target === document || event.target === window || event.target instanceof Node && event.target.contains(input))
        this.#requestUpdateLayout();
    });
  };
};
var propertiesToCopy = [
  // RTL / vertical writing modes support:
  "direction",
  "writingMode",
  "unicodeBidi",
  "textOrientation",
  "boxSizing",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderStyle",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "fontStretch",
  "fontSize",
  "fontSizeAdjust",
  "lineHeight",
  "fontFamily",
  "textAlign",
  "textTransform",
  "textIndent",
  "textDecoration",
  "letterSpacing",
  "wordSpacing",
  "tabSize",
  "MozTabSize"
];
var InputRange = class _InputRange {
  #inputElement;
  #startOffset;
  #endOffset;
  /**
   * Construct a new `InputRange`.
   * @param element The target input element that contains the content for the range.
   * @param startOffset The inclusive 0-based start index for the range. Will be adjusted to fit in the input contents.
   * @param endOffset The exclusive 0-based end index for the range. Will be adjusted to fit in the input contents.
   */
  constructor(element, startOffset = 0, endOffset = startOffset) {
    this.#inputElement = element;
    this.#startOffset = startOffset;
    this.#endOffset = endOffset;
  }
  /**
   * Create a new range from the current user selection. If the input is not focused, the range will just be the start
   * of the input (offsets `0` to `0`).
   *
   * This can be used to get the caret coordinates: if the resulting range is `collapsed`, the location of the
   * `getBoundingClientRect` will be the location of the caret caret (note, however, that the width will be `0` in
   * this case).
   */
  static fromSelection(input) {
    const { selectionStart, selectionEnd } = input;
    return new _InputRange(input, selectionStart ?? void 0, selectionEnd ?? void 0);
  }
  /** Returns true if the start is equal to the end of this range. */
  get collapsed() {
    return this.startOffset === this.endOffset;
  }
  /** Always returns the containing input element. */
  get commonAncestorContainer() {
    return this.#inputElement;
  }
  /** Always returns the containing input element. */
  get endContainer() {
    return this.#inputElement;
  }
  /** Always returns the containing input element. */
  get startContainer() {
    return this.#inputElement;
  }
  get startOffset() {
    return this.#startOffset;
  }
  get endOffset() {
    return this.#endOffset;
  }
  /** Update the inclusive start offset. Will be adjusted to fit within the content size. */
  setStartOffset(offset) {
    this.#startOffset = this.#clampOffset(offset);
  }
  /** Update the exclusive end offset. Will be adjusted to fit within the content size. */
  setEndOffset(offset) {
    this.#endOffset = this.#clampOffset(offset);
  }
  /**
   * Collapse this range to one side.
   * @param toStart If `true`, will collapse to the start side. Otherwise, will collapse to the end.
   */
  collapse(toStart = false) {
    if (toStart)
      this.setEndOffset(this.startOffset);
    else
      this.setStartOffset(this.endOffset);
  }
  /** Returns a `DocumentFragment` containing a new `Text` node containing the content in the range. */
  cloneContents() {
    return this.#createCloneRange().cloneContents();
  }
  /** Create a copy of this range. */
  cloneRange() {
    return new _InputRange(this.#inputElement, this.startOffset, this.endOffset);
  }
  /**
   * Obtain one rect that contains the entire contents of the range. If the range spans multiple lines, this box will
   * contain all pieces of the range but may also contain some space outside the range.
   * @see https://iansan5653.github.io/dom-input-range/demos/playground/
   */
  getBoundingClientRect() {
    return this.#createCloneRange().getBoundingClientRect();
  }
  /**
   * Obtain the rects that contain contents of this range. If the range spans multiple lines, there will be multiple
   * bounding boxes. These boxes can be used, for example, to draw a highlight over the range.
   * @see https://iansan5653.github.io/dom-input-range/demos/playground/
   */
  getClientRects() {
    return this.#createCloneRange().getClientRects();
  }
  /** Get the contents of the range as a string. */
  toString() {
    return this.#createCloneRange().toString();
  }
  /**
   * Get the underlying `InputStyleClone` instance powering these calculations. This can be used to listen for
   * updates to trigger layout recalculation.
   */
  getStyleClone() {
    return this.#styleClone;
  }
  // --- private ---
  get #styleClone() {
    return InputStyleClone.for(this.#inputElement);
  }
  get #cloneElement() {
    return this.#styleClone;
  }
  #clampOffset(offset) {
    return Math.max(0, Math.min(offset, this.#inputElement.value.length));
  }
  #createCloneRange() {
    const range = document.createRange();
    const textNode = this.#cloneElement.element.childNodes[0];
    if (textNode) {
      range.setStart(textNode, this.startOffset);
      range.setEnd(textNode, this.endOffset);
    }
    return range;
  }
};
var states = /* @__PURE__ */ new WeakMap();
var TextExpander = class {
  constructor(expander, input) {
    this.expander = expander;
    this.input = input;
    this.combobox = null;
    this.menu = null;
    this.match = null;
    this.justPasted = false;
    this.lookBackIndex = 0;
    this.oninput = this.onInput.bind(this);
    this.onpaste = this.onPaste.bind(this);
    this.onkeydown = this.onKeydown.bind(this);
    this.oncommit = this.onCommit.bind(this);
    this.onmousedown = this.onMousedown.bind(this);
    this.onblur = this.onBlur.bind(this);
    this.interactingWithList = false;
    input.addEventListener("paste", this.onpaste);
    input.addEventListener("input", this.oninput);
    input.addEventListener("keydown", this.onkeydown);
    input.addEventListener("blur", this.onblur);
  }
  destroy() {
    this.input.removeEventListener("paste", this.onpaste);
    this.input.removeEventListener("input", this.oninput);
    this.input.removeEventListener("keydown", this.onkeydown);
    this.input.removeEventListener("blur", this.onblur);
  }
  dismissMenu() {
    if (this.deactivate()) {
      this.lookBackIndex = this.input.selectionEnd || this.lookBackIndex;
    }
  }
  activate(match, menu) {
    var _a, _b;
    if (this.input !== document.activeElement && this.input !== ((_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.activeElement)) {
      return;
    }
    this.deactivate();
    this.menu = menu;
    if (!menu.id)
      menu.id = `text-expander-${Math.floor(Math.random() * 1e5).toString()}`;
    this.expander.append(menu);
    this.combobox = new Combobox(this.input, menu);
    this.expander.dispatchEvent(new Event("text-expander-activate"));
    this.positionMenu(menu, match.position);
    this.combobox.start();
    menu.addEventListener("combobox-commit", this.oncommit);
    menu.addEventListener("mousedown", this.onmousedown);
    this.combobox.navigate(1);
  }
  positionMenu(menu, position) {
    const clampedPosition = Math.min(position, this.input.value.length);
    const caretRect = new InputRange(this.input, clampedPosition).getBoundingClientRect();
    const targetPosition = { left: caretRect.left, top: caretRect.top + caretRect.height };
    const currentPosition = menu.getBoundingClientRect();
    const delta = {
      left: targetPosition.left - currentPosition.left,
      top: targetPosition.top - currentPosition.top
    };
    if (delta.left !== 0 || delta.top !== 0) {
      const currentStyle = getComputedStyle(menu);
      menu.style.left = currentStyle.left ? `calc(${currentStyle.left} + ${delta.left}px)` : `${delta.left}px`;
      menu.style.top = currentStyle.top ? `calc(${currentStyle.top} + ${delta.top}px)` : `${delta.top}px`;
    }
  }
  deactivate() {
    const menu = this.menu;
    if (!menu || !this.combobox)
      return false;
    this.expander.dispatchEvent(new Event("text-expander-deactivate"));
    this.menu = null;
    menu.removeEventListener("combobox-commit", this.oncommit);
    menu.removeEventListener("mousedown", this.onmousedown);
    this.combobox.destroy();
    this.combobox = null;
    menu.remove();
    return true;
  }
  onCommit({ target }) {
    var _a;
    const item = target;
    if (!(item instanceof HTMLElement))
      return;
    if (!this.combobox)
      return;
    const match = this.match;
    if (!match)
      return;
    const beginning = this.input.value.substring(0, match.position - match.key.length);
    const remaining = this.input.value.substring(match.position + match.text.length);
    const detail = { item, key: match.key, value: null, continue: false };
    const canceled = !this.expander.dispatchEvent(new CustomEvent("text-expander-value", { cancelable: true, detail }));
    if (canceled)
      return;
    if (!detail.value)
      return;
    let suffix = (_a = this.expander.getAttribute("suffix")) !== null && _a !== void 0 ? _a : " ";
    if (detail.continue) {
      suffix = "";
    }
    const value = `${detail.value}${suffix}`;
    this.input.value = beginning + value + remaining;
    const cursor = beginning.length + value.length;
    this.deactivate();
    this.input.focus({
      preventScroll: true
    });
    this.input.selectionStart = cursor;
    this.input.selectionEnd = cursor;
    if (!detail.continue) {
      this.lookBackIndex = cursor;
      this.match = null;
    }
    this.expander.dispatchEvent(new CustomEvent("text-expander-committed", { cancelable: false, detail: { input: this.input } }));
  }
  onBlur() {
    if (this.interactingWithList) {
      this.interactingWithList = false;
      return;
    }
    this.deactivate();
  }
  onPaste() {
    this.justPasted = true;
  }
  isMatchStillValid(match) {
    return match.position <= this.input.value.length;
  }
  async onInput() {
    if (this.justPasted) {
      this.justPasted = false;
      return;
    }
    const match = this.findMatch();
    if (match) {
      this.match = match;
      const menu = await this.notifyProviders(match);
      if (!this.match || !this.isMatchStillValid(match)) {
        this.match = null;
        this.deactivate();
        return;
      }
      if (menu) {
        this.activate(match, menu);
      } else {
        this.deactivate();
      }
    } else {
      this.match = null;
      this.deactivate();
    }
  }
  findMatch() {
    const cursor = this.input.selectionEnd || 0;
    const text = this.input.value;
    if (cursor <= this.lookBackIndex) {
      this.lookBackIndex = cursor - 1;
    }
    for (const { key, multiWord } of this.expander.keys) {
      const found = query(text, key, cursor, {
        multiWord,
        lookBackIndex: this.lookBackIndex,
        lastMatchPosition: this.match ? this.match.position : null
      });
      if (found) {
        return { text: found.text, key, position: found.position };
      }
    }
  }
  async notifyProviders(match) {
    const providers = [];
    const provide = (result) => providers.push(result);
    const changeEvent = new CustomEvent("text-expander-change", {
      cancelable: true,
      detail: { provide, text: match.text, key: match.key }
    });
    const canceled = !this.expander.dispatchEvent(changeEvent);
    if (canceled)
      return;
    const all = await Promise.all(providers);
    const fragments = all.filter((x) => x.matched).map((x) => x.fragment);
    return fragments[0];
  }
  onMousedown() {
    this.interactingWithList = true;
  }
  onKeydown(event) {
    if (event.key === "Escape") {
      this.match = null;
      if (this.deactivate()) {
        this.lookBackIndex = this.input.selectionEnd || this.lookBackIndex;
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    }
  }
};
var TextExpanderElement = class extends HTMLElement {
  get keys() {
    const keysAttr = this.getAttribute("keys");
    const keys = keysAttr ? keysAttr.split(" ") : [];
    const multiWordAttr = this.getAttribute("multiword");
    const multiWord = multiWordAttr ? multiWordAttr.split(" ") : [];
    const globalMultiWord = multiWord.length === 0 && this.hasAttribute("multiword");
    return keys.map((key) => ({ key, multiWord: globalMultiWord || multiWord.includes(key) }));
  }
  set keys(value) {
    this.setAttribute("keys", value);
  }
  connectedCallback() {
    const input = this.querySelector('input[type="text"], textarea');
    if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement))
      return;
    const state = new TextExpander(this, input);
    states.set(this, state);
  }
  disconnectedCallback() {
    const state = states.get(this);
    if (!state)
      return;
    state.destroy();
    states.delete(this);
  }
  dismiss() {
    const state = states.get(this);
    if (!state)
      return;
    state.dismissMenu();
  }
};
if (!window.customElements.get("text-expander")) {
  window.TextExpanderElement = TextExpanderElement;
  window.customElements.define("text-expander", TextExpanderElement);
}
export {
  TextExpanderElement as default
};
