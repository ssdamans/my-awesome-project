// Получаем элементы модального окна и кнопок
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Открытие модального окна
openBtn.addEventListener('click', () => {
    lastActive = document.activeElement; // Запоминаем, где был фокус
    dlg.showModal(); // Показываем модальное окно
    // Устанавливаем фокус на первое поле ввода
    dlg.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модального окна по кнопке "Закрыть"
closeBtn.addEventListener('click', () => {
    dlg.close('cancel');
});

// Обработка отправки формы
form?.addEventListener('submit', (e) => {
    // 1. Сбрасываем все кастомные сообщения об ошибках
    [...form.elements].forEach(el => el.setCustomValidity?.(''));

    // 2. Проверяем встроенные правила валидации (required, type, pattern)
    if (!form.checkValidity()) {
        e.preventDefault(); // Предотвращаем отправку формы

        // Проверка email
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }

        // Показываем стандартные сообщения об ошибках браузера
        form.reportValidity();

        // Добавляем атрибут aria-invalid для стилизации ошибок
        [...form.elements].forEach(el => {
            if (el.willValidate) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        });

        return;
    }

    // 3. Имитация успешной отправки
    e.preventDefault();
    alert('Сообщение успешно отправлено!'); // Показываем сообщение об успехе
    form.reset(); // Очищаем форму
    dlg.close('success'); // Закрываем модальное окно
});

// Возвращаем фокус на кнопку после закрытия модалки
dlg.addEventListener('close', () => {
    lastActive?.focus();
});

// Лёгкая маска телефона (доп. задание)
const phone = document.getElementById('phone');

phone?.addEventListener('input', () => {
    const digits = phone.value.replace(/\D/g,'').slice(0,11); // до 11 цифр
    const d = digits.replace(/^8/, '7'); // нормализуем 8
    // -> 7

    const parts = [];
    if (d.length > 0) parts.push('+7');
    if (d.length > 1) parts.push(' (' + d.slice(1,4));
    if (d.length >= 4) parts[parts.length - 1] += ')';
    if (d.length >= 5) parts.push(' ' + d.slice(4,7));
    if (d.length >= 8) parts.push('-' + d.slice(7,9));
    if (d.length >= 10) parts.push('-' + d.slice(9,11));
    phone.value = parts.join('');
});

// Строгая проверка (если задаёте pattern из JS):
phone?.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');