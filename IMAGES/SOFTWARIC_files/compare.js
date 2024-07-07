const LOCAL_STORAGE_COMPARE_KEY="zmz-shopify-compare",LOCAL_STORAGE_COMPARE_SEPARATOR=",",BUTTON_COMPARE_ACTIVE_CLASS="compareIn",COMPARE_MAX_ITEM=6,selectorsCompare={buttonCompare:"[btn-compare-js]",removeItem:"[remove-item]"};let getCompareListBtn=document.getElementById("compare_list"),compareCounter=document.getElementById("compare__counter"),getCompareList=document.getElementById("PopupModal-Compare"),getCompareWrapper=document.querySelector(".compare__wrapper"),getAllertCompare=document.getElementById("Alert-Compare");createCompareItem=document.createElement("ul"),createCompareItem.className="createCompareItem",document.addEventListener("DOMContentLoaded",()=>{initBtnCompare()}),document.addEventListener("zmz-shopify-compare:updated",event=>{initBtnCompareList()}),document.addEventListener("zmz-shopify-compare:init-buttons",event=>{initBtnCompareList()});const setBtnCompare=buttons=>{buttons.forEach(buttonCompare=>{const productHandle=buttonCompare.dataset.productHandle||!1;if(!productHandle)return console.error("[Shopify Compare] Missing `data-product-handle` attribute. Failed to update the compare.");compareContains(productHandle)&&buttonCompare.classList.add(BUTTON_COMPARE_ACTIVE_CLASS),buttonCompare.addEventListener("click",()=>{getCompare().length+1>6?(updCompare(productHandle),buttonCompare.classList.remove(BUTTON_COMPARE_ACTIVE_CLASS)):(updCompare(productHandle),buttonCompare.classList.toggle(BUTTON_COMPARE_ACTIVE_CLASS))})})},initBtnCompare=()=>{const buttons=document.querySelectorAll(selectorsCompare.buttonCompare)||[];if(buttons.length)setBtnCompare(buttons);else return;const event=new CustomEvent("zmz-shopify-compare:init-buttons",{detail:{compare:getCompare()}});document.dispatchEvent(event)},getCompare=()=>{const compare=localStorage.getItem(LOCAL_STORAGE_COMPARE_KEY)||!1;return compare?compare.split(LOCAL_STORAGE_COMPARE_SEPARATOR):[]},setCompare=array=>{const compare=array.join(LOCAL_STORAGE_COMPARE_SEPARATOR);array.length?localStorage.setItem(LOCAL_STORAGE_COMPARE_KEY,compare):localStorage.removeItem(LOCAL_STORAGE_COMPARE_KEY);const event=new CustomEvent("zmz-shopify-compare:updated",{detail:{compare:array}});return document.dispatchEvent(event),compare},updCompare=handle=>{const compare=getCompare(),idxItemListCompare=compare.indexOf(handle);let compareLength=compare.length+1;return compareLength<=6&&(idxItemListCompare===-1?compare.push(handle):compare.splice(idxItemListCompare,1)),compareLength>6&&idxItemListCompare!==-1&&compare.splice(idxItemListCompare,1),compareLength>6&&idxItemListCompare===-1&&getAllertCompare.click(),compareCounter.innerHTML=compare.length,setCompare(compare)},compareContains=handle=>getCompare().includes(handle),resetCompare=()=>{compareCounter.innerHTML="0",createCompareItem.innerHTML="",getCompareListBtn.style.display="none";const buttonsCompareArray=document.querySelectorAll(selectorsCompare.buttonCompare);return buttonsCompareArray.length&&buttonsCompareArray.forEach(buttonCompare=>{buttonCompare.classList.remove(BUTTON_COMPARE_ACTIVE_CLASS)}),setCompare([])},initBtnCompareList=()=>{const compare=getCompare();getCompareListBtn&&(compare.length<2?getCompareListBtn.style.display="none":compare.length>=2&&(getCompareListBtn.style.display="flex")),compareCounter.innerHTML=compare.length},removeProduct=el=>{const compare=getCompare();let elHandle=el.getAttribute("data-rem-handle"),newCompare=compare.filter(function(value){if(value!==elHandle)return value});const compareNewLocalStorage=newCompare.join(LOCAL_STORAGE_COMPARE_SEPARATOR);newCompare.length&&localStorage.setItem(LOCAL_STORAGE_COMPARE_KEY,compareNewLocalStorage),Array.from(document.querySelectorAll(`[data-rem-handle="${el.getAttribute("data-rem-handle")}"]`)).forEach(function(elem){elem.remove()});const buttonsCompareArray=document.querySelectorAll(selectorsCompare.buttonCompare);buttonsCompareArray.length&&buttonsCompareArray.forEach(buttonCompare=>{const productHandle=buttonCompare.dataset.productHandle;elHandle===productHandle&&buttonCompare.classList.remove(BUTTON_COMPARE_ACTIVE_CLASS)})},setRemoveCompareBtn=removeButtons=>{removeButtons.forEach(removeButton=>{removeButton.dataset.remHandle&&removeButton.addEventListener("click",()=>{removeProduct(removeButton),initBtnCompareList()})})},initRemoveBtn=()=>{const removeButtons=document.querySelectorAll(selectorsCompare.removeItem)||[];if(removeButtons.length)setRemoveCompareBtn(removeButtons);else return},image_url=(imageUrl,size)=>(size&&(imageUrl+=`?width=${size}`),imageUrl);function strip(html){var tmp=document.createElement("div");return tmp.innerHTML=html,tmp.textContent||tmp.innerText}getCompareListBtn&&getCompareListBtn.addEventListener("click",()=>{getCompareList.style.display="flex",getCompareList.querySelector(".loading-overlay").classList.remove("hidden"),getCompareWrapper.append(createCompareItem),createProduct();let request=new XMLHttpRequest;request.open("GET",""),request.onload=function(){SPR.registerCallbacks(),SPR.initRatingHandler(),SPR.initDomEls(),SPR.loadProducts(),SPR.loadBadges()},request.send()});const createProduct=async()=>{createCompareItem.innerHTML="";let products=getCompare(),urls=[];for(let i=0;i<products.length;i++)urls.push(`/collections/all/products/${products[i]}.js`);await Promise.all(urls.map(url=>fetch(url))).then(responses=>Promise.all(responses.map(res=>res.json()))).then(productData=>{let productImage="",productAvailable="",productType="",productPrice="",productMoneyCurrency="",productOptionsSize="",productOptionsColor="",productOptionsType="",productOptionsVendor="",productOptionsRating="",productInfo="",productOptionBtn="",hideSizeElemByClass="",hideColorElemByClass="",productOptionsSizeArray=[],productOptionsColorArray=[],resultOpts=[],loadingSpiner="";product.useCompareSize===!1&&(hideSizeElemByClass="d-none"),product.useCompareColor===!1&&(hideColorElemByClass="d-none");function dayCount(elem){let day=new Date(elem);return day.setDate(day.getDate()+parseInt(product.newProductsPeriod)),day}for(let i=0;i<productData.length;i++){let imageSize="360";const featuredImage=productData[i].featured_image,imageUrl=image_url(featuredImage,imageSize);var now=new Date;let newBadge=" ";if(now<=dayCount(productData[i].created_at)&&(newBadge=`<span class="product_badge badge new">${window.theme.strings.compareNew}</span>`),productOptionsSizeArray.push("-"),productOptionsColorArray.push("-"),productData[i].options){let optsAll=productData[i].options;product.useCompareSize===!0&&product.textCompareSize!=""&&(optsAll=optsAll.filter(obj=>obj.name.toLowerCase()!==product.textCompareSize)),product.useCompareColor===!0&&product.textCompareColor!=""&&(optsAll=optsAll.filter(obj=>obj.name.toLowerCase()!==product.textCompareColor)),resultOpts=optsAll.map(opt=>opt.values=="Default Title"?'<p class="mt-0 mb-1">-</p>':'<p class="mt-0 mb-1"><span class="opt-name">'+opt.name+":</span>&nbsp;"+opt.values.join(", ")+"</p>").join(" "),productData[i].options.forEach(function(item){let optionName=item.name.toLowerCase(),optionValue=item.values,value="";Array.isArray(optionValue)?value=optionValue.join(", "):value=optionValue,optionName===`${product.textCompareSize}`?value==""||value=="Default Title"?productOptionsSizeArray.splice(i,1,"-"):productOptionsSizeArray.splice(i,1,value):optionName===`${product.textCompareColor}`&&(value==""||value=="Default Title"?productOptionsColorArray.splice(i,1,"-"):productOptionsColorArray.splice(i,1,value))})}resultOpts.length?productOptionsType+=` 
                            <div class="productContent" data-rem-handle="${productData[i].handle}">
                            <div class="productContent_wrap">
                                <span class="compare_item_option col-4">${window.theme.strings.compareOptions}</span>
                                <div class="itemOption_1 col-8">${resultOpts}</div>
                            </div></div>
                    `:productOptionsType+=`
                            <div class="productContent" data-rem-handle="${productData[i].handle}">
                            <div class="productContent_wrap">
                                <span class="compare_item_option col-4">${window.theme.strings.compareOptions}</span>
                                <div class="itemOption_1">-</div>
                            </div></div>
                        `,productOptionsSizeArray.length&&product.useCompareSize===!0&&(productOptionsSize+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                        <div class="productContent_wrap">
                            <span class="compare_item_option col-4">${product.textCompareSize}</span>
                            <div class="itemOption_1 col-8">${productOptionsSizeArray[i]}</div>
                        </div></div>`),productOptionsColorArray.length&&product.useCompareColor===!0&&(productOptionsColor+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                        <div class="productContent_wrap">
                            <span class="compare_item_option col-4">${product.textCompareColor}</span>
                            <div class="itemOption_1 col-8">${productOptionsColorArray[i]}</div>
                        </div></div> `);let saleBadge="";productData[i].price_varies?(saleBadge=`<span class="product_badge badge sale">${window.theme.strings.compareSale}</span>`,productPrice=`<span class="product-price product-regular-price">${productMoneyCurrency}${(productData[i].compare_at_price/100).toFixed(2)}</span><span class="product-price product-sale-price">${productMoneyCurrency}${(productData[i].price_min/100).toFixed(2)}</span>`):productPrice=`<span class="product-price">${productMoneyCurrency}${(productData[i].price/100).toFixed(2)}</span>`,productImage+=` 
                        <div class="productContent productContent_image_wrap" data-rem-handle="${productData[i].handle}">
                            <div class="productContent_image">
                            <div remove-item type="button" class="compare-popup-modal__toggle compareRemoveItem" data-rem-handle="${productData[i].handle}">
                                <svg
                                aria-hidden="true"
                                focusable="false" 
                                width="12"
                                height="13"                               
                                class="icon icon-close-small"
                                viewBox="0 0 12 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8.48627 9.32917L2.82849 3.67098" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M2.88539 9.38504L8.42932 3.61524" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>    
                            ${saleBadge} 
                            ${newBadge}
                             <img class="productImage" src="${imageUrl}" alt="${productData[i].title}">
                             </div> 
                        </div>
                    `,productInfo+=`<div class="productContent" data-rem-handle="${productData[i].handle}">
                        <div class="description">
                        <a class="full-unstyled-link" href="${productData[i].url}"><p class="compareProductTitle">${productData[i].title}</p></a>
                        </div>
                        <div>${productPrice}</div>
                    </div>
                    `;let availableItem="";productData[i].available===!0?availableItem=`
                <div class="productContent_wrap">
                <span class="compare_item_option col-4">${window.theme.strings.compareAvailable}</span>
                <div class="col-8">
                <span class="d-inline-flex align-items-center " aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" class="mr-1" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.00008 13.2708C3.54091 13.2708 0.729248 10.4591 0.729248 6.99996C0.729248 3.54079 3.54091 0.729126 7.00008 0.729126C10.4592 0.729126 13.2709 3.54079 13.2709 6.99996C13.2709 10.4591 10.4592 13.2708 7.00008 13.2708ZM7.00008 1.60413C4.02508 1.60413 1.60425 4.02496 1.60425 6.99996C1.60425 9.97496 4.02508 12.3958 7.00008 12.3958C9.97508 12.3958 12.3959 9.97496 12.3959 6.99996C12.3959 4.02496 9.97508 1.60413 7.00008 1.60413Z" fill="#00CA8D"/>
                        <path d="M6.17159 9.08839C6.05493 9.08839 5.94409 9.04172 5.86243 8.96006L4.21159 7.30922C4.04243 7.14006 4.04243 6.86006 4.21159 6.69089C4.38076 6.52172 4.66076 6.52172 4.82993 6.69089L6.17159 8.03256L9.16993 5.03422C9.33909 4.86506 9.61909 4.86506 9.78826 5.03422C9.95743 5.20339 9.95743 5.48339 9.78826 5.65256L6.48076 8.96006C6.39909 9.04172 6.28826 9.08839 6.17159 9.08839Z" fill="#00CA8D"/>
                    </svg>
                    ${window.theme.strings.compareAvailableStatusOk} 
                </span></div></div>`:availableItem=`
                <div class="productContent_wrap">
                <span class="compare_item_option col-4">${window.theme.strings.compareAvailable}</span>
                <div class="col-8">
                <span class="d-inline-flex align-items-center" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"  class="mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00008 13.2708C3.54091 13.2708 0.729248 10.4591 0.729248 6.99996C0.729248 3.54079 3.54091 0.729126 7.00008 0.729126C10.4592 0.729126 13.2709 3.54079 13.2709 6.99996C13.2709 10.4591 10.4592 13.2708 7.00008 13.2708ZM7.00008 1.60413C4.02508 1.60413 1.60425 4.02496 1.60425 6.99996C1.60425 9.97496 4.02508 12.3958 7.00008 12.3958C9.97508 12.3958 12.3959 9.97496 12.3959 6.99996C12.3959 4.02496 9.97508 1.60413 7.00008 1.60413Z" fill="#DBDBDB"/>
                <path d="M2.85841 11.5208C2.74757 11.5208 2.63674 11.48 2.54924 11.3925C2.38007 11.2233 2.38007 10.9433 2.54924 10.7741L10.7159 2.60747C10.8851 2.4383 11.1651 2.4383 11.3342 2.60747C11.5034 2.77663 11.5034 3.05663 11.3342 3.2258L3.16757 11.3925C3.08007 11.48 2.96924 11.5208 2.85841 11.5208Z" fill="#DBDBDB"/>
                </svg>
                ${window.theme.strings.compareAvailableStatusNo}
                </span></div></div>`,productAvailable+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                               ${availableItem}
                        </div>

                    `,productType+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                            <div class="productContent_wrap">
                            <span class="compare_item_option col-4">${window.theme.strings.compareType}</span>
                            <div class="col-8"><a class="link" href="/collections/types?q=${productData[i].type}"> ${productData[i].type}</a></div>
                            </div>
                            </div>

                    `,productOptionsVendor+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                        <div class="productContent_wrap">
                        <span class="compare_item_option col-4">${window.theme.strings.compareVendor}</span>
                        <div class="col-8"><a class="link" href="/collections/vendors?q=${productData[i].vendor}"> ${productData[i].vendor}</a></div>
                        </div></div>

                    `,productOptionsRating+=`
                    <div class="productContent" data-rem-handle="${productData[i].handle}">
                    <div class="productContent_wrap">
                    <span class="compare_item_option col-4">${window.theme.strings.compareRating}</span>
                    <div class="col-8">
                        <span class="shopify-product-reviews-badge" data-id="${productData[i].id}"></span>
                    </div>
                    </div></div>

                    `,productOptionBtn+=`
                    <div class="productContent" data-rem-handle="${productData[i].handle}">
                        <a class="button button--primary compareBtn" href="${productData[i].url}">More details</a>
                     </div>
                    `}createCompareItem.innerHTML+=`
                        <li class="row">
                            <div class="infoWrapper px-0">
                                <div class="itemImgWrap">
                                ${productImage}
                                </div>
                            </div>
                        </li>

                        <li class="row">
                            <div class="infoWrapper">
                                <div class="itemImgWrap">
                                ${productInfo}
                                </div>
                            </div>
                        </li>


                        <li class="row" id="compare__rating">
                            <div class="infoWrapper px-0">
                                <div class="itemImgWrap">
                                    ${productOptionsRating}
                                </div>
                            </div>
                        </li>


                        <li class="row">
                            <div class="infoWrapper px-0">
                                <div class="itemImgWrap">
                                ${productAvailable}
                                </div>
                            </div>
                        </li>

                        <li class="row"> 
                            <div class="infoWrapper px-0">
                                <div class="itemImgWrap">
                                    ${productOptionsVendor} 
                                </div>
                            </div>
                        </li>

                        <li class="row">
                            <div class="infoWrapper px-0">
                                <div class="itemImgWrap">
                                    ${productType}
                                </div>
                            </div>
                        </li>


                        <li class="row ${hideSizeElemByClass}">
                            <div class="infoWrapper px-0">
                                <div class="itemImgWrap">
                                    ${productOptionsSize} 
                                </div>
                            </div>
                        </li>


                        <li class="row ${hideColorElemByClass}">
                            <div class="infoWrapper px-0">
                                <div class="itemImgWrap">
                                    ${productOptionsColor}
                                </div>
                            </div>
                        </li>

                        <li class="row"> 
                            <div class="infoWrapper px-0">
                                <div class="itemImgWrap">
                                    ${productOptionsType}
                                </div>
                            </div> 
                        </li>

                        <li class="row">
                        <div class="infoWrapper px-0">
                            <div class="itemImgWrap">
                            ${productOptionBtn}
                            </div>
                        </div>
                    </li>
                `,initRemoveBtn()}),setTimeout(()=>{getCompareList.querySelector(".loading-overlay").classList.add("hidden")},500)};let compareClearAllBtn=document.getElementById("compareClearAll");compareClearAllBtn.addEventListener("click",()=>{resetCompare()});
//# sourceMappingURL=/cdn/shop/t/3/assets/compare.js.map?v=71730742251080056231698824635
