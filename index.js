import{a as p,S as m}from"./assets/vendor-Dn90VzzJ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const y="46065959-261c5874db82aaa09dfa5c313",h="https://pixabay.com/api/";async function d(e,r=1){const n={key:y,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};try{return(await p.get(h,{params:n})).data}catch(o){throw console.error("Error fetching images:",o),o}}function u(e){const r=document.querySelector(".gallery"),n=e.map(o=>`
    <div class="photo-card">
      <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${o.likes}</p>
        <p><b>Views:</b> ${o.views}</p>
        <p><b>Comments:</b> ${o.comments}</p>
        <p><b>Downloads:</b> ${o.downloads}</p>
      </div>
    </div>
  `).join("");r.insertAdjacentHTML("beforeend",n)}function g(){document.querySelector(".gallery").innerHTML=""}function l(e){const r=document.querySelector(".load-more");r.style.display=e?"block":"none"}let i="",a=1;const b=document.querySelector("#search-form"),L=document.querySelector(".load-more"),f=new m(".gallery a");b.addEventListener("submit",async e=>{e.preventDefault(),i=e.currentTarget.elements.searchQuery.value.trim(),a=1,g(),l(!1);try{const r=await d(i,a);r.hits.length>0?(u(r.hits),f.refresh(),l(!0)):alert("No images found")}catch(r){console.error("Error:",r)}});L.addEventListener("click",async()=>{a+=1;try{const e=await d(i,a);u(e.hits),f.refresh(),w(),a*15>=e.totalHits&&(l(!1),alert("We're sorry, but you've reached the end of search results."))}catch(e){console.error("Error:",e)}});function w(){const e=document.querySelector(".gallery");if(e.firstElementChild){const{height:r}=e.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
