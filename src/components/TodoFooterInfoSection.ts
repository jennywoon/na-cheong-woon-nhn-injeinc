export function createFooterInfoSection(onCompleteButton: () => void) {
    const footer = document.createElement('div');
    footer.classList.add('todo-footer');

    footer.style.display = 'flex';
    footer.style.justifyContent = 'flex-start';

    // 완료 버튼
    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.style.marginLeft = '10px';

    completeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        onCompleteButton();
    });

    footer.appendChild(completeButton);

    return footer;
}