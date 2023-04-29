# Personal Website
This is the source code for my personal website. It uses Next.js and typescript (though the type in typescript is not utilized at all, so it's basically just javascript with a different file extension). You can check out the website [here](https://www.maxortner.com).

## Resume Page
I redesigned the website, and made a page dedicated to my resume. The information is pulled from the `src/resume.json` file. I would like for the print version of the page to look as nice as how the page looks on the screen, but it always gets too big and the `print:` feature in tailwind doesn't seem to help much.

## The Github Widget
If it's of any interest, check out the GitHub component in `index.tsx`. It generates a visual little card for your GitHub page using the very nice REST api GitHub has out there. Mine is visible at the bottom of the index page.