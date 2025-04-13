// Бургер-меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav ul');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Сворачивание комментариев
document.querySelectorAll('.toggle-comments').forEach(button => {
    button.addEventListener('click', () => {
        const comments = button.nextElementSibling;
        const isHidden = comments.style.display === 'none' || !comments.style.display;

        comments.style.display = isHidden ? 'block' : 'none';
        button.textContent = isHidden 
            ? `Скрыть комментарии` 
            : `Комментарии (${comments.querySelectorAll('p').length})`;
    });
});

// Переключение вкладок аутентификации
const tabs = document.querySelectorAll('.tab');
const forms = document.querySelectorAll('.auth-form');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        forms.forEach(form => {
            form.style.display = form.id === tab.dataset.tab ? 'flex' : 'none';
        });
    });
});

// Переключение форм через ссылки
document.querySelectorAll('.form-switch a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetTab = link.dataset.tab;

        tabs.forEach(t => {
            t.classList.toggle('active', t.dataset.tab === targetTab);
        });

        forms.forEach(form => {
            form.style.display = form.id === targetTab ? 'flex' : 'none';
        });
    });
});

// Валидация форм аутентификации
document.querySelectorAll('.auth-form form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll('input');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value) {
                input.style.border = '1px solid #ff4d4d';
                valid = false;
            } else {
                input.style.border = 'none';
            }
        });

        if (form.id === 'register') {
            const password = form.querySelector('#register-password').value;
            const confirmPassword = form.querySelector('#register-confirm-password').value;
            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                valid = false;
            }
        }

        if (valid) {
            alert(form.id === 'login' ? 'Вход выполнен!' : 'Регистрация успешна!');
            // Здесь можно добавить отправку данных на сервер
        }
    });
});

// Фильтрация по тегам на странице поиска
document.querySelectorAll('.filter-tags .tag').forEach(tag => {
    tag.addEventListener('click', () => {
        document.querySelectorAll('.filter-tags .tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        const selectedTag = tag.dataset.tag;
        const results = document.querySelectorAll('.result-item');

        results.forEach(result => {
            const tags = result.querySelectorAll('.result-tags span');
            const hasTag = Array.from(tags).some(t => t.textContent.includes(selectedTag));
            result.style.display = hasTag ? 'block' : 'none';
        });
    });
});

// Обработка поиска
document.querySelector('.search-bar button').addEventListener('click', () => {
    const query = document.querySelector('.search-bar input').value.toLowerCase();
    const results = document.querySelectorAll('.result-item');

    results.forEach(result => {
        const title = result.querySelector('h3').textContent.toLowerCase();
        const tags = Array.from(result.querySelectorAll('.result-tags span')).map(t => t.textContent.toLowerCase());
        const matches = title.includes(query) || tags.some(t => t.includes(query));
        result.style.display = matches ? 'block' : 'none';
    });
});