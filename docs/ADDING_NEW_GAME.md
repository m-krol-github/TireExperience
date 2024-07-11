# Adding new game

This document describes process of adding new game to repository. Game will be added as library and can be used directly in app as well as independently.

## Setup project

Run the command to generate new project:

```bash
$ nx g @nx/react:lib <new-game> --directory games/<new-game>
```

Change `<new-game>` to your new game name, eg. `tire-break-game`

The interactive creator of project will now create a project. Select these options:

- `vite`
- `As provided`

The game should be created.

Now, you should also add tailwind. Run following command:

```bash
$ nx g @nx/react:setup-tailwind
```

and add `js,jsx` to `tailwind.config.js`:

```diff
-      "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"
+      "{src,pages,components,app}/**/*!(*.stories|*.spec).{js,jsx,ts,tsx,html}"

```

Select your new project and you should be ready for next step.

## Add necessary files to run development

In root of your project, add `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <script type="module" src="./src/serve.tsx"></script>
  </body>
</html>
```

Create file `src/style.css` and add following content:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Include import of this file in `index.ts`:

```ts
import "./style.css";
```

Create file `src/serve.tsx` and add following content:

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import Game from ".";
import "./style.css";

const root = createRoot(document.getElementById("app")!);

root.render(<Game />);
```

## Setting up with nextjs

To integrate game with nextjs, you need to add this helper for image imports, as vite and nextjs import images differently.
Add this file in `src/helpers/interopImage.ts`:

```ts
/**
 * To operate in both vite and nextjs, we need to check if image is imported as string (vite)
 * or is imported as object with src (nextjs)
 * @param img
 * @returns
 */
export function interopImage(img: string | Record<string, string>) {
  if (typeof img === "string") {
    return img;
  }

  return img.src;
}
```

Then modify your image imports (eg. textures) to utilize this helper:

```diff
// example imports
import terrainRoughness from '../assets/textures/terrain-roughness.jpg';
import terrainNormal from '../assets/textures/terrain-normal.jpg';
import { interopImage } from '../helpers/interopImage';

  const [roughness, normal] = useLoader(TextureLoader, [
-    terrainRoughness,
-    terrainNormal,
+    interopImage(terrainRoughness),
+    interopImage(terrainNormal),
  ]);
```
