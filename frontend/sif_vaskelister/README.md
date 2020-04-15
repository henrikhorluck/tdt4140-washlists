## Setup

To run the frontend you would need to set the `SIF_CLIENT_ID` and `SIF_CLIENT_SECRET` envrionment variables, if you are 
not running the backend through `./run.sh`. 

You can get the values by  
  registering an application at `<backend-domain>/o/applications/register/` when the django backed is running, the 
  default domain for local development is `http://localhost:8000`. See #41 for an explanation with images. 

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`



### `npm run start`


## Sturcture

Each page/section should have its own folder with the Atoms, Molecules and Organisms structure below. Each component in the Atoms, Molecules and Organisms folders should hve its own folder with the .tsx file and a .css file.

### Atoms:

Basic building blocks of matter, such as a button, input or a form label. They’re not useful on their own, and is purely functional (same input always result in same output).

### Molecules:

Grouping atoms together, such as combining a button, input and form label to build functionality.

### Organisms:

Combining molecules together to form organisms that make up a distinct section of an interface (i.e. navigation bar)

### Templates:
Templates for pages.

### Pages:

A distinct ecosystem that consists of several distinct organisms.