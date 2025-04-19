import { FilterType } from "../../types/todo";
import { styleButton } from "../../utils/styleButton";
import "./TodoFooterInfoSection.css";

export function createFooterInfoSection(
    onClearButton: () => void,
    getRemainingCount: () => number,
    getCompletedCount: () => number,
    onFilterChange: (filter: FilterType) => void
) {
    const footer = document.createElement('div') as HTMLDivElement & {
        updateCount: () => void;
    };
    footer.classList.add('todo-footer');

    // Todo 개수
    const countSpan = document.createElement('span');
    countSpan.textContent = '0 items left';

    // 필터 버튼
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('filter-container');

    const allButton = document.createElement('button');
    styleButton(allButton);
    allButton.textContent = 'All';
    allButton.onclick = () => {
        onFilterChange('all');
        updatedButtonStyle('all');
    };

    const activeButton = document.createElement('button');
    styleButton(activeButton);
    activeButton.textContent = 'Active';
    activeButton.onclick = () => {
        onFilterChange('active');
        updatedButtonStyle('active');
    };

    const completedButton = document.createElement('button');
    styleButton(completedButton);
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
    styleButton(clearButton);
    clearButton.textContent = `Clear Completed (0)`

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

    const updatedButtonStyle = (activeFilter: FilterType) => {
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