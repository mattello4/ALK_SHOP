import $ from 'jquery';

export const home = () => {
    const fragment = $(document.createDocumentFragment());
    const h2 = $('<h2>Home</h2>');
    const p = $('<p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</p>');

    fragment.append(h2, p);

    return fragment;
};
