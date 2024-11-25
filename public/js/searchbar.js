const searchInput = document.getElementById('searchInput');
const content = document.getElementById('content');
const closeBtn = document.getElementById('closeBtn');

let currentSearchTerm = '';

searchInput.addEventListener('input', function() {
    const term = searchInput.value.trim().toLowerCase();
    
    if (term !== currentSearchTerm) {
        currentSearchTerm = term;
        highlightText(term);
    }
});

closeBtn.addEventListener('click', function() {
    removeHighlights();
    closeBtn.style.display = 'none';
    searchInput.value = '';  // Optionally clear search input
});

function highlightText(term) {
    const regex = new RegExp(`(${term})`, 'gi');  // 'gi' for global and case-insensitive match
    const paragraphs = content.getElementsByTagName('p');
    
    for (let paragraph of paragraphs) {
        // Reset content
        paragraph.innerHTML = paragraph.textContent;
        
        // Apply highlight
        paragraph.innerHTML = paragraph.innerHTML.replace(regex, '<span class="highlight">$1</span>');
    }
    
    if (term) {
        closeBtn.style.display = 'block';
    } else {
        closeBtn.style.display = 'none';
    }
}

function removeHighlights() {
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(el => {
        el.classList.remove('highlight');
    });
}
