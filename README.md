# mgf-124

1. Determine the “proper” route (HTTP Method & Endpoint). Use RESTful conventions whenever possible.
2. Add the UI (link or form) that triggers the HTTP request that matches the route.
3. Define the route in the appropriate router module that will match the HTTP request and map it to the `<controller>.<method>` that will perform the desired functionality.
4. Add the controller action/method, and be sure to export it.
5. In the controller, perform the necessary CRUD action. Then either `render` (passing it data) in the case of a `GET` request or `redirect` if data has been mutated (`POST`, `PUT` & `DELETE`). If rendering, code the view template if necessary.

# Part One

## Requirements

• create flight model (airline, airport, flightNo, departs)

• index view

• newFlight and create flight

• nav bar (all flights, add flight)

• delete flight from index view

• show flight view

• within show, edit button to update a flight

## Hints

• `<input type="datetime-local">`

• select menu to display airports


## Bonus One

• display default departure date when creating new flight

• view flights in ascending order (begins with the least or smallest and ends with the greatest or largest)

• red when departure has passed

---

# Part Two

There are two ways to model related data in MongoDB:

1. Using **embedding**, where parent documents hold sub-documents.
2. Using **referencing**, where a document contains just the related document’s `ObjectId`.

Subdocuments are very similar to regular documents. The difference is that they are not saved directly - but instead when the document they are embedded within is saved.

Subdocuments have their own **schema**, but since subdocuments are not saved to a collection, we **do not compile a subdocument’s schema into a Model**

## Requirements

• create a ticket schema (seat, price)

• add embedded ticket schema to flight

• display tickets on flight show

• add tickets on show flight view

• display list of tickets on flight show view

## Hints

• regular expression

Short for regular expression, a regex is a string of text that allows you to create patterns that help match, locate, and manage text.

[A-F][1-9]\d?
first character range - A through F
second character range - 1 through 9
third character range - 0 through 9
question mark makes the last character optional

same as 
[A-F][1-9][0-9]?


## Bonus Two

• Delete a ticket

---

# Part Three

## Requirements

• create a meal schema

• create a meals property in flight to reference meal

• add a link in the navbar for "Add meal"

• create new meal view (list of meals should be displayed below the form)

• add select menu to flight show view to display meals that can be added to flight

• add a section to flight show view to display a list of current meals

## Bonus Three

• display error message if meal already exists

• delete current meal for a flight

• once a meal has been added to a flight, it should no longer appear as an option








