// This recipe shows how to interact with a range input (slider)

// Eventually, this will be expanded to includes examples of interacting
// with various form elements

describe('Datastructure interaction test', () => {
  before(() => cy.server());
  beforeEach(() => {
    cy.visit('/');
  });

  /* GETTERS */
  const getRoot = i =>
    cy
      .get('#data-structure-test > div')
      .as('root')
      .eq(i);

  const getDrink = i =>
    getRoot(0)
      .find('input[type=checkbox]')
      .eq(i);

  const getHumanInterest = (i, j) =>
    getRoot(1)
      .find('div')
      .eq(i)
      .find('input')
      .eq(j);

  const getHumanGender = i =>
    getRoot(2)
      .find('input[type=radio]')
      .eq(i);

  const getVehicle = i =>
    getRoot(3)
      .find('input')
      .eq(i);

  const getRestItem = item => getRoot(4).find(item);

  /* PRE-CONDITIONS */
  const drinksPrecondition = () => {
    getDrink(0).should('not.be.checked');
    getDrink(1).should('be.checked');
    getDrink(2).should('not.be.checked');
    getDrink(3).should('not.be.checked');
    getDrink(4).should('not.be.checked');
    getDrink(5).should('not.be.checked');
    getDrink(6).should('not.be.checked');
  };

  const humansInterestsPrecondition = () => {
    getHumanInterest(0, 0).should('have.value', 'ALL');
    getHumanInterest(0, 1).should('have.value', 'ALL');
    getHumanInterest(1, 0).should('have.value', 'ALL');
    getHumanInterest(1, 1).should('have.value', 'ALL');
  };

  const humansGenderPrecondition = () => {
    getHumanGender(0).should('not.be.checked');
    getHumanGender(1).should('be.checked');
  };

  const vehiclePrecondition = () => {
    getVehicle(0).should('have.value', '');
    getVehicle(1).should('have.value', '');
  };

  const restPrecondition = (selector, value = '') => {
    getRestItem(selector).should('have.value', value);
  };

  /* DRINKS */
  it('should set all drinks as checked', () => {
    // Arrange
    drinksPrecondition();

    // Act
    getDrink(0).check();

    // Assert
    getDrink(0).should('be.checked');
    getDrink(1).should('be.checked');
    getDrink(2).should('be.checked');
    getDrink(3).should('be.checked');
    getDrink(4).should('be.checked');
    getDrink(5).should('be.checked');
    getDrink(6).should('be.checked');
  });

  it('should set all drinks as unchecked', () => {
    // Arrange
    drinksPrecondition();
    getDrink(0).check();

    // Act
    getDrink(0).uncheck();

    // Assert
    getDrink(0).should('not.be.checked');
    getDrink(1).should('not.be.checked');
    getDrink(2).should('not.be.checked');
    getDrink(3).should('not.be.checked');
    getDrink(4).should('not.be.checked');
    getDrink(5).should('not.be.checked');
    getDrink(6).should('not.be.checked');
  });

  it('should only check the 5th checkbox', () => {
    // Arrange
    drinksPrecondition();

    // Act
    getDrink(5).check();

    // Assert
    getDrink(0).should('not.be.checked');
    getDrink(1).should('be.checked');
    getDrink(2).should('not.be.checked');
    getDrink(3).should('not.be.checked');
    getDrink(4).should('not.be.checked');
    getDrink(5).should('be.checked');
    getDrink(6).should('not.be.checked');
  });

  it('should check the last checkbox', () => {
    // Arrange
    drinksPrecondition();

    // Act
    getDrink(2).check();
    getDrink(3).check();
    getDrink(4).check();

    // Assert
    getDrink(0).should('not.be.checked');
    getDrink(1).should('be.checked');
    getDrink(2).should('be.checked');
    getDrink(3).should('be.checked');
    getDrink(4).should('be.checked');
    getDrink(5).should('not.be.checked');
    getDrink(6).should('be.checked');
  });

  /* HUMANS */
  it('should update human interests accordingly and leave gender intact', () => {
    // Arrange
    humansInterestsPrecondition();

    // Act
    getHumanInterest(0, 0).clear().type('Changing');
    getHumanInterest(0, 1).clear().type('the');
    getHumanInterest(1, 0).clear().type('input');
    getHumanInterest(1, 1).clear().type('value');

    // Assert
    getHumanInterest(0, 0).should('have.value', 'Changing');
    getHumanInterest(0, 1).should('have.value', 'the');
    getHumanInterest(1, 0).should('have.value', 'input');
    getHumanInterest(1, 1).should('have.value', 'value');
    getHumanGender(0).should('not.be.checked');
    getHumanGender(1).should('be.checked');
  });

  it('should update human gender accordingly and leave interests intact', () => {
    // Arrange
    humansGenderPrecondition();

    // Act
    getHumanGender(0).check();

    // Assert
    getHumanInterest(0, 0).should('have.value', 'ALL');
    getHumanInterest(0, 1).should('have.value', 'ALL');
    getHumanInterest(1, 0).should('have.value', 'ALL');
    getHumanInterest(1, 1).should('have.value', 'ALL');
    getHumanGender(0).should('be.checked');
    getHumanGender(1).should('not.be.checked');
  });

  /* VEHICLE */
  it('should update vehicles accordingly', () => {
    // Arrange
    vehiclePrecondition();

    // Act
    getVehicle(0).clear().type('1337');
    getVehicle(1).clear().type('42');

    // Assert
    getVehicle(0).should('have.value', '1337');
    getVehicle(1).should('have.value', '42');
  });

  /* REST */
  it('should update datalist by typing', () => {
    // Arrange
    const selector = 'input[list=cat]';
    restPrecondition(selector);

    // Act
    getRestItem(selector).type('foo');

    // Assert
    getRestItem(selector).should('have.value', 'foo');
  });

  it('should update select correctly', () => {
    // Arrange
    const selector = 'select';
    restPrecondition(selector, 'barfoo');

    // Act
    getRestItem(selector).select('foobar');

    // Assert
    getRestItem(selector).should('have.value', 'foobar');
  });

  it('should update textarea by typing', () => {
    // Arrange
    const selector = 'textarea';
    restPrecondition(selector);

    // Act
    getRestItem(selector).type('wabbalabbadubdub');

    // Assert
    getRestItem(selector).should('have.value', 'wabbalabbadubdub');
  });

  /* BUTTONS */
  it('should update the whole store and log to console on submit', () => {
    // Arrange
    drinksPrecondition();
    humansInterestsPrecondition();
    humansGenderPrecondition();
    vehiclePrecondition();
    restPrecondition('input[list=cat]');
    restPrecondition('select', 'barfoo');
    restPrecondition('textarea');

    // Act
    getDrink(1).uncheck();
    getDrink(5).check();
    getHumanInterest(0, 0).clear().type('first first');
    getHumanInterest(1, 0).clear().type('second first');
    getHumanGender(0).check();
    getHumanGender(1).check();
    getVehicle(0).type('love tesla');
    getRestItem('input[list=cat]').type('Rick');
    getRestItem('select').select('foobar');
    getRestItem('textarea').type('and Morty');

    getRoot(5)
      .find('button[type=submit]')
      .click();

    // Assert
    cy.window()
      .its('model')
      .should('deep.equal', {
        drinks: [
          {type: false, foo: true},
          {type: undefined, foo: undefined},
          {type: undefined, foo: undefined},
          {type: undefined, foo: undefined},
        ],
        human: [
          {
            interests: ['first first', 'ALL'],
            gender: 'male',
          },
          {
            interests: ['second first', 'ALL'],
            gender: 'male',
          },
        ],
        vehicle: {
          car: {
            tesla: 'love tesla',
            porsche: undefined,
          },
        },
        cat: 'Rick',
        dog: 'foobar',
        ape: 'and Morty',
      });
  });

  it('should update the whole store and reset to original state', () => {
    // Arrange
    drinksPrecondition();
    humansInterestsPrecondition();
    humansGenderPrecondition();
    vehiclePrecondition();
    restPrecondition('input[list=cat]');
    restPrecondition('select', 'barfoo');
    restPrecondition('textarea');

    // Act
    getDrink(1).uncheck();
    getDrink(5).check();
    getHumanInterest(0, 0).clear().type('first first');
    getHumanInterest(1, 0).clear().type('second first');
    getHumanGender(0).check();
    getHumanGender(1).check();
    getVehicle(0).type('love tesla');
    getRestItem('input[list=cat]').type('Rick');
    getRestItem('select').select('foobar');
    getRestItem('textarea').type('and Morty');

    getRoot(5)
      .find('button[type=reset]')
      .click();
    getRoot(5)
      .find('button[type=submit]')
      .click();

    // Assert
    cy.window()
      .its('model')
      .should('deep.equal', {
        drinks: [
          {type: true, foo: undefined},
          {type: undefined, foo: undefined},
          {type: undefined, foo: undefined},
          {type: undefined, foo: undefined},
        ],
        human: [
          {
            interests: ['ALL', 'ALL'],
            gender: 'male',
          },
          {
            interests: ['ALL', 'ALL'],
            gender: 'male',
          },
        ],
        vehicle: {
          car: {
            tesla: undefined,
            porsche: undefined,
          },
        },
        cat: undefined,
        dog: 'barfoo',
        ape: undefined,
      });
  });
});
