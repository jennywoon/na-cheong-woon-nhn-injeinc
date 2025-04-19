export function styleButton(
    button: HTMLButtonElement,
    padding = '10px',
    fontWeight = '600',
    fontSize = '14px'
) {
    button.style.padding = padding;
    button.style.fontWeight = fontWeight;
    button.style.fontSize = fontSize;
}