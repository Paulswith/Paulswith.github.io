(() => {
  // <stdin>
  document.addEventListener("DOMContentLoaded", () => {
    searchContent();
    activateSearchControl();
    setKeyboardShortcut();
    handleEscapeInSearch();
  });
  async function searchContent() {
    const searchInput = document.getElementById("searchInput");
    const contentTarget = document.getElementById("posts");
    let posts = [];
    try {
      const res = await fetch("/index.json");
      posts = await res.json();
    } catch (e) {
      console.error("Failed to load search index:", e);
      return;
    }
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (!query) {
        location.reload();
        return;
      }
      const filtered = posts.filter(
        (post) => post.title && post.title.toLowerCase().includes(query) || post.summary && post.summary.toLowerCase().includes(query)
      );
      if (filtered.length === 0) {
        contentTarget.innerHTML = `
        <div class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 p-4 rounded">
          No posts found for "<strong>${query}</strong>".
        </div>
      `;
      } else {
        contentTarget.innerHTML = filtered.map(renderCard).join("");
      }
    });
    function renderCard(post) {
      const imgSrc = post.image && post.image !== "/" ? post.image : null;
      const postUrl = post.permalink || post.url || "#";
      return `
      <article class="group relative">
        <div class="grid min-h-32 grid-cols-[1fr_auto] gap-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm transition duration-300 group-hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:group-hover:bg-gray-700">
          <div class="flex flex-col justify-between">
            <div>
              <header class="mb-2">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">${post.title}</h2>
                <div class="mt-2 line-clamp-2 text-sm text-gray-700 dark:text-gray-300">${post.summary ?? ""}</div>
              </header>
              <footer class="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span class="flex items-center gap-2"><i class="fas fa-calendar"></i> ${new Date(post.date).toDateString()}</span>
              </footer>
            </div>
          </div>
          ${imgSrc ? `<div class="flex justify-end items-center"><img src="${imgSrc}" class="w-full h-full max-h-32 object-cover rounded" /></div>` : ""}
        </div>
        <a href="${postUrl}" class="absolute inset-0 z-0" aria-label="Read more about ${post.title}"></a>    
      </article>
    `;
    }
  }
  function activateSearchControl() {
    document.addEventListener("keydown", function(e) {
      let isMac = false;
      if (navigator.userAgentData) {
        isMac = navigator.userAgentData.platform.toUpperCase().includes("MAC");
      } else {
        isMac = navigator.platform.toUpperCase().includes("MAC");
      }
      const key = e.key.toLowerCase();
      if (isMac && e.metaKey && key === "k" || !isMac && e.ctrlKey && key === "k") {
        e.preventDefault();
        openSearch();
      }
      function openSearch() {
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
    });
  }
  function setKeyboardShortcut() {
    const shortcut = document.getElementById("search-shortcut");
    if (shortcut) {
      let isMac = false;
      if (navigator.userAgentData) {
        isMac = navigator.userAgentData.platform.toUpperCase().includes("MAC");
      } else {
        isMac = navigator.platform.toUpperCase().includes("MAC");
      }
      shortcut.textContent = isMac ? "\u2318+k" : "Ctrl+k";
    }
  }
  function handleEscapeInSearch() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          location.reload();
        }
      });
    }
  }
})();
