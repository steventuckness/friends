# Friends

This is the friends app. It features 2 different pages right now.

The first page (Add New Friends) will start with a single friend card that can be filled out. This page allows adding new friend cards by pressing the bottom right fab button. As many potential friend cards can be added as desired. The card can be removed or filled out and committed when the data is valid. Right now friends need to be committed before they will show up in the friends selection when adding a new friend. Cards that are already open will immediately have their possible friends selection updated upon commit. Also, committing a friend will immediately close the card.

The 2nd page (Friend Visualizer) has 2 different graphs. The top one is a undirected graph showing the connections between friends. The 2nd chart is a bar chart showing how many friends each friend has.

There is currently some hard coded data being fed in during upon dispatch of the loadFriends action. This was added to help with testing and get a start on having data to mess with.

Improvement Ideas (with more time):

- Charts
  - Make them more responsive...they don't really work on mobile right now...
  - Add drag and drop to the friend connections graph (this feature looks so cool)
  - Make the charts look better with varying amounts of data.
- Add New Friends
  - Some kind of indicator for success upon pressing commit for a friend. The friend card disappears right now.
  - Right now nothing is saved to the store until commit is pressed and there is no warning about data loss when switching to the friend visualizer. This could use a warning or ideally the friend could just be added immediately upon pressing the fab button. The commit button could become a "done editing" button and the remove could delete the friend instead of essentially canceling out of creating the friend.
- Overall
  - Add new friends was kind of built targeting mobile, but could be more responsive as well.
  - Extract more logic out of components and unit test the extracted parts
  - View from a list with a detail edit would be really useful
  - Nav bar could look better
  - More tests! Right now it's pretty much unit tests, but there could even more along with integration tests and e2e tests as well.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
