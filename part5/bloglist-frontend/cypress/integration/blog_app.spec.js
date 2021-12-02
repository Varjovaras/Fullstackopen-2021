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
    describe('add several blogs', function () {
      beforeEach(function () {
        const blog1 = {
          title: 'Title 1',
          author: 'Author 1',
          url: 'Url 1',
          likes: 5,
        };
        const blog2 = {
          title: 'Title 2',
          author: 'Author 2',
          url: 'Url 2',
          likes: 7,
        };
        const blog3 = {
          title: 'Title 3',
          author: 'Author 3',
          url: 'Url 3',
          likes: 15,
        };
        cy.createBlog(blog1);
        cy.createBlog(blog2);
        cy.createBlog(blog3);
      });

      it('you can like a blog', function () {
        cy.contains('view').click();
        cy.contains('like').click();
        cy.contains('1');
      });

      it('first post has the most likes', function () {
        cy.contains('view').click();
        cy.contains('15 likes');
      });
    });
  });
});
