describe('O meu primeiro teste', () => {
  it('abre a página de login', () => {
    cy.visit('/');
    cy.contains('h1', 'TaskBoard').should('be.visible');
  });
});
