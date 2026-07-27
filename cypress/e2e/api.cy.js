describe('API Testing with Cypress (cy.request)', () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com';

  it('TC-API-01: GET - Should fetch list of posts', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/posts`,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
      expect(response.body[0]).to.have.all.keys('userId', 'id', 'title', 'body');
    });
  });

  it('TC-API-02: GET - Should fetch single post details', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/posts/1`
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('userId');
      expect(response.body).to.have.property('title');
    });
  });

  it('TC-API-03: POST - Should create a new post', () => {
    const newPost = {
      title: 'Automation Testing with Cypress',
      body: 'Building industry-grade QA testing framework.',
      userId: 1
    };

    cy.request({
      method: 'POST',
      url: `${apiUrl}/posts`,
      body: newPost
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('title', newPost.title);
      expect(response.body).to.have.property('body', newPost.body);
      expect(response.body).to.have.property('userId', newPost.userId);
      expect(response.body).to.have.property('id');
    });
  });

  it('TC-API-04: PUT - Should update existing post', () => {
    const updatedPost = {
      id: 1,
      title: 'Updated Post Title',
      body: 'Updated body content for test verification.',
      userId: 1
    };

    cy.request({
      method: 'PUT',
      url: `${apiUrl}/posts/1`,
      body: updatedPost
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('title', updatedPost.title);
      expect(response.body).to.have.property('body', updatedPost.body);
    });
  });

  it('TC-API-05: DELETE - Should delete post record', () => {
    cy.request({
      method: 'DELETE',
      url: `${apiUrl}/posts/1`
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('TC-API-06: GET - Should handle 404 resource not found error gracefully', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/posts/999999`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
