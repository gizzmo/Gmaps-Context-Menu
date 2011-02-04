Context Menu for Google Maps API v3
===================================

This Javascript class gives the ability to add a context menu to a Google Map.

Usage
-----

### Constructing

When constructing this class you pass an array of options. Currently the only option is the map object the menu

	var map = new google.maps.Map($('#map_canvas')[0], {
		center: new google.maps.LatLng(38.42328971470765, -98.74198833593748),
		zoom: 4
	});

	var menu = new contextMenu({map:map});


### Adding items to the menu

To add items to the menu you use the `addItem()` method. It returns the the jQuery object for the list item created.

	var item = menu.addItem('Zoom In', function(map, latLng){
		map.setZoom( map.getZoom() + 1);
		map.panTo( latLng );
	});

You can also add separators by using the `addSep()` method. It _also_ returns the jQuery object of the list item created

	var separator = menu.addSep();


### Removing items from the menu

As stated above the `addItem()` and `addSep()` methods return the jQuery object of the list item created. So if you can either call the jQuery method `.remove()` or just pass it into the `removeItem()` or `removeSep()`

	menu.removeItem(item);

	menu.removeSep(separator);

You can also remove items and separators by passing a integer. Pass a negive integer to start at the end and work backwards. See: [http://api.jquery.com/eq/](http://api.jquery.com/eq/)

	// Remove the first item
	menu.removeItem(0);

	// Remove the second to last item
	menu.removeItem(-2)

Each method filters the list items to the current type. So `.removeSep(3)` will remove the third separator even if there are 5 menu items before it

	// Remove the first separator (even if its not the first list item)
	menu.removeSep(0);

You can also remove items by passing the same name that you used to create the item.

	menu.removeItem('Zoom In');


Styling
-------

All styling is done via a single `style.css` file. The layout of the html is the following:

	<div class="contextMenu">
		<ul>
			<li id="zoomIn"><a href="#zoomIn">Zoom In</a></li>
			<li id="zoomOut"><a href="#zoomOut">Zoom Out</a></li>
			<li class="separator"><div></div></li>
			<li id="centerHere"><a href="#centerHere">Center Here</a></li>
		</ul>
	</div>

The class `.hover` is added to list items when they are hovered over.