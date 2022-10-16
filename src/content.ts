import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  // matches: ["https://*/*","http://*/*"]
  matches: ["<all_urls>"],
  all_frames: true
}

window.addEventListener("load", () => {
  console.log(
    "You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true."
  )

  // document.body.style.background = "pink"

  return true
})
