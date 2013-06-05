/*<![CDATA[*/
/**
 * functions.js - Bibliothek mit uebergreifenden JavaScript Funktionen
 *
 * Copyright (c) 2011    die.interaktiven GmbH u. Co. KG
 *                       www.die-interaktiven.de
 *
 * Alle Rechte vorbehalten.
 * Unberechtigte Kopie und Weiterverwendung nicht gestattet.
 *
 */

 
/*
 *	$Revision: $
 * 	$Author: $
 * 	$LastChangedDate: $
 * 	$HeadURL: $
 */
 
/*
 * Globale Variablen Deklaration
 */
var DOCUMENT_ROOT = '/',

	iAutoTime = 6,

	sHashPrefix = 'section',
	iScrollToTime = 1000,
	iScrollToTop = -10,

	sActiveMenu = '',
	bHideSubnav = true,
	bIsOnMainnav = false,
	
	iHoverDelay = 300,
	iOutDelay = 100,
	oOverTimer = undefined;


/*
 * DOM Manipulation & Plugin Initialisierung/Ausführung
 */
jQuery(document).ready(function() {
	
	// Layer für den Systempartner-Link
	jQuery('#systempartner').hover(
		function() {
			jQuery('div.element.partner-layer').stop(true, true).slideToggle('slow');
		}
	);
	
	
	// Fancybox
	jQuery('.fancybox').fancybox();
	
	
	// Mainnav & Subnav Hover Effekt
	initMainnavHover();

	
	//Hover Effekt fuer die Themenbox
	jQuery('div.element.themenbox').hover(
		function() {
			jQuery(this).find('a.overlay').stop(true, true).animate({
				opacity: 0.4
			});
			jQuery(this).find('div.text').stop(true, true).slideToggle('slow');
		},
		function() {
			jQuery(this).find('a.overlay').stop(true, true).animate({
				opacity: 0
			});
			jQuery(this).find('div.text').stop(true, true).slideToggle('slow');
		}
	);
	
	
	//Hover Effekt fuer die Übersichtsbox
	jQuery('div.element.overviewbox').hover(
		function() {
			jQuery(this).find('a.overlay').stop(true, true).animate({
				opacity: 0.46
			});
		},
		function() {
			jQuery(this).find('a.overlay').stop(true, true).animate({
				opacity: 0
			});
		}
	);
	
	
	//Hover Effekt fuer News in der Listenansicht
	jQuery('div.element.newslist div.item').hover(
		function() {
			jQuery(this).find('span.overlay').stop(true, true).animate({
				opacity: 0.2
			});
		},
		function() {
			jQuery(this).find('span.overlay').stop(true, true).animate({
				opacity: 0
			});
		}
	);
	
	
	// Horizontales/Vertikales Tabmenu
	jQuery('.tabs').tabs();
	
	
	// Slider
	jQuery('#slider').jcarousel({
		//visible: 4,
		scroll: 1,
		auto: 3,
		//animation: 3000,
		wrap: 'circular',
		initCallback: sliderinitCallback,
		buttonNextHTML: null,
        buttonPrevHTML: null
	});
	
	
	// Startslider
	jQuery('#startslider').jcarousel({
		visible: 1,
		scroll: 1,
		auto: 5,
		//animation: 3000,
		wrap: 'both',
		initCallback: sliderinitCallback,
		buttonNextHTML: null,
        buttonPrevHTML: null
	});
	
	
	// Accordion
	initAccordionLinks();
	
	jQuery('.section').accordion({
		collapsible: true,
		header : 'div.head',
		active : false,
		autoHeight: false,
		navigation: true,
		
		change: function(_event, _ui){
			var googleMapIframe = _ui.newContent.find('iframe');
			
			if(googleMapIframe.size() > 0){
				var iframeSrc = googleMapIframe.attr('src');
				
				googleMapIframe.attr('src', iframeSrc);
			}
		}
	});
});


/**
 * 
 */
function initAccordionLinks(){
	jQuery('div.section div.item div.head .title a, div.section div.item div.head').click(function(_event){
		var hash = this.hash;
		
		if(hash) {
			location.hash = hash;
		}
		else {
			location.hash = jQuery(this).find('a').get(0).hash;
		}
	});
}


/**
 * Skript zur Initialisierung des Hover Effektes der Mainnav
 * 
 * @return	void
 */
