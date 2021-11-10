# Personal portfolio

[![Site preview](/public/social-image.png)](https://hamishw.com)

A design portfolio to showcase a few projects. View the [live site](https://hamishw.com) or check out a live version of the [components storybook](https://storybook.hamishw.com).

## Install & run

Make sure you have nodejs and npm installed. Install dependencies with:

```bash
npm install
```

Once it's done start up a local server with:

```bash
npm start
```

To view the components storybook:

```bash
npm run storybook
```

To create a production build:

```bash
npm run build
```

## Deployment

I've set up the site using AWS for hosting and serverless functions. You'll need an AWS account and the AWS CLI installed in order to deploy.

Deploy the site to s3:

```bash
npm run deploy
```

Deploy serverless functions:

```bash
cd functions
```

```bash
npm run deploy:api
```

## Permissions

I'm cool with anyone using the code or parts of the code for their own site, it is open source so people can learn from it and adapt it. However, I would encourage you to modify the theme and components it to make it your own. If you are using the site's design largely unmodified, I'd appreciate being credited as the designer of the website. 

I do not give permission to present any of my projects as your own (this is being actively used as my portfolio site and these are my real projects I've worked on).

## FAQs

> Q: How do I change the colour on the `DisplacementSphere` (blobby rotating thing in the background).

A: You'll need to edit the fragment shader. [Check out this issue for more details](https://github.com/HamishMW/portfolio/issues/19#issuecomment-870996615).

> Q: How do I get the contact form to work?

A: It's set up using a serverless function with AWS Lambda. You'll need to set up an AWS account and deploy the function. [Refer to this issue for more details](https://github.com/HamishMW/portfolio/issues/21#issuecomment-958727113).
