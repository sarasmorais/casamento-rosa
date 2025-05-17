// Validação e envio do formulário
document.getElementById('rsvp-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Limpar mensagens de erro anteriores
    document.getElementById('name-error').style.display = 'none';
    document.getElementById('email-error').style.display = 'none';
    document.getElementById('phone-error').style.display = 'none';

    // Obter valores do formulário
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const guests = document.getElementById('guests').value;
    const notes = document.getElementById('notes').value.trim();

    // Validar campos
    let isValid = true;

    if (!name) {
        document.getElementById('name-error').textContent = 'Nome é obrigatório';
        document.getElementById('name-error').style.display = 'block';
        document.getElementById('name').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('name').classList.remove('error');
    }

    if (!email) {
        document.getElementById('email-error').textContent = 'E-mail é obrigatório';
        document.getElementById('email-error').style.display = 'block';
        document.getElementById('email').classList.add('error');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('email-error').textContent = 'E-mail inválido';
        document.getElementById('email-error').style.display = 'block';
        document.getElementById('email').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('email').classList.remove('error');
    }

    if (!phone) {
        document.getElementById('phone-error').textContent = 'Telefone é obrigatório';
        document.getElementById('phone-error').style.display = 'block';
        document.getElementById('phone').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('phone').classList.remove('error');
    }

    if (!isValid) {
        return;
    }

    try {
        // PERSONALIZAÇÃO: Substitua pela URL do seu Google Apps Script Web App
        const scriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

        // Preparar dados para envio
        const formData = {
            name: name,
            email: email,
            phone: phone,
            guests: guests,
            notes: notes,
            timestamp: new Date().toISOString()
        };

        // Enviar dados para o Google Apps Script
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Mostrar mensagem de sucesso
            document.getElementById('rsvp-form').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';

            // Limpar formulário
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('guests').value = '0';
            document.getElementById('notes').value = '';
        } else {
            alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    }
});