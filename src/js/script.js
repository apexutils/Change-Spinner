window.apexUtils = window.apexUtils || {};
window.apexUtils.changeSpinner = function(){

	var spinnerHTML = this.action.attribute01;
	var spinnerCSS  = this.action.attribute02;

	//Overwriting apex.util.showSpinner with a custom Spinner
	//the only changes to the original function (taken from 19.1) are:
	//	the markup of lSpinner$
	//  injecting the custom css

	apex.util.showSpinner = function( pContainer, pOptions ) {
	    var lSpinner$, lLeft, lTop, lBottom, lYPosition, lYOffset,
	        out         = apex.util.htmlBuilder(),
	        lOptions    = $.extend ({
	            alert:          apex.lang.getMessage( "APEX.PROCESSING" ),
	            spinnerClass:   ""
	        }, pOptions ),
	        lContainer$ = ( pContainer && !lOptions.fixed ) ? $( pContainer ) : $( "body" ),
	        lWindow$    = $( window ),
	        lContainer  = lContainer$.offset(),
	        lViewport   = {
	            top:  lWindow$.scrollTop(),
	            left: lWindow$.scrollLeft()
	        };

	    //change 1 starts here --------------------------------
	    spinnerHTML = spinnerHTML.replace(/#ALERT#/g, lOptions.alert);
	    spinnerHTML = spinnerHTML.replace(/#SPINNERCLASS#/g, lOptions.spinnerClass);

	    lSpinner$ = $( spinnerHTML );

	    lSpinner$.css({
	    	zIndex: 2000,
	    	boxSizing: 'border-box',
	    	display: 'block',
	    	position: 'absolute'
	    });
	    //change 1 ends here ----------------------------------

	    lSpinner$.appendTo( lContainer$ );

	    if ( lOptions.fixed ) {
	        lTop = ( lWindow$.height() - lSpinner$.height() ) / 2;
	        lLeft = ( lWindow$.width() - lSpinner$.width() ) / 2;
	        lSpinner$.css( {
	            position: "fixed",
	            top:  lTop + "px",
	            left: lLeft +  "px"
	        } );
	    } else {
	        // Calculate viewport bottom and right
	        lViewport.bottom = lViewport.top + lWindow$.height();
	        lViewport.right = lViewport.left + lWindow$.width();

	        // Calculate container bottom and right
	        lContainer.bottom = lContainer.top + lContainer$.outerHeight();
	        lContainer.right = lContainer.left + lContainer$.outerWidth();

	        // If top of container is visible, use that as the top, otherwise use viewport top
	        if ( lContainer.top > lViewport.top ) {
	            lTop = lContainer.top;
	        } else {
	            lTop = lViewport.top;
	        }

	        // If bottom of container is visible, use that as the bottom, otherwise use viewport bottom
	        if ( lContainer.bottom < lViewport.bottom ) {
	            lBottom = lContainer.bottom;
	        } else {
	            lBottom = lViewport.bottom;
	        }
	        lYPosition = ( lBottom - lTop ) / 2;

	        // If top of container is not visible, Y position needs to add an offset equal hidden container height,
	        // this is required because we are positioning in the container element
	        lYOffset = lViewport.top - lContainer.top;
	        if ( lYOffset > 0 ) {
	            lYPosition = lYPosition + lYOffset;
	        }

	        lSpinner$.position({
	            my:         "center",
	            at:         "left+50% top+" + lYPosition + "px",
	            of:         lContainer$,
	            collision:  "fit"
	        });
	    }

	    return lSpinner$;
	};



	//change 2 starts here --------------------------------
	$('#apex-utils-spinner-css').remove();

	if(spinnerCSS){
		var toAppend = '<style id="apex-utils-spinner-css">'+ spinnerCSS +'</style>';
		$('head').append(toAppend);
	}
	//change 2 ends here ----------------------------------
};



