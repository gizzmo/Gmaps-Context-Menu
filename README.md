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

Adding a item specific location is simple. With `addItem()` just make the second argument the location, and the third argument the callback function.

	menu.addItem('First Item', 0, function(){
		// Click code
	})

Its also the same with separators, cept the only argument is the location

	menu.addSep(2)


### Removing items from the menu

As stated above the `addItem()` and `addSep()` methods return a jQuery object of the list item created. So if you can either call the jQuery method `remove()` or just pass it into our `remove()` method.

You can also remove them by passing an zero-based integer identifing its location. Zero-based just means 0 is the first, 1 is the second and so on.

	// Remove the first item
	menu.remove(0);

Providing a negative number indicates a position starting from the end of the list, rather than the beginning.

	// Remove the second to last item
	menu.remove(-2)

Lastly you can remove items by passing the same name that you used to create the item.

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

The class `hover` is added to list items when they are hovered over.