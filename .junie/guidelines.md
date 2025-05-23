# Project Guidelines for Junie

## Project Structure
This is an Angular (v19.2.0) project with the following structure:

- `/src`: Main source code directory
  - `/app`: Angular application components and modules
    - `app.component.*`: Main application component files
    - `app.config.ts`: Application configuration
    - `app.routes.ts`: Routing configuration
    - `/contact-dialog`: Contact dialog component
  - `/assets`: Static assets like images, icons, etc.
  - `index.html`: Main HTML entry point
  - `main.ts`: TypeScript entry point
  - `styles.css`: Global styles
- `/public`: Public assets
- `/node_modules`: Dependencies (not to be modified directly)

## Testing
- Tests are configured to use Jasmine and Karma
- Run tests with `ng test`
- Note: The project is configured to skip tests for new components by default (see angular.json)
- When implementing solutions, Junie should run tests to verify correctness

## Building
- Build the project with `ng build`
- Development build: `ng build --configuration=development`
- Production build: `ng build --configuration=production`
- Junie should build the project before submitting to ensure there are no compilation errors

## Code Style
- Follow Angular style guidelines (https://angular.io/guide/styleguide)
- Maintain consistent indentation and formatting
- Use TypeScript features appropriately
- Component structure should follow the existing patterns in the project

## Dependencies
- Angular Material is used for UI components
- RxJS is used for reactive programming
- See package.json for the complete list of dependencies
