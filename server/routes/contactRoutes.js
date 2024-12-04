// routes/contactRoutes.js
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Создаем транспорт для nodemailer один раз
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // Отключаем пул соединений
    pool: false,
    // Устанавливаем таймаут
    connectionTimeout: 5000,
    socketTimeout: 5000
});

// POST /api/contact - отправка сообщения
router.post('/', async (req, res) => {
    const { email, name } = req.body;

    // Быстрая валидация
    if (!email || !name) {
        return res.status(400).json({
            success: false,
            message: 'Email и имя обязательны'
        });
    }

    try {
        const mailOptions = {
            from: `"Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.RECIPIENT_EMAIL,
            subject: 'Новое сообщение с формы обратной связи',
            html: `
                <h2>Новое сообщение от посетителя сайта</h2>
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
            `
        };

        // Отправляем письмо с таймаутом
        await Promise.race([
            transporter.sendMail(mailOptions),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Timeout')), 5000)
            )
        ]);

        res.status(200).json({
            success: true,
            message: 'Сообщение успешно отправлено'
        });
    } catch (error) {
        console.error('Ошибка при отправке:', error);

        res.status(500).json({
            success: false,
            message: error.message === 'Timeout'
                ? 'Превышено время ожидания отправки'
                : 'Произошла ошибка при отправке сообщения'
        });
    }
});

// Проверка работоспособности маршрута
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

export default router;