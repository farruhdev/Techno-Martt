import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
    });
    const [formStatus, setFormStatus] = useState({
        submitting: false,
        success: null,
        error: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (formStatus.error) {
            setFormStatus(prev => ({ ...prev, error: null }));
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !validateEmail(formData.email)) {
            setFormStatus({ ...formStatus, error: "Введите корректный email" });
            return;
        }

        if (!formData.name) {
            setFormStatus({ ...formStatus, error: "Введите ваше имя" });
            return;
        }

        setFormStatus({ submitting: true, success: null, error: null });

        try {
            // Создаем контроллер для отмены запроса
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // Таймаут 10 секунд

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                signal: controller.signal
            });

            clearTimeout(timeoutId); // Очищаем таймаут если запрос успешен

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Произошла ошибка при отправке');
            }

            const data = await response.json();

            setFormStatus({
                submitting: false,
                success: "Сообщение успешно отправлено!",
                error: null
            });
            setFormData({ email: "", name: "" });
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            setFormStatus({
                submitting: false,
                success: null,
                error: error.name === 'AbortError'
                    ? "Превышено время ожидания. Повторите попытку."
                    : error.message || "Ошибка отправки. Повторите попытку позже."
            });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-16">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-2">"Contact Us"</h1>
                <p className="text-gray-600">"Have questions? Write to us!"</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-[#76E4F7]"
                            placeholder="Введите email"
                            disabled={formStatus.submitting}
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-[#76E4F7]"
                            placeholder="Введите имя"
                            disabled={formStatus.submitting}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className="w-full bg-opacity-80 bg-[#76E4F7] text-black py-2 px-4 rounded-md hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50"
                >
                    {formStatus.submitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Отправка...
                        </span>
                    ) : "Отправить"}
                </button>
                {formStatus.error && (
                    <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                        {formStatus.error}
                    </div>
                )}
                {formStatus.success && (
                    <div className="mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
                        {formStatus.success}
                    </div>
                )}
            </form>
        </div>
    );
}