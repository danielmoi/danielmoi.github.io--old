## Frontend Nanodegree P4 – Website Performance Optimisation project

This project consisted of 2 parts, both concerned with optimising the online portfolio for SPEED!  


####Part 1: Optimize PageSpeed Insights score for index.html

Here is what I did to achieve a PageSpeed Insights score of over 90:

1. Optimised text file sizes
 * minified CSS using http://cssshrink.com/ for this
 
2. Optimised image file sizes
 * photoshop to reduce the file sizes
 * srcset attribute to allow the browser to choose which images to load
 * created thumbnail for pizzeria image
 
3. Optimised page loading
 * inlined CSS for whole page (only 3 kb, and all above the fold) to reduce render blocking code
 * asynchronous JS for analytics, web font to reduce render blocking code

4. Optimised web fonts
 * I used the Web Font Loader API to asynchronously load subset weights of Open Sans
 





####Part 2: Optimize Frames per Second in pizza.html

Here is what I did to achieve Frames per Second below 60:

*main.js*
1. Moved variable declarations outside of loops
2. Created variables to store DOM lookups
3. Used narrower DOM selectors, such as `document.getElementsByClassName`
4. Refactored the `changePizzaSizes` function
5. Reduced the nmber of pizzas rendered using the variable `pizzasNeeded`

*style.css*
1. Added `will-change: transform` to the class `mover`


####More information
You can view my code repo on GitHub: https://github.com/dm4000/frontend-nanodegree-mobile-portfolio

You can visit a live version of my speedy site: http://dm4000.github.io/P4/

Thanks for visiting, and happy coding!