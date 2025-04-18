export function createFooterInfoSection(
    onCompleteButton: () => void,
    onClearButton: () => void,
    getRemainingCount: () => number,
    onFilterChange: (filter: 'all' | 'completed') => void
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

    // 클리어 버튼
    const clearButton = document.createElement('button');
    clearButton.textContent = 'Clear Compltetd';
    clearButton.style.marginLeft = '10px';

    clearButton.addEventListener('click', () => {
        onClearButton();
    });

    // 필터 버튼
    const filterContainer = document.createElement('div');

    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.onclick = () => onFilterChange('all');

    const activeButton = document.createElement('button');
    activeButton.textContent = 'active';
    activeButton.addEventListener('click', (event) => {
        event.stopPropagation();
        onCompleteButton();
    });

    const completedButton = document.createElement('button');
    completedButton.textContent = 'completed';
    completedButton.onclick = () => onFilterChange('completed');

    filterContainer.appendChild(allButton);
    filterContainer.appendChild(activeButton);
    filterContainer.appendChild(completedButton);

    footer.appendChild(countSpan);
    footer.appendChild(filterContainer);
    footer.appendChild(clearButton);

    return footer;
}