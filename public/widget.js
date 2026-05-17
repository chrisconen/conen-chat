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
      "@keyframes conen-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.55;transform:scale(.95)}}",
      ".conen-chat-fab{position:fixed;bottom:24px;right:24px;display:flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:30px;background:#0a0a0a;color:#fff;border:1px solid rgba(0,240,255,.5);cursor:pointer;box-shadow:0 8px 32px rgba(0,0,0,.5),0 0 24px -4px rgba(0,240,255,.55);z-index:2147483646;transition:transform .2s,box-shadow .25s,border-color .25s;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:0}",
      ".conen-chat-fab::before{content:'';width:8px;height:8px;border-radius:50%;background:#00f0ff;box-shadow:0 0 10px #00f0ff;margin-right:6px;animation:conen-pulse 1.6s ease-in-out infinite}",
      ".conen-chat-fab:hover{transform:translateY(-2px);border-color:#00f0ff;box-shadow:0 12px 40px rgba(0,0,0,.6),0 0 32px -2px rgba(0,240,255,.85)}",
      ".conen-chat-fab:focus-visible{outline:2px solid #00f0ff;outline-offset:3px}",
      ".conen-chat-fab[data-open='true']::before{display:none}",
      ".conen-chat-fab[data-open='true']{padding-left:0;padding-right:0}",
      ".conen-chat-frame-wrap{position:fixed;bottom:100px;right:24px;width:400px;height:640px;max-height:calc(100vh - 130px);border-radius:18px;overflow:hidden;box-shadow:0 30px 60px rgba(0,0,0,.7),0 0 0 1px rgba(0,240,255,.18);z-index:2147483647;display:none;background:#0a0a0a;transform:translateY(8px);opacity:0;transition:transform .25s ease,opacity .25s ease}",
      ".conen-chat-frame-wrap.open{display:block;transform:translateY(0);opacity:1}",
      ".conen-chat-frame{width:100%;height:100%;border:0;display:block;background:#0a0a0a}",
      "@media (max-width:500px){.conen-chat-frame-wrap{right:0;bottom:0;width:100vw;height:100vh;max-height:100vh;border-radius:0}.conen-chat-fab{bottom:16px;right:16px;width:54px;height:54px}}",
      "@media (prefers-reduced-motion:reduce){.conen-chat-fab::before{animation:none}.conen-chat-frame-wrap{transition:none}}",
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
    iframe.title = "NEXUS AI — Conen Digital"
    iframe.setAttribute("loading", "lazy")
    wrap.appendChild(iframe)

    var btn = document.createElement("button")
    btn.className = "conen-chat-fab"
    btn.type = "button"
    btn.setAttribute("aria-label", "NEXUS AI megnyitása")
    btn.setAttribute("aria-expanded", "false")
    btn.textContent = "NEXUS"

    btn.addEventListener("click", function () {
      if (!iframe.src) iframe.src = WIDGET_HOST + "/widget"
      var isOpen = wrap.classList.toggle("open")
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false")
      btn.setAttribute("data-open", isOpen ? "true" : "false")
      btn.textContent = isOpen ? "×" : "NEXUS"
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
