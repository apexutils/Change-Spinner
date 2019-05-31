window.apexUtils = window.apexUtils || {};
window.apexUtils.changeSpinner = function(){

	var me = this;
	var spinnerHTML = me.action.attribute01;
	var spinnerCSS  = me.action.attribute02;

	//Overwriting apex.util.showSpinner with a custom Spinner
	//the only changes to the original function (19.1) are:
	//	the out.markup parameter
	//  the custom css part

	apex.util.showSpinner = function( pContainer, pOptions ) {
	    var lSpinner$, lLeft, lTop, lBottom, lYPosition, lYOffset,
	        out         = apex.util.htmlBuilder(),
	        lOptions    = $.extend ({
	            alert:          apex.lang.getMessage( "APEX.PROCESSING" ),
	            spinnerClass:    ""
	        }, pOptions ),
	        lContainer$ = ( pContainer && !lOptions.fixed ) ? $( pContainer ) : $( "body" ),
	        lWindow$    = $( window ),
	        lContainer  = lContainer$.offset(),
	        lViewport   = {
	            top:  lWindow$.scrollTop(),
	            left: lWindow$.scrollLeft()
	        };

	    // has to be converted into an inline block for the calculations to work properly
	    spinnerHTML = 
	    	'<div class="apex-utils-spinner-outer" style="display: inline-block;">' +
    			spinnerHTML +
    		'</div>';

	    out.markup(spinnerHTML);

	    // And render and position the spinner and overlay
	    lSpinner$ = $( out.toString() );

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

	//adding the custom css
	$('#apex-utils-spinner-css').remove();

	if(spinnerCSS){
		var toAppend = '<style id="apex-utils-spinner-css">'+ spinnerCSS +'</style>';
		$('head').append(toAppend);
	}
};



