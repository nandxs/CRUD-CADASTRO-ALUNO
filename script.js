document.getElementById('formularioaluno').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nomealuno = document.getElementById('botaonome').value;
    const cpfaluno = document.getElementById('botaocpf').value;
    const endealuno = document.getElementById('botaoendereco').value;
    const nascaluno = document.getElementById('botaodat').value;

    const aluno = {
        nomealuno: nomealuno,
        cpfaluno: cpfaluno,
        endealuno: endealuno,
        nascaluno: nascaluno
    };

    console.log('Enviando dados do aluno:', aluno);

    try {
        const response = await fetch('http://localhost:3000/addaluno_cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });

        const data = await response.text();

        if (response.ok) {
            alert('Aluno cadastrado com sucesso!');
        } else {
            alert('Erro ao cadastrar aluno: ' + data);
        }

        console.log('Resposta do servidor:', data);

        document.getElementById('formularioaluno').reset();

    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao inserir aluno: ' + error);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const tabelaAlunos = document.getElementById('tabelaAlunosBody');

    if (!tabelaAlunos) {
        console.error('Elemento tabelaAlunosBody não encontrado.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/listar_alunos');
        
        if (!response.ok) {
            console.error(`Erro ${response.status}:`, await response.text());
            tabelaAlunos.innerHTML = '<tr><td colspan="6">Erro ao carregar alunos</td></tr>';
            return;
        }

        const alunos = await response.json();

        if (alunos.length === 0) {
            tabelaAlunos.innerHTML = '<tr><td colspan="6">Nenhum aluno cadastrado</td></tr>';
            return;
        }

        alunos.forEach(aluno => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${aluno.Nome}</td>
                <td>${aluno.CPF}</td>
                <td>${aluno.Endereco}</td>
                <td>${aluno.Telefone}</td>
                <td>${aluno.Data_nasc}</td>
                <td>
                    <button onclick="editarAluno(${aluno.id})">Editar</button>
                </td>
            `;
            tabelaAlunos.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        tabelaAlunos.innerHTML = '<tr><td colspan="6">Erro ao carregar alunos</td></tr>';
    }
});

function editarAluno(id) {
    alert(`Editar aluno ID: ${id}`);
    window.location.href = `editar_aluno.html?id=${id}`;
}


