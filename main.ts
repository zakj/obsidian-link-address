import { Editor, MarkdownView, Plugin } from "obsidian";

export default class LinkAddress extends Plugin {
  async onload() {
    this.addCommand({
      id: "link-address-selection",
      name: "Selection",
      editorCallback: (editor: Editor, view: MarkdownView) => {
        const selection = editor.getSelection().trim();
        const url = new URL("https://maps.apple.com");
        url.searchParams.set("address", selection.replace("\n", " "));
        if (view.file) url.searchParams.set("q", view.file.basename);
        editor.replaceSelection(
          // Markdown links cannot span lines.
          `[${selection.replace("\n", ", ")}](${url.toString()})`,
        );
      },
    });
  }
}
