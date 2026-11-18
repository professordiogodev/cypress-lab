describe('Rede (cy.intercept)', () => {
  const visitTasks = () =>
    cy.visit('/tasks.html', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', 'ana@empresa.pt');
      },
    });

  it('espera pelo pedido real e valida a resposta', () => {
    cy.intercept('GET', '/api/tasks.json').as('getTasks');
    visitTasks();

    cy.wait('@getTasks').its('response.statusCode').should('eq', 200);
    cy.get('[data-cy="task-item"]').should('have.length', 3);
  });

  it('usa dados falsos (stub) em vez da API', () => {
    cy.intercept('GET', '/api/tasks.json', {
      body: [{ title: 'Tarefa vinda do stub', done: false }],
    }).as('getTasks');
    visitTasks();

    cy.wait('@getTasks');
    cy.get('[data-cy="task-item"]')
      .should('have.length', 1)
      .and('contain', 'Tarefa vinda do stub');
  });

  it('mostra mensagem de erro quando a API falha', () => {
    cy.intercept('GET', '/api/tasks.json', { statusCode: 500 }).as('getTasks');
    visitTasks();

    cy.wait('@getTasks');
    cy.get('[data-cy="tasks-error"]').should('be.visible');
    cy.get('[data-cy="task-item"]').should('not.exist');
  });
});
