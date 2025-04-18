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
    footer.style.justifyContent = 'space-between';
    footer.style.alignItems = 'center';
    footer.style.marginTop = '10px';

    // Todo 개수
    const countSpan = document.createElement('span');
    countSpan.textContent = '0 items left';

    // 필터 버튼
    const filterContainer = document.createElement('div');
    filterContainer.style.display = 'flex';
    filterContainer.style.gap = '5px';

    const allButton = document.createElement('button');
    allButton.style.padding = '10px';
    allButton.style.fontWeight = '600';
    allButton.style.fontSize = '14px';
    allButton.textContent = 'All';
    allButton.onclick = () => {
        onFilterChange('all');
        updatedButtonStyle('all');
    };

    const activeButton = document.createElement('button');
    activeButton.style.padding = '10px';
    activeButton.style.fontWeight = '600';
    activeButton.style.fontSize = '14px';
    activeButton.textContent = 'Active';
    activeButton.onclick = () => {
        onFilterChange('active');
        updatedButtonStyle('active');
    };

    const completedButton = document.createElement('button');
    completedButton.style.padding = '10px';
    completedButton.style.fontWeight = '600';
    completedButton.style.fontSize = '14px';
    completedButton.textContent = 'Completed';
    completedButton.onclick = () => {
        onFilterChange('completed');
        updatedButtonStyle('completed');
    };

    filterContainer.appendChild(allButton);
    filterContainer.appendChild(activeButton);
    filterContainer.appendChild(completedButton);

    // 클리어 버튼
    const clearButton = document.createElement('button');
    clearButton.textContent = `Clear Completed (0)`
    clearButton.style.padding = '10px';
    clearButton.style.fontWeight = '600';
    clearButton.style.fontSize = '14px';

    footer.updateCount = () => {
        countSpan.textContent = `${getRemainingCount()} items left`
        clearButton.textContent = `Clear Completed (${getCompletedCount()})`
    };

    clearButton.addEventListener('click', () => {
        onClearButton();
    });

    footer.appendChild(countSpan);
    footer.appendChild(filterContainer);
    footer.appendChild(clearButton);

    const updatedButtonStyle = (activeFilter: 'all' | 'active' | 'completed') => {
        allButton.style.color = 'black';
        activeButton.style.color = 'black';
        completedButton.style.color = 'black';

        if (activeFilter === 'all') {
            allButton.style.color = '#f93838';
        } else if (activeFilter === 'active') {
            activeButton.style.color = '#f93838';
        } else if (activeFilter === 'completed') {
            completedButton.style.color = '#f93838';
        }
    };

    updatedButtonStyle('all');

    return footer;
}