function initMainnavHover(){
	jQuery('#mainnav ul li.he').hover(
		// Mouseenter/Over
		function(_event){
			bIsOnMainnav = true;

			if(!oOverTimer){
				var oSelf = jQuery(this);
				
				oOverTimer = setTimeout(function(){
					
					bHideSubnav = false;
					sActiveMenu = 's' + oSelf.attr('id');
					
					var oSM = jQuery('#' + sActiveMenu);
								
					oSM.stop(true, true).slideDown('slow');
					
					jQuery('#subnav ul').each(function() {				
						if (jQuery(this).attr('id') != sActiveMenu) {
							jQuery(this).stop(true, true).slideUp('slow');
						}				
					});
					
				}, iHoverDelay);
			}
		},
		
		// Mouseleave/Out
		function(_event) {
			
			bIsOnMainnav = false;
			
			clearTimeout(oOverTimer);
			oOverTimer = undefined;
			
			var oSN = jQuery('#subnav'),
				oMN = jQuery('#mainnav');
			
			bHideSubnav = true;
			
			window.setTimeout(function(){
				
				if(bHideSubnav && bIsOnMainnav === false && oSN.is(':visible')){
					oSN.children().find('ul').stop(true, true).slideUp('slow');
				}
				
				sActiveMenu = '';
				oOverTimer = undefined;
			}, iOutDelay);
		}
	);
	

	jQuery('#subnav').hover(
		// Mouseenter/Over
		function(_event){
			bHideSubnav = false;
		},
		
		// Mouseleave/Out
		function(_event) {
			var oSM = $(this);
			
			window.setTimeout(function() {
				
				if (sActiveMenu == '' && bIsOnMainnav === false) {
					oSM.children().find('ul').stop(true, true).slideUp('slow');
				}
			}, iOutDelay);
		}
	);
}



/**
 * Initialisierung des Startsliders
 * Dabei werden den eigens erstellten Navigationsbuttons click 
 * Funktionen zum vor und zurück setzen des Sliders zugewiesen
 * 
 * @param carousel
 */
function sliderinitCallback(carousel) {
	jQuery('div.jcarousel-next').bind('click', function() {
        carousel.next();
        return false;
    });

    jQuery('div.jcarousel-prev').bind('click', function() {
        carousel.prev();
        return false;
    });
};


/**
 * 
 */
function doStart()
{
	setStatus('steinbach');
}


/**
 * Zieht aus der Mainnav die Content Elemente in die jeweilige Subnav
 */
function initSubnav()
{
	jQuery('#mainnav div.colspan-subnav').parent('li').each(function(index, element){
		var subnavContent = jQuery(element).children('div.colspan-subnav');
		var targetContainer = jQuery('#s' + jQuery(element).attr('id'));
		
		targetContainer.append(subnavContent).find('div.colspan-subnav').wrap('<li class="subnav-content"></li>');
	});
}


////Berechnet die Größe der Sliderbilder neu, nach einem Resize 
////des Browserfensters oder bei kleineren Bildschirmen
function positionContent() {
	var ratio = 450 / 1680;
	
	var windowWidth = jQuery(window).width();
	var imgHeight = Math.ceil(ratio * windowWidth);
	
	if(windowWidth >= 1040) {
		jQuery('div.element.startslider, #colspan-startslider, div.element.startslider div.jcarousel-clip-horizontal, div.element.startslider div.jcarousel-container-horizontal, div.element.startslider li.jcarousel-item img').css('height', imgHeight);
		
		var images = jQuery('div.element.startslider li.jcarousel-item img');
		jQuery(images).each(function(){
			jQuery(this).width(windowWidth);
		});		
	}
	else {
		defaultHeight = 980;
		imgHeight = Math.ceil(ratio * defaultHeight);
		
		jQuery('div.element.startslider, #colspan-startslider, div.element.startslider div.jcarousel-clip-horizontal, div.element.startslider div.jcarousel-container-horizontal, div.element.startslider li.jcarousel-item img').css('height', imgHeight);
		
		var images = jQuery('div.element.startslider li.jcarousel-item img');
		jQuery(images).each(function(){
			jQuery(this).width(defaultHeight);
		});
	}
	
}


/**
 * Beim Laden des Fensters
 */

jQuery(window).load(function(){
	var sHash = window.location.hash.replace(sHashPrefix + '-', '');
	
	if(sHash && (jQuery(sHash).length > 0)){
		jQuery.scrollTo(sHash, iScrollToTime, {offset: {top: iScrollToTop, left: 0} });
	}
	else{
		var scrollToObj = jQuery('div.element.accordion div.head h2.title a[href*="' + sHash + '"]');
		
		if(scrollToObj.size() > 0){
			jQuery.scrollTo(scrollToObj, iScrollToTime, {offset: {top: iScrollToTop, left: 0} });
		}
	}
});

 

/**
 * Bei Resize des Fensters
 */
jQuery(window).resize(function(){
	positionContent();
});


/**
 * Beim Laden des Fensters
 */
jQuery(window).load(function(){
	positionContent();
	initSubnav();
});


window.onload = doStart;

/*]]>*/