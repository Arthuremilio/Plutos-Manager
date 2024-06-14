// Preencher a tela de alteração de categoria    
document.addEventListener('DOMContentLoaded', () => {
    const pathname = window.location.pathname;

    if (pathname.includes('category.html')) {
        const editButtons = document.querySelectorAll('#editButton');
        editButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Acionou o evento click');
                const row = button.closest('tr');
                const categoryId = row.querySelector('.categoria-id').textContent.trim();
                console.log(row)
                // Fazer a requisição GET para obter os dados da categoria
                fetch(`http://localhost:8080/api/categoria/${categoryId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao buscar dados da categoria.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Armazenar os dados da categoria no localStorage
                        localStorage.setItem('idCategoria', data.categoriaId);
                        localStorage.setItem('descricaoCategoria', data.descricao);

                        // Redirecionar para a página de edição
                        window.location.href = 'category-alter.html';
                    })
                    .catch(error => {
                        console.error('Erro ao buscar dados da categoria:', error);
                        alert('Erro ao buscar dados da categoria. Verifique o console para mais detalhes.');
                    });
            });
        });
    }

    if (pathname.includes('category-alter.html')) {
        const idCategoria = localStorage.getItem('idCategoria');
        const descricaoCategoria = localStorage.getItem('descricaoCategoria');

        if (idCategoria && descricaoCategoria) {
            document.getElementById('idItem').textContent = `ID: ${idCategoria}`;
            document.getElementById('nome').value = descricaoCategoria;
            localStorage.removeItem('idCategoria');
            localStorage.removeItem('descricaoCategoria');
        } else {
            console.error('Nenhum dado de categoria encontrado no localStorage.');
        }
    }
});