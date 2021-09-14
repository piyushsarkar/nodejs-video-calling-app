const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

function recalculateLayout() {
  const gallery = document.getElementById('video-grid');
  const aspectRatio = 16 / 9;
  const container = document.querySelector('.main__video_container')
  const screenWidth = container.getBoundingClientRect().width;
  const screenHeight = container.getBoundingClientRect().height;
  const videoCount = document.getElementsByTagName('video').length;

  function calculateLayout(
    containerWidth,
    containerHeight,
    videoCount,
    aspectRatio
  ) {
    let bestLayout = {
      area: 0,
      cols: 0,
      rows: 0,
      width: 0,
      height: 0,
    };

    // brute-force search layout where video occupy the largest area of the container
    for (let cols = 1; cols <= videoCount; cols++) {
      const rows = Math.ceil(videoCount / cols);
      const hScale = containerWidth / (cols * aspectRatio);
      const vScale = containerHeight / rows;
      let width;
      let height;
      if (hScale <= vScale) {
        width = Math.floor(containerWidth / cols);
        height = Math.floor(width / aspectRatio);
      } else {
        height = Math.floor(containerHeight / rows);
        width = Math.floor(height * aspectRatio);
      }
      const area = width * height;
      if (area > bestLayout.area) {
        bestLayout = {
          area,
          width,
          height,
          rows,
          cols,
        };
      }
    }
    return bestLayout;
  }

  const { width, height, cols } = calculateLayout(
    screenWidth,
    screenHeight,
    videoCount,
    aspectRatio
  );

  gallery.style.setProperty('--width', width + 'px');
  gallery.style.setProperty('--height', height + 'px');
  gallery.style.setProperty('--cols', cols + '');
}

const debouncedRecalculateLayout = debounce(recalculateLayout, 50);
window.addEventListener('resize', debouncedRecalculateLayout);
debouncedRecalculateLayout();
