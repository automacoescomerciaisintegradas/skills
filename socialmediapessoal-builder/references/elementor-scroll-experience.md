# Elementor Scroll Experience Reference

## Choose one motion model first

Do not combine these patterns without stating why:

- `fullPage.js`: section snapping and page-level scrolling control
- `GSAP ScrollTrigger`: scroll-linked animation timelines and trigger control
- `custom JS only`: minimal dependency approach for simpler pages

## Snap-on-scroll guidance

For Elementor storytelling pages, define these items before writing the snippet:

- section wrapper and selector strategy
- whether scroll snap is full-page or section-local
- animation owner for each section
- mobile fallback and reduced-motion behavior
- dependency loading order

## Safe fullPage.js snippet shape

```html
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (typeof fullpage !== 'function') return;

  new fullpage('#fullpage', {
    scrollingSpeed: 1000,
    autoScrolling: true,
    scrollHorizontally: true,
  });
});
</script>
```

## Review checklist

- Verify the library actually matches the requested behavior.
- Verify the selector exists on the page.
- Verify the snippet is placed in the correct Elementor custom-code location.
- Verify mobile behavior before calling the transition cinematic.
- Convert vague animation notes such as `smooth cinematic 30 transition` into explicit timing and easing decisions.
