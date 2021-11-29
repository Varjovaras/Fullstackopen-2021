describe('Blog ', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('blogs');
    // cy.contains(
    //   'Note app, Department of Computer Science, University of Helsinki 2021'
    // );
  });
});
