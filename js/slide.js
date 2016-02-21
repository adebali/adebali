	function buildSlides(){
	//	console.log("Build Slides");
	
		$("#slides").slidesjs({
			width: 700,
			height: 317,
			navigation: false,
			pagination: {
			  active: true,
				// [boolean] Create pagination items.
				// You cannot use your own pagination. Sorry.
			  effect: "fade"
				// [string] Can be either "slide" or "fade".
			},
			play: {
				active: false,
					// [boolean] Generate the play and stop buttons.
					// You cannot use your own buttons. Sorry.
				interval: 15000,
					// [number] Time spent on each slide in milliseconds.
				auto: true,
					// [boolean] Start playing the slideshow on load.
				swap: false,
					// [boolean] show/hide stop and play buttons
				pauseOnHover: true,
					// [boolean] pause a playing slideshow on hover
				restartDelay: 2500,
					// [number] restart delay on inactive slideshow
					effect: "fade"
			},
			effect: {
			  fade: {
				speed: 1500,
				  // [number] Speed in milliseconds of the fade animation.
				crossfade: true
				  // [boolean] Cross-fade the transition.
			  }
			},
			callback: {
			  loaded: function(number) {
				// Do something awesome!
				// Passes start slide number
			
			  },
			  start: function(number) {
				// Do something awesome!
				// Passes slide number at start of animation
					  
			  },
			  complete: function(number) {
				// Do something awesome!
				// Passes slide number at end of animation

						 
			  }
			}
			 
        });
   
	}