# Motorway UI Test

Welcome to the Motorway UI technical test. This test focuses on user experience, and your skills with HTML, CSS, a11y and leveraging browser APIs.

## Set up

This repo is a slightly modified Create React App and an Express server which serves a JSON feed of images.

- Clone the repo and run `npm install`

- `npm run serve` will run the server

- in another terminal window `npm run start` will start CRA

After this, CRA will open a tab with the app running, usually `localhost:3000`. If you look in `src/App.js` you'll see the API call to the server is already made and will console log out the results.

#### Note

- The server and CRA are watching the relevant files and will hot reload if any changes are made.

- Feel free to modify or install whatever code you feel is necessary. If installing packages which are wrappers for native browsers APIs please leave a comment explaining why.

## Tasks

### 1. UI development

Create a responsive UI to display the images returned by the API.

The aim is to demonstrate your experience and knowledge of HTML, CSS, JS and React features; and demonstrate creative thinking in how images can be presented and manipulated.

Images aren't optimised and their dimensions are varied, there are .jpg and .webp versions on s3, so you will need to take this into account.

#### Inspiration:

https://twitter.com/andybarefoot/status/1251844621262602242

http://www.artist-developer.com/

#### Some ideas to get you started:

Resizable thumbnails

Modal to review full size images

Image effects or filters

### 2. Performance

The API that is returning images is rather slow. Show how it can be sped up, and show how you would measure the improvement in performance.

### 3. Forms

One of the oldest yet trickiest parts of web development is forms, so we’d like to see how you handle them.

Add a form to your app with the following fields. The form doesn't need to submit to anywhere, but must validate on the client.

- [ ] Name
- [ ] Email
- [ ] Date of birth
- [ ] Favourite colour
- [ ] Salary (using a range input)

## Time allowed

We appreciate that your time is valuable and recommend you not spend more than 2 hours on these tasks.

## Notes

The goal of the test is to prove your understanding of the concepts of modern HTML/CSS/JS, but not to produce something production ready or pixel perfect.
Your work will be tested in the browser of your choice, so please specify this when submitting. This can include pre-release browsers such as Chrome Canary or Safari Technology Preview if you want to work with experimental features.

# Packages installed

- typescript for type safety
- react-spring to quickly make state reactive animations
- @react-aria/slider to bootstrap accessible sliders
- @react-aria/interactions for better hover detection
- @react-aria/color for accessible color input

# Performance

The primary bottleneck in performance is the size of images, there a few options to lessen the effects of this but overall I would say there need to be smaller images available for the thumbnails.
Below are some ideas; given the nature and time limitations of the challenge, that I wanted to approximately stay true to I did not implement much of the following.

- Loading only what is visible using native intersection observer is fine or there already some nice hooks available.
- Producing smaller images for the thumbnails, on server.
- Producing LQIPs that could then even be served as one request or even inline since sizes can be around 3kb. Libraries such as crystalize allow to make nice SVG placeholders. The image component could then
  use a hook to fetch the placeholder and replace with image once is has been loaded.
- The aspect ratio of images could be served with the Image data, this could allow the page layout to be built before images are loaded and reduce the number of shifts which seems to currently affect the performance a lot.

As for the performance of the fetch requests, these could be timed using console.time(). To improve that part, the image data could be fetched in batches and the state updated then by concatenating the responses.
This should improve the experience a bit.

# Notes

Of course much more styling and optimization could be done all over the place; my goal was to make a quick and dirty MVP showcasing a few interesting and fun features.
Also, it's not very clear that the image thumbnails can be clicked on to open a larger version.
I was using firefox and chrome during development, I think it should work in most browsers.

# PS
I saw some pixel values I was using during dev that I left in on the image detail overlay after submitting, if this is causing issues whilst viewing there's a branch: https://github.com/maxmezzomo/motorway/tree/feat/responsive-imageoverlay where I added some basic responsiveness to the component.  
