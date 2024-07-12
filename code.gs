const onOpen = (_) =>
  DocumentApp.getUi()
    .createMenu("DocAI")
    .addItem("Open Gemini sidebar", "openSidebar")
    .addToUi();
const openSidebar = (_) =>
  DocumentApp.getUi().showSidebar(
    HtmlService.createHtmlOutputFromFile("index").setTitle(
      "DocAI - Gemini by AVSC"
    )
  );

function getGeneratedText_(text) {
  const apiKey = "AIzaSyDLxjc-gPiFqoqBcBbyDhNYvoWU_m2SXRE"; // Please set your API key.

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  const payload = { contents: [{ parts: [{ text }] }] };
  const options = {
    payload: JSON.stringify(payload),
    contentType: "application/json",
  };
  const res = UrlFetchApp.fetch(url, options);
  const obj = JSON.parse(res.getContentText());
  if (obj.candidates.length > 0 && obj.candidates[0].content.parts.length > 0) {
    const t = obj.candidates[0].content.parts[0].text;
    return t;
  }
  return "No response.";
}

function getGeneratedText(text, check) {
  const cursor = DocumentApp.getActiveDocument().getCursor();
  if (!cursor) {
    return "";
  }
  const r = getGeneratedText_(text);
  if (check) {
    cursor.insertText(r);
  }
  return r;
}
