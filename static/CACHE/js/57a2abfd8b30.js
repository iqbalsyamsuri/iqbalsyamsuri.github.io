/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else{factory(jQuery);}}(function($){var pluses=/\+/g;function encode(s){return config.raw?s:encodeURIComponent(s);}
function decode(s){return config.raw?s:decodeURIComponent(s);}
function stringifyCookieValue(value){return encode(config.json?JSON.stringify(value):String(value));}
function parseCookieValue(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');}
try{s=decodeURIComponent(s.replace(pluses,' '));return config.json?JSON.parse(s):s;}catch(e){}}
function read(s,converter){var value=config.raw?s:parseCookieValue(s);return $.isFunction(converter)?converter(value):value;}
var config=$.cookie=function(key,value,options){if(value!==undefined&&!$.isFunction(value)){options=$.extend({},config.defaults,options);if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setTime(+t+days*864e+5);}
return(document.cookie=[encode(key),'=',stringifyCookieValue(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
var result=key?undefined:{};var cookies=document.cookie?document.cookie.split('; '):[];for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');var name=decode(parts.shift());var cookie=parts.join('=');if(key&&key===name){result=read(cookie,value);break;}
if(!key&&(cookie=read(cookie))!==undefined){result[name]=cookie;}}
return result;};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)===undefined){return false;}
$.cookie(key,'',$.extend({},options,{expires:-1}));return!$.cookie(key);};}));"use strict";var overlay;var themes=['architecture','communication','design','fineart','humanities','material'];function randTheme(){var chosen;if(!$.cookie('showrcatheme')){chosen=themes[Math.floor(Math.random()*themes.length)];$.cookie('showrcatheme',chosen,{expires:0.04,path:window.showIndexPath||'/'});}else{chosen=$.cookie('showrcatheme')}
$('body').addClass('theme-schoolof'+chosen);return chosen;}
function setupOverlay(){var usedSlots=[];function randSlot(limitArray){if(typeof limitArray=="undefined"){limitArray=[1,2,3,4,5,6,7,8];}
return limitArray[Math.floor(Math.random()*limitArray.length)];}
function giveSlot(element,slot){if(usedSlots.indexOf(slot)>-1){return false;}
usedSlots.push(slot);$(element).addClass('slot-'+slot);return true;}
overlay.click(function(){$(this).removeClass('in');var resetTimeout=setTimeout(function(){overlay.hide();$('body').removeClass('showoverlay');},200);});$('.repos',overlay).each(function(){var slot;if($(this).hasClass('logo')){slot=randSlot([1,2,3]);}else{slot=randSlot();}
while(!giveSlot($(this),slot)){slot=randSlot();}})}
function displayShowOverlay(){overlay.show();$('body').append(overlay);var showOverlayTimeout=setTimeout(function(){overlay.addClass('in');$('body').addClass('showoverlay');var vid=$('video',overlay).get()[0];vid.play();$('video',overlay).coverVid(500,281);},400)}
$(function(){overlay=$('.no-touch #overlay');if(overlay.length){var cookieName='2015';randTheme();if(window.debug||(!$('body').hasClass('type-login')&&!$.cookie(cookieName))){setupOverlay();displayShowOverlay();$.cookie(cookieName,'1',{expires:0.04,path:'/'});}
$('.toggleoverlay').click(function(){displayShowOverlay();});}
$('.jumplist').each(function(){var $this=$(this);$('.toggle',$this).click(function(){$this.toggleClass('open');$('.jumplist').not($this).removeClass('open');})});$('.x-plus').each(function(){var $this=$(this);var paginationContainer=$this.data('pagination');var loadmore=$('.load-more',$this);var loadmoreTarget=$('.load-more-target',$this);var itemContainer=$('.item-container',$this);var ul=$('> ul',itemContainer);var items=$('> li',ul);var step=100;var hiddenClasses='hidden fade-in-before';var contractedHeight=items.first().height();var loadmoreTargetIndex=items.index(loadmoreTarget);var loadmoreIndex=items.index(loadmore);var newItems=items.slice(loadmoreTargetIndex,loadmoreIndex);var prepareNewItems=function(items){items.addClass(hiddenClasses);};var showNewItems=function(){itemContainer.css('height',itemContainer.height());newItems.removeClass('hidden');itemContainer.animate({height:ul.height()},expansionAnimationSpeed,function(){itemContainer.removeAttr('style');});var time=0;newItems.each(function(index){var $item=$(this);setTimeout(function(){$item.addClass('fade-in-after');},time);time+=step;});};var hideNewItems=function(){$this.removeClass('expanded');itemContainer.animate({height:contractedHeight},expansionAnimationSpeed,function(){itemContainer.removeAttr('style');newItems.addClass('hidden');});var time=0;newItems.reverse().each(function(index){var $item=$(this);setTimeout(function(){$item.removeClass('fade-in-after').addClass('fade-in-before');},time);time+=step;});};prepareNewItems(items.slice(loadmoreTargetIndex,loadmoreIndex));var $bindTo=$this.closest("#listing").length?$this.closest("#listing"):$this;$($bindTo).on("click",".load-more",function(e){e.preventDefault();var loadmore=$(this);if(paginationContainer&&$(paginationContainer).length){var nextLink=$('.next a',$(paginationContainer));var nextLinkUrl=nextLink.attr('href');var nextPage=$('<html></html>').load(nextLinkUrl,function(){newItems=$('.x-plus.item-container > ul > li:not(.load-more)',nextPage);prepareNewItems(newItems);loadmore.before(newItems);if(loadmore.hasClass('gallery-load-more')){alignGallery();}
if($(paginationContainer+' .next a',nextPage).length){nextLink.attr('href',$(paginationContainer+' .next a',nextPage).attr('href'));}else{loadmore.remove();}
showNewItems();});}else if(!$this.hasClass('expanded')){showNewItems();$this.addClass('expanded');}else{hideNewItems();}
return false;});});});