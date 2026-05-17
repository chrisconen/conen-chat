(function () {
  "use strict"
  if (window.__conenChatLoaded) return
  window.__conenChatLoaded = true

  var WIDGET_HOST = (function () {
    var script = document.currentScript
    if (script && script.src) {
      try {
        return new URL(script.src).origin
      } catch (e) {}
    }
    return ""
  })()

  function injectStyles() {
    var css = [
      ".conen-chat-fab{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:30px;background:#171717;color:#fff;border:none;cursor:pointer;box-shadow:0 10px 25px rgba(0,0,0,0.18);z-index:2147483646;font-size:24px;display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s}",
      ".conen-chat-fab:hover{transform:translateY(-2px);box-shadow:0 14px 28px rgba(0,0,0,0.22)}",
      ".conen-chat-fab:focus-visible{outline:3px solid #888;outline-offset:3px}",
      ".conen-chat-frame-wrap{position:fixed;bottom:100px;right:24px;width:380px;height:600px;max-height:calc(100vh - 130px);border-radius:16px;overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.25);z-index:2147483647;display:none;background:#fff}",
      ".conen-chat-frame-wrap.open{display:block}",
      ".conen-chat-frame{width:100%;height:100%;border:0;display:block}",
      "@media (max-width:500px){.conen-chat-frame-wrap{right:0;bottom:0;width:100vw;height:100vh;max-height:100vh;border-radius:0}}",
    ].join("")
    var style = document.createElement("style")
    style.textContent = css
    document.head.appendChild(style)
  }

  function mount() {
    injectStyles()

    var wrap = document.createElement("div")
    wrap.className = "conen-chat-frame-wrap"
    var iframe = document.createElement("iframe")
    iframe.className = "conen-chat-frame"
    iframe.title = "Conen Digital AI Assistant"
    iframe.setAttribute("loading", "lazy")
    wrap.appendChild(iframe)

    var btn = document.createElement("button")
    btn.className = "conen-chat-fab"
    btn.type = "button"
    btn.setAttribute("aria-label", "Open AI assistant")
    btn.textContent = "AI"

    btn.addEventListener("click", function () {
      if (!iframe.src) iframe.src = WIDGET_HOST + "/widget"
      var isOpen = wrap.classList.toggle("open")
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false")
      btn.textContent = isOpen ? "×" : "AI"
    })

    document.body.appendChild(wrap)
    document.body.appendChild(btn)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount)
  } else {
    mount()
  }
})()
