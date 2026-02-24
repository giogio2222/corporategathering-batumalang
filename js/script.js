document.addEventListener('DOMContentLoaded', function() {
    // Back to Top functionality
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // TOC Toggle
    const tocTitle = document.querySelector('.toc-title');
    const tocList = document.querySelector('.toc-list');
    if (tocTitle && tocList) {
        tocTitle.addEventListener('click', () => {
            const isVisible = tocList.style.display !== 'none';
            tocList.style.display = isVisible ? 'none' : 'block';
            tocTitle.querySelector('i').className = isVisible ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        });
    }

    // Auto-generate TOC if container exists
    const tocContainer = document.getElementById('auto-toc');
    const articleContent = document.querySelector('.article-content');
    if (tocContainer && articleContent) {
        const headings = articleContent.querySelectorAll('h2, h3');
        if (headings.length > 0) {
            let tocHTML = '<ul>';
            headings.forEach((heading, index) => {
                const id = 'heading-' + index;
                heading.setAttribute('id', id);
                const level = heading.tagName.toLowerCase();
                const padding = level === 'h3' ? 'style="padding-left: 20px;"' : '';
                tocHTML += `<li ${padding}><a href="#${id}">${heading.innerText}</a></li>`;
            });
            tocHTML += '</ul>';
            tocContainer.innerHTML = tocHTML;
        }
    }

    // Smooth scroll for TOC links
    document.querySelectorAll('.toc-list a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 100; // Account for fixed navbar
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = targetElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Share buttons functionality
    const shareBtns = document.querySelectorAll('.share-btn');
    const currentUrl = encodeURIComponent(window.location.href);
    const currentTitle = encodeURIComponent(document.title);

    shareBtns.forEach(btn => {
        if (btn.classList.contains('btn-facebook')) {
            btn.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        } else if (btn.classList.contains('btn-twitter')) {
            btn.href = `https://twitter.com/intent/tweet?text=${currentTitle}&url=${currentUrl}`;
        } else if (btn.classList.contains('btn-whatsapp-share')) {
            btn.href = `https://api.whatsapp.com/send?text=${currentTitle}%20${currentUrl}`;
        }
        btn.setAttribute('target', '_blank');
    });
});
