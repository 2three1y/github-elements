// node_modules/@github/g-emoji-element/dist/index.js
function isEmojiSupported() {
  const onWindows7 = /\bWindows NT 6.1\b/.test(navigator.userAgent);
  const onWindows8 = /\bWindows NT 6.2\b/.test(navigator.userAgent);
  const onWindows81 = /\bWindows NT 6.3\b/.test(navigator.userAgent);
  const onFreeBSD = /\bFreeBSD\b/.test(navigator.userAgent);
  const onLinux = /\bLinux\b/.test(navigator.userAgent) && !/\bAndroid\b/.test(navigator.userAgent);
  return !(onWindows7 || onWindows8 || onWindows81 || onLinux || onFreeBSD);
}
var supported = /* @__PURE__ */ new Set([
  "\u{1F44B}",
  "\u{1F91A}",
  "\u{1F590}\uFE0F",
  "\u270B",
  "\u{1F596}",
  "\u{1F44C}",
  "\u{1F90F}",
  "\u270C\uFE0F",
  "\u{1F91E}",
  "\u{1F91F}",
  "\u{1F918}",
  "\u{1F919}",
  "\u{1F448}",
  "\u{1F449}",
  "\u{1F446}",
  "\u{1F595}",
  "\u{1F447}",
  "\u261D\uFE0F",
  "\u{1F44D}",
  "\u{1F44E}",
  "\u270A",
  "\u{1F44A}",
  "\u{1F91B}",
  "\u{1F91C}",
  "\u{1F44F}",
  "\u{1F64C}",
  "\u{1F450}",
  "\u{1F932}",
  "\u{1F64F}",
  "\u270D\uFE0F",
  "\u{1F485}",
  "\u{1F933}",
  "\u{1F4AA}",
  "\u{1F9B5}",
  "\u{1F9B6}",
  "\u{1F442}",
  "\u{1F9BB}",
  "\u{1F443}",
  "\u{1F476}",
  "\u{1F9D2}",
  "\u{1F466}",
  "\u{1F467}",
  "\u{1F9D1}",
  "\u{1F471}",
  "\u{1F468}",
  "\u{1F9D4}",
  "\u{1F471}\u200D\u2642\uFE0F",
  "\u{1F468}\u200D\u{1F9B0}",
  "\u{1F468}\u200D\u{1F9B1}",
  "\u{1F468}\u200D\u{1F9B3}",
  "\u{1F468}\u200D\u{1F9B2}",
  "\u{1F469}",
  "\u{1F471}\u200D\u2640\uFE0F",
  "\u{1F469}\u200D\u{1F9B0}",
  "\u{1F469}\u200D\u{1F9B1}",
  "\u{1F469}\u200D\u{1F9B3}",
  "\u{1F469}\u200D\u{1F9B2}",
  "\u{1F9D3}",
  "\u{1F474}",
  "\u{1F475}",
  "\u{1F64D}",
  "\u{1F64D}\u200D\u2642\uFE0F",
  "\u{1F64D}\u200D\u2640\uFE0F",
  "\u{1F64E}",
  "\u{1F64E}\u200D\u2642\uFE0F",
  "\u{1F64E}\u200D\u2640\uFE0F",
  "\u{1F645}",
  "\u{1F645}\u200D\u2642\uFE0F",
  "\u{1F645}\u200D\u2640\uFE0F",
  "\u{1F646}",
  "\u{1F646}\u200D\u2642\uFE0F",
  "\u{1F646}\u200D\u2640\uFE0F",
  "\u{1F481}",
  "\u{1F481}\u200D\u2642\uFE0F",
  "\u{1F481}\u200D\u2640\uFE0F",
  "\u{1F64B}",
  "\u{1F64B}\u200D\u2642\uFE0F",
  "\u{1F64B}\u200D\u2640\uFE0F",
  "\u{1F9CF}",
  "\u{1F9CF}\u200D\u2642\uFE0F",
  "\u{1F9CF}\u200D\u2640\uFE0F",
  "\u{1F647}",
  "\u{1F647}\u200D\u2642\uFE0F",
  "\u{1F647}\u200D\u2640\uFE0F",
  "\u{1F926}",
  "\u{1F926}\u200D\u2642\uFE0F",
  "\u{1F926}\u200D\u2640\uFE0F",
  "\u{1F937}",
  "\u{1F937}\u200D\u2642\uFE0F",
  "\u{1F937}\u200D\u2640\uFE0F",
  "\u{1F468}\u200D\u2695\uFE0F",
  "\u{1F469}\u200D\u2695\uFE0F",
  "\u{1F468}\u200D\u{1F393}",
  "\u{1F469}\u200D\u{1F393}",
  "\u{1F468}\u200D\u{1F3EB}",
  "\u{1F469}\u200D\u{1F3EB}",
  "\u{1F468}\u200D\u2696\uFE0F",
  "\u{1F469}\u200D\u2696\uFE0F",
  "\u{1F468}\u200D\u{1F33E}",
  "\u{1F469}\u200D\u{1F33E}",
  "\u{1F468}\u200D\u{1F373}",
  "\u{1F469}\u200D\u{1F373}",
  "\u{1F468}\u200D\u{1F527}",
  "\u{1F469}\u200D\u{1F527}",
  "\u{1F468}\u200D\u{1F3ED}",
  "\u{1F469}\u200D\u{1F3ED}",
  "\u{1F468}\u200D\u{1F4BC}",
  "\u{1F469}\u200D\u{1F4BC}",
  "\u{1F468}\u200D\u{1F52C}",
  "\u{1F469}\u200D\u{1F52C}",
  "\u{1F468}\u200D\u{1F4BB}",
  "\u{1F469}\u200D\u{1F4BB}",
  "\u{1F468}\u200D\u{1F3A4}",
  "\u{1F469}\u200D\u{1F3A4}",
  "\u{1F468}\u200D\u{1F3A8}",
  "\u{1F469}\u200D\u{1F3A8}",
  "\u{1F468}\u200D\u2708\uFE0F",
  "\u{1F469}\u200D\u2708\uFE0F",
  "\u{1F468}\u200D\u{1F680}",
  "\u{1F469}\u200D\u{1F680}",
  "\u{1F468}\u200D\u{1F692}",
  "\u{1F469}\u200D\u{1F692}",
  "\u{1F46E}",
  "\u{1F46E}\u200D\u2642\uFE0F",
  "\u{1F46E}\u200D\u2640\uFE0F",
  "\u{1F575}\uFE0F",
  "\u{1F575}\uFE0F\u200D\u2642\uFE0F",
  "\u{1F575}\uFE0F\u200D\u2640\uFE0F",
  "\u{1F482}",
  "\u{1F482}\u200D\u2642\uFE0F",
  "\u{1F482}\u200D\u2640\uFE0F",
  "\u{1F477}",
  "\u{1F477}\u200D\u2642\uFE0F",
  "\u{1F477}\u200D\u2640\uFE0F",
  "\u{1F934}",
  "\u{1F478}",
  "\u{1F473}",
  "\u{1F473}\u200D\u2642\uFE0F",
  "\u{1F473}\u200D\u2640\uFE0F",
  "\u{1F472}",
  "\u{1F9D5}",
  "\u{1F935}",
  "\u{1F470}",
  "\u{1F930}",
  "\u{1F931}",
  "\u{1F47C}",
  "\u{1F385}",
  "\u{1F936}",
  "\u{1F9B8}",
  "\u{1F9B8}\u200D\u2642\uFE0F",
  "\u{1F9B8}\u200D\u2640\uFE0F",
  "\u{1F9B9}",
  "\u{1F9B9}\u200D\u2642\uFE0F",
  "\u{1F9B9}\u200D\u2640\uFE0F",
  "\u{1F9D9}",
  "\u{1F9D9}\u200D\u2642\uFE0F",
  "\u{1F9D9}\u200D\u2640\uFE0F",
  "\u{1F9DA}",
  "\u{1F9DA}\u200D\u2642\uFE0F",
  "\u{1F9DA}\u200D\u2640\uFE0F",
  "\u{1F9DB}",
  "\u{1F9DB}\u200D\u2642\uFE0F",
  "\u{1F9DB}\u200D\u2640\uFE0F",
  "\u{1F9DC}",
  "\u{1F9DC}\u200D\u2642\uFE0F",
  "\u{1F9DC}\u200D\u2640\uFE0F",
  "\u{1F9DD}",
  "\u{1F9DD}\u200D\u2642\uFE0F",
  "\u{1F9DD}\u200D\u2640\uFE0F",
  "\u{1F486}",
  "\u{1F486}\u200D\u2642\uFE0F",
  "\u{1F486}\u200D\u2640\uFE0F",
  "\u{1F487}",
  "\u{1F487}\u200D\u2642\uFE0F",
  "\u{1F487}\u200D\u2640\uFE0F",
  "\u{1F6B6}",
  "\u{1F6B6}\u200D\u2642\uFE0F",
  "\u{1F6B6}\u200D\u2640\uFE0F",
  "\u{1F9CD}",
  "\u{1F9CD}\u200D\u2642\uFE0F",
  "\u{1F9CD}\u200D\u2640\uFE0F",
  "\u{1F9CE}",
  "\u{1F9CE}\u200D\u2642\uFE0F",
  "\u{1F9CE}\u200D\u2640\uFE0F",
  "\u{1F468}\u200D\u{1F9AF}",
  "\u{1F469}\u200D\u{1F9AF}",
  "\u{1F468}\u200D\u{1F9BC}",
  "\u{1F469}\u200D\u{1F9BC}",
  "\u{1F468}\u200D\u{1F9BD}",
  "\u{1F469}\u200D\u{1F9BD}",
  "\u{1F3C3}",
  "\u{1F3C3}\u200D\u2642\uFE0F",
  "\u{1F3C3}\u200D\u2640\uFE0F",
  "\u{1F483}",
  "\u{1F57A}",
  "\u{1F574}\uFE0F",
  "\u{1F9D6}",
  "\u{1F9D6}\u200D\u2642\uFE0F",
  "\u{1F9D6}\u200D\u2640\uFE0F",
  "\u{1F9D7}",
  "\u{1F9D7}\u200D\u2642\uFE0F",
  "\u{1F9D7}\u200D\u2640\uFE0F",
  "\u{1F3C7}",
  "\u{1F3C2}",
  "\u{1F3CC}\uFE0F",
  "\u{1F3CC}\uFE0F\u200D\u2642\uFE0F",
  "\u{1F3CC}\uFE0F\u200D\u2640\uFE0F",
  "\u{1F3C4}",
  "\u{1F3C4}\u200D\u2642\uFE0F",
  "\u{1F3C4}\u200D\u2640\uFE0F",
  "\u{1F6A3}",
  "\u{1F6A3}\u200D\u2642\uFE0F",
  "\u{1F6A3}\u200D\u2640\uFE0F",
  "\u{1F3CA}",
  "\u{1F3CA}\u200D\u2642\uFE0F",
  "\u{1F3CA}\u200D\u2640\uFE0F",
  "\u26F9\uFE0F",
  "\u26F9\uFE0F\u200D\u2642\uFE0F",
  "\u26F9\uFE0F\u200D\u2640\uFE0F",
  "\u{1F3CB}\uFE0F",
  "\u{1F3CB}\uFE0F\u200D\u2642\uFE0F",
  "\u{1F3CB}\uFE0F\u200D\u2640\uFE0F",
  "\u{1F6B4}",
  "\u{1F6B4}\u200D\u2642\uFE0F",
  "\u{1F6B4}\u200D\u2640\uFE0F",
  "\u{1F6B5}",
  "\u{1F6B5}\u200D\u2642\uFE0F",
  "\u{1F6B5}\u200D\u2640\uFE0F",
  "\u{1F938}",
  "\u{1F938}\u200D\u2642\uFE0F",
  "\u{1F938}\u200D\u2640\uFE0F",
  "\u{1F93D}",
  "\u{1F93D}\u200D\u2642\uFE0F",
  "\u{1F93D}\u200D\u2640\uFE0F",
  "\u{1F93E}",
  "\u{1F93E}\u200D\u2642\uFE0F",
  "\u{1F93E}\u200D\u2640\uFE0F",
  "\u{1F939}",
  "\u{1F939}\u200D\u2642\uFE0F",
  "\u{1F939}\u200D\u2640\uFE0F",
  "\u{1F9D8}",
  "\u{1F9D8}\u200D\u2642\uFE0F",
  "\u{1F9D8}\u200D\u2640\uFE0F",
  "\u{1F6C0}",
  "\u{1F6CC}",
  "\u{1F9D1}\u200D\u{1F91D}\u200D\u{1F9D1}",
  "\u{1F46D}",
  "\u{1F46B}",
  "\u{1F46C}"
]);
function isModifiable(emoji) {
  return supported.has(emoji);
}
var ZERO_WIDTH_JOINER = "\u200D";
var VARIATION_16 = 65039;
function applyTone(sequence, tone) {
  const sequenceWithToneRemoved = removeTone(sequence);
  if (!isModifiable(sequenceWithToneRemoved))
    return sequence;
  const modifier = toneModifier(tone);
  if (!modifier)
    return sequence;
  return sequenceWithToneRemoved.split(ZERO_WIDTH_JOINER).map((emoji) => isModifiable(emoji) ? tint(emoji, modifier) : emoji).join(ZERO_WIDTH_JOINER);
}
function applyTones(sequence, tones) {
  const sequenceWithToneRemoved = removeTone(sequence);
  if (!isModifiable(sequenceWithToneRemoved))
    return sequence;
  const modifiers = tones.map((t) => toneModifier(t));
  return sequenceWithToneRemoved.split(ZERO_WIDTH_JOINER).map((emoji) => {
    if (!isModifiable(emoji))
      return emoji;
    const modifier = modifiers.shift();
    return modifier ? tint(emoji, modifier) : emoji;
  }).join(ZERO_WIDTH_JOINER);
}
function removeTone(emoji) {
  return [...emoji].filter((ch) => !isTone(ch.codePointAt(0))).join("");
}
function tint(emoji, tone) {
  const points = [...emoji].map((p) => p.codePointAt(0));
  if (points[1] && (isTone(points[1]) || points[1] === VARIATION_16)) {
    points[1] = tone;
  } else {
    points.splice(1, 0, tone);
  }
  return String.fromCodePoint(...points);
}
function isTone(point) {
  return point >= 127995 && point <= 127999;
}
function toneModifier(id) {
  switch (id) {
    case 1:
      return 127995;
    case 2:
      return 127996;
    case 3:
      return 127997;
    case 4:
      return 127998;
    case 5:
      return 127999;
    default:
      return null;
  }
}
var GEmojiElement = class _GEmojiElement extends HTMLElement {
  get image() {
    if (this.firstElementChild instanceof HTMLImageElement) {
      return this.firstElementChild;
    } else {
      return null;
    }
  }
  get tone() {
    return (this.getAttribute("tone") || "").split(" ").map((value) => {
      const tone = parseInt(value, 10);
      return tone >= 0 && tone <= 5 ? tone : 0;
    }).join(" ");
  }
  set tone(modifiers) {
    this.setAttribute("tone", modifiers);
  }
  connectedCallback() {
    if (this.image === null && !_GEmojiElement.emojiSupportFunction()) {
      const src = this.getAttribute("fallback-src");
      if (src) {
        this.textContent = "";
        const image = emojiImage(this);
        image.src = src;
        this.appendChild(image);
      }
    }
    if (this.hasAttribute("tone")) {
      updateTone(this);
    }
  }
  static get observedAttributes() {
    return ["tone"];
  }
  attributeChangedCallback(name) {
    switch (name) {
      case "tone":
        updateTone(this);
        break;
    }
  }
};
GEmojiElement.emojiSupportFunction = isEmojiSupported;
function updateTone(el) {
  if (el.image)
    return;
  const tones = el.tone.split(" ").map((x) => parseInt(x, 10));
  if (tones.length === 0) {
    el.textContent = removeTone(el.textContent || "");
  } else if (tones.length === 1) {
    const tone = tones[0];
    el.textContent = tone === 0 ? removeTone(el.textContent || "") : applyTone(el.textContent || "", tone);
  } else {
    el.textContent = applyTones(el.textContent || "", tones);
  }
}
function emojiImage(el) {
  const image = document.createElement("img");
  image.className = "emoji";
  image.alt = el.getAttribute("alias") || "";
  image.height = 20;
  image.width = 20;
  return image;
}
if (!window.customElements.get("g-emoji")) {
  window.GEmojiElement = GEmojiElement;
  window.customElements.define("g-emoji", GEmojiElement);
}
export {
  applyTone,
  GEmojiElement as default,
  removeTone
};
