(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre > code").forEach((codeBlock) => {
      const pre = codeBlock.parentNode;
      const wrapper = document.createElement("div");
      wrapper.className = "code-block-wrapper";
      const header = document.createElement("div");
      header.className = "code-block-header";
      const label = document.createElement("span");
      label.textContent = codeBlock.className.replace("language-", "") || "Code";
      const button = document.createElement("button");
      button.className = "copy-button";
      button.type = "button";
      button.innerHTML = '<i data-lucide="clipboard"></i>';
      button.addEventListener("click", () => {
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
          button.innerHTML = '<i data-lucide="check"></i>';
          lucide.createIcons();
          setTimeout(() => {
            button.innerHTML = '<i data-lucide="clipboard"></i>';
            lucide.createIcons();
          }, 1500);
        });
      });
      header.appendChild(label);
      header.appendChild(button);
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
      lucide.createIcons();
    });
  });
})();
