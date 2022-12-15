// Déblocage du scroll au chargement de la page
const htmlElement = document.getElementsByTagName('html')[0];
const bodyElement = document.getElementsByTagName('body')[0];

htmlElement.style.setProperty("overflow", "auto", "important");
bodyElement.style.setProperty("overflow", "auto", "important");

// Quand on clique sur l'icone, tous les addEventListener sont actifs
const startListener = () => {
  document.addEventListener("mouseover", onHovered);
  document.addEventListener("mouseout", onHovered);
  document.addEventListener("click", onRemove);
};

// Quand on passe la souris sur un élément, on le met en surbrillance
const onHovered = (e) => {
  const element = e.target;
  const bgColor = e.type === "mouseover" ? "rgba(220,20,60, .7)" : "transparent";

  element.setAttribute("style", "background-color:" + bgColor);
};

// Quand on clique sur un élément, on le supprime
const onRemove = (e) => {
  const parent = e.target.parentNode;
  e.preventDefault();
  parent.removeChild(e.target);
};

// Quand on éteint l'extension, on supprime tous les addEventListener
const finishListener = () => {
  document.removeEventListener("mouseover", onHovered);
  document.removeEventListener("mouseout", onHovered);
  document.removeEventListener("click", onRemove);
};

// Com avec le back
chrome.runtime.onMessage.addListener((flag, sender, sendResponse) => {
  flag ? startListener() : finishListener();
});
