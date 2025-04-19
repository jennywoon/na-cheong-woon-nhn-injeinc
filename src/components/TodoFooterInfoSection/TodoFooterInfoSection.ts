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

    const filters: FilterType[] = ['all', 'active', 'completed'];
    const filterButtons: { [key in FilterType]: HTMLButtonElement } = {
        all: document.createElement('button'),
        active: document.createElement('button'),
        completed: document.createElement('button')
    }

    filters.forEach((filter) => {
        const btn = filterButtons[filter];
        styleButton(btn);
        btn.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);
        btn.onclick = () => {
            onFilterChange(filter);
            setActiveFilterStyle(filter);
        };
        filterContainer.appendChild(btn);
    });

    const setActiveFilterStyle = (activerFilter: FilterType) => {
        filters.forEach((filter) => {
            filterButtons[filter].style.color = filter === activerFilter ? '#f93838' : 'black';
        })
    };

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

    setActiveFilterStyle('all');

    return footer;
}