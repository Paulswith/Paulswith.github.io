(() => {
  // <stdin>
  function highlightTableOfContents() {
    const toc = document.querySelector("#toc-list");
    if (!toc) return;
    toc.querySelectorAll(" li > ul").forEach((ul) => {
      ul.parentElement.classList.add("toc-collapsed");
    });
    const headings = document.querySelectorAll("h2, h3");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          if (!id) return;
          toc.querySelectorAll("li").forEach((li) => li.classList.remove("toc-active"));
          const tocLink = toc.querySelector(`a[href="#${id}"]`);
          if (tocLink) {
            const parentLi = tocLink.closest("li");
            if (parentLi) {
              parentLi.classList.add("toc-active");
              parentLi.classList.remove("toc-collapsed");
              parentLi.classList.add("toc-expanded");
              parentLi.parentElement.querySelectorAll(":scope > li").forEach((sibling) => {
                if (sibling !== parentLi) {
                  sibling.classList.remove("toc-expanded");
                  sibling.classList.add("toc-collapsed");
                }
              });
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -80% 0px",
        // Trigger earlier
        threshold: 0.1
      }
    );
    headings.forEach((h) => observer.observe(h));
  }
  document.addEventListener("DOMContentLoaded", () => {
    highlightTableOfContents();
  });
})();
