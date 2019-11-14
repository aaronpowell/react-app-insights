# AppInsights with React and Gatsby

The is a demo application showing how to integrate Azure AppInsights with
[Error Boundaries](https://reactjs.org/docs/error-boundaries.html) in React. The
demo application is using the
[Gatsby eCommerce Starter](#gatsby-starter-ecommerce) template (refer below for
more information on the starter kit and how to configure it).

## Configuring AppInsights

To configure AppInsights you'll need to
[create a resource](https://docs.microsoft.com/en-gb/azure/azure-monitor/app/create-new-resource?WT.mc_id=reactappinsights-github-aapowell)
in the portal and copy the
[instrumentation key](https://docs.microsoft.com/en-gb/azure/azure-monitor/app/create-new-resource?WT.mc_id=reactappinsights-github-aapowell#copy-the-instrumentation-key).
Once you have the instrumentation key create a `.env.development` file to setup
the environment variable that Gatsby will look for:

```dosini
APPINSIGHTS_KEY=<instrumentation key here>
```

## Running in development

`npm run develop`

## Observing AppInsights

If you try and change the number of items you'll add to the cart to a number
greater than 1 an error state will be triggered on the component, with an error
being logged to AppInsights which can be viewed with a query like:

```
exceptions
| limit 50
```

## More Information

You can learn more about integrating AppInsights
[on my blog](https://www.aaron-powell.com/posts/2019-10-24-using-react-error-boundaries-with-appinsights/).

---

# Gatsby Starter eCommerce

Gatsby starter for creating an eCommerce site using
[Moltin eCommerce Api ](https://moltin.com/).

This starter adapts an
[existing](https://github.com/moltin-examples/nextjs-demo-store) NextJS
eCommerce starter for [GatsbyJS](https://www.gatsbyjs.org/).

Demo: <https://parmsang.github.io/gatsby-starter-ecommerce/>

This starter originally used Gatsby v1 and has now been updated to v2. The
original version can be found in branch "gatsby-v1".

## Warning

This starter is currently work in progress

## Getting started

Install this starter (assuming Gatsby is installed) by running from your CLI:

`gatsby new gatsby-store https://github.com/parmsang/gatsby-starter-ecommerce`

### Running in development

`npm run develop`

### Additional Setup

Both a moltin and Stripe account are needed for this store to run successfully.

Create a `.env.development` and `.env.production` file at the project root with
your moltin `client_id` and Stripe test `publishable key`.

```dosini
MOLTIN_CLIENT_ID=
STRIPE_PUBLISHABLE_KEY=
```

## Features

- Moltin eCommerce API
- React 16
- PWA (includes manifest.webmanifest & offline support)
- Eslint & Prettier
- Styled Components
- Google Analytics - (you enter the tracking-id)
- Semantic-UI
- Authentication via Moltin (Login and Register)
- Stripe checkout
