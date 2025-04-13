auth.html
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход и регистрация</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>

<body>
    <!-- Хедер -->
    <header class="header">
        <div class="container">
            <div class="logo">PhotoStream</div>
     
            <nav class="nav">
                <div class="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.html"><i class="fas fa-home"></i> Лента</a></li>
                    <li><a href="search.html"><i class="fas fa-home"></i> Поиск</a></li>
                    <li><a href="map.html"><i class="fas fa-map"></i> Карта</a></li>
                    <li><a href="profile.html"><i class="fas fa-user"></i> Профиль</a></li>
                    <li><a href="auth.html" class="active"><i class="fas fa-sign-in-alt"></i> Вход</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Основной контент -->
    <main class="container">
        <div class="auth-body">
            <section class="auth-container">
                <div class="auth-tabs">
                    <button class="tab active" data-tab="login">Вход</button>
                    <button class="tab" data-tab="register">Регистрация</button>
                </div>
                <div class="auth-form" id="login">
                    <h2>Вход</h2>
                    <form >
                        <div class="form-group">
                            <label for="login-email">Эл. почта</label>
                            <input type="email" id="login-email" placeholder="example@domain.com" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Пароль</label>
                            <input type="password" id="login-password" placeholder="Введите пароль" required>
                        </div>
                        <button type="submit" class="auth-button">Войти</button>
                        <p class="form-switch">Нет аккаунта? <a href="#" data-tab="register">Зарегистрируйтесь</a></p>
                    </form>
                </div>
                <div class="auth-form" id="register" style="display: none;">
                    <h2>Регистрация</h2>
                    <form>
                        <div class="form-group">
                            <label for="register-username">Имя пользователя</label>
                            <input type="text" id="register-username" placeholder="Ваш ник" required>
                        </div>
                        <div class="form-group">
                            <label for="register-email">Эл. почта</label>
                            <input type="email" id="register-email" placeholder="example@domain.com" required>
                        </div>
                        <div class="form-group">
                            <label for="register-password">Пароль</label>
                            <input type="password" id="register-password" placeholder="Придумайте пароль" required>
                        </div>
                        <div class="form-group">
                            <label for="register-confirm-password">Подтверждение пароля</label>
                            <input type="password" id="register-confirm-password" placeholder="Повторите пароль"
                                required>
                        </div>
                        <button type="submit" class="auth-button">Зарегистрироваться</button>
                        <p class="form-switch">Уже есть аккаунт? <a href="#" data-tab="login">Войдите</a></p>
                    </form>
                </div>
            </section>
        </div>
    </main>

    <!-- Футер -->
    <footer class="footer">
        <div class="container">
            <p>© 2025 PhotoStream. Все права защищены.</p>
            <div class="social-links">
                <a href="#">X</a>
                <a href="#">Instagram</a>
                <a href="#">Контакты</a>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>

index.html
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лента фотографий</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>

