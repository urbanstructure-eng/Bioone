/**
 * ScrollTrigger-aware smooth scrolling helper.
 * 
 * Standard browser .scrollIntoView() does not account for GSAP pinning
 * offsets and transforms. This helper finds the calculated start scroll
 * coordinate for any target section based on its active ScrollTrigger,
 * preventing layout jumps and visual glitching.
 */
export function smoothScrollTo(targetSelector: string) {
  const element = document.querySelector(targetSelector);
  if (!element) return;

  // Look for registered ScrollTrigger instance on the global window context
  const ScrollTrigger = (window as any).ScrollTrigger || (globalThis as any).ScrollTrigger;
  
  if (ScrollTrigger) {
    const allTriggers = ScrollTrigger.getAll();
    
    // Find a ScrollTrigger that targets this element or targets a parent section
    const match = allTriggers.find((t: any) => {
      if (!t.trigger) return false;
      return t.trigger === element || t.trigger.contains(element);
    });

    if (match && typeof match.start === "number") {
      window.scrollTo({
        top: match.start,
        behavior: "smooth"
      });
      return;
    }
  }

  // Pure fallback: calculate the element's actual current screen-relative top offset plus scroll position
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  window.scrollTo({
    top: rect.top + scrollTop - 12,
    behavior: "smooth"
  });
}
