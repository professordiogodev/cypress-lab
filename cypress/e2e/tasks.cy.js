describe('Tarefas', () => {
  beforeEach(() => {
    // Atalho: em vez de passar pelo ecrã de login, preparamos o estado diretamente
    cy.visit('/tasks.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', 'ana@empresa.pt');
      },
    });
  });

  it('mostra as tarefas vindas da API', () => {
    // Sem cy.wait(2000)! O Cypress espera automaticamente (até 4s por defeito)
    cy.get('[data-cy="task-item"]').should('have.length', 3);
    cy.get('[data-cy="loading"]').should('not.be.visible');
    cy.get('[data-cy="task-count"]').should('have.text', '2 tarefa(s) por fazer');
  });

  it('adiciona uma nova tarefa', () => {
    cy.get('[data-cy="task-item"]').should('have.length', 3);

    cy.get('[data-cy="new-task-input"]').type('Beber café{enter}');

    cy.get('[data-cy="task-item"]').should('have.length', 4);
    cy.get('[data-cy="task-item"]').last().should('contain', 'Beber café');
    cy.get('[data-cy="new-task-input"]').should('have.value', '');
  });

  it('marca uma tarefa como feita', () => {
    cy.contains('[data-cy="task-item"]', 'Rever pull request')
      .find('[data-cy="task-toggle"]')
      .check();

    cy.get('[data-cy="task-count"]').should('have.text', '1 tarefa(s) por fazer');
  });
});
