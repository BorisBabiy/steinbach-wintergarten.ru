/*<![CDATA[*/
/**
 * lib.js - Bibliothek mit uebergreifenden JavaScript Funktionen
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



function setStatus(sText)
{
	try
	{
		if(!sText) sText = '';
		window.status = sText;
		return true;
	}
	catch(e)
	{
		void(0);
	}
}

function showPopup(sUrl, sName, iBreite, iHoehe, sFeatures, iPosx, iPosy)
{
	try
	{
		var oWin = window.open(sUrl, sName,"width=" + iBreite + ",height=" + iHoehe + "," + sFeatures + "");
		
		if(oWin)
		{
			if(!iPosx)
			{
				x = (screen.width-iBreite)/2;
			}
			else
			{
				x = iPosx;
			}
			
			if(!iPosy)
			{
				y=(screen.height-iHoehe)/2;
			}
			else
			{
				y = iPosy;
			}
			
			oWin.moveTo(x,y);
			
			oWin.focus();
		}
	}
	catch(e)
	{
		void(0);
	}
}

function printPage()
{
	window.print();
}

function trim( sString )
{
	return (sString || "").replace( /^\s+|\s+$/g, "" );
}

function checkEmail( sEmail )
{
	var res = false;
	reg = new RegExp('^([a-zA-Z0-9\\-\\.\\_]+)'+'(\\@)([a-zA-Z0-9\\-\\.]+)'+'(\\.)([a-zA-Z]{2,4})$');
	return (reg.test(sEmail));
}

/*]]>*/