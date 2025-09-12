const nodes = document.querySelectorAll(".x1qnrgzn a");

const links = Array.from(nodes)
  .map((a) => a.href)
  .filter(Boolean)
  .filter((v, i, arr) => arr.indexOf(v) === i);

console.log(JSON.stringify(links), links.length);
