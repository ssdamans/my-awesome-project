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