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

Import the widget into your javascript (e.g., in `src/index.js` or `src/Widgets/index.js`):

```js
import "scrivito-form-widgets";
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

Navigate to the "config" folder in your Scrivito app, create a new file named "formConfig.js" in it, and paste the following code to this file:
```js
import { setScrivitoFormWidgetConfig } from "scrivito-form-widgets";

export function configureForm() {
    setScrivitoFormWidgetConfig(process.env.SCRIVITO_TENANT);
}
```
This will set the tenant for the form widgets, which is needed for form submission. Optionally, you can add the ENABLE_NEOLETTER_FORM_BUILDER_SUBSCRIPTION_FEATURE flag if you are using it:
```js
setScrivitoFormWidgetConfig(process.env.SCRIVITO_TENANT, true);
 ```

Finally, in the "index.js" file in the config folder, call the `configureForm()` function inside `configure()`:
```js
export function configure(options) {
  configureScrivito(options);
    ...
  configureForm();
}
```
You're done! Enjoy building well-designed and cleverly arranged forms!