<body>
    <!-- Хедер -->
    <header class="header">
        <div class="container">
            <div class="logo">PhotoStream</div>
  
            <nav class="nav">
                <div class="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.html"><i class="fas fa-home"></i> Лента</a></li>
                    <li><a href="search.html"><i class="fas fa-home"></i> Поиск</a></li>
                    <li><a href="map.html"><i class="fas fa-map"></i> Карта</a></li>
                    <li><a href="profile.html"><i class="fas fa-user"></i> Профиль</a></li>
                    <li><a href="auth.html" class="active"><i class="fas fa-sign-in-alt"></i> Вход</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Основной контент -->
    <main class="container">
        <section class="feed">
            <div class="post">
                <img src="https://via.placeholder.com/800x500" alt="Фото">
                <div class="post-content">
                    <h3>Закат на пляже</h3>
                    <p>Красивый вечер у моря, 12 апреля 2025</p>
                    <button class="toggle-comments">Комментарии (2)</button>
                    <div class="comments" style="display: none;">
                        <p><strong>user1:</strong> Потрясающе!</p>
                        <p><strong>user2:</strong> Хочу туда!</p>
                        <div class="add-comment">
                            <input type="text" placeholder="Ваш комментарий...">
                            <button>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="post">
                <img src="https://via.placeholder.com/800x500" alt="Фото">
                <div class="post-content">
                    <h3>Горы в тумане</h3>
                    <p>Утренний пейзаж, 10 апреля 2025</p>
                    <button class="toggle-comments">Комментарии (1)</button>
                    <div class="comments" style="display: none;">
                        <p><strong>user3:</strong> Какая атмосфера!</p>
                        <div class="add-comment">
                            <input type="text" placeholder="Ваш комментарий...">
                            <button>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Футер -->
    <footer class="footer">
        <div class="container">
            <p>© 2025 PhotoStream. Все права защищены.</p>
            <div class="social-links">
                <a href="#">X</a>
                <a href="#">Instagram</a>
                <a href="#">Контакты</a>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>

map.html
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Карта фотографий</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link href="https://unpkg.com/maplibre-gl@4.7.0/dist/maplibre-gl.css" rel="stylesheet" />
</head>

<body>
    <!-- Хедер -->
    <header class="header">
        <div class="container">
            <div class="logo">PhotoStream</div>
            <nav class="nav">
                <div class="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.html"><i class="fas fa-home"></i> Лента</a></li>
                    <li><a href="search.html"><i class="fas fa-home"></i> Поиск</a></li>
                    <li><a href="map.html"><i class="fas fa-map"></i> Карта</a></li>
                    <li><a href="profile.html"><i class="fas fa-user"></i> Профиль</a></li>
                    <li><a href="auth.html" class="active"><i class="fas fa-sign-in-alt"></i> Вход</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Основной контент -->
    <main class="container">
        <section class="map-container">
            <div id="map"></div>
            <div class="map-overlay">
                <h3>Закат на пляже</h3>
                <p>Местоположение: 12.34, 56.78</p>
            </div>
        </section>
    </main>

    <!-- Футер -->
    <footer class="footer">
        <div class="container">
            <p>© 2025 PhotoStream. Все права защищены.</p>
            <div class="social-links">
                <a href="#">X</a>
                <a href="#">Instagram</a>
                <a href="#">Контакты</a>
            </div>
        </div>
    </footer>

    <script src="https://unpkg.com/maplibre-gl@4.7.0/dist/maplibre-gl.js"></script>
    <script src="script.js"></script>
    <script>
        // Проверка загрузки MapLibre GL
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof maplibregl === 'undefined') {
                console.error('MapLibre GL не загружен');
                return;
            }

            const map = new maplibregl.Map({
                container: 'map',
                style: 'https://demotiles.maplibre.org/style.json',
                center: [0, 0],
                zoom: 2
            });

            map.on('load', () => {
                map.addControl(new maplibregl.NavigationControl());

                new maplibregl.Marker()
                    .setLngLat([12.34, 56.78])
                    .addTo(map);
            });

            // Обновление размеров карты при изменении окна
            window.addEventListener('resize', () => {
                map.resize();
            });
        });
    </script>
</body>

</html>

profile.html
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Профиль пользователя</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>

