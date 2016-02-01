/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have a URL defined, and that the URL is not empty', function () {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      }
    });

    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have a name defined, and that the name is not empty', function () {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe('');
        expect(typeof allFeeds[i].name).toBe('string');
      }
    });
    
    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a color defined
     * and that the color is valid.
     */
    it('have a color defined, and that the color is valid', function () {
      var colorRegex = /[0-9a-fA-F]/;

      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].color).toBeDefined();
        expect(allFeeds[i].color).not.toBe('');
        expect(allFeeds[0].color.charAt(0)).toBe('#');
        expect(allFeeds[i].color.length).toBe(7 || 4);
        if (allFeeds[i].color.length === 4) {
          for (var j = 2; j < 5; j++) {
            expect(allFeeds[i].color.charAt(j)).toMatch(colorRegex);
          }
        }
        if (allFeeds[i].color.length === 7) {
          for (var j = 2; j < 5; j++) {
            expect(allFeeds[i].color.charAt(j)).toMatch(colorRegex);
          }
        }
      }
    });
  });

  /* A new test suite named "The menu" */
  describe('The Menu', function () {
    /* A test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden by default', function () {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* A test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('should change visibility when the menu icon is clicked', function () {
      $('.menu-icon-link').trigger('click');

      // Don't think we can use 'display' because '.slide-menu' is just transformed off the screen; still has display: block
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  /* A new test suite named "Initial Entries" */
  describe('Initial Entries', function () {

    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    beforeEach(function (done) {
      // this is only possible because the 'loadFeed' function supports (is written in the function) a callback, which is run upon both success and error
      loadFeed(0, function () {
        done();
      });
    });

    it('when loadFeed function is called and completes it work, there is at least a single .entry element within the .feed container', function (done) {
      expect($('.feed').find('*').hasClass('entry')).toBe(true);
      done();
    });
  });

  /* A new test suite named "New Feed Selection" */
  describe('New Feed Selection', function () {

    // Generate random index for allFeeds (greater than 0, the initial load index)
    var myIndex = Math.floor((Math.random() * (allFeeds.length - 1)) + 1);
    var contentBefore, contentAfter, colorBefore, colorAfter;
    
    // Load feed and save data
    beforeEach(function (done) {

      // reload default feed
      loadFeed(0, function () {
        // save data, after loadFeed completes, and before new feed loads
        contentBefore = $('.feed').html();
        colorBefore = $('.header').css('background-color');
        console.log('loadFeed in `beforeEach` completed');
        done();
      });
    });

    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('when new feed is loaded, that the content actually changes', function (done) {
      loadFeed(myIndex, function () {

        // save data after loadFeed (2nd time) completes
        contentAfter = $('.feed').html();

        // these expect calls need to be inside the async `loadFeed` call so they are called only after it finishes
        expect(contentAfter).toBeDefined();
        expect(contentBefore).not.toMatch(contentAfter);
        console.log('loadFeed in `it(content)` completed');
        done();
        console.log('code outside of loadFeed in `it(content)` completed');
      });
    });

    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the header color changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('when new feed is loaded, that the header color changes',
      function (done) {
        loadFeed(myIndex, function () {

          // save data after loadFeed (4th time)
          colorAfter = $('.header').css('background-color');
          expect(colorAfter).toBeDefined();
          expect(colorBefore).not.toEqual(colorAfter);
          console.log('loadFeed in `it(color)` completed');
          done();
        });
        console.log('code outside of loadFeed in `it(color)` completed');
      });

    afterAll(function () {
      loadFeed(0);
      console.log('loadFeed in `afterEach` completed');
    });

  });
}());