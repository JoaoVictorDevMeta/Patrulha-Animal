const form = document.getElementById("add-pet-form");
const errorContainer = document.getElementById("error-message");
const token = localStorage.getItem("token");

const errorMessages = (inputs) => {
    const messages = [];
    if (!inputs.birthdate) {
        messages.push("A data de nascimento do pet é obrigatória.");
    }
    if (!inputs.age) {
        messages.push("A idade do pet é obrigatória.");
    }
    if (!inputs.species) {
        messages.push("A espécie do pet é obrigatória.");
    }
    if (!inputs.description) {
        messages.push("A descrição do pet é obrigatória.");
    }
    return messages;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    //recebendo todos os inputs do formulário
    //isso é o que será enviado para o backend
    const formData = new FormData(form);

    //criando um objeto com o valor dos inputs
    //para pode fazer validação deles
    const inputs = Object.fromEntries(formData.entries());
    console.log(inputs);

    //procura erro nos inputs
    const errors = errorMessages(inputs)
    //caso tenha exibe esta mensagem
    if (errors.length) {
        errorContainer.innerHTML = errors.map(message => `<div class="error-message">${message}</div>`).join('');
        errorContainer.style.display = "block";
        return;
    }
    //caso não tenha erro, limpa a mensagem de erro
    errorContainer.style.display = "none";

    //enviando os dados para o backend
    const response = await fetch("http://localhost:3000/pets", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    console.log(response)
});

/*import API from './api.js';

const form = document.querySelector('#add-pet-form');

window.handleSubmit = handleSubmit;

async function handleSubmit(event) {
    event.preventDefault();

    // Limpa mensagens de erro anteriores
    document.querySelectorAll(".error-message").forEach((message) => message.remove());

    let isValid = true;

    // Função auxiliar para exibir mensagens de erro
    function showError(input, message) {
        const error = document.createElement("div");
        error.className = "error-message";
        error.style.color = "red";
        error.style.marginTop = "5px";
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    // Validação dos campos

    // Validação da data de nascimento
    const birthdateInput = document.getElementById("birthdate");
    const ageInput = document.getElementById("age");

    // Verifica se uma data de nascimento foi informada
    if (!birthdateInput.value.trim()) {
        showError(birthdateInput, "A data de nascimento do pet é obrigatória.");
        isValid = false;
    } else if (!ageInput.value.trim()) {
        showError(birthdateInput, "A idade do pet deve ser válida.");
        isValid = false;
    }

    const speciesSelect = document.getElementById("species");
    if (!speciesSelect.value.trim()) {
        showError(speciesSelect, "A espécie do pet é obrigatória.");
        isValid = false;
    }

    const descriptionInput = document.getElementById("description");
    if (!descriptionInput.value.trim()) {
        showError(descriptionInput, "A descrição do pet é obrigatória.");
        isValid = false;
    }

    // Interrompe se a validação falhar
    if (!isValid) return;

    // Adiciona o usuário logado ao objeto de dados do pet
    console.log(localStorage.getItem('userId')) 
    const userId = localStorage.getItem('userId');  // Supondo que o ID do usuário esteja armazenado com a chave 'userId'
    Pets.user_id = userId; 
    if (!userId) {
        alert("Você precisa estar logado para adicionar um pet.");
        return;
    }

    if (!userId) {
        alert("Você precisa estar logado para adicionar um pet.");
        return;
    }

    // Continua se os campos forem válidos
    const formData = new FormData(form);
    formData.append("user_id", userId);
    
    try {
        const response = await API.create('/pets', formData);
        if (response) {
            location.href = '/back/public/perfil.html';
        } else {
            console.log('Erro no cadastro');
        }
    } catch (error) {
        console.error('Erro ao cadastrar pet:', error);
        alert('Erro ao cadastrar pet: ' + error.message);
    }
}

form.addEventListener('submit', handleSubmit);
*/