<body>
    <!-- Хедер -->
    <header class="header">
        <div class="container">
            <div class="logo">PhotoStream</div>
 
            <nav class="nav">
                <div class="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.html"><i class="fas fa-home"></i> Лента</a></li>
                    <li><a href="search.html"><i class="fas fa-home"></i> Поиск</a></li>
                    <li><a href="map.html"><i class="fas fa-map"></i> Карта</a></li>
                    <li><a href="profile.html"><i class="fas fa-user"></i> Профиль</a></li>
                    <li><a href="auth.html" class="active"><i class="fas fa-sign-in-alt"></i> Вход</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Основной контент -->
    <main class="container">
        <section class="profile-card">
            <img src="https://via.placeholder.com/120" alt="Аватар">
            <h2>@traveler</h2>
            <p>Люблю природу и фотографию. Исследую мир!</p>
            <div class="tags">
                <span>#природа</span>
                <span>#путешествия</span>
                <span>#фото</span>
            </div>
        </section>
        <section class="photo-grid">
            <img src="https://via.placeholder.com/300" alt="Фото 1">
            <img src="https://via.placeholder.com/300" alt="Фото 2">
            <img src="https://via.placeholder.com/300" alt="Фото 3">
            <img src="https://via.placeholder.com/300" alt="Фото 4">
            <img src="https://via.placeholder.com/300" alt="Фото 5">
            <img src="https://via.placeholder.com/300" alt="Фото 6">
        </section>
    </main>

    <!-- Футер -->
    <footer class="footer">
        <div class="container">
            <p>© 2025 PhotoStream. Все права защищены.</p>
            <div class="social-links">
                <a href="#">X</a>
                <a href="#">Instagram</a>
                <a href="#">Контакты</a>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>

script.js
// Бургер-меню
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    });
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

search.html
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Поиск фотографий</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>

<body>
    <!-- Хедер -->
    <header class="header">
        <div class="container">
            <div class="logo">PhotoStream</div>
            <nav class="nav">
                <div class="burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="nav-menu">
                    <li><a href="index.html"><i class="fas fa-home"></i> Лента</a></li>
                    <li><a href="search.html"><i class="fas fa-home"></i> Поиск</a></li>
                    <li><a href="map.html"><i class="fas fa-map"></i> Карта</a></li>
                    <li><a href="profile.html"><i class="fas fa-user"></i> Профиль</a></li>
                    <li><a href="auth.html" class="active"><i class="fas fa-sign-in-alt"></i> Вход</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Основной контент -->
    <main class="container">
        <section class="search-container" style="margin-bottom: 15px;">
            <h2>Поиск фотографий</h2>
            <div class="search-bar">
                <input type="text" placeholder="Поиск: закат на пляже..." value="закат">
                <button><a href="search.html">Найти</a></button>
            </div>
        </section>
    
        <section class="search-container">

            <div class="filter-tags">
                <span class="tag active" data-tag="закат">Закат</span>
                <span class="tag" data-tag="пляж">Пляж</span>
                <span class="tag" data-tag="природа">Природа</span>
                <span class="tag" data-tag="море">Море</span>
            </div>
            <div class="search-results">
                <div class="result-item">
                    <img src="https://via.placeholder.com/300" alt="Закат на пляже">
                    <div class="result-info">
                        <h3>Закат на пляже</h3>
                        <p>12 апреля 2025, @traveler</p>
                        <div class="result-tags">
                            <span>#закат</span>
                            <span>#пляж</span>
                        </div>
                    </div>
                </div>
                <div class="result-item">
                    <img src="https://via.placeholder.com/300" alt="Море и закат">
                    <div class="result-info">
                        <h3>Море и закат</h3>
                        <p>10 апреля 2025, @sea_lover</p>
                        <div class="result-tags">
                            <span>#закат</span>
                            <span>#море</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Футер -->
    <footer class="footer">
        <div class="container">
            <p>© 2025 PhotoStream. Все права защищены.</p>
            <div class="social-links">
                <a href="#">X</a>
                <a href="#">Instagram</a>
                <a href="#">Контакты</a>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>

styles.css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family:
        "Inter",
        -apple-system,
        BlinkMacSystemFont,
        sans-serif;
}

a {
    text-decoration: none;
    color: inherit;
}

body {
    background: linear-gradient(135deg, #e0e7ff, #c3dafe);
   height: 100vh;
    color: #1f2937;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding:20px;
    width: 100%;
    height: 100%;
}

/* Хедер */
.header {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 12px 0;
}

.header .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    transition: color 0.3s;
}

