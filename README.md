Take a first look at https://threejs-journey-ruddy.vercel.app/

# Boilp Templates

Create multiple pages applications on the fly

## What we do?

To create a page, just edit the `pages.js` file with the syntax

```js
module.exports = createPagesPrototype([
  {
    title: "The category name",
    base: "category-in-slug",
    pages: [
      {
        title: "Title of a single page",
      },
    ],
  },
]);
```

It will automatically create for you 2 separate files in `app/pages/slug/` and `views/pages/slug/`

## Examples

Depends on your work. I created this template to control my learning journey at the beginning (because I have to create each file for each lesson 😒), so I just wanna control it all in one place

I have 2 examples below:

- [Three.js Journey](https://threejs-journey-ruddy.vercel.app/) - my learning journey in Three.js, control all lessons in one place :)
- [Creative Corners](https://creative-coding-delta.vercel.app/) - my creative corners, I can do all the creative things in my mind in one place :)

You can follow the [simple repository here](https://github.com/vuquangpham/threejs-journey)

## Deployment

Run `./public` in dev mode

```shell
npm start
```

Build files from `./app` to `./public` for production and run in production mode

```shell
npm run build
```
