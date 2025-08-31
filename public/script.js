// document.addEventListener('DOMContentLoaded', () => {
//     const Form = document.getElementById('chat-form');
//     const Input = document.getElementById('user-input');
//     const chatBox = document.getElementById('chat-box');


//     chatForm.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const userMessage = userInput.value.trim();
//         if (!userMessage) return;

//         appendMessage('user', userMessage);
//         userInput.value = '';

//          const  botMessageElement = document.createElement('div');
//          botMessageElement.classList.add('message', 'bot');
//          botMessageElement.textContent = 'Thinking...';
//           chatBox.appendChild(botMessageElement);
//           chatBox.scrollTop = chatBox.scrollHeight;

        

//         try {
//             // Ubah baris ini untuk menggunakan URL dan port backend Anda
//             const response = await fetch('/api/chat', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     messages: [
//                         { "role": "user", content: userMessage }
//                     ]
//                 }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => null);
//                 const errorMessage = errorData?.error || response.statusText;
//                 throw new Error(errorMessage);
                
//             }

//             const data = await response.json();

//             if (data && data.result) {
//                 botMessageElement.textContent = data.result;
//             } else {
//                 botMessageElement.textContent = 'Maaf, tidak ada respons yang diterima.';
//             }

//         } catch (error) {
//             console.error('Gagal mendapatkan respons dari server:', error);
//             thinkingMessage.textContent = 'Gagal mendapatkan respons dari server.';
//         } finally{
//             chatBox.scrollTop = chatBox.scrollHeight;
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // fungsi untuk menambah pesan ke chat box
    const appendMessage = (role, content) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${role}-message`);
        messageElement.textContent = content;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
        return messageElement;
    };

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        appendMessage('user', userMessage);
        userInput.value = '';

        const botMessageElement = appendMessage('bot', 'Thinking...');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: "user", content: userMessage }
                    ]
                }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.result) {
                botMessageElement.textContent = data.result;
            } else {
                botMessageElement.textContent = 'Maaf, tidak ada respons yang diterima.';
            }
        } catch (error) {
            console.error('Gagal mendapatkan respons dari server:', error);
            botMessageElement.textContent = 'Gagal mendapatkan respons dari server.';
        }
    });
});