.logo:hover {
    color: #4f46e5;
}

.search-bar {
    background: rgba(243, 244, 246, 1);
    border-radius: 10px;
    padding: 8px;
    display: flex;
    align-items: center;
    max-width: 400px;
    flex-grow: 1;
    margin: 0 16px;
}

.search-bar input {
    background: transparent;
    border: none;
    outline: none;
    color: #1f2937;
    font-size: 0.95rem;
    flex-grow: 1;
    padding: 8px;
}

.search-bar button {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition:
        transform 0.2s,
        box-shadow 0.2s;
}

.search-bar button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.nav {
    display: flex;
    align-items: center;
}

.nav-menu {
    display: flex;
    gap: 16px;
    list-style: none;
}

.nav-menu a {
    color: #1f2937;
    font-size: 0.95rem;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 8px;
    transition:
        background 0.3s,
        color 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.nav-menu a i {
    font-size: 1rem;
}

.nav-menu a:hover,
.nav-menu a.active {
    background: rgba(79, 70, 229, 0.1);
    color: #4f46e5;
}

.burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    z-index: 1001;
}

.burger span {
    width: 25px;
    height: 3px;
    background: #1f2937;
    transition: all 0.3s;
}

.burger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.burger.active span:nth-child(2) {
    opacity: 0;
}

.burger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
}

/* Футер */
.footer {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 16px 0;
}

.footer .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
}

.footer p {
    font-size: 0.9rem;
    color: #1f2937;
}

.social-links a {
    color: #1f2937;
    margin-left: 12px;
    font-size: 0.9rem;
    transition: color 0.3s;
}

.social-links a:hover {
    color: #4f46e5;
}

/* Основной контент */
main {
    flex-grow: 1;
    overflow-y: auto;
    padding: 16px 0;
}

/* Лента */
.feed {
    display: grid;
    gap: 20px;
}

.post {
    background: white;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.post:hover {
    transform: translateY(-4px);
}

.post img {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 10px;
    object-fit: cover;
}

.post-content h3 {
    font-size: 1.2rem;
    color: #1f2937;
    margin-bottom: 4px;
}

.post-content p {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 8px;
}

.toggle-comments {
    background: transparent;
    border: none;
    color: #4f46e5;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 4px;
}

.toggle-comments:hover {
    color: #7c3aed;
}

.comments {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.comments p {
    font-size: 0.85rem;
    color: #6b7280;
    margin-bottom: 6px;
}

.add-comment {
    display: flex;
    gap: 8px;
    margin-top: 8px;
}

.add-comment input {
    flex-grow: 1;
    background: #f3f4f6;
    border: none;
    padding: 8px;
    border-radius: 6px;
    color: #1f2937;
    font-size: 0.9rem;
}

.add-comment button {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
}

.add-comment button:hover {
    transform: translateY(-2px);
}

/* Профиль */
.profile-card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 16px;
}

.profile-card img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 12px;
    border: 2px solid rgba(79, 70, 229, 0.2);
}

.profile-card h2 {
    font-size: 1.5rem;
    color: #1f2937;
    margin-bottom: 6px;
}

.profile-card p {
    font-size: 0.95rem;
    color: #6b7280;
    margin-bottom: 12px;
}

.tags {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
}

.tags span {
    background: rgba(79, 70, 229, 0.1);
    padding: 5px 10px;
    border-radius: 10px;
    color: #4f46e5;
    font-size: 0.85rem;
}

.tags span:hover {
    background: rgba(79, 70, 229, 0.2);
}

.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}

.photo-grid img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    transition: transform 0.3s;
}

.photo-grid img:hover {
    transform: scale(1.03);
}

/* Карта */
.map-container {
    background: white;
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
}

#map {
    flex-grow: 1;
    border-radius: 10px;
    min-height: 300px;
    width: 100%;
}

