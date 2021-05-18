import $ from "jquery";

export const home = () => {
  const fragment = $(document.createDocumentFragment());
  const h2 = $("<h2>Home</h2>");
  const p = $(
    "<p>Nowo powstały kompleks SPA dla Infromatyków cechuje wyjątkowy charakter. W przepięknie urządzonych pokojach wraz z zabiegami możemy w końcu wypocząć.</p>"
  );

  fragment.append(h2, p);

  return fragment;
};
