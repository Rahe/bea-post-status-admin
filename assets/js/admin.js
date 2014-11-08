jQuery(function(){
	var status_dropdown = jQuery( "select#post_status" ),
		status_label = jQuery( "#post-status-display" ),
		button_save = jQuery( "#save-post" ),
		button_publish = jQuery( '#publish' ),
		selected = false,
		statuses = _.pluck( bea_post_status_vars.statuses, 'name' );

	// Add the post_statuses to the admin dropdown
	_.each( bea_post_status_vars.statuses, function( status ) {
		status_dropdown.append( _.template( "<option value='<%- value %>'><%- label %></option>", { value : status.name, label :status.label } ));
		if( bea_post_status_vars.post_status === status.name ) {
			selected = status;
		}
	} );

	// Initial values set
	if( false !== selected) {
		status_dropdown.find( '[value="'+selected.name+'"]' ).attr( 'selected', 'selected' );
		status_label.html( selected.label );
	}

	// Change the button
	change_save_text( bea_post_status_vars.post_status );

	// On status change, then change the different texts
	jQuery( '#submitpost' ).on( 'click', '.save-post-status', function() {
		change_save_text( status_dropdown.val() );
	} );

	/**
	 * Change the button value based on the post_status
	 * 
	 * @param value
	 */
	function change_save_text( value ) {
		if( _.contains( statuses, value ) ) {
			return;
		}

		if( 'publish' === bea_post_status_vars.post_status ) {
			button_publish.val(_.findWhere(bea_post_status_vars.statuses, {name: value}).action);
		} else {
			button_save.val(_.findWhere(bea_post_status_vars.statuses, {name: value}).action);
		}
	}
});