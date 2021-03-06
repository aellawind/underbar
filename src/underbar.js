/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : array.splice(-n,n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)) {
      for(var i =0;i<collection.length;i++) {
        iterator(collection[i],i,collection);
      }
    } else if(typeof(collection) === 'object') {
      for (var property in collection) {
        iterator(collection[property], property, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var new_array = [];
    _.each(collection, function(item, index) {
      if (test(item) === true) {
        new_array.push(item);
      }
    });
    return new_array;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item) {
      if (test(item) !== true) {
        return true;
      }
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var new_arr = [];
    _.each(array, function(item, index) {
      if (new_arr.indexOf(item) === -1) {
        new_arr.push(item);
      }
    });
    return new_arr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var results = [];
    _.each(array, function(item) {
      results.push(iterator(item));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    
    var methodName;
    return _.map(collection, function(value) {
      if (typeof(functionOrKey) === 'function' ) {
        methodName = functionOrKey;
      } else {
        methodName = value[functionOrKey];
      }
      return methodName.apply(value,args);
    })
  };


  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  _.reduce = function(collection, iterator, accumulator) {
    var result = accumulator;
    _.each(collection, function(item) {
      result = iterator(result,item);
    });
    return result;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(memo,item) {
      // This accounts for lack of callback/iterator function
      if (!iterator && memo ){
        return memo;
      }
      if (!iterator(item)) {
        return false;
      }
      return memo === false ? memo : true;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    iterator = iterator ? iterator : _.identity;
    // TIP: There's a very clever way to re-use every() here.
    return !(_.every(collection, function(item) {
      return !iterator(item);
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments,1);
    _.each(args, function(one_obj) {
      if (one_obj) {
        for (var prop in one_obj) {
          obj[prop] = one_obj[prop];
        }
      }
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments,1);
    _.each(args, function(one_obj) {
      if (one_obj) {
        for (var prop in one_obj) {
          if (!obj.hasOwnProperty(prop)) {
            obj[prop] = one_obj[prop];
          }
        }
      }
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // stores my results
    var results = {};
    return function(param) {
      if (!results.hasOwnProperty(param)) {
        results[param] = func(param);
      }
      return results[param];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments,2);
    return setTimeout(function() {
      return func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var shuffled_array = [];
    var rand;
    _.each(shuffled_array, function(val,index,arr) {
      rand = Math.floor(Math.random()*(index+1));
      //essentially randomly trading places with values, through each iteration
      shuffled_array[index] = shuffled_array[rand];
      shuffled_array[rand] = val;
    })
    return shuffled_array;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var sort_value;
    if (typeof(iterator) === 'string') {
      sort_value = iterator;
      var res = collection.sort(function(a,b) {
        return a[sort_value] - b[sort_value];
      });
    } else if (typeof(iterator) === 'function') {
      var res = collection.sort(function(a,b) {
        return iterator(a) - iterator(b);
      });
    } 
    return res;
  };


  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zipped = [];
    var args = Array.prototype.slice.call(arguments,0);
    var sorted_args = _.sortBy(args, 'length');
    var longest = args[args.length-1].length;
    for (var i =0; i<longest;i++) {
      zipped.push([]);
    }
    for (var i =0; i<arguments.length;i++) {
      var cur = arguments[i]; //array i'm working with
      for (var j=0; j<longest;j++) {
        zipped[j][i] = cur[j];

      }
    }
    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = [];
    for (var i =0;i<nestedArray.length; i++) {
      var cur = nestedArray[i];
      if (Array.isArray(cur)) {
        result = result.concat(_.flatten(cur,result)); //yay recursion!
      } else {
        result.push(cur);
      }
    }
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments,0);
    var final = [];
    for (var x=0;x<args.length-1;x++) {
      for (var i =0;i<args[x].length;i++) {
        if (args[x+1].indexOf(args[x][i]) !== -1)
          if (final.indexOf(args[x][i])) {
            final.push(args[x][i]);
          }
      }
    }
    return final;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var first_array = arguments[0];
    var args = Array.prototype.slice.call(arguments,1);
    for (var x=0;x<args.length;x++) {
      for (var i =0;i<args[x].length;i++) {
        var el = args[x][i];
        if (first_array.indexOf(el) !== -1) {
          first_array.splice(first_array.indexOf(args[x][i]),1);
        }
      }
    }
    return first_array;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    var one_waiting = false;
    var current_ans;
    var last_called = wait;

  //Whenever date.now - last_call is less than delay, 
  //then i should set a timeout for it, rather than actually calling it
    return function() {

      var args = arguments; // Want to pass any arguments to the function
      
      // if the current time minus the time it was last called is less than wait time,
      // then I need to set a time out for it
      var diff = Date.now()-last_called;
      if (!one_waiting && diff <= wait) {
        one_waiting = true;
        setTimeout(function() {
          current_ans = func.apply(this,args);
          last_called = Date.now();
          one_waiting = false;
        }, wait-diff);
      } else if (!one_waiting) {
        current_ans = func.apply(this,args);
        last_called = Date.now();
      }

      // always return the answer
      return current_ans;
    }

  };
     

}).call(this);
