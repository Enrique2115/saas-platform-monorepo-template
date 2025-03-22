import type { PlopTypes } from "@turbo/gen";

const validateName: PlopTypes.CustomActionFunction = (answers) => {
  if (
    "name" in answers &&
    typeof answers.name === "string" &&
    answers.name.startsWith("@repo/")
  ) {
    answers.name = answers.name.replace("@repo/", "");
  }
  return "Config sanitized";
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("init", {
    description: "Create a new package in the monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Package name:",
      },
    ],
    actions: [
      validateName,
      {
        type: "add",
        path: "packages/{{name}}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{name}}/tsconfig.json",
        templateFile: "templates/tsconfig.json.hbs",
      },
    ],
  });
}
