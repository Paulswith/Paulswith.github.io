(()=>{document.addEventListener("DOMContentLoaded",()=>{l(),c(),d(),u()});async function l(){let a=document.getElementById("searchInput"),t=document.getElementById("posts"),n=[];try{n=await(await fetch("/index.json")).json()}catch(e){console.error("Failed to load search index:",e);return}a.addEventListener("input",e=>{let r=e.target.value.trim().toLowerCase();if(!r){location.reload();return}let o=n.filter(s=>s.title&&s.title.toLowerCase().includes(r)||s.summary&&s.summary.toLowerCase().includes(r));o.length===0?t.innerHTML=`
        <div class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 p-4 rounded">
          No posts found for "<strong>${r}</strong>".
        </div>
      `:t.innerHTML=o.map(i).join("")});function i(e){let r=e.image&&e.image!=="/"?e.image:null,o=e.permalink||e.url||"#";return`
      <article class="group relative">
        <div class="grid min-h-32 grid-cols-[1fr_auto] gap-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm transition duration-300 group-hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:group-hover:bg-gray-700">
          <div class="flex flex-col justify-between">
            <div>
              <header class="mb-2">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">${e.title}</h2>
                <div class="mt-2 line-clamp-2 text-sm text-gray-700 dark:text-gray-300">${e.summary??""}</div>
              </header>
              <footer class="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span class="flex items-center gap-2"><i class="fas fa-calendar"></i> ${new Date(e.date).toDateString()}</span>
              </footer>
            </div>
          </div>
          ${r?`<div class="flex justify-end items-center"><img src="${r}" class="w-full h-full max-h-32 object-cover rounded" /></div>`:""}
        </div>
        <a href="${o}" class="absolute inset-0 z-0" aria-label="Read more about ${e.title}"></a>    
      </article>
    `}}function c(){document.addEventListener("keydown",function(a){let t=!1;navigator.userAgentData?t=navigator.userAgentData.platform.toUpperCase().includes("MAC"):t=navigator.platform.toUpperCase().includes("MAC");let n=a.key.toLowerCase();(t&&a.metaKey&&n==="k"||!t&&a.ctrlKey&&n==="k")&&(a.preventDefault(),i());function i(){let e=document.getElementById("searchInput");e&&(e.focus(),e.select())}})}function d(){let a=document.getElementById("search-shortcut");if(a){let t=!1;navigator.userAgentData?t=navigator.userAgentData.platform.toUpperCase().includes("MAC"):t=navigator.platform.toUpperCase().includes("MAC"),a.textContent=t?"\u2318+k":"Ctrl+k"}}function u(){let a=document.getElementById("searchInput");a&&a.addEventListener("keydown",t=>{t.key==="Escape"&&location.reload()})}})();
