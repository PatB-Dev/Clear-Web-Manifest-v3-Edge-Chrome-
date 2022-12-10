//déblocage du scroll au chargement de la page
document.getElementsByTagName('html')[0].style.setProperty("overFlow", "auto", "important")
document.getElementsByTagName('body')[0].style.setProperty("overFlow", "auto", "important")

//quand on clique sur l'icone tous les addEventListener sont actifs
startListener = () => {
    document.addEventListener("mouseover", onHovered)
    document.addEventListener("mouseout", onHovered)
    document.addEventListener("click", onRemove)
}

onHovered = (e) => {
    const element = e.target
    bgColor = (e.type == "mouseover") ? "rgba(220,20,60, .7)" : "transparent;"

    element.setAttribute("style", "background-color:" + bgColor)
}

onRemove = (e) => {
    const parent = e.target.parentNode
    e.preventDefault()
    parent.removeChild(e.target)
}

// quand on éteint l'extension on supp tous les addEventListener
finishListener = () => {
    document.removeEventListener("mouseover", onHovered)
    document.removeEventListener("mouseout", onHovered)
    document.removeEventListener("click", onRemove)
}

//Com avec le back
chrome.runtime.onMessage.addListener((flag, sender, sendResponse) => {
    flag ? startListener() : finishListener()
})