describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Test User',
      username: 'user1234',
      password: 'password',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', () => {
    cy.contains('blogs');
    // cy.contains(
    //   'Note app, Department of Computer Science, University of Helsinki 2021'
    // );
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('user1234');
      cy.get('#password').type('password');
      cy.get('#login-button').click();

      cy.contains('user1234 logged in');
    });

    it('fails with wrong credentials and error has color red', function () {
      cy.contains('login').click();
      cy.get('#username').type('user1234');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.error').contains('Wrong credentials');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});

describe('when logged in', function () {
  beforeEach(function () {
    cy.login({ username: 'user1234', password: 'password' });
  });

  it('a new blog can be created', function () {
    cy.contains('new blog').click();
    cy.get('#title').type('a blog created by cypress');
    cy.get('#author').type('a blog created by cypress');
    cy.get('#url').type('a blog created by cypress');
    cy.get('#create-blog').click();
    cy.contains('a blog created by cypress');
  });

  it('you can like a blog', function () {
    cy.contains('view').click();
    cy.contains('like').click();
    cy.contains('1');
  });

  it('you can delete a blog', function () {
    cy.contains('new blog').click();
    cy.get('#title').type('a blog2 created by cypress');
    cy.get('#author').type('a blog2 created by cypress');
    cy.get('#url').type('a blog2 created by cypress');
    cy.get('#create-blog').click();
    cy.contains('delete').click();
    cy.on('window:confirm', () => true);
    cy.get('html').should('not.contain', 'a blog2 created by cypress');
  });

  describe('when a blog exists', function () {
    beforeEach(function () {
      const blog1 = {
        title: 'a blog created by cypress',
        author: 'a blog created by cypress',
        url: 'a blog created by cypress',
        likes: 5,
      };
      const blog2 = {
        title: 'a blog created by cypress',
        author: 'a blog created by cypress',
        url: 'a blog created by cypress',
        likes: 5,
      };
      const blog3 = {
        title: 'a blog created by cypress',
        author: 'a blog created by cypress',
        url: 'a blog created by cypress',
        likes: 5,
      };
      cy.request('POST', 'http://localhost:3003/api/blogs/', blog1);
      cy.request('POST', 'http://localhost:3003/api/blogs/', blog2);
      cy.request('POST', 'http://localhost:3003/api/blogs/', blog3);
    });
    it.only('and they are automatically sorted by likes', function () {
      cy.get('blogTitle').should((items) => {
        expect(items[0]).to.contain('Blog with 15 likes');
        expect(items[1]).to.contain('Blog with 6 likes');
        expect(items[2]).to.contain('Blog with 1 like');
      });
    });
  });
});
