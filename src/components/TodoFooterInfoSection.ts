export function createFooterInfoSection(
    onCompleteButton: () => void,
    onClearButton: () => void,
    getRemainingCount: () => number
) {
    const footer = document.createElement('div') as HTMLDivElement & {
        updateCount: () => void;
    };
    footer.classList.add('todo-footer');

    footer.style.display = 'flex';
    footer.style.justifyContent = 'flex-start';

    // Todo 개수
    const countSpan = document.createElement('span');
    countSpan.textContent = '0 items left';
    footer.updateCount = () => {
        countSpan.textContent = `${getRemainingCount()} items left`
    };

    // 완료 버튼
    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.style.marginLeft = '10px';

    completeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        onCompleteButton();
    });

    // 클리어 버튼
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Compltetd';
    clearButton.style.marginLeft = '10px';

    clearButton.addEventListener('click', () => {
        onClearButton();
    });

    footer.appendChild(countSpan);
    footer.appendChild(completeButton);
    footer.appendChild(clearButton);

    return footer;
}