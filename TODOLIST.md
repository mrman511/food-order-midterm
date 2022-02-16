# Current up to date to do list

## JQuery

### menuJQ.js
- add and minus food needs to take in food.id
     -currently food_id incrementation is hard coded ('11')
- add and minus needs to call fetch count when ajax request is made
- 

## ROUTES

### confirmation.js
- get the estimated time pick up
- when checking out, send a confirmation text message

### cart.js
- make a route for total price

### menu.js
- increase price as user adds an order

## CSS

### menu.scss
- fix nav bar to top of screen
    -z-index: 1;
- nav bar buttons need to take you to the top of that food-item category
    -drinks, appetizers, mains
    -`<br id ='menu-[food.category]' >` 
- change minus food button to an X or trash bin logo (currently the button deletes all the items of that id from the cart. easier to make it visually obvious then to fix the route)

### index.scss
- WE NEED A BAKED POTATO PICTURE


# LAST
- refactor files and clean up code
