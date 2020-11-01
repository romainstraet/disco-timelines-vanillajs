let realWindowLocation;

export function mockWindowLocation() {
  realWindowLocation = window.location;
  delete window.location;
  window.location = { ...realWindowLocation, assign: jest.fn };
}

export function resetWindowlocation() {
  window.location = realWindowLocation;
}