.map-overlay {
    position: absolute;
    top: 16px;
    left: 16px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 280px;
}

.map-overlay h3 {
    font-size: 1.1rem;
    color: #1f2937;
    margin-bottom: 6px;
}

.map-overlay p {
    font-size: 0.9rem;
    color: #6b7280;
}

/* Аутентификация */
.auth-body {
    background: linear-gradient(135deg, #e0e7ff, #c3dafe);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

.auth-container {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
}

.auth-tabs {
    display: flex;
    margin-bottom: 16px;
}

.tab {
    background: #f3f4f6;
    border: none;
    padding: 10px;
    font-size: 1rem;
    color: #1f2937;
    cursor: pointer;
    flex: 1;
    text-align: center;
    border-radius: 8px 8px 0 0;
    transition: background 0.3s;
}

.tab.active {
    background: white;
    color: #4f46e5;
}

.tab:hover {
    background: #e5e7eb;
}

.auth-form, .auth-form> form  {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
 

.auth-form h2 {
    font-size: 1.5rem;
    color: #1f2937;
    text-align: center;
    margin-bottom: 12px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.form-group label {
    font-size: 0.9rem;
    color: #1f2937;
}

.form-group input {
    background: #f3f4f6;
    border: none;
    padding: 10px;
    border-radius: 6px;
    color: #1f2937;
    font-size: 0.95rem;
    outline: none;
}

.form-group input:focus {
    background: #e5e7eb;
}

.auth-button {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
}

.auth-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.form-switch {
    font-size: 0.9rem;
    color: #6b7280;
    text-align: center;
    margin-top: 8px;
}

.form-switch a {
    color: #4f46e5;
    font-weight: 500;
}

.form-switch a:hover {
    text-decoration: underline;
}

/* Поиск */
.search-container {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.filter-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
}

.filter-tags .tag {
    background: #f3f4f6;
    padding: 6px 12px;
    border-radius: 10px;
    color: #1f2937;
    font-size: 0.9rem;
    cursor: pointer;
}

.filter-tags .tag:hover {
    background: #e5e7eb;
}

.filter-tags .tag.active {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
}

.search-results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}

.result-item {
    background: white;
    border-radius: 10px;
    padding: 12px;
    transition: transform 0.3s;
}

.result-item:hover {
    transform: translateY(-4px);
}

.result-item img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 8px;
    object-fit: cover;
}

.result-info h3 {
    font-size: 1.1rem;
    color: #1f2937;
    margin-bottom: 4px;
}

.result-info p {
    font-size: 0.85rem;
    color: #6b7280;
    margin-bottom: 8px;
}

.result-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.result-tags span {
    background: rgba(79, 70, 229, 0.1);
    padding: 4px 8px;
    border-radius: 8px;
    color: #4f46e5;
    font-size: 0.8rem;
}

/* Адаптивность */
@media (max-width: 1024px) {
    .header .container {
        flex-wrap: wrap;
        gap: 12px;
    }

    .search-bar {
        margin: 0;
        width: 100%;
        max-width: none;
    }
}

@media (max-width: 768px) {
 
    .nav-menu {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        height: 100vh;
        width: 250px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        flex-direction: column;
        padding: 60px 20px 20px;
        box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 1000;
    }

    .nav-menu.active {
        display: flex;
        transform: translateX(0);
    }

    .nav-menu a {
        padding: 12px;
        font-size: 1.1rem;
    }

    .burger {
        display: flex;
    }

    .profile-card img {
        width: 80px;
        height: 80px;
    }

    .photo-grid {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    .search-results {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    }

    .auth-container {
        padding: 16px;
    }

    .auth-tabs {
        flex-direction: row;
    }

    .map-container {
        padding: 8px;
    }

    .map-overlay {
        width: calc(100% - 32px);
        left: 16px;
    }

    #map {
        min-height: 200px;
    }
}

