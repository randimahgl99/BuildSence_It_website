/**
 * True when `target` is a DOM node inside `root`.
 *
 * Use this for `mouseleave` / `blur` `relatedTarget`: it is `null` when the pointer
 * or focus leaves the page, but it can also be a non-Node EventTarget (e.g. `window`)
 * or `undefined`, and `Node.contains()` throws a TypeError for anything that is not
 * a Node (or null). A plain `as Node | null` cast does not prevent that.
 */
export function containsTarget(root: Node | null | undefined, target: EventTarget | null | undefined): boolean {
  return !!root && target instanceof Node && root.contains(target);
}
