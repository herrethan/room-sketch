# Welcome to Room Sketch!

Built with [Remix](https://remix.run/docs).

The idea is you sketch rooms, like this:

<img width="725" alt="Screen Shot 2025-06-18 at 10 49 16 PM" src="https://github.com/user-attachments/assets/f73e0e09-28f2-446e-9524-c6e407ee674a" />

One day I'll make CSS furniture (hah!). 

## Development

```sh
yarn dev
```

## Deployment

First, build your app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```
