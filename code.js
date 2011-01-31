/**
 * Context Menu for google maps
 */
(function(window, undefined){

	// Use the correct document accordingly with window argument (sandbox)
	var document = window.document,

		// shorthand some stuff
		$ = jQuery,
		g = google.maps;

	/**
	 * Create the context menu
	 */
	function contextMenu(opts)
	{
		// A way to access 'this' object from inside functions
		var self = this;

		if (opts.map !== undefined)
		{
			// Put the map onto the object
			this.theMap = opts.map;

			// Keep track of where you clicked, for the callback functions.
			this.clickedLatLng = null;

			// Create the context menu element
			this.theMenu = $(document.createElement('div'))
				.attr('id', 'contextMenu') 	// todo: needs to be unique, incase of multiple maps and context menus

				// .. disable the browser context menu on our context menu
				.bind('contextmenu', function() { return false; })

				// .. append a ul list element
				.append( $(document.createElement('ul')) )

				// .. then append it to the map object
				.appendTo(this.theMap.getDiv());

			// Display and position the menu
			g.event.addListener(this.theMap, 'rightclick', function(e)
			{
				// Shorthand some stuff
				var mapDiv = $(self.theMap.getDiv()),
					menu = self.theMenu,
					x = e.pixel.x,
					y = e.pixel.y;

				// Hide the context menu if its open
				menu.hide();

				// Save the clicked location
				self.clickedLatLng = e.latLng;

				// Adjust the menu if clicked to close to the edge of the map
				if ( x > mapDiv.width() - menu.width() )
					x -= menu.width();

				if ( y > mapDiv.height() - menu.height() )
					y -= menu.height();

				// Set the location and fade in the context menu
				menu.css({ top: y, left: x }).fadeIn(200);
			});

			// Hide context menu on several events
			$.each('click dragstart zoom_changed maptypeid_changed center_changed'.split(' '), function(i,name){
				g.event.addListener(self.theMap, name, function(){ self.theMenu.hide(); });
			});
		}
	}

	/**
	 * Add new items to the context menu
	 */
	contextMenu.prototype.addItem = function(name, callback)
	{
		// A way to access 'this' object from inside functions
		var self = this,

			// The name turned into camelCase for use in the li id, and anchor href
			idName = name.toLowerCase().replace(/(\s)([a-z])/gi, function(match, group1, group2){
				return group2.toUpperCase().replace(group1,'');
			}),

			// The li element
			li = $(document.createElement('li'))
				.attr('id', idName)
				.appendTo( this.theMenu.children().first() );

		// the anchor element
		$(document.createElement('a'))
			.attr('href', '#'+idName).html(name)
			.appendTo(li)

			// Add some nice hover effects
			.hover(function() {
				$(this).parent().toggleClass('hover');
			})

			// Set the click event
			.click(function(){

				// fade out the menu
				self.theMenu.hide();

				// call the callback function - 'this' would refer back to the jQuery object of the item element
				callback.call(this, self.theMap, self.clickedLatLng);

				// make sure the click doesnt take us anywhere
				return false;
			});

		// return the whole list item
		return li;
	};

	/**
	 * Remove one of the items
	 */
	contextMenu.prototype.removeItem = function(item)
	{
		// No need to search for name if its a jquery object
		if (item instanceof $)
			item.remove();

		else if (typeof item === 'number')
		{
			// Find all the items elements and remove the one at the specified index
			this.theMenu.find('li:not(.separator)').eq(item).remove();
		}
		else if (typeof item === 'string')
		{
			// The name turned into camelCase for use in the li id
			var idName = item.toLowerCase().replace(/(\s)([a-z])/gi, function(match, group1, group2){
				return group2.toUpperCase().replace(group1,'');
			});

			// Find and remove the element
			this.theMenu.find('#'+idName).remove();
		}
	};

	/**
	 * Add a seperators
	 */
	contextMenu.prototype.addSep = function()
	{
		// Create the li element and return it
		return $(document.createElement('li'))
			.addClass('separator')

			// .. add a div child
			.append ( $(document.createElement('div')) )

			// .. and attached it to the menu ul
			.appendTo( this.theMenu.children().first() );
	};

	/**
	 * Remove a seperator
	 */
	contextMenu.prototype.removeSep = function(item)
	{
		// No need to search for name if its a jquery object
		if (item instanceof $)
			item.remove();

		else if (typeof item === 'number')
		{
			// Find all the seperator elements and remove the one at the specified index
			this.theMenu.find('li.separator').eq(item).remove();
		}
	};

	// Expose this to the global object
	window.contextMenu = contextMenu;

})(window);