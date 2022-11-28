describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/piano-ui/index.html')
    let piano = cy.get('#piano-song-editor');
    piano.should('be.visible');
    piano.trigger('mousedown', 222, 454);
  })
})
