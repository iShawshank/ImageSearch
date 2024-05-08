# Flickr Image Search

Simple image search app (iOS, Android, or Web) using the Flickr API. It will allow users to search for images and see details about ones they like.

### Installation:

Run the following to get up and running.

```
npm ci
```

### Running locally:

To run this application locally:

1. Complete installation instructions above.
2. Simply run `npm run dev` in your terminal.
3. Open your web browser of choice to http://localhost:5173/ and begin searching!

### My optional addition:

Due to time, I opted for my own addition and added skeleton loading to present a better user experience when loading images from Flickr.

### If I had more time:

If I had more time for this take home, I would've added:

1. Automation testing - This one is very important to me personally as I always make sure to add tests. However, I just simply ran out of time and wanted to get all requirements completed.
2. More custom hooks - Given the time I would've further seperated business logic from components and App.jsx by encapsulating the logic into additional custom hooks.
3. Ability to save images locally - for this app, this feature just makes sense.
4. Ability to favorite images - Given the amount of photos that come back from Flickr, I think this feature also just makes sense. Favoriting an image would add the image information to local storage so we could easily load up the image on a new session.
5. Locally store recent search history - This is another one that makes sense given the purpose of the application. Being able to auto complete searches based off recent history is one that would be a big UX benefit.
6. Better UI / UX across the application - Given the time, I would've spent far more time concerning UI / UX.

### Requirements:

The app must do all of these things.

- Platform: You can build this project as a website in a SPA framework (React, Angular,
  etc.), or as an iOS/Android app. Pick whatever platform and framework you feel most comfortable using. If you’re building a web app, please do use a SPA framework instead of vanilla JS.
- Search: A search field should allow users to type a search term (e.g., “flowers”). This must query the Flickr API.
- Browse: Show a grid of thumbnails with the results (if any) below the search field.
- Scroll: Allow users to scroll down to see all of the results. Flickr may have thousands of
  results, so you’ll need to support pagination, either with a “load more” button, or by
  automatically loading the next page of results when the user scrolls to the bottom.
- View: Allow users to click/tap on any thumbnail to view that image either fullscreen or in
  a modal. Users should be able to navigate back to pick a different image or change the
  search terms.
- Documentation: Please provide a basic instructions for running your app
  (dependencies, installation steps, etc.).

### Optional Additions:

If you have time, pick no more than one of the following additions.

- Test: Write unit tests or some other kind of automated test.
- Save: Allow users to save their favorite image to the camera roll (iOS) / gallery
  (Android), or Downloads folder (Web).
- Details: Alongside the image, show metadata about the photo, such as the author or
  caption.
- Something else: Feel free to implement some other small feature that interests you.

### Flickr stuff:

- Your solution should use the Flickr Search API described here: https://www.flickr.com/services/api/flickr.photos.search.html

Example query: https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6343a66eb46c461c91934e8a7a981056&text=flowers&format=json&nojsoncallback=1

Other references that may be useful:

- Response format: https://www.flickr.com/services/api/response.json.html
- Generating photo URLs: https://www.flickr.com/services/api/misc.urls.html
