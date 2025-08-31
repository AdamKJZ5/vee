// query helpers, event helpers

@param {string} sel
@param {ParentNode} ctx
@returns {Element|null}

export const $ = (sel, ctx = document) => ctx.querySelector(sel);

export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

@param {Element|Window|Document} el
@param {string} type
@param {Function} handler
@param {Object/boolean}

export const on = (el, type, handler, opts) => el && el.addEventListener(type, handler, opts);

export const delegate = (root, type, selector, handler) => {
  on(root, type, (e) => {

    const match = e.target.closet(selector);
    if (match && root.contains(match)) handler(e, match);
  });

};

export const throttle = (fn, wait =100) => {
  let last = 0, timerId = null;
  return (...args) => {
    const now = Date.now();
    if (now - last >= wait){
      last = now;
      fn(...args);
    } else if(!timerId) {
      timerId = setTimeout(() => {
        last = Date.now();
        timerId = null;
        fn(...args);
      }, wait - (now - last));
    }
  };
};

export const debouce = (fn, wait = 150) => {
  let t;
  return(...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

export const storage = {
  get: (key, fallback = null) => {
    try { 
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
  },
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key),
}


