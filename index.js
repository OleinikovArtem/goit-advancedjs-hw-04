import{a as S,i as d,S as w}from"./assets/vendor-CreDjNqS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const P="https://pixabay.com/api/",q="46672316-334fc4a904d955c3d11f52bb4",v="photo",x=!0,M="horizontal",g=15,u=async(e,t=1)=>{try{const s=new URLSearchParams({key:q,safesearch:x,orientation:M,q:e,image_type:v,per_page:g,page:t}),{data:a}=await S.get(`${P}?${s.toString()}`);return a}catch(s){console.error(`Search failed with words: "${e}"`,s)}};function O(e,t){const s=Math.ceil(e/g);return t!==s}const p=document.querySelector(".gallery");document.querySelector("#load-text");const h=document.querySelector("#load-more"),m=()=>{h.classList.add("loading")},f=()=>{h.classList.remove("loading")},y=e=>{if(!e||e.length===0){d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),render.clearLoading(),hiddenButtonLoadMore(!0);return}const t=e.map(({webformatURL:a,largeImageURL:r,tags:o,likes:n,views:$,comments:L,downloads:b})=>`
      <div class="gallery-item">
        <a href="${r}" class="gallery-link">
          <img src="${a}" alt="${o}" loading="lazy" class="gallery-image"/>
        </a>
        <div class="gallery-info">
          <p><strong>Likes</strong> ${n}</p>
          <p><strong>Views</strong> ${$}</p>
          <p><strong>Comments</strong> ${L}</p>
          <p><strong>Downloads</strong> ${b}</p>
        </div>
      </div>
    `).join("");p.innerHTML+=t,new w(".gallery a").refresh()},R=()=>{p.innerHTML=""},H=document.querySelector("#search-form"),c=document.querySelector("#load-more");let l="",i=1;H.onsubmit=async e=>{try{if(e.stopPropagation(),e.preventDefault(),i=1,l=new FormData(e.target).get("search").trim().split(" ").join("+"),!l){d.error({message:"Please enter a search term!",position:"topRight"});return}R(),m();const{hits:a}=await u(l,i);a!=null&&a.length?(y(a),c.hodden=!1):d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch(t){console.error(t)}finally{f()}};c.onclick=async()=>{try{m(),i+=1;const{hits:e,totalHits:t}=await u(l,i);e!=null&&e.length&&(y(e),c.scrollIntoView({behavior:"smooth",block:"end"})),O(i,t)||(d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),c.hidden=!0)}catch(e){console.error(e)}finally{f()}};
//# sourceMappingURL=index.js.map
