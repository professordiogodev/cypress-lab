




describe('Login', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('entra com credenciais válidas', () => {
    cy.get('[data-cy="email"]').type('ana@empresa.pt');
    cy.get('[data-cy="password"]').type('cypress123');
    cy.get('[data-cy="login-submit"]').click();

    cy.url().should('include', '/tasks');
    cy.get('[data-cy="welcome"]').should('contain', 'ana@empresa.pt');
  });

  it('mostra erro com password errada', () => {
    cy.get('[data-cy="email"]').type('ana@empresa.pt');
    cy.get('[data-cy="password"]').type('errada');
    cy.get('[data-cy="login-submit"]').click();

    cy.get('[data-cy="login-error"]')
      .should('be.visible')
      .and('have.text', 'Email ou password inválidos');
    cy.url().should('not.include', '/tasks');
  });
});