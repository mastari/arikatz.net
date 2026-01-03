(() => {
  const PEOPLE_PER_ROW = 5;
  const PEOPLE_TOTAL = 20;
  const CONFIG = [
    { key: 'heart', label: 'Heart stops', midpoint: 3, steepness: 2.2 },
    { key: 'breathing', label: 'Respiration stops', midpoint: 10, steepness: 1.1 },
    { key: 'bleeding', label: 'Massive bleeding', midpoint: 30, steepness: 0.6 }
  ];

  function drawPeople(ctx, value) {
    const cols = PEOPLE_PER_ROW;
    const rows = Math.ceil(PEOPLE_TOTAL / cols);
    const cellWidth = ctx.canvas.width / cols;
    const cellHeight = ctx.canvas.height / rows;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < PEOPLE_TOTAL; i += 1) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const x = cellWidth * col + cellWidth / 2;
      const y = cellHeight * row + cellHeight / 2;
      const alive = i >= value;
      ctx.fillStyle = alive ? '#4a90e2' : '#eb3d3d';
      ctx.beginPath();
      ctx.arc(x, y, Math.min(cellWidth, cellHeight) * 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function computeAlive(minutes, config) {
    const x = Math.max(0, minutes);
    const exponent = -config.steepness * (x - config.midpoint);
    const deathRate = 1 / (1 + Math.exp(exponent));
    const clamped = Math.min(1, Math.max(0, deathRate));
    return Math.max(0, Math.round(PEOPLE_TOTAL * (1 - clamped)));
  }

  const RUN_TARGET = 37;

  function initModule(root) {
    if (!root) return;
    const slider = root.querySelector('[data-gh-slider]');
    const minutesOutput = root.querySelector('[data-gh-minutes]');
    const runBtn = root.querySelector('[data-gh-run]');
    const grids = CONFIG.map((item) => {
      const container = root.querySelector(`[data-gh-target="${item.key}"]`);
      const canvas = container.querySelector('canvas');
      const ctx = canvas.getContext('2d');
      return { ...item, canvas, ctx, container };
    });

    let clockTimer = null;

    const stopClock = () => {
      if (clockTimer) {
        clearInterval(clockTimer);
        clockTimer = null;
      }
    };

    const update = () => {
      const minutes = Number(slider.value);
      const displayMinutes = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
      if (minutesOutput) minutesOutput.textContent = displayMinutes;

      grids.forEach((grid) => {
      const alive = computeAlive(minutes, grid);
        drawPeople(grid.ctx, PEOPLE_TOTAL - alive);
        const aliveText = grid.container.querySelector('[data-gh-stat="alive"]');
        const deadText = grid.container.querySelector('[data-gh-stat="dead"]');
        if (aliveText) aliveText.textContent = alive;
        if (deadText) deadText.textContent = PEOPLE_TOTAL - alive;
      });
    };

    slider.addEventListener('input', () => {
      stopClock();
      update();
    });
    slider.addEventListener('change', update);

    if (runBtn) {
      runBtn.addEventListener('click', () => {
        stopClock();
        slider.value = 0;
        update();
        clockTimer = setInterval(() => {
          const nextValue = Math.min(RUN_TARGET, Number(slider.value) + 1);
          slider.value = nextValue;
          update();
          if (nextValue >= RUN_TARGET) {
            stopClock();
          }
        }, 1000);
      });
    }
    update();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const module = document.querySelector('.golden-hour-module');
    initModule(module);
  });
})();
