document.addEventListener("addFacetEvents",l=>{const e=document.querySelectorAll(".custom-horizontal-filter__desktop details:not(.filters__disclosure)");e.forEach(t=>{t.querySelector("summary").addEventListener("click",r=>{localStorage.setItem("lastFilterFacet",r.target.closest("details").id),e.forEach(s=>{s!=r.target.closest("details")&&(s.open=!1)})})}),l.detail&&l.detail.filterIsOpen&&document.querySelectorAll(".filters__disclosure .facets__display").forEach(t=>{t.classList.add("no-animate")})}),document.dispatchEvent(new CustomEvent("addFacetEvents"));class n extends HTMLElement{constructor(){super(),this.onActiveFilterClick=this.onActiveFilterClick.bind(this),this.debouncedOnSubmit=debounce(r=>{this.onSubmitHandler(r)},500),this.querySelector("form").addEventListener("input",this.debouncedOnSubmit.bind(this));const t=this.querySelector("#FacetsWrapperDesktop");t&&t.addEventListener("keyup",onKeyUpEscape),this.setInitialFilterStickyPosition(),this.setMobileFilterPositions()}static setListeners(){const e=t=>{const r=t.state?t.state.searchParams:n.searchParamsInitial;r!==n.searchParamsPrev&&n.renderPage(r,null,!1)};window.addEventListener("popstate",e)}static toggleActiveFacets(e=!0){document.querySelectorAll(".js-facet-remove").forEach(t=>{t.classList.toggle("disabled",e)})}static renderPage(e,t,r=!0){n.searchParamsPrev=e;const s=n.getSections(),o=document.getElementById("ProductCount");document.getElementById("ProductGridContainer").querySelector(".collection").classList.add("loading"),o&&o.classList.add("loading"),s.forEach(i=>{const a=`${window.location.pathname}?section_id=${i.section}&${e}`,c=d=>d.url===a;n.filterData.some(c)?n.renderSectionFromCache(c,t):n.renderSectionFromFetch(a,t)}),r&&n.updateURLHash(e)}static renderSectionFromFetch(e,t){fetch(e).then(r=>r.text()).then(r=>{const s=r;n.filterData=[...n.filterData,{html:s,url:e}],this.renderSection(s,t)})}static renderSectionFromCache(e,t){const r=n.filterData.find(e).html;this.renderSection(r,t),document.getElementById(`${localStorage.getItem("lastFilterFacet")}`)&&(document.getElementById(`${localStorage.getItem("lastFilterFacet")}`).open=!0)}static renderSection(e,t){n.renderFilters(e,t),n.renderProductGridContainer(e),n.renderProductCount(e),n.renderFiltersChosenCount(e)}static renderProductGridContainer(e){document.getElementById("ProductGridContainer").innerHTML=new DOMParser().parseFromString(e,"text/html").getElementById("ProductGridContainer").innerHTML}static renderFiltersChosenCount(){const e=document.querySelectorAll("facet-remove:not(.active-facets__button-wrapper)"),t=document.getElementById("filters-chosen-counter");t&&(e&&e.length>0?t.innerHTML=` (${e.length})`:t.innerHTML="")}static renderProductCount(e){const t=new DOMParser().parseFromString(e,"text/html").getElementById("ProductCount").innerHTML,r=document.getElementById("ProductCount"),s=document.getElementById("ProductCountDesktop");r.innerHTML=t,r.classList.remove("loading"),s&&(s.innerHTML=t,s.classList.remove("loading"))}static renderFilters(e,t){const r=new DOMParser().parseFromString(e,"text/html"),s=r.querySelectorAll("#FacetFiltersForm .js-filter, #FacetFiltersPillsForm .js-filter"),o=c=>{const d=t?t.target.closest(".js-filter"):void 0;return d?c.dataset.index===d.dataset.index:!1},i=Array.from(s).filter(c=>!o(c)),a=Array.from(s).find(o);i.forEach(c=>{document.querySelector(`.js-filter[data-index="${c.dataset.index}"]`).innerHTML=c.innerHTML}),n.renderActiveFacets(r),n.renderAdditionalElements(r),document.getElementById(`${localStorage.getItem("lastFilterFacet")}`)&&document.getElementById(`${localStorage.getItem("lastFilterFacet")}`).setAttribute("open",!0),document.dispatchEvent(new CustomEvent("addFacetEvents",{detail:{filterIsOpen:"true"}})),a&&n.renderCounts(a,t.target.closest(".js-filter"))}static renderActiveFacets(e){[".active-facets-mobile",".active-facets-desktop"].forEach(r=>{const s=e.querySelector(r);s&&(document.querySelector(r).innerHTML=s.innerHTML)}),n.toggleActiveFacets(!1)}static renderAdditionalElements(e){[".mobile-facets__open",".mobile-facets__count",".sorting"].forEach(r=>{e.querySelector(r)&&(document.querySelector(r).innerHTML=e.querySelector(r).innerHTML)})}static renderCounts(e,t){const r=t.querySelector(".facets__selected"),s=e.querySelector(".facets__selected"),o=t.querySelector(".facets__summary"),i=e.querySelector(".facets__summary");s&&r&&(t.querySelector(".facets__selected").outerHTML=e.querySelector(".facets__selected").outerHTML),o&&i&&(t.querySelector(".facets__summary").outerHTML=e.querySelector(".facets__summary").outerHTML)}static updateURLHash(e){history.pushState({searchParams:e},"",`${window.location.pathname}${e&&"?".concat(e)}`)}static getSections(){return[{section:document.getElementById("product-grid").dataset.id}]}createSearchParams(e){const t=new FormData(e);return new URLSearchParams(t).toString()}onSubmitForm(e,t){n.renderPage(e,t)}onSubmitHandler(e){e.target!==document.querySelector("#SortBy")&&e.target.closest("details")&&localStorage.setItem("lastFilterFacet",e.target.closest("details").id),e.preventDefault();const t=document.querySelectorAll("facet-filters-form form");if(e.srcElement.className=="mobile-facets__checkbox"){const r=this.createSearchParams(e.target.closest("form"));this.onSubmitForm(r,e)}else{const r=[];t.forEach(s=>{(s.id==="FacetSortForm"||s.id==="FacetFiltersForm"||s.id==="FacetSortDrawerForm")&&(document.querySelectorAll(".no-js-list").forEach(i=>i.remove()),r.push(this.createSearchParams(s)))}),this.onSubmitForm(r.join("&"),e)}}onActiveFilterClick(e){e.preventDefault(),n.toggleActiveFacets();const t=e.currentTarget.href.indexOf("?")==-1?"":e.currentTarget.href.slice(e.currentTarget.href.indexOf("?")+1);n.renderPage(t)}setInitialFilterStickyPosition(){let e=document.querySelector("sticky-header"),t=this.closest(".facets-wrapper");if(e){let r=e.getAttribute("data-sticky-type");r=="always"||r=="reduce-logo-size"?t.style.top=getComputedStyle(document.body).getPropertyValue("--header-height"):t.style.top="0"}else t.style.top="0"}setMobileFilterPositions(){let e=document.querySelector(".mobile-facets__disclosure");e&&e.addEventListener("toggle",t=>{let r=t.target.hasAttribute("open"),s=document.querySelector('sticky-header[data-sticky-type="on-scroll-up"]');r?e.closest("form").classList.add("open-mobile"):e.closest("form").classList.remove("open-mobile");let o=t.target.closest(".facets-container"),a=this.getOffset(o).top-window.scrollY,c=window.scrollY;a>c&&r&&window.scrollBy({top:this.getOffset(o).top,left:0,behavior:"smooth"}),r&s?s.classList.add("hidden"):!r&s&&s.classList.remove("hidden")})}getOffset(e){return{top:e.getBoundingClientRect().top+window.scrollY}}}n.filterData=[],n.searchParamsInitial=window.location.search.slice(1),n.searchParamsPrev=window.location.search.slice(1),customElements.define("facet-filters-form",n),n.setListeners();class u extends HTMLElement{constructor(){super(),this.querySelectorAll("input").forEach(e=>e.addEventListener("change",this.onRangeChange.bind(this))),this.setMinAndMaxValues()}onRangeChange(e){this.adjustToValidValues(e.currentTarget),this.setMinAndMaxValues()}setMinAndMaxValues(){const e=this.querySelectorAll("input"),t=e[0],r=e[1];r.value&&t.setAttribute("max",r.value),t.value&&r.setAttribute("min",t.value),t.value===""&&r.setAttribute("min",0),r.value===""&&t.setAttribute("max",r.getAttribute("max"))}adjustToValidValues(e){const t=Number(e.value),r=Number(e.getAttribute("min")),s=Number(e.getAttribute("max"));t<r&&(e.value=r),t>s&&(e.value=s)}}customElements.define("price-range",u);class m extends HTMLElement{constructor(){super(),this.facetId=this.getAttribute("data-value"),this.removeAll=this.hasAttribute("data-remove-all");const e=this.querySelector("a");e.setAttribute("role","button"),e.addEventListener("click",this.closeFilter.bind(this)),e.addEventListener("keyup",t=>{t.preventDefault(),t.code.toUpperCase()==="SPACE"&&this.closeFilter(t)})}closeFilter(e){e.preventDefault();const t=this.closest("facet-filters-form")||document.querySelector("facet-filters-form");if(t.onActiveFilterClick(e),this.facetId){const r=t.querySelector(`input[value="${this.facetId}"]`);r.checked=!1}if(this.removeAll){const r=t.querySelectorAll('.facet-checkbox-new input[type="checkbox"]:checked');for(let s=0;s<r.length;s++){const o=r[s];o.checked=!1}}}}customElements.define("facet-remove",m);
//# sourceMappingURL=/cdn/shop/t/28/assets/novicell_facets-9b4a762d.js.map
