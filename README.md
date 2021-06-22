# [NextJS Documentation](https://nextjs.org/docs/getting-started)

***

## Key Takeaways:

> Client Side Navigation (near instant page changes with prefetching)

> Code Splitting by default (load only what's needed for each page)

> Built-in Image component automatically adopts future image formats and serves them to browsers that support those formats.

> Next.js has built-in support for [styled-jsx](https://github.com/vercel/styled-jsx), but you can also use other popular CSS-in-JS libraries such as styled-components or emotion.

> You choose which pre-rendering form to use for each page.

***

## Pre Rendering:
> Two forms of [Pre Rendering](https://nextjs.org/learn/basics/data-fetching/two-forms):
>
> **Using npm run dev or yarn dev every page is server-side rendered, even those using static site generation.*
> > [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended) is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.
>
> > [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering) is the pre-rendering method that generates the HTML on each request.

### Where to Static Generation
> Use Static Generation (with and without data) whenever possible because your page can be built once and served by a CDN, much faster than having a server render the page every request.
>
> Pages like:
> * Marketing pages
> * Blog posts
> * E-commerce product listings
> * Help and documentation

### Where to Server-Side Render
> If you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.
>
> It will be slower, but the pre-rendered page will always be up-to-date.

> Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

***

## Using `getStaticProps()`:
###(Static Generation)
> Use NextJS async function `getStaticProps()` for static generation with data.
>
> Inside the function, you can fetch external data and send it as props to the page.
> > **Note:** In development mode, getStaticProps runs on each request instead.
>
> `getStaticProps()` can fetch the data from other sources, like an external API endpoint, and it’ll work just fine.
>  ```javascript
> export async function getSortedPostsData() {
>   // Instead of the file system,
>   // fetch post data from an external API endpoint
>   const res = await fetch('our-awesome-endpoint')
>   return res.json()
> }
> ```
> > **Note:** Next.js polyfills fetch() on both the client and server. You don't need to import it.
>
> Or Query a database directly:
> ```javascript
> import probMysql from 'probMysqlSDK'
> const databaseClient = someDatabaseSDK.createClient(...)
> export async function getSortedPostsData() {
>   // Instead of the file system,
>   // fetch post data from a database
>   return databaseClient.query('SELECT posts...')
> } 
> ```
> `getStaticProps()` will never run on the client-side. It won’t even be included in the JS bundle for the browser.
>
> You can query the database directly from the function without them being sent to the browser.
> #### Dev. vs Prod.
> * In development (`npm run dev` or `yarn dev`), `getStaticProps` runs on every request.
> * In production, `getStaticProps` runs at build time. However, this behavior can be enhanced.
> > **Note:** Because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers.
> #### Only Allowed in a Page
> `getStaticProps()` can only be exported from a page in `./pages`. You can’t export it from non-page files.
>
> One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

***

## Using `getServerSideProps()`:
### (server-side rendering)
> To use Server-side Rendering, you need to export getServerSideProps instead of getStaticProps from your page.
>
> Basic Usage Example:
> ```javascript
> export async function getServerSideProps(context) {
>   return {
>     props: {
>       // props for your component
>     }
>   }
> }
> ```
> It's parameter `context` contains [specific request parameters](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering).
> > **Note:** You can import modules in top-level scope for use in `getServerSideProps()`. Imports used in getServerSideProps will not be bundled for the client-side.
> >
> > This means you can write server-side code directly in `getServerSideProps()`. This includes reading from the filesystem or a database.
>
> > **Note:** You should not use `fetch()` to call an API route in `getServerSideProps()`. Instead, directly import the logic used inside your API route. You may need to slightly refactor your code for this approach.
> >
> > Fetching from an external API is fine!

***

## Client-side Rendering:
> ### Pattern:
> * Statically generate (pre-render) parts of the page that do not require external data.
> * When the page loads, fetch external data from the client using JavaScript and populate the remaining parts.
>
> This approach works well for a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered.
>
> Where data is frequently updated, which requires request-time data fetching (i.e. User Dashboards).
>
>
> ### swr:
> > #### [Next.js custom React Hook](https://swr.vercel.app/)
> > The team behind Next.js has created a React hook for data fetching called SWR.
> >
> > Best Practice for fetching data on the client side.
> >
> > Handles caching, revalidation, refetching on interval, etc.
>

***

## Dynamic Routes:
### Using ` getStaticPaths()`
> Next.js allows you to statically generate pages with paths that depend on external data.
>
> Files named following this `[id].js` pattern use Dynamic Routes.   
> Where `[id]` equals the name of the external resource.
>
> Pattern:
> > A path `/posts/<id>`, where `<id>` is the name of the external content or file under the top-level directory.
> > For example if you have a top level directory `/posts/` and have files named `ssg-ssr.md` and `pre-rendering.md`.
> >
> > You want the paths to be `/posts/ssg-ssr` and `/posts/pre-rendering`.
>
> #### Fetch External API or Query Database
> `getStaticPaths` can fetch data from any data source.  
> Example fetch from an external API endpoint:
> ```javascript
> export async function getAllPostIds() {
>   // Instead of the file system,
>   // fetch post data from an external API endpoint
>   const res = await fetch('..')
>   const posts = await res.json()
>     return posts.map(post => {
>         return {
>             params: {
>             id: post.id
>             }
>         }
>     })
> }
>```
> #### Development v.s. Production
> * In development (npm run dev or yarn dev), getStaticPaths runs on every request.
> * In production, getStaticPaths runs at build time.
> #### [Fallback Option](https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required) (What to do is Path not found)
> * Pass `false`, then any paths not returned by getStaticPaths will result in a 404 page.
> * Passing `true` changes the behavior of `getStaticPaths()`:
> > * The paths returned from getStaticPaths will be rendered to HTML at build time.
> > * Paths NOT generated at build time will NOT result in a 404 page.
> > * In the background, Next.js will statically generate the requested path.
> > * Subsequent requests to the same path will serve the generated page.
> * Passing `blocking` new paths will be server-side rendered with getStaticProps.
> * Then cached for future requests, it only happens once per path.

***

## API Routes
### Creating API Routes:
> [API Routes](https://nextjs.org/docs/api-routes/introduction) let you create an API endpoint inside a Next.js app. You can do so by creating a function inside the pages/api directory that has the following format:
> ```javascript
> // req = HTTP incoming message, res = HTTP server response
> export default function handler(req, res) {
>     // ...
> }
> ```
> They can be deployed as Serverless Functions (also known as Lambdas).
> #### Creating a simple API endpoint
> ```javascript
> export default function handler(req, res) {
>   res.status(200).json({ text: 'Hello' })
> }
> ```
> Note that:
> * `req` is an instance of [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage), plus some pre-built middlewares you can [see here](https://nextjs.org/docs/api-routes/api-middlewares).
> * `res` is an instance of [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse), plus some helper functions you can [see here](https://nextjs.org/docs/api-routes/response-helpers)
> > NOTE: Do Not Fetch a Next.js API Route from getStaticProps or getStaticPaths. [More info here](https://nextjs.org/learn/basics/api-routes/api-routes-details).
#### Preview Mode
> Static Generation is useful when your pages fetch data from a headless CMS.
>
> However, it’s not ideal when you’re writing a draft on your headless CMS and want to preview the draft immediately on your page.
>
> You’d want Next.js to render these pages at request time instead of build time and fetch the draft content instead of the published content.
>
> You’d want Next.js to bypass Static Generation only for this specific case.
>
> Next.js has a feature called Preview Mode to solve the problem above, and it utilizes API Routes. To learn more about it take a look at our Preview Mode documentation.

***

### Notes:

> `Link` components/tag only get `href` attribute, additional attributes such as `className` are added to the `<a>` tag not the `Link` tag.

> `Image` components work with images served from external source, like CDN. Images are lazy loaded by default to avoid [Cumulative Layout Shift](https://web.dev/cls/).

> `Head`component used to add custom content to each page html `head` tag.
>
> If you want to customize `html` tag, create a [pages/_document.js](https://nextjs.org/docs/advanced-features/custom-document) file.

> Using styled-jsx or CSS-in-JS allows scoped CSS styles (other components won’t be affected).
>
> As long as you use CSS Modules, you don’t have to worry about class name collisions.
>
> You can add global CSS files by importing them from `pages/_app.js`. You cannot import global CSS anywhere else.

***

## Resources ----->>>>
[Getting Started | Next.js](https://nextjs.org/docs/getting-started)  
[Learn | Next.js](https://nextjs.org/learn/basics/create-nextjs-app)  
[Basic Features: Data Fetching | Next.js](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)