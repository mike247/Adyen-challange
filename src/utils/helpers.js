const debounce = (fn, time) => {
  let timeout;

  return function debounced() {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn.call(this);
    }, time);
  };
};

export default {
  debounce,
};
