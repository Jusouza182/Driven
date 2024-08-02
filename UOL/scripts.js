let userName;
let chatUUID = uuid();
const messageContainer = document.getElementById('message-container');
const participantContainer = document.getElementById('participant-container');
const participantList = document.getElementById('participant-list');
const messageStatus = document.getElementById('message-status');

// Gerar um UUID
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Função para entrar na sala
async function enterRoom(name, uuid) {
    console.log('Entrando na sala com nome:', name);
    try {
        const response = await fetch(`https://mock-api.driven.com.br/api/v6/uol/participants/${uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (response.status === 200) {
            console.log('Usuário entrou na sala');
            return true;
        } else {
            console.log('Nome de usuário já em uso');
            return false;
        }
    } catch (error) {
        console.error('Erro ao entrar na sala:', error);
        return false;
    }
}

// Solicitar o nome do usuário
(async function askUserName() {
    do {
        userName = prompt("Digite seu nome:");
    } while (!await enterRoom(userName, chatUUID));
})();

// Manter a conexão viva
function keepConnectionAlive(name, uuid) {
    setInterval(async () => {
        console.log('Mantendo conexão viva para:', name);
        try {
            await fetch(`https://mock-api.driven.com.br/api/v6/uol/status/${uuid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            });
        } catch (error) {
            console.error('Erro ao manter a conexão:', error);
        }
    }, 5000);
}

keepConnectionAlive(userName, chatUUID);

// Buscar mensagens
async function fetchMessages(uuid) {
    console.log('Buscando mensagens...');
    try {
        const response = await fetch(`https://mock-api.driven.com.br/api/v6/uol/messages/${uuid}`);
        const messages = await response.json();
        return messages;
    } catch (error) {
        console.error('Erro ao buscar mensagens:', error);
        return [];
    }
}

async function updateMessages() {
    const messages = await fetchMessages(chatUUID);
    messageContainer.innerHTML = '';

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', message.type);
        messageElement.innerHTML = `<span class="time">[${message.time}]</span> <span class="from">${message.from}</span> <span class="to">para ${message.to}</span>: <span class="text">${message.text}</span>`;
        messageContainer.appendChild(messageElement);
    });

    // Rolagem automática para o final
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

setInterval(updateMessages, 3000);

// Enviar mensagens
async function sendMessage(from, to, text, type, uuid) {
    console.log('Enviando mensagem:', { from, to, text, type });
    try {
        const response = await fetch(`https://mock-api.driven.com.br/api/v6/uol/messages/${uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ from, to, text, type })
        });

        if (response.status === 200) {
            console.log('Mensagem enviada com sucesso');
            updateMessages(); // Atualizar mensagens
        } else {
            console.log('Erro ao enviar mensagem');
            location.reload(); // Recarregar a página para pedir o nome novamente
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}

document.getElementById('send-button').addEventListener('click', () => {
    const messageInput = document.getElementById('message-input');
    const messageType = document.querySelector('input[name="visibility"]:checked').value;
    const messageText = messageInput.value;
    const messageTo = messageType === 'public' ? 'Todos' : 'Nome do destinatário'; // Ajustar para o nome do destinatário

    sendMessage(userName, messageTo, messageText, messageType, chatUUID);
    messageInput.value = '';
});

document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('send-button').click();
    }
});

// Alternar a lista de participantes
function toggleParticipants() {
    participantContainer.style.display = participantContainer.style.display === 'flex' ? 'none' : 'flex';
}
