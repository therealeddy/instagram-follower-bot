(function scrollDivInfinitely() {
  // ajuste aqui o selector da div
  const selector = "div.x1rife3k";

  const target = document.querySelector(selector);

  if (!target) {
    console.error("Div não encontrada!");
    return;
  }

  console.log("Iniciando scroll infinito na div:", target);

  function scrollStep() {
    target.scrollBy(0, 1080);
    if (target.scrollTop + target.clientHeight < target.scrollHeight) {
      requestAnimationFrame(scrollStep);
    } else {
      setTimeout(scrollStep, 1);
    }
  }

  scrollStep();
})();
