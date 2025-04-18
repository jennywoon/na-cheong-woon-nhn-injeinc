export function createFooterInfoSection(
    onClearButton: () => void,
    getRemainingCount: () => number,
    getCompletedCount: () => number,
    onFilterChange: (filter: 'all' | 'active' | 'completed') => void
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

    // 클리어 버튼
    const clearButton = document.createElement('button');
    clearButton.textContent = `Clear Completed (0})`
    clearButton.style.marginLeft = '10px';

    footer.updateCount = () => {
        countSpan.textContent = `${getRemainingCount()} items left`
        clearButton.textContent = `Clear Completed (${getCompletedCount()})`
    };

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
    activeButton.onclick = () => onFilterChange('active');

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