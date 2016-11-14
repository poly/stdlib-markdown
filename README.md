# Markdown as a Service

This is a simple markdown parser / converter (to HTML) that can be accessed
over HTTP(S) as a remote call. It can be used to;

1. Inline markdown documents into your website via an `<iframe>` element
2. Parse markdown from the browser without front-end dependencies
3. Parse markdown from your server in a standardized fashion (same behavior
  across languages)

Trying playing with it in your browser:

https://f.stdlib.com/stdlib/markdown?doc&md=__Your%20Markdown__%0D%0DIs%20Fun

## But... Why Markdown as a Service?

This is meant as a proof-of-concept for the types of services you can
begin building with [stdlib](https://github.com/poly/stdlib).

While you can perform any task locally, it's often easier to work via integration
instead of replication - delegating to pre-existing, standardized services.
A huge chunk of the web applications you've built or work on probably already do
this; integrations with Google Analytics, Stripe, Segment, Filepicker, Twilio, or a
number of other services over-the-wire are all examples.

The problem is that it hasn't traditionally been easy to just "build a service"
and then forget about it. With [stdlib](https://github.com/poly/stdlib) you can
build these sorts of reusable services in a "serverless" (indefinitely scalable,
  no developer operations) environment and easily manage them - for public __OR__
  private consumption.

If you're reading this on the [stdlib service page for stdlib/markdown](https://stdlib.com/services/stdlib/markdown),
you're actually already seeing the service in action! The service parsed this whole
document and delivered it to you. Magic!

## But... Why Markdown as a Service?

Are you serious? I just told you that a moment ago.

## Usage

You can use `stdlib/markdown` in one of three ways;

### Inline via iframe

The iframe functionality works as follows;

If provided `&doc` in the url (a stdlib keyword argument passed via querystring
  parameter), the output will come as a full HTML document with an inline
  stylesheet and some JavaScript. If embedded in a frame, the frame will use
  JavaScript to send a message to the parent frame to resize the element based
  on its contents.

Note that you can pass in a custom stylesheet with the `css` keyword argument.

You'll need two tidbits of code, some HTML and some JavaScript. Note
that you can easily put the JavaScript in a standalone `<script>` tag... just
don't do it more than once! :) (Multiple iframes can be handled by the same
  code.)

#### HTML

You can place multiple `<iframe>` elements like this anywhere in your document.

```html
<iframe
  data-markdown
  src="//f.stdlib.com/stdlib/markdown?doc&md=__Your%20Markdown__%0D%0D**Is%20Fun**">
</iframe>
```

#### JavaScript

Only use this code once, either as a standalone script or inlined. This is
__not necessary__, but will automatically resize your markdown iframes via the
y-axis to fit all content inside of them.

```javascript
window.addEventListener('message', function(event) {

  [].slice.call(
    document.querySelectorAll('[data-markdown]')
  ).forEach(function(markdownFrame) {

    if (event.source === markdownFrame.contentWindow) {
      markdownFrame.style.height = event.data.height + 'px';
    }

  });

});
```

### Parse from Browser

To use the parser dynamically, simply make an AJAX request to the service.
The easiest way to do this is with the [f library](https://github.com/poly/f),
which is a lightweight (zero-dependency) wrapper around an AJAX call intended
to work seamlessly with `stdlib` services.

#### HTML

In your `<head>` element...

```html
<script src="path/to/f.js"></script>
```

#### JavaScript

In your script (wherever you'd like)...

```javascript
f('stdlib/markdown')({md: '__Your__ **Markdown**'}, function(err, result) {

  if (err) {
    // handle error if necessary
  }

  // do something with `result`

});
```

### Parse from Server (Node.js)

Similar to above, we recommend using the [f library](https://github.com/poly/f)
which is also a standalone, zero-dependency npm package.

#### Command Line

```
$ npm install f --save
```

#### Node.js

```javascript
const f = require('f');

f('stdlib/markdown')({md: '__Your__ **Markdown**'}, (err, result) => {

  if (err) {
    // handle error if necessary
  }

  // do something with `result`

});
```

## That's it, that's all

Now you're ready to get going. It's that easy! If you'd like to check
out the source code for this service (to create your own), simply go to
[poly/stdlib-markdown on GitHub](https://github.com/poly/stdlib-markdown).
To get your own version up and running, you'll need to use the
[stdlib command line tools](https://github.com/poly/stdlib). Note that you
won't have permission to push to the __stdlib__ account, so you'll need to
point the service name to your user account. (And make sure you `$ lib init` in parent directory, first.)

To check out other services our early adopters have published, check out the
[stdlib search page](https://stdlib.com/search). You must specify
`"publish": true` in the `package.json` associated with your service to see it
appear publicly - services are not published by default. We just got out of
beta and did a pretty big reset, so published services may be sparse right now.

## Thank you!

Thanks for checking this out! Hope you get some mileage out of it :)

You can follow the team behind stdlib, Polybit, on Twitter: [@Polybit](https://twitter.com/polybit)
