# Scrivito Form Widgets

A set of Scrivito Widgets for building awesome forms

# Features
- Single-step & multi-step forms
- Dropdowns
- Single-select radio buttons
- Multi-select checkboxes
- Rating controls
- Date & date-time controls
- Conditionals

## Installation

You need to remove any previously created forms and rebuild them after the installation. Copy the form IDs found in the FORM SUBMISSIONS tab inside the form properties before removing the forms.

Install the package into your scrivito app:

```shell
npm install scrivito-form-widgets
```

Import the `initScrivitoFormWidgets` function from the package, and call it in your index.js file (e.g. in `src/index.js` or `src/Widgets/index.js`), passing your Scrivito tenant ID to the function:
```js
import { initScrivitoFormWidgets } from "scrivito-form-widgets";

initScrivitoFormWidgets(process.env.SCRIVITO_TENANT);
```



Add the widget styles to your app. 
This can be done by either loading the CSS via `css-loader` (e.g. in `src/index.js` or `src/Widgets/index.js`):

```js
import "scrivito-form-widgets/index.css";
```

 Or by importing the styles into your stylesheets (e.g. in `src/assets/stylesheets/index.scss`):

```scss
@import "~scrivito-form-widgets/index.css";
```

Delete all form widgets included in the Example App from the "Widgets" folder:
- FormButtonWidget
- FormCheckboxWidget
- FormContainerWidget
- FormHiddenFieldWidget
- FormInputFieldWidget

You're done! Enjoy building well-designed and cleverly arranged forms!