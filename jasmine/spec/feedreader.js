/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

		 /*
         * ensures the allFeeds object it has a URL defined
         * and that the URL is not empty.
         */
		it('has a defined URL', function() {
			for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
			}
		});
        /* Loops through each feed in the allFeeds object 
		 * and ensures it has a name defined
         * and that the name is not empty.
         */
		it('has a defined name', function() {
			for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
			}
		});
    });

    /* a new test suite named "The menu" */
	describe('The menu', function() {
	
        /* ensures the menu element is hidden by default.*/
		it('should have class "menu-hidden"', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
		
         /* ensures the menu changes visibility when the menu icon is clicked*/
		it('should change on click', function() {
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).not.toBe(true);
			$('.menu-icon-link').trigger('click');
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});
    /* new test suite named "Initial Entries" */
	describe('Initial Entries', function() {
		
        /* ensures when the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
		
		beforeEach(function(done) {
			loadFeed(0, done);
		});
		
		it('has .entry in .feed', function() {
			expect($('.feed .entry').length).toBeGreaterThan(0);
		});
		
	});
    // new test suite named "New Feed Selection"
	describe('New Feed Selection', function() {
	
        /* ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
		
		var headerOriginal;
		var headerUpdate;
		beforeEach(function(done){
			$('.feed').empty();

			loadFeed(0, function() {
				headerOriginal = $('.feed').find('.entry').text();
				done();
			});

			loadFeed(1, function() {
				headerUpdate = $('.feed').find('.entry').text();
				done();
			});
		});
	    it('changes the content', function(){
			expect(headerOriginal).not.toEqual(headerUpdate);
		});
	});
}());
