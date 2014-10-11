---
layout: post
title:  "Exploring Javascrtipt Multidimensional Arrays"
date:   2014-10-11
categories: javascript multidimensional-arrays data-structures
---

The main data structure for Crosstronica will be the multidimensional grid array. It will create a matrix of color objects that form the pattern. I realized while defining requirements that I was not aware of a multi-dimensional array type in javascript.

After poking around, I found that I was right. Javascript ony has arrays, but you can fake a multidimensional array by creating an array of arrays. The parent array represets the rows. each inner-array represents the columns within that row. At least, that's how I'm seeing it.

#### Data Needed

```javascript

multiArray3x3 = [
  [{}, {}, {}],
  [{}, 'foo', {}],
  [{}, {}, {}]
]

multiArray3x3[1][1] === 'foo'

```

While anything can go in the arrays, the app will limit them to containing Color objects. I'll also assume square grids to start.

### Creating the array in raw js

To start using the structure, I wrote a quick Class to define a square grid and fill it with numbers 0 to (size * 2).

```javascript

var Grid = function(size) {

  grid = new Array(size);

  // Insert row arrays in grid array
  for(i=0; i < size; i++) {
    var thisRow = new Array(size);
    grid[i] = thisRow;
  }

  // Fill grid with numbers 0 to grid size
  for(i=0; i < size; i++) {
    for(j=0; j < size; j++) {
      grid[i][j] = j + (size * i);
    }  
  }

  return grid;

};

// Make new grid of size x
grid = new Grid(2);

// Show grid in console
for(i=0; i < grid[0].length; i++) {
  for(j=0; j < grid[i].length; j++) {
    console.log(i + ', ' + j + ': ', grid[i][j]);
  }  
}

```

This is great, It proves to me that I can define grids for patterns. On the side, I've just started to use the lodash library for js data manipulation. It should be better performing and allow me to write more consice code. There will be a learning curve as I havent; done much functinoal programming / lisp and lodash uses a similar syntax. Though after working with it for a couple days, it reminds me of chaining jQuery functions more than lisp.

My next step will be to rewrite this script with lodash and compare the time.

CHeers!
