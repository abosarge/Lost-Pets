<h1 align="center">
<br>
<img width="400" src="http://miramollar.com/pawpatrol/images/PawPatrol.png" alt="logo">
<br>
<br>
<br>
</h1>

# Paw Patrol
An app that reunities pets with their families!

## History
This project is the product of our Baltimore Hackathon project, below is some information regarding the project and our vision for the future!

## Inspiration
Driving to works a few weeks ago, I (Amanda) saw a dog running wildly down Lombard St. towards Patterson Park. The dog looked well-fed and cared for, but seemed to be very scared. While I was not in a position to make a u-turn and follow the dog, I wanted to find a way to contact the owner with the whereabouts of their dog. It took three days for me to find the Craigslist posting, and unfortunately at the time the information was unhelpful to the owner. If someone were able to see sightings of animals with similar descriptions to their pets, they could narrow their search considerably!

## What it does
Paw Patrol is the Waze for pets- it posts lost pets, found pets, and pet sightings to an interactive map that updates in real time.

If Kim's pet runs out the door one morning on her way to work, she can post her lost pet with the location where it went missing, a description, and a photo. Paul's on his way to work and he sees a terrier running wildly at the corner of Baltimore and Caroline on the east side. He posts a description of the pet, the location, and a photo, enabling tracking of a pet. Paul's update creates a general location of the lost pet's whereabouts so Kim can start looking for her lost pet in an intuitive manner. The site also aggregates data from found pet sites so Paw Patrol will be a one-stop shop for finding pets.

## How we built it
The site is built using Mapbox, an open-source JavaScript library that allows you to store and query a set of items based on their geographic location. We initially used a FireBase boilerplate and incorporated GeoFire to pull coordinate data from the FireBase database, but pivoted after learning (in a few hours) how intuitive and interactive Mapbox's API was in relation to our project. The database was populated by aggregated JSON data from various pet lost and found sites. The front-end was built with HTML, CSS, jQuery, and more.

## Challenges we ran into
Dealing with the HTML5 canvas was problematic on every level. The map was housed in the canvas and any attempt to style the map, even wrapping it in a div, resulted in doom. On the back-end, a large pain point was pulling in the coordinate data from the database and incorporating the real-time components. The data aggregation through node presented a challenge in formatting the database as well, but with a lot of elbow grease, ingenuity, and quick-thinking, we were able to come to a finished product that we're quite excited about!

## Accomplishments that we're proud of
We all come from varied backgrounds (designers, developers, and game designers), and was able to not only come together and work in functions outside of our job titles and comfort levels, but learn completely new languages, libraries, frameworks, and platforms in a few hours. We worked together, laughed together, and figured out how to make Google Maps conform to our bidding. We tested, broke, retested, and pivoted. We laughed, we almost cried, and we went from strangers to buddies in a matter of days. This was an amazing experience and we're all very proud to have gotten this far.

##What we learned
We learned various tricks and conventions in Firebase, Mapbox, JSON, node.js, jQuery, GeoFire, and more. We strengthened our knowledge of database structure, and learned new ways of accomplishing queries and data calls. We also got really good at version control and working collaboratively in Git/Github.

##What's next for Paw Patrol
We are all committed to creating a production-ready, polished product that pet owners love, and have a laundry list of features that we'd love to accomplish for the future, including:

Geolocation as a starting point for the map
An added searchable database for lost/found animals
An accompanying mobile app

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


