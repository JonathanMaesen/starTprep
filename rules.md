---
body_class: markdown-body
highlight_style: monokai
pdf_options:
  margin: 10mm
  printBackground: true
---

<style>

</style>

# General Rules

### Naming rules and languege

All variables must be in English and camelcassing. This is mainly for the end, during development this does not matter. You can easily adjust variables by using rename symbol. example: `I_Like_Coding = true;`

### File rules

Scripts should be placed in the correct folder so that scripts are with the folder scripts, etc...

### Javascript rules

Don't post comments where not necessary. everyone has a brain so dont be obivouis, like const number is for a number. is **NOT** necessary!
Use const if you can, mind a const is something that parrots do.
optization is an extra commit, if **CODE WORKS IT WORKS**. Nested code should preferably not go deeper than 3, 4 is allowed if there is no other option (sometimes it just has to be).

### CSS rules

Most of the CSS rules are at [`link css rules`](#css-basics).

## JavaScript Basics

Every page must have one specific script that best describes what it does.  
It must also have the general script and the Bootstrap script.  
Add something to the general script if it could be used on other pages that are not specific to the script, like navigation, authentication, etc. example html:

```html
<script src="scripts/general.js" defer></script>
<script src="scripts/floor.js" defer></script>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
  crossorigin="anonymous"
></script>
```

example script:

```js
//general script
function Show_Warning_When_Leaving() {
  window.onbeforeunload = function (e) {
    e = e || window.event;

    // For IE and Firefox prior to version 4
    if (e) {
      e.returnValue = "Sure?";
    }

    // For Safari
    return "Sure?";
  };
}
//another script
Show_Warning_When_Leaving();
```

For each new concept, add a comment based on what the section does, like one section for navigation that starts with "nav".  
The name should be specific, not something vague like `generateHtml`, but more like `generate_html_nav`.

## TypeScript Basics

### What is TypeScript?
TypeScript is a superset of JavaScript, which means that it ultimately needs to be compiled into JavaScript code to run. We do this by default using **ts-node** (Node.js), **Bun**, or **Deno**.

We use TypeScript because, like C#, it supports types, but with more flexibility since it is still JavaScript. It provides benefits such as type safety and a better development experience.

For development, we usually use **Visual Studio Code**. **Most of the time**, this is done within a **DevContainer**, which is a containerized development environment within **Docker**. TypeScript is commonly used for backend and full-stack applications. The era of basic HTML-only projects is over, as modern web development requires more advanced tools and technologies.

## Working with TypeScript and Node.js

### Setting up a TypeScript project
There are three standard applications for TypeScript:
1. **CLI application** (Terminal app)
2. **API** (e.g., using Express.js)
3. **Full web application**

If you are starting a new project from scratch, you first need to generate a `package.json` file, which stores all project information:

```sh
npm init -y
```

This file helps Node.js manage scripts and dependencies. A TypeScript file can be executed using:
```sh
ts-node filename.ts
```
(For regular JavaScript files, use `node filename.js`.)

### Installing dependencies
When we need additional packages, we install them using:
```sh
npm install package-name
```

This creates the `node_modules` directory, where all installed packages are stored. **Important:** Always add `node_modules` to your `.gitignore` file to prevent it from being accidentally pushed to GitHub. If you fail to do this, it can have negative consequences for you and your team.

If a project already contains a `package.json` but is missing `node_modules`, install all dependencies with:
```sh
npm install
```

If you want to install a package **globally** (e.g., `md2pdf` to convert Markdown to PDF), use:
```sh
npm install -g package-name
```
⚠️ **Warning:** Not all packages support global installation. Use this only if you are sure it is necessary.

### TypeScript and additional types
Some packages require separate type definitions. These can be installed as **devDependencies**:
```sh
npm install --save-dev @types/package-name
```

Once all required packages are installed, we can start coding!

## Programming in TypeScript

### Importing modules
TypeScript is essentially JavaScript with types, so understanding JavaScript basics is essential. Below, we show how to import packages.

1. **Import everything under one name** (uses the `.` operator):
```ts
import express from "express";
```

2. **Import specific functions/types** (useful when only a few elements are needed):
```ts
import { Router } from "express";
```

### Working with custom types
It is helpful to store custom types in a separate file (`types.ts`) to keep the code organized. For example:
```ts
export interface User {
  id: number;
  name: string;
  email: string;
}
```

In other files, we can import this interface:
```ts
import { User } from "./types";
```

This helps keep our code clean and scalable.

## Basic Express with TypeScript

### Setup
```ts
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

This code initializes a basic Express server using TypeScript. First, we import the required modules, including type definitions for Request and Response. Then we create an app instance by calling `express()`. The `get()` method defines a single route `(/)` that returns a basic text message. Finally, `app.listen()` starts the server and logs the URL where it's running.

## Express with TypeScript and EJS

### Setup
```ts
import express from "express";
import path from "path";

const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", { title: "Welcome", message: "Hello from Express + TypeScript + EJS!" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
```
Here we build on the basic Express server and add support for EJS templates. `app.set("view engine", "ejs")` tells Express to use EJS for rendering views, and `app.set("views", ...)` sets the directory where the EJS files are located. The route `/` now calls `res.render()` to serve the index.ejs template, passing in dynamic values (title and message).

Example EJS Template
```html
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  <h1><%= message %></h1>
</body>
</html>
```
The EJS template receives the title and message from the route handler. `<%= %>` is used to insert dynamic content into the HTML. This is useful when you want to serve dynamic pages while keeping the layout separate from the application logic.
## TS rules

⚠️ **Disclaimer**: We're still using core JavaScript rules while working with TypeScript. These guidelines are created by students to help us work better together — they're not the same as company standards, although many of them are common industry practices.

### Route Structure
All **main routes** (like `/users`, `/books`) should have their own route file using the Express `Router`. For example:
- Route `/books` and `/books/addbook` should both live in `routes/books.ts`.
- Route `/users` and `/users/updateprofile` go into `routes/users.ts`.

This keeps related functionality together and improves readability. Only create separate route files for **top-level** routes, not for every single sub-path.

### Function Structure
Avoid placing large or reusable functions directly in `index.ts`. Instead:
- Place them in a separate file (like `utils.ts`, `services/userService.ts`, etc.).
- Export them using `export function ...` so they can be reused.

If the function is very specific and only used in that one file, do **not** export it — keep it local. This mimics visibility scopes in object-oriented languages like C# (public vs. private).

### Use Types — That's Why We Use TypeScript
Always provide a type for variables and function parameters. That’s the main reason we use TypeScript — it gives us type safety and better tooling support.

- Don’t use `any` unless you absolutely must.
- Use `typeof` to inspect the actual type during debugging or validation if needed.

Example:
```ts
function getBookTitle(book: Book): string {
  return book.title;
}
```
This helps avoid bugs and improves code quality and maintainability.
## CSS Basics

Every page must have the Bootstrap CSS file after the `style/reset.css` because we use standard code. Standard code is cool if you don't think so, you are very wrong.
Then we use the standard CSS file, which follows the same rules as the general JavaScript file. example:

```html
<link rel="stylesheet" href="styles/reset.css" />
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
  crossorigin="anonymous"
/>
<link rel="stylesheet" href="styles/floor.css" />
<link rel="stylesheet" href="styles/general.css" />
```

Use IDs if you can, and understand the difference between IDs and classes where needed. Most of the time, this will be classes. If you don’t know the difference, learn it.  
Use the standard `var()` from the general CSS if possible.  
**BEFORE** writing any CSS, check Bootstrap. **LESS** CSS, **MORE** happiness.

## JSON Basics

Every JSON file must be readable and generated in the same way. So, if an element looks like this:

```json
{
  "id": 29,
  "name": "croutons",
  "pricepk": 2.1
}
```

You **SHOULD** be able to generate and read it in the same format.
The JavaScript code to generate the JSON files with normal JS is:

```js
// generate_json just returns the JSON. You could swap this out with the JSON you want to download.
const a = document.createElement("a");
const file = new Blob([generate_json()], { type: "text/plain" });
a.href = URL.createObjectURL(file);
a.download = "groundfloor.json";
a.click();
```

The JSON format that you generate should be easy to understand and later be sent to the API for the backend to use.
If this is not the case, it's **YOUR** job to fix it.

## Git Collaboration Guidelines

### Branches
Use Git for source control only — don't store irrelevant documents. Only commit necessary files. If you need temporary files during development, add their paths to `.gitignore` to keep the repository clean.

Create a separate **branch** for each new feature or task, and give it a meaningful name that reflects its purpose (e.g., `feature/login-form`, `fix/user-validation`).

### Commits
Each **commit** should represent a meaningful milestone. For example, "Add user authentication" is better than "update script.js". Keep commit messages short but descriptive so that the change history is easy to follow.

### Merging
Only merge into the `main` branch after all features are tested and complete — we do **not** want to break `main`.

Open a **pull request** via GitHub, and ask someone else on the team to review the changes. The reviewer should leave a comment like “Approved” before it gets merged.

### Tags
After completing major features or versions, consider creating a **tag** (e.g., `v1.0`) to mark that point in the project. Discuss this with the team before applying a tag.

# Documentation

documentation should be made in markdown(`.md`) because it's a simple format that can easily be understood by everyone and later be transformed to pdf for distribution.
All code examples must be within (``)x2 with the correct language name.
All important highlights should be marked with "`" and all non-important comments should be marked with **_\_\_ \_\__** or ****\* \*****

to export we can use a tool like [markdown-pdf](https://www.markdowntopdf.com/) of [node](https://www.npmjs.com/package/md-to-pdf) :

```shell
npm i -g md-to-pdf
```

Markdown has also suddenly become a useful language for converting to PDF or creating an HTML page for the website.

# Presentation

We can use markdown to create a presentation, use the extension [extensie mp](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode).

# Syntax

**Javascript** syntax can be found online at:

- google search engine
- [w3sschool](https://www.w3schools.com/js/default.asp)
- [mozilla](https://developer.mozilla.org/en-US/)
- javascriptcursus via digitap

**Typescript** syntax can be found online at:

- google search engine
- [w3sschool](https://www.w3schools.com/js/default.asp)
- [mozilla](https://developer.mozilla.org/en-US/)
- [Webontwikeling](https://apwt.gitbook.io/webontwikkeling-2024) cursus via digitap

**CSS** syntax can be found online at:

- google search engine
- [w3sschool](https://www.w3schools.com/css/default.asp)
- [mozilla](https://developer.mozilla.org/en-US/)
- webcursus via digitap

**Markdown** syntax can be found online at:

- google search engine
- [markdown syntax](https://www.markdownguide.org/basic-syntax/)

**Marp** syntax can be found online at:

- google search engine
- [marp syntax](https://marpit.marp.app)

**HTML** syntax can be found online

---

Footnote: This document is pure to used as a general guideline for the project. 

author: [Nils Mertens](https://github.com/Nils-dev-mertens)