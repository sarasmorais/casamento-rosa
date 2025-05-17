// Função para rolar suavemente para uma seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 60, // Ajuste para a navegação fixa
            behavior: 'smooth'
        });
    }
}