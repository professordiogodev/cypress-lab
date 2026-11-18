describe('Desafios', () => {
  const visitTasks = () =>
    cy.visit('/tasks.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', 'ana@empresa.pt');
      },
    });

  it('desafio 1: login sem preencher nada mostra erro', () => {
    cy.visit('/');
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="login-error"]').should('be.visible');
  });

  it('desafio 2: não adiciona tarefas vazias', () => {
    visitTasks();
    cy.get('[data-cy="task-item"]').should('have.length', 3);
    cy.get('[data-cy="new-task-input"]').type('   {enter}');
    cy.get('[data-cy="task-item"]').should('have.length', 3);
  });

  it('desafio 3: lista vazia vinda da API', () => {
    cy.intercept('GET', '/api/tasks.json', { body: [] }).as('getTasks');
    visitTasks();
    cy.wait('@getTasks');
    cy.get('[data-cy="task-item"]').should('not.exist');
    cy.get('[data-cy="task-count"]').should('have.text', '0 tarefa(s) por fazer');
  });

  it('desafio 4: sem sessão, volta ao login', () => {
    cy.visit('/tasks.html');
    cy.url().should('include', '/index.html');
    cy.get('[data-cy="login-form"]').should('be.visible');
  });
});
