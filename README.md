<div align="center">
  <br />
  <img src="./app/icon.svg" alt="MicroKit orange square" width="88" height="88" />
  <h1>MicroKit UI</h1>
  <strong>Details matter.</strong>
  <br />
  <sub>Copy-paste microinteractions for thoughtful product interfaces.</sub>
  <br />
  <br />
  <a href="https://github.com/henriquegpb/microkit/stargazers">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/henriquegpb/microkit?style=flat&color=f97316" />
  </a>
  <a href="https://microkit.vercel.app">
    <img alt="Website status" src="https://img.shields.io/website?url=https%3A%2F%2Fmicrokit.vercel.app&label=website&color=f97316" />
  </a>
  <br />
  <br />
  <a href="https://microkit.vercel.app">Explore interactions</a>
  ·
  <a href="https://microkit.vercel.app/submit">Submit a component</a>
  ·
  <a href="https://microkit.vercel.app/sponsors">Sponsors</a>
</div>

<br />

## Why MicroKit?

MicroKit is a focused library for the small interactions that make an interface feel considered. Each component has a live preview and copy-ready source, so you can inspect the behavior, choose your preferred implementation, and adapt it directly in your project.

MicroKit is built for copying and learning from the source—not for hiding interaction details behind a package API.

## Features

- **14 interactive components** with dedicated preview pages
- **JavaScript and TypeScript** implementations
- **CSS and Tailwind** styling variants
- **Live previews** for testing every interaction before copying
- **Copy-ready source** designed to reproduce the displayed component
- **Favorites and recently viewed** components stored locally in the browser
- **Direct component routes** for sharing individual interactions
- **GitHub-based submissions** with no custom backend required

## Using a component

1. Open the [interaction library](https://microkit.vercel.app).
2. Select a component to open its dedicated page.
3. Test the interaction in the live preview.
4. Open the **Code** tab.
5. Choose JavaScript or TypeScript.
6. Choose CSS or Tailwind.
7. Copy the source into your project and customize it.

Some interactions use `lucide-react` for icons. Any required dependency is visible in the copied source.

## Run locally

**Requirements:** Node.js 20 or newer and npm.

```bash
git clone https://github.com/henriquegpb/microkit.git
cd microkit
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create a production build with:

```bash
npm run build
```

## Project structure

```text
app/
  components/[id]/page.tsx   Dedicated component routes
  sponsors/page.tsx          Sponsors route
  submit/page.tsx            Contribution route
  page.tsx                   Gallery, previews, and shared page UI
  globals.css                Visual system and interaction styles

content/
  interactions/catalog.ts    Component metadata and copyable source

public/
  assets/img/                Shared logos and visual assets

.github/
  ISSUE_TEMPLATE/            Component submission form
```

## Sponsors

MicroKit is supported by:

### Diamond

<table>
  <tr>
    <td align="center">
      <br />
      <img src="./public/assets/img/Nora.svg" alt="Nora" width="260" />
      <br />
      <sub>Your AI Personal Assistant</sub>
      <br />
      <br />
    </td>
  </tr>
</table>

Support helps keep MicroKit available and gives the project more room to improve its components, documentation, and contribution workflow.

**[Become a MicroKit sponsor](https://microkit.vercel.app/sponsors)** — Choose a tier and send a prefilled sponsorship inquiry.

## Contributing

You can submit an interaction through the [MicroKit submission page](https://microkit.vercel.app/submit). The page prepares a GitHub issue containing your component code, where you can add a screenshot and any necessary attribution.

Before submitting:

- Keep the interaction focused on one clear behavior.
- Make the preview genuinely interactive.
- Include the complete code required to reproduce the result.
- Support keyboard focus where the element is interactive.
- Respect reduced-motion preferences when motion is not essential.
- Avoid unnecessary dependencies.
- Credit the original source when adapting someone else’s work.

You can also use the [component submission issue form](https://github.com/henriquegpb/microkit/issues/new?template=component-submission.yml) directly.

## Development

Useful commands:

```bash
npm run dev
npm run lint
npm run build
npm run start
```

The site is built with Next.js, React, TypeScript, Tailwind CSS, Lucide icons, Prism syntax highlighting, and Vercel Analytics.

## Maintainer

MicroKit is maintained by [@henriquegpb](https://github.com/henriquegpb).

## Credits

Some interactions are adapted from publicly shared examples and Webflow exports. MicroKit rewrites them into reusable JavaScript, TypeScript, CSS, and Tailwind implementations. If you recognize work that needs clearer attribution, please [open an issue](https://github.com/henriquegpb/microkit/issues).
