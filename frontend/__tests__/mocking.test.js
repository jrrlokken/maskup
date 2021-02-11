function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFavFoods = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(this.foods), 2000);
  });
}

describe('mocking basics', () => {
  it('mocks a regular function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('snickers');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('snickers');
    fetchDogs('hugo');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it('can create a person object', () => {
    const me = new Person('Joshua', ['jerky', 'apples', 'cake']);
    expect(me).toBeInstanceOf(Person);
    expect(me.name).toEqual('Joshua');
  });

  it('can fetch foods', async () => {
    const me = new Person('Joshua', ['jerky', 'apples', 'cake']);
    // mock the favFoods function
    me.fetchFavFoods = jest.fn().mockResolvedValue(['sushi', 'ramen']);
    const favFoods = await me.fetchFavFoods();
    console.log(favFoods);
    expect(favFoods).toContain('sushi');
  })
});
