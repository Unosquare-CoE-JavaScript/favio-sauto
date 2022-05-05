/// <reference path="components/project-list.ts" />
/// <reference path="components/project-input.ts" />

namespace App {
  new ProjectInput();
  new App.ProjectList("active");
  new App.ProjectList("finished");
}
